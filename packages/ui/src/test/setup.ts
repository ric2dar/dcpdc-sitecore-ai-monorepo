import "@testing-library/jest-dom/vitest";
// @ts-expect-error - vitest-axe/matchers has no type declarations
import * as matchers from "vitest-axe/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

// jsdom doesn't implement matchMedia — stub it globally for components
// that use media queries (Sheet auto-close, Carousel, useMediaQuery, etc.)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Extend vitest expect with axe matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
