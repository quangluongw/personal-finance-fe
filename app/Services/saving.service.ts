import type { Isaving } from "~/Types/saving";
import { apiRequest } from "./apiService.service";

export const getSaving = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `saving/${id}`, { params: queryParams });
};

export const addSaving = (data: Isaving) => {
  return apiRequest("post", `addSaving`, data);
};

export const updateSaving = (id:string,data: Isaving) => {
  return apiRequest("patch", `updateSaving/${id}`, data);
};