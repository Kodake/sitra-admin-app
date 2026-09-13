"use client";

import Link from "next/link";
import React from "react";
import { AdminMetrics } from "@/types/adminTypes";

interface Props {
  metrics?: AdminMetrics;
}

const ExpiringAlertBanner: React.FC<Props> = ({ metrics }) => {
  const expiringCount = metrics?.expiringSoonMemberships ?? 0;
  const expiredCount = metrics?.expiredMemberships ?? 0;

  if (expiringCount === 0 && expiredCount === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
          <i className="fal fa-bell-exclamation"></i>
        </div>
        <div>
          <h5 className="text-sm font-bold text-slate-800">
            Atención: Verificación de Suscripciones Pendiente
          </h5>
          <p className="text-xs text-slate-600 mt-0.5">
            Hay <strong className="text-amber-700">{expiringCount}</strong> membresía(s) por vencer en los próximos 15 días y <strong className="text-rose-700">{expiredCount}</strong> vencida(s). Puede habilitar o deshabilitar usuarios manualmente según su confirmación de pago.
          </p>
        </div>
      </div>

      <Link
        href="/users?subscriptionStatus=expiringSoon"
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shadow-sm"
      >
        Gestionar Usuarios <i className="fal fa-arrow-right ml-1"></i>
      </Link>
    </div>
  );
};

export default ExpiringAlertBanner;
