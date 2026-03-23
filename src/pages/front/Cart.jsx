import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import CartQtyControl from "../../components/CartQtyControl";
import ErrorView from "../../components/ErrorView";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsyncCart,
  removeCartItemAsync,
  removeCartAsync,
  updateCartItemQtyAsync,
} from "../../slices/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { carts, loading, final_total, loadingItemId, error, initialized } =
    useSelector((state) => state.cart);

  useEffect(() => {
    if (!initialized) {
      dispatch(getAsyncCart());
    }
  }, [dispatch, initialized]);

  if (loading && !initialized) return <Loading text="購物車載入中..." />;

  if (error) {
    return (
      <ErrorView
        title="資料載入失敗..."
        message={error}
        onRetry={() => dispatch(getAsyncCart())}
      />
    );
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="h2 fw-bold mb-0">購物車清單</h1>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => dispatch(removeCartAsync())}
          disabled={carts.length === 0}
        >
          <i className="bi bi-trash3 me-1"></i> 清空購物車
        </button>
      </div>

      <div className="mt-4">
        <div className="d-none d-md-flex row border-bottom pb-2 fw-bold text-muted px-2">
          <div className="col-md-1"></div>
          <div className="col-md-2">商品圖片</div>
          <div className="col-md-4">品名</div>
          <div className="col-md-3 text-center">數量</div>
          <div className="col-md-2 text-end">小計</div>
        </div>

        {carts.length > 0 ? (
          carts.map((item) => (
            <div
              key={item.id}
              className="row align-items-center py-3 border-bottom mx-0 gx-2"
            >
              <div className="col-2 col-md-1 text-center">
                <button
                  type="button"
                  className="btn btn-link text-danger p-0 border-0"
                  onClick={() => dispatch(removeCartItemAsync(item.id))}
                  disabled={loadingItemId.remove === item.id}
                >
                  {loadingItemId.remove === item.id ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <i className="bi bi-x-lg fs-5"></i>
                  )}
                </button>
              </div>

              <div className="col-4 col-md-2">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="rounded img-fluid shadow-sm"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>

              <div className="col-5 col-md-4">
                <div className="fw-bold mb-1 text-truncate">
                  {item.product.title}
                </div>
                <div className="text-muted small d-md-none">
                  單價：NT$ {item.product.price}
                </div>
              </div>

              <div className="col-8 offset-2 col-md-3 offset-md-0 mt-3 mt-md-0">
                <div className="d-flex justify-content-center">
                  <CartQtyControl
                    qty={item.qty}
                    loading={loadingItemId.update === item.id}
                    onIncrease={() => {
                      dispatch(
                        updateCartItemQtyAsync({
                          cartItemId: item.id,
                          productId: item.product.id,
                          qty: item.qty + 1,
                        }),
                      );
                    }}
                    onDecrease={() => {
                      dispatch(
                        updateCartItemQtyAsync({
                          cartItemId: item.id,
                          productId: item.product.id,
                          qty: item.qty - 1,
                        }),
                      );
                    }}
                  />
                </div>
              </div>

              <div className="col-3 col-md-2 text-end mt-3 mt-md-0 fw-bold text-primary text-nowrap">
                <span className="d-md-none small text-muted fw-normal me-1">
                  小計:
                </span>
                ${item.total}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">購物車空空的...</div>
        )}

        {carts.length > 0 && (
          <div className="text-end py-4 px-2">
            <span className="h5 me-3 text-muted">總計金額</span>
            <span className="h3 fw-bold text-danger">NT$ {final_total}</span>
          </div>
        )}
      </div>

      {carts.length > 0 ? (
        <div className="text-center mt-5">
          <Link
            to="/checkout"
            className="btn btn-primary btn-lg px-5 py-3 shadow-sm"
          >
            前往結帳
            <i className="bi bi-chevron-right ms-2"></i>
          </Link>
        </div>
      ) : (
        <div className="text-center mt-5 py-5 border rounded-3 bg-light">
          <p className="h3 text-muted mb-4">還沒找到喜歡的商品嗎?</p>
          <Link to="/products" className="btn btn-outline-dark btn-lg px-4">
            回商店選購
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
