"use client";
import useAuths from "@/hooks/auth/useAuths";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const isLocalEnv = process.env.NEXT_PUBLIC_ENV_TAG === "Local";

const AuthLogin = () => {
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
            <i className="fal fa-shield-check"></i> SITRA ADMIN
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 w-full px-4 pb-10">
        {/* LOGIN CARD */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 w-full max-w-[420px]">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <i className="fal fa-crown text-blue-600"></i> SuperAdmin SISTRA SRL
            </span>
          </div>
          <h2 className="text-center text-2xl font-semibold mb-2 tracking-tight">Iniciar Sesión</h2>
          <p className="text-center text-slate-500 mb-8 text-[14px] leading-relaxed">
            Acceso restringido para SISTRA SRL. Monitoreo de usuarios, métricas y estado de membresías.
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
                    <i className="fal fa-bolt transition-transform group-hover:scale-110"></i> Demo
                  </button>
                )}
              </div>
              <input
                id="email"
                type="text"
                placeholder={t("emailPlaceholder") || "ej. admin@sitra.com"}
                {...register("email")}
                autoComplete="off"
                className={`w-full px-4 py-3.5 rounded-xl border-none bg-slate-100/70 focus:bg-white focus:ring-2 focus:outline-none transition-all placeholder-slate-400 text-[15px] ${
                  errors.email
                    ? "focus:ring-rose-500/30 ring-1 ring-rose-500 bg-rose-50/50"
                    : "focus:ring-blue-500/20 shadow-sm"
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
                  <i className={`fal ${showPwd ? "fa-eye-slash" : "fa-eye"} transition-transform group-hover:scale-110`}></i>{" "}
                  {showPwd ? t("hidePassword") : t("showPassword")}
                </button>
              </div>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                autoComplete="off"
                className={`w-full px-4 py-3.5 rounded-xl border-none bg-slate-100/70 focus:bg-white focus:ring-2 focus:outline-none transition-all placeholder-slate-400 text-[15px] ${
                  errors.password
                    ? "focus:ring-rose-500/30 ring-1 ring-rose-500 bg-rose-50/50"
                    : "focus:ring-blue-500/20 shadow-sm"
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
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold py-4 rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all text-[15px]"
            >
              {t("loginButton")}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-[13px] text-slate-400 mt-auto">
        © {year} SISTRA SRL. Panel de Administración Central. Todos los derechos reservados.
      </footer>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AuthLogin;
