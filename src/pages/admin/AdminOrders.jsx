import { useEffect } from "react";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const AdminOrders = () => {
  const {
    orders,
    pagination,
    getOrders,
    deleteOrder,
    deleteAllOrder,
    isLoading,
  } = useAdminOrders();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="container py-3">
      {isLoading ? (
        <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white">
          <Loading text="訂單內容載入中..." />
        </div>
      ) : (
        <>
          <div className="text-end mt-4">
            <button className="btn btn-danger" onClick={() => deleteAllOrder()}>
              刪除全部訂單
            </button>
          </div>
          <div className="table-responsive">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>下單時間</th>
                  <th>訂單編號</th>
                  <th className="d-none d-lg-table-cell">Email</th>
                  <th width="120">應付金額</th>
                  <th width="120">是否付款</th>
                  <th width="120">操作</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        {order?.create_at
                          ? new Date(order.create_at * 1000).toLocaleString()
                          : ""}
                      </td>
                      <td>{order.id}</td>
                      <td className="d-none d-lg-table-cell">
                        {order.user?.email}
                      </td>
                      <td>${order.total}</td>
                      <td
                        className={
                          order.is_paid ? "text-success" : "text-danger"
                        }
                      >
                        {order.is_paid ? "已付款" : "未付款"}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteOrder(order.id)}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">尚無產品資料</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination pagination={pagination} onPageChange={getOrders} />
        </>
      )}
    </div>
  );
};

export default AdminOrders;
