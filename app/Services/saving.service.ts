import { apiRequest } from "./apiService.service";

export const getSaving = (
  id: string,
  queryParams: Record<string, string> = {}
) => {
  return apiRequest("get", `saving/${id}`, { params: queryParams });
};
