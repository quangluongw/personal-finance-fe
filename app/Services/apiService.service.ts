import { axiosInstance } from "~/config/instance";
import { URL } from "./url";

export const apiRequest = async (
  method: "get" | "post" | "put" | "patch" | "delete",
  endpoint: string,
  data?: any
) => {
  try {
    const res = await axiosInstance[method](`${URL}/${endpoint}`, data);

    if (res.data?.success === false || res.data?.error) {
      throw new Error(res.data.message || "API request failed");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred"
    );
  }
};
