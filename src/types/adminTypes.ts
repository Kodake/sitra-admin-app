export interface GrowthTrendItem {
  period: string;
  count: number;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
  activeMemberships: number;
  expiringSoonMemberships: number;
  expiredMemberships: number;
  recentRegistrations: number;
  planDistribution: Record<string, number>;
  growthTrends: GrowthTrendItem[];
}

export interface AdminUser {
  id: string;
  email: string;
  userName: string;
  companyName?: string;
  rucNumber?: string;
  phoneNumber?: string;
  address?: string;
  province?: string;
  municipality?: string;
  tenantId: string;
  plan: number;
  planName: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  daysRemaining?: number;
  subscriptionStatus: "Active" | "ExpiringSoon" | "Expired" | "SuperAdmin" | string;
  isActive: boolean;
  lockoutEnd?: string;
  isOwner: boolean;
  isSuperAdmin: boolean;
}

export interface AdminUsersResponse {
  items: AdminUser[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

export interface UpdateUserStatusPayload {
  isActive: boolean;
  subscriptionEndDate?: string;
  plan?: number;
}
