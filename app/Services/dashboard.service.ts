import { apiRequest } from "./apiService.service";

export const Dashboard = async (
  id: string,
  type: "week" | "month" | "year" = "month",
  date?: string
) => {
  const params = new URLSearchParams({ type });
  if (date) params.append("date", date);
  return apiRequest("get", `dashboard/${id}?${params.toString()}`);
};
