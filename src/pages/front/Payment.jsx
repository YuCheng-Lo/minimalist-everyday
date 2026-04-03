import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { showAsyncMessage } from "../../slices/messageSlice";
import { formatPrice } from "../../utils/formatPrice";

const Payment = () => {
  const path = import.meta.env.VITE_PATH;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderId } = useParams();

  const [orderData, setOrderData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!orderId) {
      navigate("/products");
    }

    const getOrder = async () => {
      try {
        const res = await axiosInstance.get(`/api/${path}/order/${orderId}`);
        const order = res.data.order;

        setOrderData(order);
        if (order.is_paid) {
          navigate(`/checkout-success/${orderId}`, { replace: true });
          return;
        }
        if (!order.products) throw new Error("取得訂單失敗");
      } catch {
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "系統錯誤",
            text: "取得訂單失敗，請重新再試",
          }),
        );
      } finally {
        setIsLoading(false);
      }
    };

    getOrder();
  }, [orderId, path, dispatch, navigate]);

  const handlePay = async () => {
    //防手速快連點
    if (isPaying) return;
    setIsPaying(true);
    try {
      await axiosInstance.post(`/api/${path}/pay/${orderId}`);
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "success",
          title: "交易成功",
          text: "訂單付款成功",
        }),
      );
      navigate(`/checkout-success/${orderId}`, { replace: true });
    } catch (error) {
      console.error("付款失敗", error);
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "交易失敗",
          text: "訂單付款失敗，請稍後再試",
        }),
      );
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) return <Loading text="商品內容載入中..." />;

  if (isPaying) return <Loading text="交易進行中..." />;
  return (
    <div className="container py-3 text-center">
      <div className="row g-3 justify-content-center py-4 mb-4">
        {[
          { step: 1, text: "建立訂單", active: false, done: true },
          { step: 2, text: "付款交易", active: true, done: false },
          { step: 3, text: "完成訂單", active: false, done: false },
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

      <div className="row justify-content-center g-4">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 border-bottom-0">
              <h3 className="h5 mb-0 fw-bold text-primary">訂單商品內容</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4" style={{ width: "100px" }}>
                        商品
                      </th>
                      <th>名稱 / 數量</th>
                      <th className="text-end pe-4">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData?.products &&
                      Object.values(orderData.products).map((item) => (
                        <tr key={item.id}>
                          <td className="ps-4">
                            <img
                              src={item?.product?.imageUrl}
                              alt={item?.product?.title}
                              className="rounded shadow-sm"
                              style={{
                                width: "64px",
                                height: "64px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>
                            <div className="fw-bold text-dark">
                              {item?.product?.title}
                            </div>
                            <small className="text-muted text-nowrap">
                              數量：{item?.qty} 件
                            </small>
                          </td>
                          <td className="text-end pe-4 fw-bold">
                            NT$ {formatPrice(item.total)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan="3" className="text-end pe-4 py-3">
                        <span className="text-muted me-2">訂單總金額</span>
                        <span className="h4 fw-bold text-danger mb-0">
                          NT$ {formatPrice(orderData.total)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 border-bottom-0">
              <h3 className="h5 mb-0 fw-bold text-primary">配送資訊</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {[
                  { label: "訂單編號", value: orderId, isCode: true },
                  {
                    label: "下單時間",
                    value: orderData?.create_at
                      ? new Date(orderData.create_at * 1000).toLocaleString()
                      : "",
                  },
                  { label: "收件人", value: orderData?.user?.name },
                  { label: "聯絡電話", value: orderData?.user?.tel },
                  { label: "配送地址", value: orderData?.user?.address },
                  { label: "電子郵件", value: orderData?.user?.email },
                ].map((info, index) => (
                  <li
                    key={index}
                    className="list-group-item px-0 py-2 d-flex justify-content-between align-items-start border-0"
                  >
                    <span
                      className="text-muted me-3"
                      style={{ minWidth: "80px" }}
                    >
                      {info.label}
                    </span>
                    <span
                      className={`text-end ${info.isCode ? "text-break font-monospace small" : "fw-medium"}`}
                    >
                      {info.value || "無"}
                    </span>
                  </li>
                ))}
                <li className="list-group-item px-0 py-2 border-0">
                  <span className="text-muted d-block mb-1">備註訊息</span>
                  <div className="p-2 bg-light rounded small text-secondary">
                    {orderData?.user?.message || "未填寫備註"}
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                <span className="fw-bold">付款狀態</span>
                <span
                  className={`badge rounded-pill px-3 py-2 ${orderData?.is_paid ? "bg-success" : "bg-danger"}`}
                >
                  {orderData?.is_paid ? "已完成付款" : "尚未付款"}
                </span>
              </div>

              <button
                className="btn btn-primary w-100 btn-lg mt-4 shadow"
                onClick={handlePay}
                disabled={isPaying}
              >
                {isPaying ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    處理中...
                  </>
                ) : (
                  "確認付款並送出"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
