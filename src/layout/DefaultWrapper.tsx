//@refresh
"use client";
import useGlobalContext from "@/hooks/shared/use-context";
import React from "react";
import { ToastContainer } from "react-toastify";
import FooterCopyright from "./footer/FooterCopyright";
import Header from "./header/Header";
import SidebarMenu from "./sidebar/SidebarMenu";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { setShowingNavigationDropdown, showingNavigationDropdown } = useGlobalContext();

  // State semantics (preserved from original — inverted naming):
  //   showingNavigationDropdown === false  →  sidebar is EXPANDED (visible)
  //   showingNavigationDropdown === true   →  sidebar is COLLAPSED (mini/hidden)
  const isExpanded = !showingNavigationDropdown;

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isExpanded && window.innerWidth < 1400) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Close mobile drawer on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400 && isExpanded) {
        // On desktop, reset to expanded state (no drawer)
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  return (
    <>
      <div className="inventual-dashboard-area">
        <ToastContainer autoClose={10000} newestOnTop={false} closeOnClick pauseOnHover />
        <div className="inventual-dashboard-main relative">
          {/* ── Sidebar ── */}
          <SidebarMenu />

          {/* ── Dark Overlay (mobile only) ── */}
          {/* Shows when sidebar drawer is open on mobile. z-index between content and sidebar. */}
          <div
            className={`
              fixed inset-0 bg-black/50 backdrop-blur-[2px] xxl:hidden
              transition-opacity duration-300 ease-in-out
              ${isExpanded ? "opacity-100 z-[9998] pointer-events-auto" : "opacity-0 z-[-1] pointer-events-none"}
            `}
            onClick={() => setShowingNavigationDropdown(true)}
            aria-hidden="true"
          />

          {/* ── Main Content ── */}
          {/* Desktop: padding-left matches sidebar width. Mobile: full width (sidebar overlays). */}
          <div
            className={`
              w-full min-h-screen
              transition-[padding] duration-300 ease-in-out
              ${isExpanded
                ? "xxl:pl-[260px]"
                : "xxl:pl-[72px]"
              }
            `}
          >
            <div className="inventual-dashboard-main-content-wrap">
              <header>
                <div className="inventual-header-area">
                  <div className="inventual-header-wrapper custom-height-70 px-5 sm:px-7 custom-height-70 bg-white border-b border-solid border-border">
                    <Header />
                  </div>
                </div>
              </header>
              {children}
              <footer>
                <div className="inventual-copyright-area">
                  <FooterCopyright />
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
