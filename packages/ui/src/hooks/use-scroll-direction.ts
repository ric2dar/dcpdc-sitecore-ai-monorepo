"use client";

import * as React from "react";

export type ScrollDirection = "up" | "down" | null;

interface UseScrollDirectionOptions {
  /** Minimum scroll distance (in px) to trigger direction change. Default: 10 */
  threshold?: number;
  /** Initial direction. Default: null */
  initialDirection?: ScrollDirection;
}

/**
 * Hook to detect scroll direction.
 * Returns "up" when scrolling up, "down" when scrolling down, null at page top.
 * Respects prefers-reduced-motion by returning null (no direction changes).
 */
export function useScrollDirection(
  options: UseScrollDirectionOptions = {},
): ScrollDirection {
  const { threshold = 10, initialDirection = null } = options;
  const [direction, setDirection] =
    React.useState<ScrollDirection>(initialDirection);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  React.useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // For reduced motion, always show header (direction = null or "up")
      setDirection(null);
      return;
    }

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // At top of page, reset direction
      if (scrollY <= 0) {
        setDirection(null);
        lastScrollY.current = 0;
        ticking.current = false;
        return;
      }

      const diff = scrollY - lastScrollY.current;

      // Only update if threshold is exceeded
      if (Math.abs(diff) >= threshold) {
        const newDirection: ScrollDirection = diff > 0 ? "down" : "up";
        setDirection(newDirection);
        lastScrollY.current = scrollY;
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    // Set initial scroll position
    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return direction;
}
