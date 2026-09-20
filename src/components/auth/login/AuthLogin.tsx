"use client";
import useAuths from "@/hooks/auth/useAuths";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const isLocalEnv = process.env.NEXT_PUBLIC_ENV_TAG === "Local";

const AuthLogin = () => {
  const tAdmin = useTranslations("Admin");
  const {
    t,
    isBtnDisable,
    errors,
    handleSubmit,
    onSubmitLogin,
    register,
    setValue,
  } = useAuths("login");

  const [showPwd, setShowPwd] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());

    // Force Light Mode for Auth Pages
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }

    return () => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    };
  }, []);

  const togglePassword = () => {
    setShowPwd((prev) => !prev);
  };

  const fillDemo = () => {
    setValue("email", "qa@gmail.com");
    setValue("password", "Abcd-1234");
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f5f5f7] font-sans text-slate-900 overflow-hidden">
      {/* ORIGINAL-STYLE BLUE GRADIENT WITH DECORATIVE CIRCLES */}
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-[#1e73be] bg-gradient-to-br from-[#1a66a8] to-[#258ced] z-0 pointer-events-none shadow-sm">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
      </div>

      <header className="relative z-10 w-full pt-10 pb-2">
        <div className="flex justify-center">
          <div className="font-bold text-2xl tracking-tight text-white drop-shadow-md flex items-center gap-2">
            <i className="fal fa-shield-check"></i> {tAdmin("portalTitle")}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 w-full px-4 pb-10">
        {/* LOGIN CARD */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px]">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-50 text-blue-700 border border-blue-200/80 shadow-[0_1px_2px_rgba(37,99,235,0.06)] whitespace-nowrap shrink-0">
              <i className="fal fa-crown text-blue-600 text-[11px]"></i> {tAdmin("superAdminBadge")}
            </span>
          </div>
          <h2 className="text-center text-2xl font-semibold mb-2 tracking-tight">{tAdmin("loginTitle")}</h2>
          <p className="text-center text-slate-500 mb-8 text-[14px] leading-relaxed">
            {tAdmin("loginSubtitle")}
          </p>

          <form onSubmit={handleSubmit(onSubmitLogin)} noValidate className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="email" className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide">
                  {t("email")}
                </label>
                {isLocalEnv && (
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-[13px] font-semibold transition-colors flex items-center gap-1 group"
                    onClick={fillDemo}
                  >
                    <i className="fa-solid fa-bolt transition-transform group-hover:scale-110"></i> {tAdmin("demoBtn")}
                  </button>
                )}
              </div>
              <input
                id="email"
                type="text"
                placeholder={tAdmin("emailPlaceholder")}
                {...register("email")}
                autoComplete="off"
                className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder-slate-400 text-sm sm:text-[15px] ${
                  errors.email
                    ? "border-rose-300 ring-4 ring-rose-500/10 bg-rose-50/30"
                    : "shadow-inner"
                }`}
              />
              {errors.email && (
                <small className="text-rose-500 text-[13px] mt-1 font-medium px-1">
                  {errors.email.message}
                </small>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide">
                  {t("password")}
                </label>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-[13px] font-semibold transition-colors flex items-center gap-1 group"
                  onClick={togglePassword}
                >
                  <i className={`fa-regular ${showPwd ? "fa-eye-slash" : "fa-eye"} transition-transform group-hover:scale-110`}></i>{" "}
                  {showPwd ? t("hidePassword") : t("showPassword")}
                </button>
              </div>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                autoComplete="off"
                className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder-slate-400 text-sm sm:text-[15px] ${
                  errors.password
                    ? "border-rose-300 ring-4 ring-rose-500/10 bg-rose-50/30"
                    : "shadow-inner"
                }`}
              />
              {errors.password && (
                <small className="text-rose-500 text-[13px] mt-1 font-medium px-1">
                  {errors.password.message}
                </small>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 mt-1 gap-3 sm:gap-0">
              <label className="flex items-center gap-2.5 text-slate-500 text-[15px] cursor-pointer hover:text-slate-700 transition-colors">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-colors"
                />
                {t("rememberMe")}
              </label>
              <Link href="/forgot" className="text-blue-600 hover:text-blue-800 text-[15px] font-semibold transition-colors text-left">
                {t("forgotPassword")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBtnDisable}
              className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-[15px] shadow-lg shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
                />
              </svg>
              <span>{t("loginButton")}</span>
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-[13px] text-slate-400 mt-auto">
        {tAdmin("adminFooter", { year: year ?? new Date().getFullYear() })}
      </footer>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AuthLogin;
