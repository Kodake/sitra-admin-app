import axiosInstance from "../auth/authAxiosInstanceServices";
import { AdminMetrics, AdminUsersResponse, UpdateUserStatusPayload } from "@/types/adminTypes";

export interface AdminUsersFilterParams {
  searchTerm?: string;
  status?: string;
  plan?: number;
  subscriptionStatus?: string;
  fromDate?: string;
  toDate?: string;
  pageIndex?: number;
  pageSize?: number;
}

export const fetchAdminMetrics = async (params?: { fromDate?: string; toDate?: string }): Promise<AdminMetrics> => {
  const query = new URLSearchParams();
  if (params?.fromDate) query.append("fromDate", params.fromDate);
  if (params?.toDate) query.append("toDate", params.toDate);

  const response = await axiosInstance.get(`/admin/metrics?${query.toString()}`);
  return response.data;
};

export const fetchAdminUsers = async (params?: AdminUsersFilterParams): Promise<AdminUsersResponse> => {
  const query = new URLSearchParams();
  if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params?.status) query.append("status", params.status);
  if (params?.plan !== undefined && params?.plan !== null) query.append("plan", params.plan.toString());
  if (params?.subscriptionStatus) query.append("subscriptionStatus", params.subscriptionStatus);
  if (params?.fromDate) query.append("fromDate", params.fromDate);
  if (params?.toDate) query.append("toDate", params.toDate);
  if (params?.pageIndex) query.append("pageIndex", params.pageIndex.toString());
  if (params?.pageSize) query.append("pageSize", params.pageSize.toString());

  const response = await axiosInstance.get(`/admin/users?${query.toString()}`);
  return response.data;
};

export const updateAdminUserStatus = async (
  userId: string,
  payload: UpdateUserStatusPayload
): Promise<void> => {
  await axiosInstance.put(`/admin/users/${userId}/status`, payload);
};

export const enableAdminUser = async (userId: string): Promise<void> => {
  await axiosInstance.patch(`/admin/users/${userId}/enable`);
};

export const disableAdminUser = async (userId: string, reason?: string): Promise<void> => {
  await axiosInstance.patch(`/admin/users/${userId}/disable`, { reason });
};

export const updateAdminSubscription = async (
  userId: string,
  payload: { plan: number; subscriptionStartDate?: string; subscriptionEndDate?: string }
): Promise<void> => {
  await axiosInstance.put(`/admin/users/${userId}/subscription`, payload);
};

export const checkSuperAdminAccess = async (): Promise<{ isSuperAdmin: boolean; organization: string }> => {
  const response = await axiosInstance.get(`/admin/check-access`);
  return response.data;
};
