"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  AdminUsersFilterParams,
  fetchAdminMetrics,
  fetchAdminUsers,
  updateAdminUserStatus,
} from "@/services/admin/adminServices";
import { AdminUser, UpdateUserStatusPayload } from "@/types/adminTypes";

export const useAdminMetrics = () => {
  const [datePreset, setDatePreset] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const handlePresetChange = (preset: string) => {
    setDatePreset(preset);
    const now = new Date();

    if (preset === "all") {
      setFromDate("");
      setToDate("");
    } else if (preset === "today") {
      const todayStr = now.toISOString().split("T")[0];
      setFromDate(todayStr);
      setToDate(todayStr);
    } else if (preset === "last7Days") {
      const past = new Date();
      past.setDate(now.getDate() - 7);
      setFromDate(past.toISOString().split("T")[0]);
      setToDate(now.toISOString().split("T")[0]);
    } else if (preset === "last30Days") {
      const past = new Date();
      past.setDate(now.getDate() - 30);
      setFromDate(past.toISOString().split("T")[0]);
      setToDate(now.toISOString().split("T")[0]);
    } else if (preset === "thisMonth") {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      setFromDate(firstDay.toISOString().split("T")[0]);
      setToDate(now.toISOString().split("T")[0]);
    } else if (preset === "yearToDate") {
      const firstDay = new Date(now.getFullYear(), 0, 1);
      setFromDate(firstDay.toISOString().split("T")[0]);
      setToDate(now.toISOString().split("T")[0]);
    }
  };

  const {
    data: metrics,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["adminMetrics", fromDate, toDate],
    () => fetchAdminMetrics({ fromDate: fromDate || undefined, toDate: toDate || undefined }),
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    }
  );

  return {
    metrics,
    isLoading,
    isError,
    refetch,
    datePreset,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    handlePresetChange,
  };
};

export const useAdminUsers = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [plan, setPlan] = useState<number | undefined>(undefined);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modals state
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

  const queryParams: AdminUsersFilterParams = {
    searchTerm: searchTerm || undefined,
    status: status !== "all" ? status : undefined,
    plan: plan !== undefined ? plan : undefined,
    subscriptionStatus: subscriptionStatus !== "all" ? subscriptionStatus : undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    pageIndex,
    pageSize,
  };

  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["adminUsers", queryParams], () => fetchAdminUsers(queryParams), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const updateStatusMutation = useMutation(
    ({ userId, payload }: { userId: string; payload: UpdateUserStatusPayload }) =>
      updateAdminUserStatus(userId, payload),
    {
      onSuccess: () => {
        toast.success("Estado del usuario actualizado exitosamente");
        queryClient.invalidateQueries(["adminUsers"]);
        queryClient.invalidateQueries(["adminMetrics"]);
        setIsStatusModalOpen(false);
        setSelectedUser(null);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.detail || err?.response?.data || "Error al actualizar el estado del usuario";
        toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
      },
    }
  );

  const updateSubscriptionMutation = useMutation(
    ({ userId, payload }: { userId: string; payload: UpdateUserStatusPayload }) =>
      updateAdminUserStatus(userId, payload),
    {
      onSuccess: () => {
        toast.success("Membresía y suscripción actualizadas exitosamente");
        queryClient.invalidateQueries(["adminUsers"]);
        queryClient.invalidateQueries(["adminMetrics"]);
        setIsSubModalOpen(false);
        setSelectedUser(null);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.detail || err?.response?.data || "Error al actualizar la suscripción";
        toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
      },
    }
  );

  const handleToggleStatusClick = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      toast.warning("La cuenta SuperAdmin SISTRA SRL no puede ser deshabilitada.");
      return;
    }
    setSelectedUser(user);
    setIsStatusModalOpen(true);
  };

  const handleEditSubscriptionClick = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      toast.info("La cuenta SuperAdmin SISTRA SRL tiene membresía permanente ilimitada.");
      return;
    }
    setSelectedUser(user);
    setIsSubModalOpen(true);
  };

  const confirmStatusToggle = () => {
    if (!selectedUser) return;
    updateStatusMutation.mutate({
      userId: selectedUser.id,
      payload: {
        isActive: !selectedUser.isActive,
      },
    });
  };

  const confirmSubscriptionUpdate = (newEndDate: string, newPlan?: number) => {
    if (!selectedUser) return;
    updateSubscriptionMutation.mutate({
      userId: selectedUser.id,
      payload: {
        isActive: selectedUser.isActive,
        subscriptionEndDate: newEndDate || undefined,
        plan: newPlan,
      },
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatus("all");
    setPlan(undefined);
    setSubscriptionStatus("all");
    setFromDate("");
    setToDate("");
    setPageIndex(1);
  };

  return {
    users: usersData?.items || [],
    totalCount: usersData?.totalCount || 0,
    pageIndex,
    pageSize,
    isLoading,
    isError,
    refetch,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    plan,
    setPlan,
    subscriptionStatus,
    setSubscriptionStatus,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setPageIndex,
    setPageSize,
    resetFilters,
    // Modals
    selectedUser,
    isStatusModalOpen,
    setIsStatusModalOpen,
    isSubModalOpen,
    setIsSubModalOpen,
    handleToggleStatusClick,
    handleEditSubscriptionClick,
    confirmStatusToggle,
    confirmSubscriptionUpdate,
    isUpdating: updateStatusMutation.isLoading || updateSubscriptionMutation.isLoading,
  };
};
