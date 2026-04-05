import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { showAsyncMessage } from "../slices/messageSlice";
import axiosInstance from "../services/axiosInstance";

export const useAdminOrders = () => {
  const path = import.meta.env.VITE_PATH;
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/${path}/admin/orders?page=${page}`,
        );
        console.log(res.data);
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
      } catch {
        dispatch(
          showAsyncMessage({
            id: crypto.randomUUID(),
            type: "danger",
            title: "系統錯誤",
            text: "取得訂單失敗",
          }),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [path, dispatch],
  );

  const deleteOrder = async (id) => {
    try {
      await axiosInstance.delete(`/api/${path}/admin/order/${id}`);
      getOrders(); // 重新整理
    } catch {
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "系統錯誤",
          text: "訂單刪除失敗",
        }),
      );
    }
  };

  const deleteAllOrder = async () => {
    try {
      await axiosInstance.delete(`/api/${path}/admin/orders/all`);
      getOrders(); // 重新整理
    } catch {
      dispatch(
        showAsyncMessage({
          id: crypto.randomUUID(),
          type: "danger",
          title: "系統錯誤",
          text: "訂單刪除失敗",
        }),
      );
    }
  };

  return {
    orders,
    pagination,
    getOrders,
    deleteOrder,
    deleteAllOrder,
    isLoading,
  };
};
