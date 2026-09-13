"use client";

import { setAxiosRouter } from "@/services/axiosErrorInterceptor";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect } from "react";

export default function AxiosRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useContext(AppRouterContext);

  useEffect(() => {
    if (router) {
      setAxiosRouter(router);
    }
  }, [router]);

  return <>{children}</>;
}
