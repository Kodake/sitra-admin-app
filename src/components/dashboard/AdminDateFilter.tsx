"use client";

import React from "react";

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
  const presets = [
    { id: "all", label: "Todo" },
    { id: "today", label: "Hoy" },
    { id: "last7Days", label: "7 Días" },
    { id: "thisMonth", label: "Este Mes" },
    { id: "last30Days", label: "30 Días" },
    { id: "yearToDate", label: "Este Año" },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Info */}
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-base font-bold text-slate-800">Métricas y Auditoría de Plataforma</h4>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            SISTRA SRL SuperAdmin
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Filtre métricas por periodo para evaluar suscripciones vigentes, vencidas y estado de cuentas.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Preset pill buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPresetChange(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                datePreset === p.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Date Inputs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1.5">Desde:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1.5">Hasta:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
          title="Actualizar datos"
        >
          <i className={`fal fa-sync-alt ${isLoading ? "fa-spin text-blue-600" : ""}`}></i>
        </button>
      </div>
    </div>
  );
};

export default AdminDateFilter;
