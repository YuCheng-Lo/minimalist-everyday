import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { useDispatch } from "react-redux";
import { showAsyncMessage } from "../slices/messageSlice";

export const useAdminProducts = () => {
  const path = import.meta.env.VITE_PATH;
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  const [isLoading, setIsLoading] = useState(true);

  const getProducts = useCallback(
    async (page = 1) => {
      setIsLoading(true); //開始載入
      try {
        const res = await axiosInstance.get(
          `/api/${path}/admin/products?page=${page}`,
        );
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch {
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "系統錯誤",
            text: "產品取得失敗，請稍後在試",
          }),
        );
      } finally {
        setIsLoading(false); //載入完成
      }
    },
    [path, dispatch],
  );

  useEffect(() => {
    const init = async () => {
      await getProducts();
    };
    init();
  }, [getProducts]);

  return { products, pagination, isLoading, getProducts };
};
