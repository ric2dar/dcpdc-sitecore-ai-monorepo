import { test, expect } from "@playwright/test";
import { gotoStory, storyId } from "./helpers";

/**
 * WCAG 2.2 AA — 1.4.13 Content on Hover or Focus
 *
 * When additional content appears on hover or focus, the user must be able to:
 * 1. Dismiss it (typically via Escape) without moving focus
 * 2. Hover over the additional content without it disappearing
 * 3. The content must persist until the user dismisses it or it is no longer relevant
 */

test.describe("1.4.13 Content on Hover or Focus — DropdownMenu", () => {
  const STORY = storyId("UI/DropdownMenu", "ActionMenu");

  test("dropdown content can be dismissed with Escape", async ({ page }) => {
    await gotoStory(page, STORY);

    // Open the dropdown by clicking the trigger
    const trigger = page.getByRole("button").first();
    await trigger.click();

    // Verify dropdown content is visible
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press("Escape");

    // Verify content is dismissed
    await expect(menu).not.toBeVisible();

    // Verify focus returned to the trigger (not moved elsewhere)
    await expect(trigger).toBeFocused();
  });

  test("dropdown content persists while interacting with it", async ({
    page,
  }) => {
    await gotoStory(page, STORY);

    // Open the dropdown
    const trigger = page.getByRole("button").first();
    await trigger.click();

    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    // Navigate within the menu using keyboard — content should persist
    await page.keyboard.press("ArrowDown");
    await expect(menu).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await expect(menu).toBeVisible();
  });
});

test.describe("1.4.13 Content on Hover or Focus — MegaMenu", () => {
  const STORY = storyId("Global/Navigation/MegaMenu", "Default");

  test("mega menu content appears on hover and persists", async ({ page }) => {
    await gotoStory(page, STORY);

    // Find a navigation trigger via data-slot (labels vary by story data)
    const trigger = page.locator('[data-slot="navigation-menu-trigger"]').first();
    await expect(trigger).toBeVisible();

    // Hover to open
    await trigger.hover();

    // Wait for the content to appear (200ms hover delay per component specs)
    const content = page.locator('[data-slot="navigation-menu-content"]').first();
    await expect(content).toBeVisible({ timeout: 5000 });

    // Move pointer to the content — it should persist
    await content.hover();
    await expect(content).toBeVisible();
  });

  test("mega menu can be dismissed with Escape", async ({ page }) => {
    await gotoStory(page, STORY);

    const trigger = page.locator('[data-slot="navigation-menu-trigger"]').first();
    await expect(trigger).toBeVisible();

    // Open via keyboard focus
    await trigger.focus();
    await page.keyboard.press("Enter");

    // Wait for content
    const content = page.locator('[data-slot="navigation-menu-content"]').first();
    await expect(content).toBeVisible({ timeout: 5000 });

    // Dismiss with Escape
    await page.keyboard.press("Escape");

    // Content should be hidden
    await expect(content).not.toBeVisible();
  });
});
