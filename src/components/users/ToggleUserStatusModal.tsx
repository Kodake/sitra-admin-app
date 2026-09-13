"use client";

import React from "react";
import { AdminUser } from "@/types/adminTypes";

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
  if (!isOpen || !user) return null;

  const isDisabling = user.isActive;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
              isDisabling ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <i className={`fal ${isDisabling ? "fa-user-slash" : "fa-user-check"}`}></i>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              {isDisabling ? "¿Deshabilitar Usuario?" : "¿Habilitar Usuario?"}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirmación de control de acceso
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex flex-col gap-2 text-xs text-slate-600">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Empresa / Usuario:</span>
            <span className="font-bold text-slate-800">{user.companyName || user.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Correo Electrónico:</span>
            <span className="text-slate-800">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">RUC:</span>
            <span className="text-slate-800">{user.rucNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Plan Actual:</span>
            <span className="font-semibold text-blue-600">{user.planName}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          {isDisabling ? (
            <span className="text-rose-700 font-medium">
              <i className="fal fa-exclamation-triangle mr-1"></i>
              Al deshabilitar este usuario, su acceso al sistema SITRA quedará bloqueado inmediatamente. Útil si su suscripción ha terminado o si requiere verificación de pago.
            </span>
          ) : (
            <span className="text-emerald-700 font-medium">
              <i className="fal fa-check-circle mr-1"></i>
              Al habilitar este usuario, podrá iniciar sesión nuevamente con sus credenciales y operar normalmente.
            </span>
          )}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50 ${
              isDisabling
                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
            }`}
          >
            {isLoading && <i className="fal fa-spinner fa-spin"></i>}
            {isDisabling ? "Confirmar y Deshabilitar" : "Confirmar y Habilitar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleUserStatusModal;
