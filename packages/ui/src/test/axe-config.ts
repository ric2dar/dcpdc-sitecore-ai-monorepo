import type { RunOptions } from "axe-core";

/**
 * Shared axe-core configuration targeting WCAG 2.2 Level AA.
 * Used by all *.a11y.test.tsx files to ensure consistent criteria coverage.
 *
 * Tags included:
 * - wcag2a / wcag2aa   — WCAG 2.0 Level A & AA
 * - wcag21a / wcag21aa — WCAG 2.1 Level A & AA
 * - wcag22aa            — WCAG 2.2 Level AA (e.g., 2.5.8 Target Size)
 */
export const axeRunOptions: RunOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
  },
};
