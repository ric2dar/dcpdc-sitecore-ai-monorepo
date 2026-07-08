// @vitest-environment jsdom
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, fireEvent } from "@testing-library/react";
import { useScrollDirection } from "../use-scroll-direction.js";

// Queue rAF callbacks so ticking.current resets correctly between scroll events.
// Running the callback synchronously inside rAF leaves ticking stuck at true
// because `ticking.current = true` executes after the callback.
let rafQueue: FrameRequestCallback[] = [];

function flushRAF() {
  const cbs = [...rafQueue];
  rafQueue = [];
  cbs.forEach((cb) => cb(0));
}

function simulateScroll(scrollY: number) {
  Object.defineProperty(window, "scrollY", {
    value: scrollY,
    writable: true,
    configurable: true,
  });
  fireEvent.scroll(window);
  flushRAF();
}

describe("useScrollDirection", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
    rafQueue = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });
    (window.matchMedia as ReturnType<typeof vi.fn>).mockImplementation(
      (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );
  });

  it("returns null initially (default state, no scrolling)", () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toBeNull();
  });

  it("returns initialDirection when option is provided", () => {
    const { result } = renderHook(() =>
      useScrollDirection({ initialDirection: "down" }),
    );
    expect(result.current).toBe("down");
  });

  it('returns "down" after scrolling down past threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      simulateScroll(100);
    });

    expect(result.current).toBe("down");
  });

  it('returns "up" after scrolling up past threshold', () => {
    Object.defineProperty(window, "scrollY", {
      value: 200,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      simulateScroll(300);
    });

    expect(result.current).toBe("down");

    act(() => {
      simulateScroll(200);
    });

    expect(result.current).toBe("up");
  });

  it("does NOT update direction when scroll delta is below threshold", () => {
    const { result } = renderHook(() =>
      useScrollDirection({ threshold: 50 }),
    );

    act(() => {
      simulateScroll(5);
    });

    expect(result.current).toBeNull();
  });

  it("resets to null when scroll position returns to 0", () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      simulateScroll(100);
    });

    expect(result.current).toBe("down");

    act(() => {
      simulateScroll(0);
    });

    expect(result.current).toBeNull();
  });

  it("respects custom threshold option", () => {
    const { result } = renderHook(() =>
      useScrollDirection({ threshold: 100 }),
    );

    act(() => {
      simulateScroll(50);
    });

    expect(result.current).toBeNull();

    act(() => {
      simulateScroll(150);
    });

    expect(result.current).toBe("down");
  });

  it("returns null always when prefers-reduced-motion: reduce matches", () => {
    (window.matchMedia as ReturnType<typeof vi.fn>).mockImplementation(
      (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      simulateScroll(200);
    });

    expect(result.current).toBeNull();
  });
});
