import { useLoaderData } from "react-router-dom";
import CartQtyControl from "../../components/CartQtyControl";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../slices/cartSlice";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const ProductDetail = () => {
  const product = useLoaderData();
  const [qty, setQty] = useState(1);

  const { loadingItemId } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(product.imageUrl);

  return (
    <div className="container py-3">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb flex-nowrap overflow-hidden">
          <li className="breadcrumb-item text-truncate">
            <Link to="/" className="text-decoration-none">
              首頁
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="text-decoration-none">
              所有產品
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/products?category=${product.category}`}
              className="text-decoration-none"
            >
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>
      <div className="row g-4 g-md-5 mx-0">
        <div className="col-12 col-md-6">
          <div className="sticky-md-top" style={{ top: "80px" }}>
            <img
              src={mainImage}
              className="img-fluid rounded shadow-sm w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              alt={product.title}
            />

            <div
              className="d-flex mt-3 gap-2 overflow-x-auto pb-2"
              style={{ maxWidth: "100%" }}
            >
              {[product.imageUrl, ...(product.imagesUrl || [])].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`img-thumbnail cursor-pointer ${mainImage === img ? "border-primary" : ""}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>

          <p className="text-muted">{product.description}</p>

          <div className="mb-3">
            <span className=" text-muted me-2">
              <del>NT$ {formatPrice(product.origin_price)}</del>
            </span>
            <span className="h4 text-danger fw-bold">
              NT$ {formatPrice(product.price)}
            </span>
          </div>

          <p className="mb-2">
            <strong>分類：</strong>
            <span className="badge bg-success ms-2">{product.category}</span>
          </p>

          <p className="mb-4">
            <strong>單位：</strong> {product.unit}
          </p>
          <div className="d-flex align-items-center gap-3 mb-4">
            <CartQtyControl
              qty={qty}
              onIncrease={() => setQty((prev) => prev + 1)}
              onDecrease={() => setQty((prev) => Math.max(1, prev - 1))}
            />
          </div>

          <button
            className="btn btn-primary w-100 py-3"
            onClick={() => {
              dispatch(addToCartAsync({ productId: product.id, qty }));
            }}
            disabled={loadingItemId.add === product.id}
          >
            {loadingItemId.add === product.id ? "處理中..." : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
