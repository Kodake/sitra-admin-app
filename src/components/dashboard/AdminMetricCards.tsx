"use client";

import { AdminMetrics } from "@/types/adminTypes";
import React from "react";

interface Props {
  metrics?: AdminMetrics;
  isLoading: boolean;
}

const AdminMetricCards: React.FC<Props> = ({ metrics, isLoading }) => {
  const cards = [
    {
      id: "total",
      title: "Total de Usuarios",
      value: metrics?.totalUsers ?? 0,
      subtitle: "Empresas registradas",
      gradient: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50/70",
      textColor: "text-blue-600",
      icon: "fal fa-users",
    },
    {
      id: "active",
      title: "Usuarios Activos",
      value: metrics?.activeUsers ?? 0,
      subtitle: "Con acceso habilitado",
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50/70",
      textColor: "text-emerald-600",
      icon: "fal fa-user-check",
    },
    {
      id: "disabled",
      title: "Usuarios Deshabilitados",
      value: metrics?.disabledUsers ?? 0,
      subtitle: "Acceso bloqueado",
      gradient: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50/70",
      textColor: "text-rose-600",
      icon: "fal fa-user-slash",
    },
    {
      id: "memberships",
      title: "Membresías Activas",
      value: metrics?.activeMemberships ?? 0,
      subtitle: "Planes vigentes",
      gradient: "from-violet-600 to-purple-700",
      bgLight: "bg-purple-50/70",
      textColor: "text-purple-600",
      icon: "fal fa-id-card",
    },
    {
      id: "expiring",
      title: "Suscripciones por Vencer",
      value: metrics?.expiringSoonMemberships ?? 0,
      subtitle: "Próximos 15 días",
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50/70",
      textColor: "text-amber-600",
      icon: "fal fa-clock",
      badge: metrics?.expiringSoonMemberships ? "Atención" : undefined,
    },
    {
      id: "expired",
      title: "Membresías Vencidas",
      value: metrics?.expiredMemberships ?? 0,
      subtitle: "Requieren renovación",
      gradient: "from-slate-700 to-slate-900",
      bgLight: "bg-slate-100",
      textColor: "text-slate-700",
      icon: "fal fa-calendar-times",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Top accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {card.title}
            </span>
            <div className={`w-9 h-9 rounded-xl ${card.bgLight} ${card.textColor} flex items-center justify-center text-base transition-transform group-hover:scale-110`}>
              <i className={card.icon}></i>
            </div>
          </div>

          <div className="my-1">
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-200 animate-pulse rounded"></div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800 tracking-tight">
                  {card.value}
                </span>
                {card.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    {card.badge}
                  </span>
                )}
              </div>
            )}
            <p className="text-[12px] text-slate-400 mt-1">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMetricCards;
