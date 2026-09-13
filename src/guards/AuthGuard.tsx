"use client";

import Loading from "@/components/loading/Loading";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useAuth } from "@/providers/AuthProvider";
import { isTokenExpired } from "@/utils/is-token-expired";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

type Props = {
  children: React.ReactNode;
};

const SISTRA_RUC = "133556545";
const publicRoutes = ["/", "/login", "/forgot", "/reset-password"];

export default function AuthGuard({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <AuthGuardInternal>{children}</AuthGuardInternal>;
}

function AuthGuardInternal({ children }: Props) {
  const tAdmin = useTranslations("Admin");
  const router = useSafeRouter();
  const rawPathname = usePathname();

  const { token, user, logout, isHydrated } = useAuth();

  const currentPath =
    rawPathname ||
    (typeof window !== "undefined" ? window.location.pathname : "/");

  const isPublic =
    publicRoutes.includes(currentPath) ||
    currentPath === "/" ||
    currentPath === "";

  useEffect(() => {
    if (!isHydrated) return;

    // 1. Unauthenticated users on public routes should simply see the public page
    if (!token && isPublic) {
      return;
    }

    // 2. Unauthenticated users attempting to access protected routes -> redirect to login
    if (!token && !isPublic) {
      if (currentPath !== "/") {
        router.replace("/");
      }
      return;
    }

    // 3. Expired token -> clear session and redirect to login
    if (token && isTokenExpired(token)) {
      logout();
      if (currentPath !== "/") {
        router.replace("/");
      }
      return;
    }

    // 4. Authenticated user validation
    if (token && user) {
      // Validate SISTRA SRL exclusive access
      if (user.rucNumber !== SISTRA_RUC) {
        toast.error(
          tAdmin("accessDeniedRestricted")
        );
        logout();
        if (currentPath !== "/") {
          router.replace("/");
        }
        return;
      }

      // If already logged in and visiting login route, redirect to dashboard
      if (currentPath === "/" || currentPath === "/login") {
        router.replace("/dashboard");
        return;
      }
    }
  }, [isHydrated, token, currentPath, router, logout, user, isPublic]);

  // If waiting for hydration on protected routes, show loading
  if (!isHydrated) {
    if (isPublic) {
      return <>{children}</>;
    }
    return <Loading forceShow />;
  }

  // On public routes (like login), always render children immediately
  if (isPublic) {
    return <>{children}</>;
  }

  // On protected routes, block rendering until a valid token exists
  if (!token || isTokenExpired(token)) {
    return <Loading forceShow />;
  }

  return <>{children}</>;
}
