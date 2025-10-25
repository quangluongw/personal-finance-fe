import { apiRequest } from "./apiService.service";

export const Caterories = async () => {
  return apiRequest("get", "categories");
};
