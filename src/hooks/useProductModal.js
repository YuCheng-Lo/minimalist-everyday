import { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import { useDispatch } from "react-redux";
import { showAsyncMessage } from "../slices/messageSlice";
import axiosInstance from "../services/axiosInstance";

export const useProductModal = () => {
  const path = import.meta.env.VITE_PATH;
  const dispatch = useDispatch();
  const productModalRef = useRef(null); // 用來抓子組件的 div 節點
  const modalInstance = useRef(null); // 用來存Bootstrap new出來的實例

  const defaultProductState = {
    title: "",
    category: "",
    origin_price: 0,
    price: 0,
    unit: "",
    description: "",
    content: "",
    is_enabled: 0,
    imageUrl: "",
    imagesUrl: [],
    stock: 0,
  };

  const [templateProduct, setTemplateProduct] = useState(defaultProductState);
  const [modalMode, setModalMode] = useState("");

  useEffect(() => {
    if (productModalRef.current) {
      modalInstance.current = new bootstrap.Modal(productModalRef.current, {
        keyboard: false,
        backdrop: "static",
      });
    }
    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, []);

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    if (mode === "create") {
      setTemplateProduct(defaultProductState);
    } else if (mode === "edit" || mode === "delete") {
      //把edit和delete寫在一起，因為都需要帶入產品資料
      setTemplateProduct({
        // 確保欄位都有預設值，避免undefined而噴錯
        title: product.title || "",
        category: product.category || "",
        origin_price: product.origin_price || 0,
        price: product.price || 0,
        unit: product.unit || "",
        description: product.description || "",
        content: product.content || "",
        is_enabled: product.is_enabled || 0,
        imageUrl: product.imageUrl || "",
        imagesUrl: product.imagesUrl ? [...product.imagesUrl] : [],
        stock: product.stock || 0,
        id: product.id, //編輯和刪除絕對需要的 ID
      });
    }
    modalInstance.current?.show();
  };

  const closeModal = () => {
    if (modalInstance.current) {
      modalInstance.current.hide();
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file-to-upload", file);

    try {
      const res = await axiosInstance.post(
        `/api/${path}/admin/upload`,
        formData,
      );

      const imageUrl = res.data.imageUrl;

      if (!templateProduct.imageUrl) {
        setTemplateProduct((prev) => {
          return { ...prev, imageUrl };
        });
      } else if (templateProduct.imagesUrl.length < 4) {
        setTemplateProduct((prev) => {
          const newImages = [...prev.imagesUrl];
          newImages[prev.imagesUrl.length] = imageUrl;
          return { ...prev, imagesUrl: newImages };
        });
      }
    } catch {
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "系統錯誤",
          text: "圖片上傳時發生錯誤，請稍後再試",
        }),
      );
    }
  };

  const handleTemplateChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTemplateProduct((prev) => ({
      ...prev,

      //id如果是is_enabled且type是checkbox的話，我們給他checked的值
      //id如果是content、price、...或別的，我們一律給value的值
      //如果是數字欄位，轉為Number
      [id]:
        type === "checkbox"
          ? checked
          : id === "origin_price" || id === "price" || id === "stock"
            ? Number(value)
            : value,
    }));
  };

  const handleMainImageUrlChange = (e) => {
    setTemplateProduct((prev) => {
      return { ...prev, imageUrl: e.target.value };
    });
  };

  const handleImagesUrlChange = (e, index) => {
    const { value } = e.target;
    setTemplateProduct((prev) => {
      const newImages = [...prev.imagesUrl];
      newImages[index] = value; //改對應index
      return { ...prev, imagesUrl: newImages };
    });
  };

  const addImage = () => {
    setTemplateProduct((prev) => {
      if (prev.imagesUrl.length >= 4) return prev;
      return {
        ...prev,
        imagesUrl: [...prev.imagesUrl, ""],
      };
    });
  };

  const deleteImage = () => {
    setTemplateProduct((prev) => {
      if (prev.imagesUrl.length === 0) return prev;
      const newImages = [...prev.imagesUrl];
      newImages.pop();
      return { ...prev, imagesUrl: newImages };
    });
  };

  const isUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateProduct = () => {
    const {
      title,
      category,
      unit,
      description,
      imageUrl,
      imagesUrl,
      origin_price,
      price,
      stock,
    } = templateProduct;

    if (!title.trim()) return "請輸入產品標題";
    if (!category.trim()) return "請輸入產品分類";
    if (!unit.trim()) return "請輸入產品單位";
    if (!description.trim()) return "請輸入產品描述";

    if (!imageUrl.trim()) return "請輸入產品圖片";
    if (!isUrl(imageUrl)) return "圖片網址格式錯誤";

    // 驗證副圖
    for (let i = 0; i < imagesUrl.length; i++) {
      const url = imagesUrl[i].trim();
      if (url !== "" && !isUrl(url)) {
        return `副圖 ${i + 1} 的網址格式錯誤`;
      }
    }

    const originPrice = Number(origin_price) || 0;
    const priceValue = Number(price) || 0;
    const stockValue = Number(stock) || 0;

    if (priceValue <= 0) return "售價必須大於0";
    if (originPrice < priceValue) return "原價不能小於售價";
    if (stockValue < 0) return "庫存不能小於0";

    return null;
  };

  const handleModalConfirm = async (getProducts) => {
    if (modalMode !== "delete") {
      const error = validateProduct();
      if (error) {
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "表單錯誤",
            text: error,
          }),
        );
        return;
      }
    }

    try {
      //清洗不必要的主、副圖資料
      const cleanMainImage =
        templateProduct.imageUrl.trim() !== ""
          ? templateProduct.imageUrl
          : null;
      const cleanImagesUrl = templateProduct.imagesUrl.filter(
        (url) => url.trim() !== "",
      );

      //組出真正要送的 product，重要的是is_enabled必須是1 or 0，而非true or false
      const productData = {
        ...templateProduct,
        imageUrl: cleanMainImage,
        imagesUrl: cleanImagesUrl,
        is_enabled: templateProduct.is_enabled ? 1 : 0,
      };

      let api = "";
      let method = "";
      if (modalMode === "create") {
        api = `/api/${path}/admin/product`;
        method = "post";
        await axiosInstance[method](api, {
          data: productData,
        });
      } else if (modalMode === "edit") {
        api = `/api/${path}/admin/product/${templateProduct.id}`;
        method = "put";
        await axiosInstance[method](api, {
          data: productData,
        });
      } else if (modalMode === "delete") {
        api = `/api/${path}/admin/product/${templateProduct.id}`;
        method = "delete";
        await axiosInstance[method](api);
      }

      //成功後處理關閉modal、刷新產品列表
      closeModal();
      await getProducts();

      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "success",
          title: "成功",
          text:
            modalMode === "create"
              ? "產品新增成功"
              : modalMode === "edit"
                ? "產品更新成功"
                : "產品刪除成功",
        }),
      );

      //只有新增時才重置
      if (modalMode === "create") {
        setTemplateProduct(defaultProductState);
      }
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message || "操作失敗，請重新再試";

      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "系統錯誤",
          text: apiMessage,
        }),
      );
    }
  };

  return {
    productModalRef,
    templateProduct,
    modalMode,
    openModal,
    closeModal,
    handleUploadImage,
    handleTemplateChange,
    handleMainImageUrlChange,
    handleImagesUrlChange,
    addImage,
    deleteImage,
    handleModalConfirm,
  };
};
