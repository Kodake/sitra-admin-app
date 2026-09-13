"use client";

import { AppContextType } from "@/interFace/interFace";
import { AuthProvider } from "@/providers/AuthProvider";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [filterType, setFilterType] = useState<string>("");
  const [dynamicId, setDynamicId] = useState<number>(1);
  const [modalId, setModalId] = useState<number>(0);
  const [niceSelectData, setNiceSelectData] = useState<string>("no-data");
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setNiceSelectData("no-data");
  }, [pathName]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const contextValue: AppContextType = {
    scrollDirection,
    setScrollDirection,
    filterType,
    setFilterType,
    dynamicId,
    setDynamicId,
    niceSelectData,
    modalId,
    setModalId,
    setNiceSelectData,
    setShowingNavigationDropdown,
    showingNavigationDropdown,
    theme,
    toggleTheme
  };

  const QueryClientProviderAny = QueryClientProvider as React.ComponentType<any>;

  return (
    <QueryClientProviderAny client={queryClient}>
      <AuthProvider>
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
      </AuthProvider>
    </QueryClientProviderAny>
  );
};

export default AppProvider;
