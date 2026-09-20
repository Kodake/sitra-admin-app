"use client";

import { useNotifications } from "@/contextApi/NotificationContext";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface NotificationDropdownProps {
  onClose?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, removeNotification, clearAll } = useNotifications();
  const t = useTranslations("Header");

  // Tick every second so relative elapsed time ("Ahora mismo", "hace 4s") refreshes live
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRelativeTime = (createdAt: number) => {
    const diffSec = Math.max(0, Math.floor((Date.now() - createdAt) / 1000));
    if (diffSec < 2) return t("justNow") || "Ahora mismo";
    return `hace ${diffSec}s`;
  };

  const getSeverityMeta = (type: string) => {
    switch (type) {
      case "error":
        return {
          icon: "fa-solid fa-circle-xmark",
          bg: "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
          barColor: "bg-red-500",
        };
      case "success":
        return {
          icon: "fa-solid fa-circle-check",
          bg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
          barColor: "bg-emerald-500",
        };
      case "warning":
        return {
          icon: "fa-solid fa-triangle-exclamation",
          bg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
          barColor: "bg-amber-500",
        };
      case "info":
      default:
        return {
          icon: "fa-solid fa-circle-info",
          bg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
          barColor: "bg-blue-500",
        };
    }
  };

  const renderMessage = (content: any) => {
    if (typeof content === "function") {
      try {
        return content({ closeToast: () => {}, toastProps: {} as any, data: {} });
      } catch {
        return "";
      }
    }
    if (typeof content === "string" || typeof content === "number") {
      return content;
    }
    if (React.isValidElement(content)) {
      return content;
    }
    if (typeof content === "object" && content !== null) {
      return content.message || content.title || JSON.stringify(content);
    }
    return String(content ?? "");
  };

  return (
    <div className="flex flex-col w-full text-slate-800 dark:text-slate-100 font-sans">
      {/* ── Dropdown Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {t("notifications") || "Notificaciones"}
          </span>
          {notifications.length > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {notifications.length}
            </span>
          )}
        </div>

        {notifications.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-[11px] font-semibold text-slate-400 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <i className="fal fa-trash-alt text-[10px]"></i>
            {t("clearAll") || "Limpiar todo"}
          </button>
        )}
      </div>

      {/* ── Dropdown Body ── */}
      <div className="max-h-[350px] overflow-y-auto">
        {notifications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
              <i className="fal fa-bell-slash text-xl"></i>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t("noNotifications") || "No hay notificaciones"}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[220px]">
              {t("noNotificationsDesc") ||
                "Las alertas recientes aparecerán aquí durante 10 segundos."}
            </p>
          </div>
        ) : (
          /* Notification List */
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.map((item) => {
              const meta = getSeverityMeta(item.type);
              const elapsedSec = Math.max(0, (Date.now() - item.createdAt) / 1000);
              const remainingSec = Math.max(0, 10 - elapsedSec);

              return (
                <div
                  key={item.id}
                  className="relative p-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors flex items-start gap-3 group"
                >
                  {/* Severity Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${meta.bg}`}
                  >
                    <i className={meta.icon}></i>
                  </div>

                  {/* Message & Meta */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug break-words">
                      {renderMessage(item.message)}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-medium">
                        <i className="fal fa-clock text-[9px]"></i>
                        {getRelativeTime(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Dismiss Single Notification Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all rounded hover:bg-slate-200/50 dark:hover:bg-slate-700"
                    title={t("dismiss") || "Descartar"}
                  >
                    <i className="fal fa-times text-xs"></i>
                  </button>

                  {/* 10s Countdown Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100 dark:bg-slate-800 overflow-hidden pointer-events-none">
                    <div
                      className={`h-full ${meta.barColor} notification-countdown-bar opacity-40`}
                      style={{
                        animationDuration: "10s",
                        animationDelay: `-${elapsedSec}s`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Dropdown Footer ── */}
      <div className="px-4 py-2 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 text-center text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
        <i className="fal fa-stopwatch text-[9px]"></i>
        <span>{t("autoExpireNotice") || "Las alertas expiran automáticamente en 10s"}</span>
      </div>
    </div>
  );
};

export default NotificationDropdown;
