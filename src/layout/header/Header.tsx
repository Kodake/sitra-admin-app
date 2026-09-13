"use client";
import useAuths from "@/hooks/auth/useAuths";
import useProfile from "@/hooks/auth/useProfile";
import useGlobalContext from "@/hooks/shared/use-context";
import useClickOutside from "@/hooks/shared/useClickOutside";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";
import LanguageDropdown from "./LanguageDropdown";
import QuickMenuDropdown from "./QuickMenuDropdown";

const Header = () => {
  const { onSubmitLogout } = useAuths("login");
  const { user } = useAuth();
  const { currentUser } = useProfile();

  const [isQuickDropdown, setQuickDropdown] = useState<boolean>(false);
  const [isLanguageDropdown, setLanguageDropdown] = useState<boolean>(false);
  const [isEmailDropdown, setEmailDropdown] = useState<boolean>(false);
  const [isProfileDropdown, setProfileDropdown] = useState<boolean>(false);
  const [isNotificationDropdown, setNotificationDropdown] =
    useState<boolean>(false);

  const quickRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useClickOutside(quickRef, () => setQuickDropdown(false));
  useClickOutside(langRef, () => setLanguageDropdown(false));
  useClickOutside(emailRef, () => setEmailDropdown(false));
  useClickOutside(profileRef, () => setProfileDropdown(false));
  useClickOutside(notifRef, () => setNotificationDropdown(false));

  const t = useTranslations("Header");

  const toggleQuickDropdown = () => {
    setQuickDropdown(!isQuickDropdown);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!isLanguageDropdown);
    setQuickDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleEmailDropdown = () => {
    setEmailDropdown(!isEmailDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!isProfileDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdown(!isNotificationDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
  };

  const { setShowingNavigationDropdown, showingNavigationDropdown, theme, toggleTheme } =
    useGlobalContext();

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="inventual-sidebar">
          <button
            className="inventual-sidebar-icon-bar hover:text-primary transition-colors"
            onClick={() =>
              setShowingNavigationDropdown(!showingNavigationDropdown)
            }
            type="button"
          >
            <i className="fa-solid fa-bars-sort"></i>
          </button>
        </div>
        <div className="inventual-header-content flex items-center justify-end min-h-[70px] w-full">
          <div className="inventual-header-shortmenu pe-5 maxSm:pe-4 border-e items-center flex flex-col justify-center border-borderLight min-h-[70px] border-solid">
            <div
              ref={quickRef}
              className={`inventual-quick-dropdown transition-all duration-200 transform origin-top ${isQuickDropdown ? "shortmenu-enable opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <QuickMenuDropdown />
            </div>
          </div>
          <div className="inventual-header-notify-wrapper px-5 border-e border-solid border-borderLight min-h-[70px] flex items-center">
            {/* <div className="inventual-header-notification pe-5 relative" ref={notifRef}>
              <button type="button" className="noti hover:text-primary transition-colors" onClick={toggleNotificationDropdown}>
                <i className="fal fa-bell"></i>
              </button>
              <div
                className={`inventual-notify-dropdown transition-all duration-200 transform origin-top-right ${isNotificationDropdown ? "notifydropdown-enable opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <NotificationDropdown />
              </div>
            </div> */}
            {/* <div className="inventual-header-email pe-5 relative" ref={emailRef}>
              <button
                type="button"
                className="emai hover:text-primary transition-colors"
                onClick={toggleEmailDropdown}
              >
                <i className="fal fa-envelope"></i>
              </button>
              <div
                className={`inventual-notify-dropdown transition-all duration-200 transform origin-top-right ${isEmailDropdown ? "emaildropdown-enable opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <EmailDropdown />
              </div>
            </div> */}
            {/* Theme Toggle Switch */}
            <div className="inventual-header-theme-toggle pe-5 flex items-center">
              <button
                type="button"
                onClick={toggleTheme}
                className="text-[18px] text-body hover:text-primary transition-colors leading-none flex items-center"
                aria-label="Toggle Theme"
              >
                <i className={theme === "dark" ? "fal fa-sun" : "fal fa-moon"}></i>
              </button>
            </div>
            <div
              className="inventual-header-language flex items-center gap-2 relative cursor-pointer group"
              onClick={toggleLanguageDropdown}
              ref={langRef}
            >
              <div className="inventual-header-language-icon">
                <button
                  type="button"
                  className="text-[18px] text-body leading-none group-hover:text-primary transition-colors"
                >
                  <i className="fal fa-globe"></i>
                </button>
              </div>
              <div className="inventual-header-language-content maxMd:hidden">
                <ul>
                  <li className="flex">
                    <button
                      type="button"
                      className="text-[14px] font-bold text-heading transition-colors group-hover:text-primary"
                    >
                      {t("langCode")} <i className={`far fa-chevron-down ms-1 transition-transform duration-200 ${isLanguageDropdown ? 'rotate-180' : ''}`}></i>
                    </button>
                  </li>
                </ul>
              </div>
              <div
                className={`inventual-quick-dropdown inventual-quick-lang-dropdown transition-all duration-200 transform origin-top-right ${isLanguageDropdown ? "langmenu-enable opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <LanguageDropdown />
              </div>
            </div>
          </div>
          <div className="inventual-header-profile relative ps-5 flex flex-wrap items-center pe-11 maxMd:pe-0" ref={profileRef}>
            <div className="inventual-header-profile-img w-12 maxMd:me-0 cursor-pointer group" onClick={toggleProfileDropdown}>
              <button
                type="button"
                className={`w-12 h-12 rounded-xl min-w-[48px] overflow-hidden flex items-center justify-center border border-borderLight p-1 shadow-sm ${(user?.companyLogoUrl || currentUser?.companyLogoUrl) ? 'company-logo-bg bg-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                {(user?.companyLogoUrl || currentUser?.companyLogoUrl) ? (
                  <img
                    className="group-hover:scale-105 transition-transform duration-300 object-contain w-full h-full"
                    src={user?.companyLogoUrl || currentUser?.companyLogoUrl}
                    alt={t("userImageAlt")}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    <i className="fal fa-user text-lg"></i>
                  </div>
                )}
              </button>
            </div>
            <div className="inventual-header-profile-info maxMd:hidden ps-2.5 cursor-pointer group" onClick={toggleProfileDropdown}>
              <h5
                className="text-[15px] font-bold text-heading cursor-pointer group-hover:text-primary transition-colors"
              >
                {currentUser?.userName && currentUser.userName.length > 15
                  ? `${currentUser.userName.slice(0, 15)}...`
                  : currentUser?.userName ?? "—"}
              </h5>
              <span className="text-[12px] font-semibold text-primary cursor-pointer block">
                SuperAdmin • SISTRA SRL
              </span>
              <i
                className={`far fa-chevron-down transition-transform duration-200 ${isProfileDropdown ? 'rotate-180' : ''}`}
              ></i>
            </div>
            <div
              className={`inventual-quick-dropdown inventual-quick-pro-dropdown transition-all duration-200 transform origin-top-right ${isProfileDropdown ? "promenu-enable opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <ul>
                <li>
                  <Link href="/profile" className="hover:text-primary transition-colors block">
                    <i className="fal fa-user"></i> {t("profile")}
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={onSubmitLogout} className="hover:text-red-500 transition-colors block">
                    <i className="fal fa-sign-out"></i> {t("logout")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
