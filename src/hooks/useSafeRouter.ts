"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useSafeRouter() {
  let nextRouter: any = null;
  try {
    // Attempt standard Next.js App Router
    nextRouter = useRouter();
  } catch {
    nextRouter = null;
  }

  const push = useCallback((url: string) => {
    if (typeof window !== "undefined") {
      const current = window.location.pathname + window.location.search;
      if (current === url || window.location.pathname === url) {
        return; // Prevent duplicate navigation / refresh loop
      }
    }
    if (nextRouter?.push) {
      try {
        nextRouter.push(url);
        return;
      } catch {
        // Fallback to window navigation
      }
    }
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }, [nextRouter]);

  const replace = useCallback((url: string) => {
    if (typeof window !== "undefined") {
      const current = window.location.pathname + window.location.search;
      if (current === url || window.location.pathname === url) {
        return; // Prevent duplicate navigation / refresh loop
      }
    }
    if (nextRouter?.replace) {
      try {
        nextRouter.replace(url);
        return;
      } catch {
        // Fallback to window navigation
      }
    }
    if (typeof window !== "undefined") {
      window.location.replace(url);
    }
  }, [nextRouter]);

  return useMemo(() => ({
    push,
    replace,
    back: () => (nextRouter?.back ? nextRouter.back() : (typeof window !== "undefined" ? window.history.back() : undefined)),
    forward: () => (nextRouter?.forward ? nextRouter.forward() : (typeof window !== "undefined" ? window.history.forward() : undefined)),
    refresh: () => (nextRouter?.refresh ? nextRouter.refresh() : (typeof window !== "undefined" ? window.location.reload() : undefined)),
    prefetch: (url: string) => nextRouter?.prefetch?.(url),
    raw: nextRouter,
  }), [nextRouter, push, replace]);
}
