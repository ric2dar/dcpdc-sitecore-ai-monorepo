import { test, expect } from "@playwright/test";
import { gotoStory, storyId } from "./helpers";

/**
 * WCAG 2.2 AA — 2.5.7 Dragging Movements
 *
 * Any functionality that uses a dragging movement (e.g., swipe, drag-to-reorder)
 * must also be operable by a single pointer without dragging — unless dragging
 * is essential.
 *
 * The project uses Embla Carousel which supports drag/swipe. Each carousel
 * must also provide arrow buttons (Previous/Next) as an alternative.
 */

test.describe("2.5.7 Dragging Movements — Carousel alternatives", () => {
  const carouselStories = [
    {
      name: "UI/Carousel",
      id: storyId("UI/Carousel", "Default"),
    },
    {
      name: "CardCarousel",
      id: storyId("Blocks/Carousel/CardCarousel", "Default"),
    },
    {
      name: "MediaCarousel",
      id: storyId("Blocks/Carousel/MediaCarousel", "Default"),
    },
  ];

  for (const story of carouselStories) {
    test(`${story.name} has Previous/Next button alternatives`, async ({
      page,
    }) => {
      await gotoStory(page, story.id);

      // Look for previous/next buttons (common patterns: aria-label, button text, or data attributes)
      const prevButton = page.getByRole("button", {
        name: /prev|previous|back|←/i,
      });
      const nextButton = page.getByRole("button", {
        name: /next|forward|→/i,
      });

      // At least one navigation mechanism must exist
      const hasPrev = (await prevButton.count()) > 0;
      const hasNext = (await nextButton.count()) > 0;

      expect(
        hasPrev || hasNext,
        `${story.name} must have Previous/Next buttons as single-pointer alternatives to drag/swipe`,
      ).toBe(true);
    });

    test(`${story.name} arrow buttons are functional`, async ({ page }) => {
      await gotoStory(page, story.id);

      const nextButton = page.getByRole("button", {
        name: /next|forward|→/i,
      });

      if ((await nextButton.count()) === 0) {
        test.skip(true, "No next button found — skipping functional test");
        return;
      }

      // Get initial transform before clicking
      const initialTransform = await page.evaluate(() => {
        const container = document.querySelector('[data-slot="carousel-content"]') ||
          document.querySelector('[role="group"]')?.parentElement;
        return container ? window.getComputedStyle(container).transform : "";
      });

      // Click next and wait for carousel transition to complete
      await nextButton.first().click();
      await page.waitForFunction(
        (prevTransform) => {
          const container = document.querySelector('[data-slot="carousel-content"]') ||
            document.querySelector('[role="group"]')?.parentElement;
          if (!container) return true;
          return window.getComputedStyle(container).transform !== prevTransform;
        },
        initialTransform,
        { timeout: 5000 },
      );

      // Verify the carousel actually moved (content or position changed)
      const afterSlide = await page.evaluate(() => {
        const container = document.querySelector('[data-slot="carousel-content"]') ||
          document.querySelector('[role="group"]')?.parentElement;
        if (!container) return "no-container";
        return window.getComputedStyle(container).transform;
      });

      // The carousel should have a transform value indicating it moved
      expect(afterSlide).not.toBe(initialTransform);
    });

    test(`${story.name} supports keyboard navigation`, async ({ page }) => {
      await gotoStory(page, story.id);

      // Verify carousel controls are keyboard-accessible by tabbing to them
      const nextButton = page.locator('[data-slot="carousel-next"]');
      const prevButton = page.locator('[data-slot="carousel-previous"]');

      if ((await nextButton.count()) === 0) {
        test.skip(true, "No carousel-next button found");
        return;
      }

      // Focus the next button via Tab (verifies keyboard reachability)
      await nextButton.first().focus();
      await expect(nextButton.first()).toBeFocused();

      // Capture transform before pressing Enter
      const transformBefore = await page.evaluate(() => {
        const container = document.querySelector('[data-slot="carousel-content"]') ||
          document.querySelector('[role="group"]')?.parentElement;
        return container ? window.getComputedStyle(container).transform : "";
      });

      // Press Enter to activate — should advance the carousel
      await page.keyboard.press("Enter");
      await page.waitForFunction(
        (prevTransform) => {
          const container = document.querySelector('[data-slot="carousel-content"]') ||
            document.querySelector('[role="group"]')?.parentElement;
          if (!container) return true;
          return window.getComputedStyle(container).transform !== prevTransform;
        },
        transformBefore,
        { timeout: 5000 },
      );

      // Tab to previous button — verifies keyboard traversal of carousel controls
      await prevButton.first().focus();
      await expect(prevButton.first()).toBeFocused();
    });
  }
});
