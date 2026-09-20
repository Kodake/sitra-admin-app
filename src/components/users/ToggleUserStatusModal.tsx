"use client";

import React, { useEffect } from "react";
import { AdminUser } from "@/types/adminTypes";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const ToggleUserStatusModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading,
}) => {
  const t = useTranslations("Admin.modals");

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !user) return null;

  const isDisabling = user.isActive;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
              isDisabling 
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50" 
                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50"
            }`}
          >
            <i className={`fal ${isDisabling ? "fa-user-slash" : "fa-user-check"}`}></i>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {isDisabling ? t("disableUserTitle") : t("enableUserTitle")}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("accessControlConfirm")}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{t("companyUserLabel")}</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">{user.companyName || user.userName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{t("emailLabel")}</span>
            <span className="text-slate-800 dark:text-slate-100">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{t("rucLabel")}</span>
            <span className="text-slate-800 dark:text-slate-100">{user.rucNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{t("currentPlanLabel")}</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{user.planName}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {isDisabling ? (
            <span className="text-rose-700 dark:text-rose-400 font-medium">
              <i className="fal fa-exclamation-triangle mr-1"></i>
              {t("disableWarning")}
            </span>
          ) : (
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              <i className="fal fa-check-circle mr-1"></i>
              {t("enableWarning")}
            </span>
          )}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-2xl text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 disabled:opacity-50 ${
              isDisabling
                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
            }`}
          >
            {isLoading && <i className="fal fa-spinner fa-spin"></i>}
            {isDisabling ? t("confirmDisable") : t("confirmEnable")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleUserStatusModal;
