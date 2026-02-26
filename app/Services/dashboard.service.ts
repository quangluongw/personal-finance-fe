import { apiRequest } from "./apiService.service";

export const Caterories = async (id:string) => {
  return apiRequest("get", `dashboard/${id}`);
};
