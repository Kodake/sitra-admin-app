"use client";

import dynamic from "next/dynamic";
import React from "react";
import { AdminMetrics } from "@/types/adminTypes";
import { useTranslations } from "next-intl";
import "./amazon-charts.scss";

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
              color: "#94a3b8",
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["transparent"],
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
      fontFamily: "inherit",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3b82f6"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    xaxis: {
      categories: growthCategories,
      labels: {
        style: {
          fontSize: "11px",
          colors: "#94a3b8",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          colors: "#94a3b8",
        },
      },
    },
    grid: {
      borderColor: "rgba(148, 163, 184, 0.15)",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      x: { show: true },
    },
  };

  // 3. Subscription Health Donut Chart
  const healthLabels = [
    t("healthActive"),
    t("healthExpiring"),
    t("healthExpired"),
    t("healthDisabled"),
  ];
  const healthSeries = [
    metrics?.activeMemberships ?? 0,
    metrics?.expiringSoonMemberships ?? 0,
    metrics?.expiredMemberships ?? 0,
    metrics?.disabledUsers ?? 0,
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
              color: "#94a3b8",
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["transparent"],
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Growth Trend Area Chart */}
      <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">{t("growthTrend")}</h5>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{t("growthTrendDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">
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
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">{t("planDistribution")}</h5>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{t("planDistributionDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">
            <i className="fal fa-layer-group"></i>
          </span>
        </div>
        <div className="w-full h-[280px] flex items-center justify-center">
          <Chart options={planChartOptions} series={planSeries} type="donut" height="260" />
        </div>
      </div>

      {/* Subscription Health Donut */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">{t("subscriptionHealth")}</h5>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{t("subscriptionHealthDesc")}</p>
          </div>
          <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">
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
