"use client";

import React, { useEffect, useState } from "react";
import { AdminUser } from "@/types/adminTypes";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onConfirm: (newEndDate: string, newPlan?: number) => void;
  isLoading: boolean;
}

const EditSubscriptionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading,
}) => {
  const t = useTranslations("Admin.modals");
  const [endDate, setEndDate] = useState<string>("");
  const [plan, setPlan] = useState<number>(1);

  useEffect(() => {
    if (user) {
      if (user.subscriptionEndDate) {
        setEndDate(user.subscriptionEndDate.split("T")[0]);
      } else {
        // Default to 1 month from now
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setEndDate(nextMonth.toISOString().split("T")[0]);
      }
      setPlan(user.plan || 1);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleQuickExtend = (months: number) => {
    const base = endDate ? new Date(endDate) : new Date();
    base.setMonth(base.getMonth() + months);
    setEndDate(base.toISOString().split("T")[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(endDate, plan);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
            <i className="fal fa-calendar-edit"></i>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">{t("editSubTitle")}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.companyName || user.userName} ({user.email})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Plan Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {t("planLevel")}
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value={1}>{t("freePlan")}</option>
              <option value={2}>{t("standardPlan")}</option>
              <option value={3}>{t("premiumPlan")}</option>
              <option value={4}>{t("fullPlan")}</option>
            </select>
          </div>

          {/* Expiration Date */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                {t("expirationDate")}
              </label>
              <span className="text-[11px] text-slate-400">{t("quickExtend")}</span>
            </div>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
            {/* Quick buttons */}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => handleQuickExtend(1)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
              >
                {t("plus1Month")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickExtend(3)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
              >
                {t("plus3Months")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickExtend(6)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
              >
                {t("plus6Months")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickExtend(12)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
              >
                {t("plus1Year")}
              </button>
            </div>
          </div>

          <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <i className="fal fa-info-circle mr-1 text-blue-600"></i>
            {t("editSubNotice")}
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading && <i className="fal fa-spinner fa-spin"></i>}
              {t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
