"use client";

import useAuths from "@/hooks/auth/useAuths";
import { useTranslations } from "next-intl";
import Link from 'next/link';

const ForgotPasswordFrom = () => {
    const tAdmin = useTranslations("Admin");
    const {
        t,
        register,
        handleSubmit,
        onSubmitForgot,
        errors,
        isBtnDisable,
    } = useAuths("forgot");

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px]">
            <h2 className="text-center text-2xl font-semibold mb-2 tracking-tight">{t("forgotPasswordTitle")}</h2>
            <p className="text-center text-slate-500 mb-8 text-[15px] leading-relaxed">
                {t("forgotPasswordSubtitle")}
            </p>

            <form onSubmit={handleSubmit(onSubmitForgot)} noValidate className="flex flex-col gap-5">
                
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide px-1">
                        {t("email")}
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        {...register("email")}
                        placeholder={t("emailPlaceholder") || "ej. qa@gmail.com"} 
                        autoComplete="off" 
                        className={`w-full px-4 py-3.5 rounded-xl border-none bg-slate-100/70 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-slate-400 text-[15px] shadow-sm ${
                            errors.email ? "ring-2 ring-red-500/50 bg-red-50/50" : ""
                        }`}
                        required
                    />
                    {errors.email && <small className="text-rose-500 text-[13px] mt-1 font-medium px-1">{errors.email.message}</small>}
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isBtnDisable} 
                    className="w-full mt-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all text-[15px] flex items-center justify-center gap-2"
                >
                    {isBtnDisable ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {tAdmin("sending")}
                        </>
                    ) : t("sendResetLink")}
                </button>
            </form>

            <div className="mt-8 text-center">
                <span className="text-slate-500 text-[15px]">
                    {t("backToLogin")}{" "}
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                        {t("logIn")}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default ForgotPasswordFrom;
