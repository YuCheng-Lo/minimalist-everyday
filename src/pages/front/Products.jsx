import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { frontendProductsApi } from "../../services/frontendProductService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { addToCartAsync } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAsyncMessage } from "../../slices/messageSlice";
import { formatPrice } from "../../utils/formatPrice";

const Products = () => {
  const navigate = useNavigate();

  const { loadingItemId } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const page = Number(searchParams.get("page")) || 1;

  const getProducts = useCallback(
    async (page = 1, categoryParam = "") => {
      setIsLoading(true); //開始載入
      try {
        const res = await frontendProductsApi.getProducts(page, categoryParam);

        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch {
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "系統失敗",
            text: "產品取得失敗，請稍後再試",
          }),
        );
      } finally {
        setIsLoading(false); //載入完成
      }
    },
    [dispatch],
  );

  const onPageChange = (newPage) => {
    // getProducts(page, category);
    const params = {};

    if (category) params.category = category;
    if (newPage > 1) params.page = newPage;

    setSearchParams(params);
  };

  useEffect(() => {
    getProducts(page, category);
  }, [getProducts, page, category]);

  if (isLoading) return <Loading text="商品內容載入中..." />;
  return (
    <div className="container py-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              首頁
            </Link>
          </li>
          {category ? (
            <>
              <li className="breadcrumb-item">
                <Link to="/products" className="text-decoration-none">
                  所有產品
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {category}
              </li>
            </>
          ) : (
            <li className="breadcrumb-item active" aria-current="page">
              所有產品
            </li>
          )}
        </ol>
      </nav>
      <div className="text-center mb-2">
        <h1 className="fw-bold">商品列表</h1>
        <p className="text-muted">挑選你喜歡的商品</p>
      </div>
      <div className="mb-4 d-flex justify-content-start justify-content-md-center gap-2 flex-nowrap overflow-auto pb-2">
        {["全部", "居家香氛", "居家生活", "文具用品", "3C配件"].map((cate) => (
          <button
            key={cate}
            className={`btn ${(category === "" && cate === "全部") || category === cate ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => {
              const newCategory = cate === "全部" ? "" : cate;

              const params = {};
              if (newCategory) {
                params.category = newCategory;
              }

              setSearchParams(params);
            }}
          >
            {cate}
          </button>
        ))}
      </div>
      <div className="row g-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <img
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{product.title}</strong>
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      whiteSpace: "nowrap", //不換行
                      overflow: "hidden", //超出部分隱藏
                      textOverflow: "ellipsis", //多餘文字顯示...
                    }}
                  >
                    {product.description}
                  </p>
                  <p className="card-text">
                    <strong>售價:</strong>{" "}
                    <del className="text-muted">
                      NT$ {formatPrice(product.origin_price)}
                    </del>{" "}
                    <strong className="text-danger">
                      NT$ {formatPrice(product.price)}
                    </strong>
                  </p>
                  <div className="d-flex  justify-content-center gap-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      查看商品
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        dispatch(addToCartAsync({ productId: product.id }));
                      }}
                      disabled={loadingItemId.add === product.id}
                    >
                      {loadingItemId.add === product.id
                        ? "處理中..."
                        : "加入購物車"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Products;
