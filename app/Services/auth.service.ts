import type { TLogin, TRegister } from "~/Types/auth";
import { apiRequest } from "./apiService.service";

export const Register = async (data: TRegister) => {
 return apiRequest("post", "register", data);
};

export const Login = async (data: TLogin) => {
 return apiRequest("post", "login", data);
};
