// @vitest-environment jsdom
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHeaderScroll } from "../use-header-scroll.js";

// Mock useScrollDirection so we can drive direction changes directly
let mockDirection: "up" | "down" | null = null;
vi.mock("../use-scroll-direction", () => ({
  useScrollDirection: () => mockDirection,
}));

describe("useHeaderScroll", () => {
  beforeEach(() => {
    mockDirection = null;
    // Default scrollY to 0
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("returns true (visible) when direction is null", () => {
    mockDirection = null;
    const { result } = renderHook(() => useHeaderScroll());
    expect(result.current).toBe(true);
  });

  it("returns true when scrollY is below threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    mockDirection = "down";
    const { result } = renderHook(() => useHeaderScroll({ threshold: 200 }));
    expect(result.current).toBe(true);
  });

  it("returns false when scrolling down past threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 300, writable: true });
    mockDirection = "down";
    const { result } = renderHook(() => useHeaderScroll({ threshold: 200 }));
    expect(result.current).toBe(false);
  });

  it("returns true when scrolling up past threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 300, writable: true });
    mockDirection = "up";
    const { result } = renderHook(() => useHeaderScroll({ threshold: 200 }));
    expect(result.current).toBe(true);
  });

  it("uses default threshold of 200", () => {
    Object.defineProperty(window, "scrollY", { value: 201, writable: true });
    mockDirection = "down";
    const { result } = renderHook(() => useHeaderScroll());
    expect(result.current).toBe(false);
  });

  it("respects custom threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    mockDirection = "down";
    const { result } = renderHook(() => useHeaderScroll({ threshold: 500 }));
    // 400 < 500, so should still be visible
    expect(result.current).toBe(true);
  });
});
