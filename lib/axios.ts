import axios from "axios";
import { getCsrfToken } from "./utils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken()
  if (csrfToken && config.headers) {
    config.headers["X-XSRF-TOKEN"] = csrfToken
  }
  return config
})

export const refreshCsrfToken = async () => {
  try {
    await axiosInstance.get("/csrf");
    console.log("CSRF token refreshed successfully");
  } catch (error) {
    console.error("Error refreshing CSRF token:", error);
  }
}

export default axiosInstance;