"use client";

import React from "react";
import AdminDateFilter from "./AdminDateFilter";
import AdminMetricCards from "./AdminMetricCards";
import AdminCharts from "./AdminCharts";
import ExpiringAlertBanner from "./ExpiringAlertBanner";
import { useAdminMetrics } from "@/hooks/admin/useAdmin";
import Link from "next/link";

const AdminDashboardMain: React.FC = () => {
  const {
    metrics,
    isLoading,
    refetch,
    datePreset,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    handlePresetChange,
  } = useAdminMetrics();

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8 mb-10 flex flex-col gap-6">
      {/* 1. Date Range and Filters Bar */}
      <AdminDateFilter
        datePreset={datePreset}
        fromDate={fromDate}
        toDate={toDate}
        onPresetChange={handlePresetChange}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onRefresh={refetch}
        isLoading={isLoading}
      />

      {/* 2. Alert Banner for Expiring/Expired Subscriptions */}
      <ExpiringAlertBanner metrics={metrics} />

      {/* 3. Metric KPI Cards */}
      <AdminMetricCards metrics={metrics} isLoading={isLoading} />

      {/* 4. Interactive Visualizations & Analytics */}
      <AdminCharts metrics={metrics} />

      {/* 5. Quick Navigation Action Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl text-blue-300">
            <i className="fal fa-users-crown"></i>
          </div>
          <div>
            <h4 className="text-lg font-bold">Control Central de Usuarios y Membresías</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Habilite o deshabilite cuentas manualmente, verifique comprobantes de suscripción y gestione fechas de expiración de cada empresa registrada.
            </p>
          </div>
        </div>
        <Link
          href="/users"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-blue-500/25 whitespace-nowrap flex items-center gap-2"
        >
          <i className="fal fa-sliders-h"></i> Abrir Panel de Usuarios
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
