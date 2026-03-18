import axiosInstance from "./axiosInstance";

const path = import.meta.env.VITE_PATH;

export const frontendProductsApi = {
  getProducts: (page = 1) => {
    return axiosInstance.get(`/api/${path}/products?page=${page}`);
  },

  getProduct: (id) => {
    return axiosInstance.get(`/api/${path}/product/${id}`);
  },
};
