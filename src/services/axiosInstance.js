import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  if (token) config.headers["Authorization"] = token;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      document.cookie =
        "hexToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // 如果不是在登入頁，才執行跳轉，避免在登入頁發生的錯誤也觸發跳轉
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
