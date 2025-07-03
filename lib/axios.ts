import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getCsrfToken } from "./utils";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedRequestQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

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

axiosInstance.interceptors.response.use(
  (response) => { return response },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/forgot-password") ||
      originalRequest.url?.includes("/auth/reset-password");

    if (error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !isAuthEndpoint) {

      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await axiosInstance.post("/auth/refresh-token")

          failedRequestQueue.forEach((req) => req.resolve());

          failedRequestQueue = [];

          return axiosInstance(originalRequest);
        } catch (error) {
          failedRequestQueue.forEach((request) => request.reject(error));

          failedRequestQueue = [];

          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          resolve: () => resolve(axiosInstance(originalRequest)),
          reject: (err) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);

export const refreshCsrfToken = async () => {
  try {
    await axiosInstance.get("/csrf");
    console.log("CSRF token refreshed successfully");

    return true;
  } catch (error) {
    console.error("Error refreshing CSRF token:", error);
    return false
  }
}

export default axiosInstance;