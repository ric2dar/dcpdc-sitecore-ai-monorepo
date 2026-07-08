import { defineConfig } from "@playwright/test";

/**
 * Playwright configuration for WCAG 2.2 AA E2E accessibility tests.
 * Tests run against Storybook stories rendered in a real browser.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:6006",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10_000,
  },
  /* Start Storybook before running tests if not already running */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:6006",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 320, height: 896 } },
      testMatch: /reflow/,
    },
  ],
});
