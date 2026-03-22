import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { showAsyncMessage } from "../../slices/messageSlice";
import { Oval } from "react-loader-spinner";

const CheckoutSuccess = () => {
  const path = import.meta.env.VITE_PATH;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!orderId) {
      navigate("/products");
      return;
    }

    const checkOrder = async () => {
      try {
        const res = await axiosInstance.get(`/api/${path}/order/${orderId}`);
        const order = res.data.order;

        if (!order.is_paid) {
          navigate(`/payment/${orderId}`, { replace: true });
          return;
        }

        setOrderData(order);
      } catch (err) {
        console.error(err);
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "系統錯誤",
            text: "無法取得訂單資訊",
          }),
        );
        navigate("/products");
      } finally {
        setIsLoading(false);
      }
    };

    checkOrder();
  }, [orderId, path, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 ">
        <Oval
          height={60}
          width={60}
          color="#748be7"
          secondaryColor="#0c4169"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
        <p className="mt-2">驗證訂單中...</p>
      </div>
    );
  }
  return (
    <div className="container py-3 text-center">
      <div className="row g-3 justify-content-center py-4 mb-4">
        {[
          { step: 1, text: "建立訂單", active: false, done: true },
          { step: 2, text: "付款交易", active: false, done: true },
          { step: 3, text: "完成訂單", active: true, done: false },
        ].map((s) => (
          <div key={s.step} className="col-4 col-md-3">
            <div
              className={`card border-0 shadow-sm ${s.active ? "border-bottom border-primary border-4" : ""} ${s.done ? "opacity-50" : ""}`}
            >
              <div className="card-body p-2 p-md-3">
                <small className="d-block text-muted">Step {s.step}</small>
                <span className={`fw-bold ${s.active ? "text-primary" : ""}`}>
                  {s.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div
          className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center"
          style={{ width: "80px", height: "80px", fontSize: "32px" }}
        >
          ✓
        </div>
      </div>

      <h2 className="mb-3 fw-bold text-success">付款成功！</h2>

      <p className="text-muted">感謝您的購買，我們會盡快為您處理訂單。</p>

      <div className="mt-4">
        <p className="mb-1">
          <span className="text-muted">訂單編號：</span>
          <span className="fw-bold">{orderId}</span>
        </p>
        <p className="mb-1">
          <span className="text-muted">訂購Email：</span>
          <span className="fw-bold">{orderData?.user?.email}</span>
        </p>
        <p className="text-muted small">訂單確認信已寄出，請留意您的電子郵件</p>
      </div>

      <div className="mt-5 d-flex justify-content-center gap-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          繼續購物
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          回到首頁
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
