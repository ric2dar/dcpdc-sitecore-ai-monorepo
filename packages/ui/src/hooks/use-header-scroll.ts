"use client";

import * as React from "react";
import { useScrollDirection } from "./use-scroll-direction";

interface UseHeaderScrollOptions {
  /**
   * Scroll distance (px) before the header can hide.
   * Approximates half the height of a typical hero banner.
   * @default 200
   */
  threshold?: number;
}

/**
 * Controls header visibility based on scroll position and direction.
 *
 * - Always visible near the top of the page (below `threshold`).
 * - Hidden when scrolling **down** past `threshold`.
 * - Visible again when scrolling **up** from any depth.
 */
export function useHeaderScroll(options: UseHeaderScrollOptions = {}): boolean {
  const { threshold = 200 } = options;
  const direction = useScrollDirection({ threshold: 10 });
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // At top of page or unknown direction → always visible
    if (direction === null) {
      setVisible(true);
      return;
    }

    // Below threshold → always visible regardless of direction
    if (window.scrollY < threshold) {
      setVisible(true);
      return;
    }

    // Past threshold: show on scroll up, hide on scroll down
    setVisible(direction === "up");
  }, [direction, threshold]);

  return visible;
}
