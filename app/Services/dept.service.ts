import type { IDeptForm } from "~/Types/dept";
import { apiRequest } from "./apiService.service";

export const getDept = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `dept/${id}`, { params: queryParams });
};

export const updateDept = (id: string, data: IDeptForm) => {
  return apiRequest("patch", `dept/${id}/transactions`, data);
};

export const addDept = (data: IDeptForm) => {
  return apiRequest("post", `createDebt`, data);
};
