import axios from "axios";
import { setupAxiosErrorInterceptor } from "../axiosErrorInterceptor";
import { useLoadingStore } from "@/store/useLoadingStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("auth-storage");
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          const token = parsed.state?.token || parsed.token || null;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error("Error parsing auth-storage in interceptor", e);
        }
      }
    }

    if (!config?.skipLoading) {
      useLoadingStore.getState().startRequest();
    }

    return config;
  },
  (error: any) => {
    if (!error?.config?.skipLoading) {
      useLoadingStore.getState().endRequest();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    if (!response?.config?.skipLoading) {
      useLoadingStore.getState().endRequest();
    }
    return response;
  },
  (error: any) => {
    if (!error?.config?.skipLoading) {
      useLoadingStore.getState().endRequest();
    }
    return Promise.reject(error);
  }
);

setupAxiosErrorInterceptor(axiosInstance);

export default axiosInstance;
