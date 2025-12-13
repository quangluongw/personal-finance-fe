import type { TLogin, TRegister } from "~/Types/auth";
import { apiRequest } from "./apiService.service";
import { axiosInstance } from "~/config/instance";

export const Register = async (data: TRegister) => {
  return apiRequest("post", "register", data);
};

export const Login = async (data: TLogin) => {
  return apiRequest("post", "login", data);
};

export const getMe = async () => {
  return apiRequest("get","getMe");
};

/**
 * Logout
 */
export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};