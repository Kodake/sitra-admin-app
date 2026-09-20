"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  datePreset: string;
  fromDate: string;
  toDate: string;
  onPresetChange: (preset: string) => void;
  onFromDateChange: (val: string) => void;
  onToDateChange: (val: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const AdminDateFilter: React.FC<Props> = ({
  datePreset,
  fromDate,
  toDate,
  onPresetChange,
  onFromDateChange,
  onToDateChange,
  onRefresh,
  isLoading,
}) => {
  const t = useTranslations("Admin");

  const presets = [
    { id: "all", label: t("presets.all") },
    { id: "today", label: t("presets.today") },
    { id: "last7Days", label: t("presets.last7Days") },
    { id: "thisMonth", label: t("presets.thisMonth") },
    { id: "last30Days", label: t("presets.last30Days") },
    { id: "yearToDate", label: t("presets.yearToDate") },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Info */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{t("metricsAuditTitle")}</h4>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-[0_1px_2px_rgba(37,99,235,0.06)] whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            {t("superAdminBadge")}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
          {t("metricsAuditDesc")}
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Preset pill buttons */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl gap-1">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPresetChange(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                datePreset === p.id
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Date Inputs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mr-1.5">{t("from")}</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mr-1.5">{t("to")}</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
          title={t("refreshData")}
        >
          <i className={`fal fa-sync-alt ${isLoading ? "fa-spin text-blue-600 dark:text-blue-400" : ""}`}></i>
        </button>
      </div>
    </div>
  );
};

export default AdminDateFilter;
