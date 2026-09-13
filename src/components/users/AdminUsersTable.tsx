"use client";

import React from "react";
import { AdminUser } from "@/types/adminTypes";
import ToggleUserStatusModal from "./ToggleUserStatusModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import { useAdminUsers } from "@/hooks/admin/useAdmin";

const AdminUsersTable: React.FC = () => {
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
    isUpdating,
    refetch,
  } = useAdminUsers();

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const getPlanBadge = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "full":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "premium":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "standard":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getSubscriptionBadge = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <i className="fal fa-crown text-purple-500"></i> Permanente
        </span>
      );
    }

    if (user.subscriptionStatus === "Expired") {
      const days = Math.abs(user.daysRemaining ?? 0);
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <i className="fal fa-times-circle"></i> Vencida {days > 0 ? `(-${days}d)` : ""}
        </span>
      );
    }

    if (user.subscriptionStatus === "ExpiringSoon") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <i className="fal fa-exclamation-triangle"></i> Vence en {user.daysRemaining}d
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <i className="fal fa-check-circle"></i> Vigente {user.daysRemaining !== null && user.daysRemaining !== undefined ? `(${user.daysRemaining}d)` : ""}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      {/* 1. Header and Filter Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Directorio de Empresas y Usuarios</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervisión de membresías, vencimientos y control de habilitación manual
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Total: <strong className="text-slate-800">{totalCount}</strong> empresas
            </span>
            <button
              onClick={() => refetch()}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Recargar lista"
            >
              <i className="fal fa-sync-alt"></i>
            </button>
          </div>
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="relative col-span-1 sm:col-span-2">
            <i className="fal fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Buscar por Empresa, Usuario, Email o RUC..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageIndex(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          {/* Account Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPageIndex(1);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="all">Estado: Todos</option>
              <option value="active">Activos</option>
              <option value="disabled">Deshabilitados</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <select
              value={plan ?? ""}
              onChange={(e) => {
                setPlan(e.target.value ? Number(e.target.value) : undefined);
                setPageIndex(1);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="">Plan: Todos</option>
              <option value="1">Free</option>
              <option value="2">Standard</option>
              <option value="3">Premium</option>
              <option value="4">Full</option>
            </select>
          </div>

          {/* Subscription Status Filter */}
          <div>
            <select
              value={subscriptionStatus}
              onChange={(e) => {
                setSubscriptionStatus(e.target.value);
                setPageIndex(1);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="all">Suscripción: Todas</option>
              <option value="active">Vigentes</option>
              <option value="expiringSoon">Por Vencer (&le; 15d)</option>
              <option value="expired">Vencidas</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div>
            <button
              type="button"
              onClick={resetFilters}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <i className="fal fa-undo"></i> Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* 2. Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-5">Empresa / Usuario</th>
              <th className="py-3.5 px-5">RUC & Contacto</th>
              <th className="py-3.5 px-5">Plan</th>
              <th className="py-3.5 px-5">Periodo Suscripción</th>
              <th className="py-3.5 px-5">Salud Suscripción</th>
              <th className="py-3.5 px-5">Acceso al Sistema</th>
              <th className="py-3.5 px-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <i className="fal fa-spinner fa-spin text-2xl mb-2 text-blue-600 block"></i>
                  Cargando empresas y usuarios...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <i className="fal fa-user-slash text-3xl mb-2 text-slate-300 block"></i>
                  No se encontraron empresas con los filtros aplicados.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    u.isSuperAdmin ? "bg-blue-50/20" : ""
                  }`}
                >
                  {/* Empresa / Usuario */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          u.isSuperAdmin
                            ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.isSuperAdmin ? (
                          <i className="fal fa-crown"></i>
                        ) : (
                          (u.companyName?.[0] || u.userName?.[0] || "U").toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {u.companyName || u.userName}
                          </span>
                          {u.isSuperAdmin && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                              SUPERADMIN
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* RUC & Contacto */}
                  <td className="py-4 px-5">
                    <div className="text-slate-700 font-medium">
                      RUC: <span className="font-mono text-[11px]">{u.rucNumber || "N/A"}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {u.phoneNumber || u.municipality || "—"}
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getPlanBadge(
                        u.planName
                      )}`}
                    >
                      {u.planName}
                    </span>
                  </td>

                  {/* Periodo de Suscripción */}
                  <td className="py-4 px-5">
                    {u.isSuperAdmin ? (
                      <span className="text-slate-500 font-medium italic">Ilimitado</span>
                    ) : u.subscriptionEndDate ? (
                      <div>
                        <div className="text-slate-800 font-medium">
                          Hasta: {u.subscriptionEndDate.split("T")[0]}
                        </div>
                        {u.subscriptionStartDate && (
                          <div className="text-[11px] text-slate-400">
                            Desde: {u.subscriptionStartDate.split("T")[0]}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No especificado</span>
                    )}
                  </td>

                  {/* Salud de Suscripción */}
                  <td className="py-4 px-5">{getSubscriptionBadge(u)}</td>

                  {/* Estado de Cuenta */}
                  <td className="py-4 px-5">
                    {u.isSuperAdmin ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Siempre Activo
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatusClick(u)}
                          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            u.isActive ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                          title={u.isActive ? "Clic para deshabilitar" : "Clic para habilitar"}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              u.isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[11px] font-bold ${
                            u.isActive ? "text-emerald-700" : "text-rose-600"
                          }`}
                        >
                          {u.isActive ? "Activo" : "Deshabilitado"}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-5 text-right">
                    {u.isSuperAdmin ? (
                      <span className="text-slate-400 text-xs italic">Protegido</span>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEditSubscriptionClick(u)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                          title="Ajustar fecha de expiración o plan"
                        >
                          <i className="fal fa-calendar-edit"></i> Membresía
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatusClick(u)}
                          className={`p-1.5 rounded-lg transition-colors text-xs ${
                            u.isActive
                              ? "bg-rose-50 hover:bg-rose-100 text-rose-600"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                          }`}
                          title={u.isActive ? "Deshabilitar usuario" : "Habilitar usuario"}
                        >
                          <i className={`fal ${u.isActive ? "fa-user-slash" : "fa-user-check"}`}></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Mostrando página {pageIndex} de {totalPages}</span>
          <span className="text-slate-300">|</span>
          <span>
            Por página:
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(1);
              }}
              className="ml-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={pageIndex <= 1 || isLoading}
            onClick={() => setPageIndex(pageIndex - 1)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fal fa-chevron-left mr-1"></i> Anterior
          </button>
          <button
            type="button"
            disabled={pageIndex >= totalPages || isLoading}
            onClick={() => setPageIndex(pageIndex + 1)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente <i className="fal fa-chevron-right ml-1"></i>
          </button>
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
    </div>
  );
};

export default AdminUsersTable;
