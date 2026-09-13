"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 px-6 py-24 sm:py-32 lg:px-8">
      {/* Inline styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />

      {/* Background gradients */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center backdrop-blur-md bg-white/40 p-12 sm:p-16 rounded-[2.5rem] border border-white/60 shadow-2xl max-w-3xl w-full mx-auto transform transition-all hover:scale-[1.01] duration-500">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm mb-4">
          404
        </h1>
        <div className="h-2 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8"></div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl mb-6">
          {t("title")}
        </h2>
        <p className="text-lg leading-8 text-slate-600 max-w-xl mx-auto mb-10">
          {t("description")}
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-blue-500/30 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 overflow-hidden hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              <i className="fa-regular fa-home transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"></i>
              {t("backToDashboard")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;