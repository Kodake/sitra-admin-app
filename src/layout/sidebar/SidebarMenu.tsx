import useProfile from "@/hooks/auth/useProfile";
import useGlobalContext from "@/hooks/shared/use-context";
import Image from "next/image";
import Link from "next/link";
import SidebarNavs from "./SidebarNavs";

const SidebarMenu = () => {
  const { setShowingNavigationDropdown, showingNavigationDropdown } =
    useGlobalContext();
  const { currentUser } = useProfile();

  // State semantics (inverted naming preserved from original):
  //   showingNavigationDropdown === false  →  sidebar is EXPANDED
  //   showingNavigationDropdown === true   →  sidebar is COLLAPSED (mini on desktop, hidden on mobile)
  const isExpanded = !showingNavigationDropdown;

  return (
    <aside
      className={`
        inventual-sidebar-area
        fixed top-0 left-0 h-screen z-[9999]
        transition-all duration-300 ease-in-out

        ${/* ── Desktop (>= xxl / 1400px) ── */""}
        ${isExpanded
          ? "xxl:w-[260px]"
          : "xxl:w-[72px] sidebar-mini-mode"
        }

        ${/* ── Mobile (< xxl / 1400px) ── */""}
        ${/* Always 260px wide, slides in/out via translateX */""}
        w-[260px] max-w-[75vw]
        ${isExpanded
          ? "translate-x-0"
          : "-translate-x-full"
        }
        xxl:translate-x-0
      `}
    >
      <div className="inventual-sidebar-main flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Logo Bar */}
          <div className="inventual-sidebar-main-logo-bar">
            <div className="inventual-sidebar-main-logo-bar-wrap flex items-center justify-center w-full">
              {/* Full Logo */}
              <div className="inventual-sidebar-main-logo">
                <div className="sidebar-logo">
                  <Link href="/dashboard" className="flex flex-col items-center">
                    <Image
                      className="rounded"
                      src="/assets/img/logo/logo.png"
                      width={140}
                      height={40}
                      alt="logo"
                      priority
                    />
                    <span className="mt-1 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/25 shadow-xs">
                      SuperAdmin • SISTRA
                    </span>
                  </Link>
                </div>

                {/* Small Logo (shown in mini mode via CSS) */}
                <div className="sidebar-small-logo">
                  <Link href="/dashboard">
                    <Image
                      src="/assets/img/logo/small-logo.png"
                      width={40}
                      height={40}
                      alt="small logo"
                      priority
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Close button — visible only on mobile (< xxl) */}
            <button
              type="button"
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                w-8 h-8 flex items-center justify-center
                rounded-lg hover:bg-black/5 transition-colors
                text-slate-400 hover:text-slate-700
                xxl:hidden
              "
              onClick={() => setShowingNavigationDropdown(true)}
              aria-label="Close sidebar"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Navigation */}
          <div className="inventual-sidebar-navigation flex-1 overflow-y-auto mb-2">
            <nav>
              <SidebarNavs />
            </nav>
          </div>
        </div>

        {/* Profile Card Footer */}
        <div className="inventual-sidebar-footer px-3 py-3 border-t border-slate-200/80 dark:border-slate-800/80 shrink-0">
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200 group"
          >
            <div className={`w-8 h-8 rounded-lg ${currentUser?.companyLogoUrl ? 'company-logo-bg bg-white p-0.5 border-slate-200 dark:border-slate-700' : 'bg-primary/10 text-primary border-primary/20'} flex items-center justify-center font-bold text-xs overflow-hidden shrink-0 border shadow-sm`}>
              {currentUser?.companyLogoUrl ? (
                <img
                  src={currentUser.companyLogoUrl}
                  alt="avatar"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span>
                  {currentUser?.userName?.slice(0, 2).toUpperCase() || "SI"}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-primary transition-colors">
                {currentUser?.userName || "Sitra User"}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">
                {currentUser?.roles?.[0] || "Administrador"}
              </span>
            </div>
            <i className="far fa-chevron-right text-[10px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all"></i>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
