import type { Page } from "@playwright/test";

/**
 * Navigate to a Storybook story rendered in the isolated iframe.
 * Uses the /iframe.html path so tests interact with the component
 * directly — no Storybook chrome to interfere.
 *
 * @param storyId  Storybook story ID, e.g. "ui-button--primary"
 */
export async function gotoStory(page: Page, storyId: string): Promise<void> {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`, {
    waitUntil: "networkidle",
  });
}

/**
 * Convert a Storybook title + story name to the kebab-case story ID.
 *
 * Title segments: lowercased and joined with `-` (spaces removed, but no
 * camelCase splitting — Storybook keeps title segments as-is).
 *
 * Story name: camelCase / PascalCase is split into kebab-case.
 * e.g. ("UI/DropdownMenu", "ActionMenu") → "ui-dropdownmenu--action-menu"
 *      ("Global/Header/GlobalHeader", "ScrollBehaviour") → "global-header-globalheader--scroll-behaviour"
 */
export function storyId(title: string, name: string): string {
  const prefix = title
    .split("/")
    .map((s) => s.toLowerCase().replace(/\s+/g, ""))
    .join("-");
  // Convert PascalCase/camelCase to kebab-case, then collapse whitespace
  const suffix = name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `${prefix}--${suffix}`;
}
