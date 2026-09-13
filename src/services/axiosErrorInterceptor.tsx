import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

let router: AppRouterInstance | null = null;
let isRefreshing = false;
let failedQueue: any[] = [];

// 🔹 Se registra desde React
export const setAxiosRouter = (appRouter: AppRouterInstance) => {
  router = appRouter;
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function setupAxiosErrorInterceptor(axiosInstance: any) {
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: AxiosError<any>) => {
      const originalRequest: any = error.config;
      const status = error.response?.status;
      const method = originalRequest?.method;
      const url = originalRequest?.url ?? "";

      // 🚨 401 Unauthorized - Token expired or invalid
      // BUT: Don't auto-logout on these endpoints (401s are expected/handled):
      // - /identity/login, /identity/register: Bad credentials
      // - /identity/refresh: Refresh token expired or revoked
      const excludedEndpoints = [
        "/identity/login",
        "/identity/register",
        "/identity/refresh",
      ];
      const isExcluded = excludedEndpoints.some(endpoint => url.includes(endpoint));

      if (status === 401 && !isExcluded && originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axiosInstance.post("/identity/refresh", {}, {
            withCredentials: true
          });

          const { token } = response.data;

          const storedAuth = localStorage.getItem("auth-storage");
          if (storedAuth) {
            try {
              const parsed = JSON.parse(storedAuth);
              if (parsed.state) {
                parsed.state.token = token;
              } else {
                parsed.token = token;
              }
              localStorage.setItem("auth-storage", JSON.stringify(parsed));
            } catch (e) {
              console.error("Error updating token in auth-storage", e);
            }
          }

          processQueue(null, token);

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("auth-storage");
          window.location.href = "/"; // Force full reload to login page
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 🚨 404 SOLO para GET by id
      if (status === 404 && method === "get") {
        router?.push("/not-found");
        return Promise.reject(error);
      }

      // 🚨 429 Too Many Requests
      if (status === 429) {
        const msg =
          error.response?.data?.title ||
          error.response?.data?.message ||
          error.response?.statusText ||
          "Too Many Requests";
        toast.error(msg);
        return Promise.reject(error);
      }

      // ❌ Validaciones backend (Problem Details RFC 7807)
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        Object.keys(backendErrors).forEach((key) => {
          backendErrors[key].forEach((message: string) => {
            toast.error(message);
          });
        });
        return Promise.reject(error);
      }

      // ❌ Error genérico
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.title ||
        error.response?.data?.message ||
        error.message;

      toast.error(msg);
      return Promise.reject(error);
    }
  );
}
