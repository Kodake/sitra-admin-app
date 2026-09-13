"use client";

import ResetPasswordFrom from "@/form/reset-password-from";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SITRALogo from "../../../../public/assets/img/logo/logo.png";

const ResetMain = () => {
    const t = useTranslations("Login");
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
            
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[100px]" />
                <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-300/20 blur-[120px]" />
            </div>

            <div className="w-full max-w-md flex flex-col items-center relative z-10">
                {/* Logo Section */}
                <div className="mb-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 mb-6 transform hover:scale-105 transition-transform duration-300">
                        <Image 
                            src={SITRALogo} 
                            alt="SITRA" 
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
                        SITRA <span className="font-light opacity-90">POS</span>
                    </h1>
                </div>

                {/* Form Wrapper */}
                <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out flex justify-center">
                    <ResetPasswordFrom />
                </div>
                
                {/* Footer */}
                <div className="mt-10 text-white/60 text-[13px] font-medium text-center space-y-1">
                    <p>© {new Date().getFullYear()} SITRA. {t("footer")}</p>
                </div>
            </div>
        </div>
    );
};

export default ResetMain;
