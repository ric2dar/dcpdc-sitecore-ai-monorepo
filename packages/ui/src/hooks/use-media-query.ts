"use client";

import * as React from "react";

/**
 * Hook to check if a media query matches.
 * @param query - CSS media query string (e.g., "(min-width: 1312px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/** Breakpoint for desktop navigation (mega menu) */
export const NAV_DESKTOP_BREAKPOINT = 1312;

/** Breakpoint for tablet landscape → mega menu (BR08 orientation) */
export const NAV_TABLET_LANDSCAPE_BREAKPOINT = 1024;

/**
 * Hook to check if viewport should show desktop navigation (mega menu).
 *
 * Desktop nav is shown when:
 * - Viewport ≥ 1312px (any orientation), OR
 * - Viewport ≥ 1024px AND landscape orientation (tablet landscape per FSD BR08)
 */
export function useIsDesktopNav(): boolean {
  const isDesktopWidth = useMediaQuery(
    `(min-width: ${NAV_DESKTOP_BREAKPOINT}px)`,
  );
  const isTabletLandscape = useMediaQuery(
    `(min-width: ${NAV_TABLET_LANDSCAPE_BREAKPOINT}px) and (orientation: landscape)`,
  );
  return isDesktopWidth || isTabletLandscape;
}

/**
 * Hook to check if viewport is mobile size.
 * Mobile: < 768px
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);

    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
