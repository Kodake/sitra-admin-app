"use client";

import useAuths from "@/hooks/auth/useAuths";
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

// Form implementation that uses searchParams
const ResetPasswordFormContent = () => {
    const tAdmin = useTranslations("Admin");
    const {
        t,
        register,
        handleSubmit,
        onSubmitReset,
        errors,
        isBtnDisable,
    } = useAuths("reset");
    
    const searchParams = useSearchParams();
    const email = searchParams?.get("email");
    const token = searchParams?.get("token");

    if (!email || !token) {
        return (
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px] text-center">
                <div className="text-red-500 mb-4 flex justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">{tAdmin("invalidLinkTitle")}</h2>
                <p className="text-slate-500 mb-6">
                    {tAdmin("invalidLinkDesc")}
                </p>
                <Link href="/forgot" className="block text-center w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-[15px] shadow-lg shadow-blue-500/25 active:scale-95 transition-all">
                    {tAdmin("requestNewLink")}
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px]">
            <h2 className="text-center text-2xl font-semibold mb-2 tracking-tight">{tAdmin("createNewPassword")}</h2>
            <p className="text-center text-slate-500 mb-8 text-[15px] leading-relaxed">
                {tAdmin("createNewPasswordDesc")}
            </p>

            <form onSubmit={handleSubmit(onSubmitReset)} noValidate className="flex flex-col gap-5">
                
                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide px-1">
                        {t("password")}
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        {...register("password")}
                        placeholder="••••••••" 
                        autoComplete="new-password" 
                        className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder-slate-400 text-sm sm:text-[15px] shadow-inner ${
                            errors.password ? "border-rose-300 ring-4 ring-rose-500/10 bg-rose-50/30" : ""
                        }`}
                        required
                    />
                    {errors.password && <small className="text-rose-500 text-[13px] mt-1 font-medium px-1">{errors.password.message}</small>}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirmPassword" className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide px-1">
                        {tAdmin("confirmPassword")}
                    </label>
                    <input 
                        id="confirmPassword" 
                        type="password" 
                        {...register("confirmPassword")}
                        placeholder="••••••••" 
                        autoComplete="new-password" 
                        className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder-slate-400 text-sm sm:text-[15px] shadow-inner ${
                            errors.confirmPassword ? "border-rose-300 ring-4 ring-rose-500/10 bg-rose-50/30" : ""
                        }`}
                        required
                    />
                    {errors.confirmPassword && <small className="text-rose-500 text-[13px] mt-1 font-medium px-1">{errors.confirmPassword.message}</small>}
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isBtnDisable} 
                    className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-[15px] shadow-lg shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isBtnDisable ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {tAdmin("resetting")}
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-white stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{tAdmin("resetPassword")}</span>
                        </>
                    )}
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

// Next.js requires components using useSearchParams to be wrapped in a Suspense boundary
const ResetPasswordFrom = () => {
    return (
        <Suspense fallback={
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px] h-[400px] flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        }>
            <ResetPasswordFormContent />
        </Suspense>
    );
};

export default ResetPasswordFrom;
