"use client";

import dynamic from "next/dynamic";
import React from "react";
import { AdminMetrics } from "@/types/adminTypes";
import { useTranslations } from "next-intl";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  metrics?: AdminMetrics;
}

const AdminCharts: React.FC<Props> = ({ metrics }) => {
  const t = useTranslations("Admin.charts");

  // 1. Plan Distribution Donut Chart
  const planLabels = ["Free", "Standard", "Premium", "Full"];
  const planSeries = [
    metrics?.planDistribution?.["Free"] ?? 0,
    metrics?.planDistribution?.["Standard"] ?? 0,
    metrics?.planDistribution?.["Premium"] ?? 0,
    metrics?.planDistribution?.["Full"] ?? 0,
  ];

  const planChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: planLabels,
    colors: ["#64748b", "#3b82f6", "#8b5cf6", "#f59e0b"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      markers: { radius: 12 },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: t("plansDonutLabel"),
              fontSize: "13px",
              fontWeight: 600,
              color: "#64748b",
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["#ffffff"],
    },
  };

  // 2. Growth Trends Area Chart
  const growthCategories = metrics?.growthTrends?.map((g) => g.period) || [
    "Mes 1",
    "Mes 2",
    "Mes 3",
    "Mes 4",
    "Mes 5",
    "Mes 6",
  ];
  const growthSeriesData = metrics?.growthTrends?.map((g) => g.count) || [0, 0, 0, 0, 0, 0];

  const growthChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    colors: ["#2563eb"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: growthCategories,
      labels: {
        style: { fontSize: "11px", colors: "#94a3b8" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "11px", colors: "#94a3b8" },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
    },
  };

  // 3. Subscription Health Donut
  const healthSeries = [
    metrics?.activeMemberships ?? 0,
    metrics?.expiringSoonMemberships ?? 0,
    metrics?.expiredMemberships ?? 0,
    metrics?.disabledUsers ?? 0,
  ];
  const healthLabels = [
    t("healthActive"),
    t("healthExpiring"),
    t("healthExpired"),
    t("healthDisabled"),
  ];

  const healthChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: healthLabels,
    colors: ["#10b981", "#f59e0b", "#ef4444", "#64748b"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      markers: { radius: 12 },
    },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: t("totalAccountsLabel"),
              fontSize: "12px",
              fontWeight: 600,
              color: "#64748b",
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["#ffffff"],
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Growth Trend Area Chart */}
      <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-bold text-slate-800">{t("growthTrend")}</h5>
            <p className="text-xs text-slate-400 mt-0.5">{t("growthTrendDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
            <i className="fal fa-chart-area"></i>
          </span>
        </div>
        <div className="w-full h-[280px]">
          <Chart
            options={growthChartOptions}
            series={[{ name: t("newCompaniesSeries"), data: growthSeriesData }]}
            type="area"
            height="100%"
          />
        </div>
      </div>

      {/* Plan Distribution Donut */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-bold text-slate-800">{t("planDistribution")}</h5>
            <p className="text-xs text-slate-400 mt-0.5">{t("planDistributionDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
            <i className="fal fa-layer-group"></i>
          </span>
        </div>
        <div className="w-full h-[280px] flex items-center justify-center">
          <Chart options={planChartOptions} series={planSeries} type="donut" height="260" />
        </div>
      </div>

      {/* Subscription Health Donut */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-bold text-slate-800">{t("subscriptionHealth")}</h5>
            <p className="text-xs text-slate-400 mt-0.5">{t("subscriptionHealthDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
            <i className="fal fa-heartbeat"></i>
          </span>
        </div>
        <div className="w-full h-[280px] flex items-center justify-center">
          <Chart options={healthChartOptions} series={healthSeries} type="donut" height="260" />
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
