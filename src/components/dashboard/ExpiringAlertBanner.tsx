"use client";

import Link from "next/link";
import React from "react";
import { AdminMetrics } from "@/types/adminTypes";
import { useTranslations } from "next-intl";

interface Props {
  metrics?: AdminMetrics;
}

const ExpiringAlertBanner: React.FC<Props> = ({ metrics }) => {
  const t = useTranslations("Admin");
  const expiringCount = metrics?.expiringSoonMemberships ?? 0;
  const expiredCount = metrics?.expiredMemberships ?? 0;

  if (expiringCount === 0 && expiredCount === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/40 dark:border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
          <i className="fal fa-bell-exclamation"></i>
        </div>
        <div>
          <h5 className="text-sm font-bold text-slate-800 dark:text-white">
            {t("alertBannerTitle")}
          </h5>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {t("alertBannerDesc", { expiring: expiringCount, expired: expiredCount })}
          </p>
        </div>
      </div>

      <Link
        href="/users?subscriptionStatus=expiringSoon"
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-xs font-semibold rounded-2xl transition-all whitespace-nowrap shadow-sm active:scale-95"
      >
        {t("manageUsers")} <i className="fal fa-arrow-right ml-1"></i>
      </Link>
    </div>
  );
};

export default ExpiringAlertBanner;
