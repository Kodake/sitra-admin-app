"use client";
import { getMenuData } from "@/data/sidebar-menu";
import useGlobalContext from "@/hooks/shared/use-context";
import { MenuItem } from "@/interFace/interFace";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const SidebarNavs = () => {
  const t = useTranslations("Menu");
  const { user } = useAuth();
  const pathname = usePathname();
  const { showingNavigationDropdown } = useGlobalContext();

  // Inverted context naming: showingNavigationDropdown === true means mini/collapsed sidebar
  const isMini = showingNavigationDropdown;

  const filteredMenuData = useMemo(() => getMenuData(t), [t]);

  // Current route indices for highlighting
  const [currentRouteMenuIndex, setCurrentRouteMenuIndex] = useState<number | null>(null);
  const [currentRouteSubMenu, setCurrentRouteSubMenu] = useState<{
    menuIndex: number;
    subIndex: number;
  } | null>(null);

  // Accordion active menu in expanded mode
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<{
    menuIndex: number;
    subIndex: number;
  } | null>(null);

  // Floating flyout active menu in mini mode (separate from current route so it can open/close)
  const [openFlyoutIndex, setOpenFlyoutIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const lastPathnameRef = useRef<string>("");

  // Detect active route on navigation
  useEffect(() => {
    const currentPath = pathname.replace(/\/+$/, "") || "/";
    if (lastPathnameRef.current === currentPath) return;

    let foundMenuIndex: number | null = null;
    let foundSubMenu: { menuIndex: number; subIndex: number } | null = null;

    for (let i = 0; i < filteredMenuData.length; i++) {
      const menuItem = filteredMenuData[i];
      const rootPath =
        menuItem.routeLink === "/"
          ? "/"
          : menuItem.routeLink.replace(/\/+$/, "");

      if (
        currentPath === rootPath ||
        (rootPath !== "/" && currentPath.startsWith(rootPath))
      ) {
        foundMenuIndex = i;
        foundSubMenu = null;
      }

      const subItems = menuItem.subItems;
      if (subItems) {
        for (let j = 0; j < subItems.length; j++) {
          const subItem = subItems[j];
          const subPath = subItem.routeLink.replace(/\/+$/, "");

          if (currentPath === subPath || currentPath.startsWith(subPath)) {
            foundMenuIndex = i;
            foundSubMenu = { menuIndex: i, subIndex: j };
          }

          const subSubItems = subItem.subSubItems;
          if (subSubItems) {
            for (let k = 0; k < subSubItems.length; k++) {
              const subSubItem = subSubItems[k];
              const subSubPath = subSubItem.routeLink.replace(/\/+$/, "");
              if (currentPath === subSubPath || currentPath.startsWith(subSubPath)) {
                foundMenuIndex = i;
                foundSubMenu = { menuIndex: i, subIndex: j };
              }
            }
          }
        }
      }
    }

    if (foundMenuIndex !== null) {
      setCurrentRouteMenuIndex(foundMenuIndex);
      setCurrentRouteSubMenu(foundSubMenu);
      setActiveMenu(foundMenuIndex);
      setActiveSubMenu(foundSubMenu);
      lastPathnameRef.current = currentPath;
    }

    // Always close floating flyout on route navigation
    setOpenFlyoutIndex(null);
  }, [pathname, filteredMenuData]);

  // Click outside to close floating flyouts in mini mode
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenFlyoutIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (index: number) => {
    if (isMini) {
      // In mini mode: toggle flyout popover
      setOpenFlyoutIndex((prev) => (prev === index ? null : index));
      setActiveSubMenu(null);
    } else {
      // In expanded mode: toggle accordion
      setActiveMenu((prev) => (prev === index ? null : index));
      setActiveSubMenu(null);
    }
  };

  const handleSubMenuClick = (menuIndex: number, subIndex: number) => {
    setActiveSubMenu((prev) =>
      prev?.menuIndex === menuIndex && prev?.subIndex === subIndex
        ? null
        : { menuIndex, subIndex }
    );
  };

  const closeFlyout = () => {
    if (isMini) {
      setOpenFlyoutIndex(null);
    }
  };

  const currentPathRender = pathname.replace(/\/+$/, "") || "/";

  return (
    <div ref={rootRef} data-sidenav-root>
      <ul className="sidenav-nav">
        {filteredMenuData.map((menuItem, index) => {
          const isMenuOpen = isMini
            ? openFlyoutIndex === index
            : activeMenu === index;

          const isCurrentRouteGroup = currentRouteMenuIndex === index;

          return (
            <li
              key={`${menuItem.routeLink}-${index}`}
              className={`sidenav-nav-item transition-colors duration-200 ${
                isMenuOpen ? "active" : ""
              } ${isCurrentRouteGroup ? "current-route" : ""}`}
            >
              <Link
                href={menuItem.routeLink}
                className={`sidenav-nav-link group hover:bg-gray-100/10 transition-colors duration-200 ${
                  currentPathRender ===
                  (menuItem.routeLink === "/"
                    ? "/"
                    : menuItem.routeLink.replace(/\/+$/, ""))
                    ? "current-page font-semibold relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-primary after:rounded-r-md"
                    : ""
                }`}
                onClick={(e) => {
                  if (menuItem.subItems?.length) {
                    e.preventDefault();
                    handleMenuClick(index);
                  } else {
                    closeFlyout();
                  }
                }}
              >
                <i
                  className={`common-dashboard-icon ${menuItem.iconClas} transition-transform duration-200 group-hover:scale-110`}
                ></i>
                <span>{menuItem.label}</span>
                {menuItem.subItems?.length ? (
                  <i
                    className={`fa-regular fa-chevron-right sidenav-nav-link-icon transition-transform duration-300 ${
                      isMenuOpen ? "rotate-90 text-primary" : ""
                    }`}
                  />
                ) : null}
              </Link>

              {menuItem.subItems?.length ? (
                <div
                  className={`sublevel-wrapper grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="sublevel-inner overflow-hidden">
                    <ul className="sublevel-nav-A pt-1 pb-2">
                      {menuItem.subItems.map((subItem, subIndex) => {
                        const isSubMenuActive =
                          activeSubMenu?.menuIndex === index &&
                          activeSubMenu?.subIndex === subIndex;

                        return (
                          <li
                            key={`${subItem.routeLink}-${index}-${subIndex}`}
                            className={`sublevel-nav-item-A transition-colors duration-200 ${
                              isSubMenuActive ? "active" : ""
                            }`}
                          >
                            <Link
                              href={subItem.routeLink}
                              className={`sublevel-nav-link group hover:text-primary transition-colors duration-200 ${
                                currentPathRender ===
                                subItem.routeLink.replace(/\/+$/, "")
                                  ? "current-page font-semibold text-primary"
                                  : ""
                              }`}
                              onClick={(e) => {
                                if (subItem.subSubItems?.length) {
                                  e.preventDefault();
                                  handleSubMenuClick(index, subIndex);
                                } else {
                                  closeFlyout();
                                }
                              }}
                            >
                              <span>{subItem.label}</span>
                              {subItem.subSubItems?.length ? (
                                <i
                                  className={`fa-regular fa-chevron-right sidenav-nav-link-icon transition-transform duration-300 ${
                                    isSubMenuActive
                                      ? "rotate-90 text-primary"
                                      : ""
                                  }`}
                                />
                              ) : null}
                            </Link>

                            {subItem.subSubItems?.length ? (
                              <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                  isSubMenuActive
                                    ? "grid-rows-[1fr]"
                                    : "grid-rows-[0fr]"
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <ul className="sublevel-nav-B pt-1 pb-2">
                                    {subItem.subSubItems.map(
                                      (subSubItem, subSubIndex) => (
                                        <li
                                          key={`${subSubItem.routeLink}-${index}-${subIndex}-${subSubIndex}`}
                                          className="sublevel-nav-item-B"
                                        >
                                          <Link
                                            href={subSubItem.routeLink}
                                            className={`sublevel-nav-link hover:text-primary transition-colors duration-200 ${
                                              currentPathRender ===
                                              subSubItem.routeLink.replace(
                                                /\/+$/,
                                                ""
                                              )
                                                ? "current-page font-semibold text-primary"
                                                : ""
                                            }`}
                                            onClick={closeFlyout}
                                          >
                                            <span className="relative before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:border before:border-current">
                                              {subSubItem.label}
                                            </span>
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarNavs;
