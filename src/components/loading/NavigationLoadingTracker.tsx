"use client";

import { useLoadingStore } from "@/store/useLoadingStore";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function NavigationLoadingTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname or searchParams change, the new page has arrived: stop navigation spinner
  useEffect(() => {
    useLoadingStore.getState().stopNavigating();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname, searchParams]);

  // Intercept internal link clicks to immediately trigger the loader while Next.js compiles/renders
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, new tab links, hash-only anchors, or downloads
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      // Check if it's an internal application route
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#");

      if (isInternal) {
        const currentUrl = window.location.pathname + window.location.search;
        // Only trigger if navigating to a different path
        if (href !== currentUrl && href !== pathname) {
          useLoadingStore.getState().startNavigating();

          // Safety fallback: if navigation takes longer than 8s (e.g. cancelled/error), dismiss
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            useLoadingStore.getState().stopNavigating();
          }, 8000);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return null;
}
