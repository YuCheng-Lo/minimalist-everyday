import axiosInstance from "./axiosInstance";

const path = import.meta.env.VITE_PATH;

export const frontendProductsApi = {
  getProducts: (page = 1, category = "") => {
    let url = `/api/${path}/products?page=${page}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return axiosInstance.get(url);
  },

  getProduct: (id) => {
    return axiosInstance.get(`/api/${path}/product/${id}`);
  },
};
