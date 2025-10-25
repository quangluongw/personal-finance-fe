import type { TransactionForm } from "~/Types/transaction";
import { apiRequest } from "./apiService.service";

export const getTransaction = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `transaction/${id}`, { params: queryParams });
};

export const getTotalTransactionHistory = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `totalTransaction/${id}`, { params: queryParams });
};

export const addTransaction = (data: TransactionForm) => {
  return apiRequest("post", `addTransactions`, data);
};
