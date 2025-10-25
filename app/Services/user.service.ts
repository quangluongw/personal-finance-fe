import { apiRequest } from "./apiService.service"

export const getUser = (id: string) => {
    return apiRequest("get", `user/${id}`);
}