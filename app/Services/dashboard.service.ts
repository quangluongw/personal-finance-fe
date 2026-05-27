// dashboard.service.ts
import { apiRequest } from "./apiService.service";

export const Dashboard = async (
  id: string,
  type: "week" | "month" | "year" = "month"
) => {
  return apiRequest("get", `dashboard/${id}?type=${type}`);
};
