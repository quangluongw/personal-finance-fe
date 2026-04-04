import type { IDeptForm } from "~/Types/dept";
import { apiRequest } from "./apiService.service";

export const getAccount= (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `account/${id}`, { params: queryParams });
};

export const addAccount= (data: IDeptForm) => {
  return apiRequest("post", `account`, data);
};
