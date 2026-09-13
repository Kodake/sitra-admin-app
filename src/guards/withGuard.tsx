// src/hoc/withAuth.tsx
"use client";

import Loading from "@/components/loading/Loading";
import { useAuth } from "@/providers/AuthProvider";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const { token, isHydrated } = useAuth();
    const router = useSafeRouter();

    useEffect(() => {
      if (isHydrated && !token) {
        router.push("/");
      }
    }, [isHydrated, token, router]);

    if (!isHydrated || !token) return <Loading forceShow />;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
