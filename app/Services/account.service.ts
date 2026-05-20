import type { AccountFormValues } from "~/Types/account";
import { apiRequest } from "./apiService.service";

export const getAccount = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `account/${id}`, { params: queryParams });
};

export const addAccount = (data: AccountFormValues) => {
  return apiRequest("post", `account`, data);
};

export const deleteAccount = (id: string) => {
  return apiRequest("delete", `account/${id}`);
};

export const detailAccount = (id: string) => {
  return apiRequest("get", `accountdetail/${id}`);
};