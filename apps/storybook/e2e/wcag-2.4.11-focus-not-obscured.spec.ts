import { test, expect } from "@playwright/test";
import { gotoStory, storyId } from "./helpers";

/**
 * WCAG 2.2 AA — 2.4.11 Focus Not Obscured (Minimum)
 *
 * When a UI component receives keyboard focus, it must not be
 * entirely hidden by author-created content (e.g., sticky headers,
 * fixed footers, cookie banners).
 *
 * The GlobalHeader uses `sticky top-0 z-40` and auto-hides on scroll.
 * This test tabs through focusable elements and verifies each one
 * remains at least partially visible (not obscured by the header).
 */

test.describe("2.4.11 Focus Not Obscured — GlobalHeader", () => {
  const STORY = storyId("Global/Header/GlobalHeader", "ScrollBehaviour");

  test("focused elements are not entirely obscured by the sticky header", async ({
    page,
  }) => {
    await gotoStory(page, STORY);

    // Scroll down so the header is above content, then check elements below it
    await page.evaluate(() => window.scrollBy(0, 300));
    // Wait for header auto-hide animation to complete
    await page.waitForFunction(() => {
      const header = document.querySelector("header");
      if (!header) return true;
      const rect = header.getBoundingClientRect();
      // Header is hidden when translated off-screen (bottom ≤ 0) or fully visible (settled)
      return rect.bottom <= 0 || rect.bottom === rect.height;
    }, { timeout: 5000 });

    // Get the header height (if visible) to know the obscured zone
    const headerHeight = await page.evaluate(() => {
      const header = document.querySelector("header");
      if (!header) return 0;
      const rect = header.getBoundingClientRect();
      // If header is hidden (translated off screen), bottom will be ≤ 0
      return Math.max(0, rect.bottom);
    });

    // Tab through focusable elements and check each one
    const maxTabs = 20;
    const violations: string[] = [];

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press("Tab");

      const result = await page.evaluate((hdrHeight) => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        // Skip elements that are inside the sticky header itself —
        // they can't be "obscured by" the header they belong to
        if (el.closest("header")) return null;

        const rect = el.getBoundingClientRect();
        // Element is entirely obscured if its bottom edge is at or above
        // the header bottom AND it has non-zero height
        const entirelyObscured =
          hdrHeight > 0 && rect.bottom <= hdrHeight && rect.height > 0;
        return {
          tag: el.tagName,
          text:
            (el as HTMLElement).innerText?.slice(0, 40) ||
            el.getAttribute("aria-label") ||
            "",
          top: rect.top,
          bottom: rect.bottom,
          headerHeight: hdrHeight,
          entirelyObscured,
        };
      }, headerHeight);

      if (!result) continue;
      if (result.entirelyObscured) {
        violations.push(
          `Element <${result.tag}> "${result.text}" is entirely obscured (top: ${result.top}px, bottom: ${result.bottom}px, header: ${result.headerHeight}px)`,
        );
      }
    }

    expect(
      violations,
      `${violations.length} focused element(s) were entirely obscured by the sticky header:\n${violations.join("\n")}`,
    ).toHaveLength(0);
  });

  test("focused elements below fold are visible after scrolling into view", async ({
    page,
  }) => {
    await gotoStory(page, STORY);

    // Scroll down to simulate content below the fold
    await page.evaluate(() => window.scrollBy(0, 500));
    // Wait for header auto-hide animation to complete
    await page.waitForFunction(() => {
      const header = document.querySelector("header");
      if (!header) return true;
      const rect = header.getBoundingClientRect();
      return rect.bottom <= 0 || rect.bottom === rect.height;
    }, { timeout: 5000 });

    // Tab until we land on an element that is NOT inside the header
    let attempts = 0;
    let result: { visible: boolean; top?: number; bottom?: number; viewportHeight?: number } = { visible: true };

    while (attempts < 10) {
      await page.keyboard.press("Tab");
      attempts++;

      result = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return { visible: true, skipped: true };

        // Skip header-internal elements
        if (el.closest("header")) return { visible: true, skipped: true };

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Element should be at least partially within the visible viewport
        const isPartiallyVisible =
          rect.bottom > 0 && rect.top < viewportHeight;

        return {
          visible: isPartiallyVisible,
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          viewportHeight,
        };
      }) as { visible: boolean; top?: number; bottom?: number; viewportHeight?: number; skipped?: boolean };

      // If we found a non-header element, stop
      if (!(result as { skipped?: boolean }).skipped) break;
    }

    expect(
      result.visible,
      `Focused element is not visible in viewport (top: ${result.top}px, bottom: ${result.bottom}px, viewport: ${result.viewportHeight}px)`,
    ).toBe(true);
  });
});
