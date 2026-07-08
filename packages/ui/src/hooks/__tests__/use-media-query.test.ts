// @vitest-environment jsdom
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useMediaQuery,
  useIsDesktopNav,
  useIsMobile,
  NAV_DESKTOP_BREAKPOINT,
  NAV_TABLET_LANDSCAPE_BREAKPOINT,
} from "../use-media-query.js";

// ---------------------------------------------------------------------------
// matchMedia mock
// ---------------------------------------------------------------------------
type ChangeHandler = (event: { matches: boolean }) => void;

function createMatchMediaMock() {
  const listeners = new Map<string, Set<ChangeHandler>>();
  const matchValues = new Map<string, boolean>();

  const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matchValues.get(query) ?? false;
    },
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, handler: ChangeHandler) => {
      if (!listeners.has(query)) listeners.set(query, new Set());
      listeners.get(query)!.add(handler);
    }),
    removeEventListener: vi.fn((_event: string, handler: ChangeHandler) => {
      listeners.get(query)?.delete(handler);
    }),
    dispatchEvent: vi.fn(),
  }));

  return {
    mockMatchMedia,
    setMatch: (query: string, matches: boolean) => {
      matchValues.set(query, matches);
    },
    fireChange: (query: string, matches: boolean) => {
      matchValues.set(query, matches);
      listeners.get(query)?.forEach((h) => h({ matches }));
    },
    clearAll: () => {
      listeners.clear();
      matchValues.clear();
    },
  };
}

// ---------------------------------------------------------------------------
// Shared setup
// ---------------------------------------------------------------------------
let mock: ReturnType<typeof createMatchMediaMock>;

beforeEach(() => {
  mock = createMatchMediaMock();
  vi.stubGlobal("matchMedia", mock.mockMatchMedia);
});

// ---------------------------------------------------------------------------
// useMediaQuery
// ---------------------------------------------------------------------------
describe("useMediaQuery", () => {
  const QUERY = "(min-width: 800px)";

  it("returns false by default when query does not match", () => {
    const { result } = renderHook(() => useMediaQuery(QUERY));
    expect(result.current).toBe(false);
  });

  it("returns true when query matches initially", () => {
    mock.setMatch(QUERY, true);
    const { result } = renderHook(() => useMediaQuery(QUERY));
    expect(result.current).toBe(true);
  });

  it("updates to true when change event fires with matches: true", () => {
    const { result } = renderHook(() => useMediaQuery(QUERY));
    expect(result.current).toBe(false);

    act(() => {
      mock.fireChange(QUERY, true);
    });

    expect(result.current).toBe(true);
  });

  it("updates to false when change event fires with matches: false", () => {
    mock.setMatch(QUERY, true);
    const { result } = renderHook(() => useMediaQuery(QUERY));
    expect(result.current).toBe(true);

    act(() => {
      mock.fireChange(QUERY, false);
    });

    expect(result.current).toBe(false);
  });

  it("cleans up listener on unmount", () => {
    const { unmount } = renderHook(() => useMediaQuery(QUERY));

    // One matchMedia call → one MediaQueryList instance
    const mql = mock.mockMatchMedia.mock.results[0]?.value;
    expect(mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});

// ---------------------------------------------------------------------------
// useIsDesktopNav
// ---------------------------------------------------------------------------
describe("useIsDesktopNav", () => {
  const DESKTOP_QUERY = `(min-width: ${NAV_DESKTOP_BREAKPOINT}px)`;
  const TABLET_QUERY = `(min-width: ${NAV_TABLET_LANDSCAPE_BREAKPOINT}px) and (orientation: landscape)`;

  it("returns false when both queries do not match (narrow viewport)", () => {
    const { result } = renderHook(() => useIsDesktopNav());
    expect(result.current).toBe(false);
  });

  it("returns true when desktop width query matches (≥1312px)", () => {
    mock.setMatch(DESKTOP_QUERY, true);
    const { result } = renderHook(() => useIsDesktopNav());
    expect(result.current).toBe(true);
  });

  it("returns true when tablet landscape query matches (≥1024px + landscape)", () => {
    mock.setMatch(TABLET_QUERY, true);
    const { result } = renderHook(() => useIsDesktopNav());
    expect(result.current).toBe(true);
  });

  it("returns true when both queries match", () => {
    mock.setMatch(DESKTOP_QUERY, true);
    mock.setMatch(TABLET_QUERY, true);
    const { result } = renderHook(() => useIsDesktopNav());
    expect(result.current).toBe(true);
  });

  it("updates when a change event fires", () => {
    const { result } = renderHook(() => useIsDesktopNav());
    expect(result.current).toBe(false);

    act(() => {
      mock.fireChange(DESKTOP_QUERY, true);
    });

    expect(result.current).toBe(true);

    act(() => {
      mock.fireChange(DESKTOP_QUERY, false);
    });

    expect(result.current).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// useIsMobile
// ---------------------------------------------------------------------------
describe("useIsMobile", () => {
  const MOBILE_QUERY = "(max-width: 767px)";

  it("returns false when mobile query does not match", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when mobile query matches", () => {
    mock.setMatch(MOBILE_QUERY, true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when change event fires", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      mock.fireChange(MOBILE_QUERY, true);
    });

    expect(result.current).toBe(true);

    act(() => {
      mock.fireChange(MOBILE_QUERY, false);
    });

    expect(result.current).toBe(false);
  });
});
