import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { AUTH_PATHS } from "~/constants/auth";
import { authToken } from "../lib/auth";

const { getAccessToken } = authToken;

export const axiosInstance = axios.create({
  baseURL: " https://personal-finance-be-eight.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = getAccessToken();

    if (!access) return config;

    config.headers["Authorization"] = `Bearer ${access}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = AUTH_PATHS.LOGIN;
    }

    // Xử lý lỗi khác nếu cần
    return Promise.reject(error);
  }
);
