"use client";
import ForgotPasswordFrom from '@/form/forgot-password-from';
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ForgotMain = () => {
    const t = useTranslations("Login");
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
        
        // Force Light Mode for Auth Pages
        const isDark = document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
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

    return (
        <div className="min-h-screen flex flex-col relative bg-[#f5f5f7] font-sans text-slate-900 overflow-hidden">

            {/* ORIGINAL-STYLE BLUE GRADIENT WITH DECORATIVE CIRCLES */}
            <div className="absolute top-0 left-0 w-full h-[45vh] bg-[#1e73be] bg-gradient-to-br from-[#1a66a8] to-[#258ced] z-0 pointer-events-none shadow-sm">
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
            </div>

            <header className="relative z-10 w-full pt-10 pb-2">
                <div className="flex justify-center">
                    <div className="font-bold text-2xl tracking-tight text-white drop-shadow-md">
                        {t("sitraLogin")}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center relative z-10 w-full px-4 pb-10">
                <ForgotPasswordFrom />
            </main>

            {/* FOOTER */}
            <footer className="text-center py-8 text-[13px] text-slate-400 mt-auto">
                © {year} SITRA POS. {t("footer")}
            </footer>
        </div>
    );
};

export default ForgotMain;
