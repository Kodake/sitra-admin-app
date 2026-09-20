"use client";

import React, { useState, useMemo } from "react";
import { AdminUser } from "@/types/adminTypes";
import ToggleUserStatusModal from "./ToggleUserStatusModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import { useAdminUsers } from "@/hooks/admin/useAdmin";
import { useTranslations } from "next-intl";
import DynamicTable from "@/components/shared/table/DynamicTable";
import { TableColumn } from "@/components/shared/table/TableTypes";
import { MenuItem } from "@mui/material";

const AdminUsersTable: React.FC = () => {
  const t = useTranslations("Admin.users");
  const g = useTranslations("General");
  const tAdmin = useTranslations("Admin");

  const [searchInput, setSearchInput] = useState<string>("");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("companyName");

  const {
    users,
    totalCount,
    pageIndex,
    pageSize,
    isLoading,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    plan,
    setPlan,
    subscriptionStatus,
    setSubscriptionStatus,
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
    isUpdating,
    refetch,
  } = useAdminUsers();

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelected = users.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (id: string | number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string | number) => selected.indexOf(id) !== -1;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    return [...users].sort((a: any, b: any) => {
      let aVal = a[orderBy];
      let bVal = b[orderBy];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal === undefined || aVal === null) aVal = "";
      if (bVal === undefined || bVal === null) bVal = "";

      if (order === "asc") {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  }, [users, order, orderBy]);

  const getPlanBadgeClass = (planName: string) => {
    switch (planName?.toLowerCase()) {
      case "full":
        return "badge-stroke badge-primary";
      case "premium":
        return "badge-stroke badge-teal";
      case "standard":
        return "badge-stroke badge-blue";
      default:
        return "badge-stroke badge-gray";
    }
  };

  const getSubscriptionBadge = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      return (
        <span className="badge-stroke badge-teal text-xs font-semibold">
          <i className="fa-solid fa-crown mr-1 text-[10px] text-amber-400"></i>
          {t("permanent")}
        </span>
      );
    }

    if (user.subscriptionStatus === "Expired") {
      const days = Math.abs(user.daysRemaining ?? 0);
      return (
        <span className="badge-stroke badge-danger text-xs font-semibold">
          {t("expiredBadge", { days: days > 0 ? `(-${days}d)` : "" })}
        </span>
      );
    }

    if (user.subscriptionStatus === "ExpiringSoon") {
      return (
        <span className="badge-stroke badge-warning text-xs font-semibold">
          {t("expiresInBadge", { days: user.daysRemaining })}
        </span>
      );
    }

    return (
      <span className="badge-stroke badge-success text-xs font-semibold">
        {t("activeBadge", {
          days:
            user.daysRemaining !== null && user.daysRemaining !== undefined
              ? `(${user.daysRemaining}d)`
              : "",
        })}
      </span>
    );
  };

  const columns: TableColumn<AdminUser>[] = [
    {
      id: "companyName",
      label: t("colCompanyUser") || "Nombre / Razón Social",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
              row.isSuperAdmin
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            }`}
          >
            {row.isSuperAdmin ? (
              <i className="fa-solid fa-crown text-amber-400 text-xs"></i>
            ) : (
              (row.companyName?.[0] || row.userName?.[0] || "U").toUpperCase()
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {row.companyName || row.userName}
              </span>
              {row.isSuperAdmin && (
                <span className="badge-stroke badge-blue text-[10px] font-bold">
                  SUPERADMIN
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              {row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "rucNumber",
      label: t("colRucContact") || "RNC & Contacto",
      sortable: true,
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium">
            RNC:{" "}
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {row.rucNumber || g("notApply")}
            </span>
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {row.phoneNumber || row.municipality || "—"}
          </span>
        </div>
      ),
    },
    {
      id: "planName",
      label: t("colPlan") || "Plan",
      sortable: true,
      render: (row) => (
        <span className={`${getPlanBadgeClass(row.planName)} text-xs font-semibold`}>
          {row.planName || "Free"}
        </span>
      ),
    },
    {
      id: "subscriptionEndDate",
      label: t("colSubPeriod") || "Periodo Suscripción",
      sortable: true,
      render: (row) =>
        row.isSuperAdmin ? (
          <span className="text-slate-400 dark:text-slate-500 text-xs italic">
            {t("unlimited")}
          </span>
        ) : row.subscriptionEndDate ? (
          <div className="flex flex-col">
            <span className="text-slate-700 dark:text-slate-200 text-xs font-semibold">
              {t("to")} {row.subscriptionEndDate.split("T")[0]}
            </span>
            {row.subscriptionStartDate && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {t("from")} {row.subscriptionStartDate.split("T")[0]}
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 text-xs italic">
            {t("notSpecified")}
          </span>
        ),
    },
    {
      id: "subscriptionStatus",
      label: t("colSubHealth") || "Salud Suscripción",
      sortable: true,
      render: (row) => getSubscriptionBadge(row),
    },
    {
      id: "status",
      label: g("status") || "Estatus",
      sortable: true,
      render: (row) =>
        row.isSuperAdmin ? (
          <span className="badge-stroke badge-success text-xs font-semibold">
            {t("alwaysActive") || g("activated")}
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatusClick(row);
            }}
            title={row.isActive ? t("clickToDisable") : t("clickToEnable")}
            className="cursor-pointer transition-transform active:scale-95"
          >
            {row.isActive ? (
              <span className="badge-stroke badge-success text-xs font-semibold">
                {g("activated")}
              </span>
            ) : (
              <span className="badge-stroke badge-danger text-xs font-semibold">
                {g("deactivated")}
              </span>
            )}
          </button>
        ),
    },
    { id: "action", label: g("action") || "Acciones" },
  ];

  return (
    <>
      <div className="inventual-content-area px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-20 sm:mb-10">
        {/* Top Header Card - POS Style */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Icon & Module Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 dark:border dark:border-slate-700/80 flex items-center justify-center shadow-md shadow-slate-900/15 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {tAdmin("usersSubtitle") || "Control de Cuentas"}
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {t("directoryDesc") || "Directorio general de empresas, suscripciones y supervisión de accesos"}
                </p>
              </div>
            </div>

            {/* Right: Search Box & Refresh Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Box */}
              <div className="relative min-w-[220px] sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setSearchTerm(e.target.value);
                    setPageIndex(1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchTerm(searchInput);
                      setPageIndex(1);
                    }
                  }}
                  placeholder={g("search") || "Buscar..."}
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 dark:focus:border-slate-400 dark:focus:ring-white/10 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all shadow-inner"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearchTerm("");
                      setPageIndex(1);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <i className="fa-regular fa-xmark text-sm"></i>
                  </button>
                )}
              </div>

              {/* Refresh / Action Button */}
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md shadow-slate-900/15 dark:shadow-none active:scale-95 transition-all whitespace-nowrap"
                title={t("reloadList")}
              >
                <i
                  className={`fa-regular fa-rotate ${
                    isLoading ? "fa-spin" : ""
                  } text-base`}
                ></i>
                <span>{g("refresh") || t("reloadList") || "Recargar"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Filters strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Account Status */}
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPageIndex(1);
                }}
                className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 cursor-pointer transition-all"
              >
                <option value="all">{t("statusAll")}</option>
                <option value="active">{t("statusActive")}</option>
                <option value="disabled">{t("statusDisabled")}</option>
              </select>

              {/* Plan */}
              <select
                value={plan ?? ""}
                onChange={(e) => {
                  setPlan(e.target.value ? Number(e.target.value) : undefined);
                  setPageIndex(1);
                }}
                className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 cursor-pointer transition-all"
              >
                <option value="">{t("planAll")}</option>
                <option value="1">Free</option>
                <option value="2">Standard</option>
                <option value="3">Premium</option>
                <option value="4">Full</option>
              </select>

              {/* Subscription Status */}
              <select
                value={subscriptionStatus}
                onChange={(e) => {
                  setSubscriptionStatus(e.target.value);
                  setPageIndex(1);
                }}
                className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 cursor-pointer transition-all"
              >
                <option value="all">{t("subAll")}</option>
                <option value="active">{t("subActive")}</option>
                <option value="expiringSoon">{t("subExpiring")}</option>
                <option value="expired">{t("subExpired")}</option>
              </select>

              {/* Clear filters button */}
              {(searchTerm ||
                status !== "all" ||
                plan !== undefined ||
                subscriptionStatus !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    setSearchInput("");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50 text-xs font-semibold transition-all"
                >
                  <i className="fa-regular fa-xmark text-xs"></i>
                  <span>{t("clearFilters")}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-600 dark:text-slate-300">
                {t("totalCompanies", { count: totalCount })}
              </span>
            </div>
          </div>

          {/* Dynamic Table with rounded-2xl container */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <DynamicTable<AdminUser>
              rows={sortedRows}
              columns={columns}
              actions={{
                shouldShowActions: (row) => !row.isSuperAdmin,
                customActions: (row, popupState) => (
                  <>
                    <MenuItem
                      key="membership-action"
                      onClick={() => {
                        handleEditSubscriptionClick(row);
                        popupState.close();
                      }}
                    >
                      <i className="fa-regular fa-calendar-pen mr-2 text-primary"></i>
                      {t("membershipBtn")}
                    </MenuItem>
                    <MenuItem
                      key="toggle-status-action"
                      onClick={() => {
                        handleToggleStatusClick(row);
                        popupState.close();
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          row.isActive
                            ? "fa-user-slash text-rose-500"
                            : "fa-user-check text-emerald-500"
                        } mr-2`}
                      ></i>
                      {row.isActive ? t("disableTooltip") : t("enableTooltip")}
                    </MenuItem>
                  </>
                ),
              }}
              pagination={{
                page: pageIndex - 1,
                rowsPerPage: pageSize,
                totalCount: totalCount,
                onPageChange: (_e, newPage) => setPageIndex(newPage + 1),
                onRowsPerPageChange: (e) => {
                  setPageSize(parseInt(e.target.value, 10));
                  setPageIndex(1);
                },
              }}
              sorting={{
                order,
                orderBy,
                onRequestSort: handleRequestSort,
              }}
              selection={{
                selected,
                onSelectAll: handleSelectAllClick,
                onSelect: handleSelectRow,
                isSelected,
              }}
              t_g={g}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ToggleUserStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        user={selectedUser}
        onConfirm={confirmStatusToggle}
        isLoading={isUpdating}
      />

      <EditSubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        user={selectedUser}
        onConfirm={confirmSubscriptionUpdate}
        isLoading={isUpdating}
      />
    </>
  );
};

export default AdminUsersTable;
