import { jwtDecode } from "jwt-decode";

export const authToken = {
  setAccessToken: (token: string) => sessionStorage.setItem("token", token),
  getAccessToken: () => sessionStorage.getItem("token"),
};
export const decodeToken = (token: string) => {
  try {
    const decode = jwtDecode(token);
    return decode;
  } catch (error) {
    console.error("Error decoding accessToken:", error);
    return false;
  }
};

export const checkTokenValid = (token: string) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;
    const now = Date.now();
    const bufferTime = Number(import.meta.env.VITE_PUBLIC_BUFFER_TIME) || 30;
    return exp * 1000 - now > bufferTime * 1000;
  } catch (error) {
    console.error("Error decoding accessToken:", error);
    return false;
  }
};