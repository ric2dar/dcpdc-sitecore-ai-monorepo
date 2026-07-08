import { describe, it, expect } from "vitest";
import {
  formatEventDate,
  formatEventDateRange,
  formatEventTime,
} from "../format-event-date.js";

describe("formatEventDate", () => {
  it("formats a valid ISO date with zero-padded day", () => {
    expect(formatEventDate("2025-10-09T00:00:00Z")).toBe("09 October 2025");
  });

  it("formats single-digit day with zero-padding", () => {
    expect(formatEventDate("2026-01-07T00:00:00Z")).toBe("07 January 2026");
  });

  it("formats double-digit day", () => {
    expect(formatEventDate("2025-12-29T00:00:00Z")).toBe("29 December 2025");
  });

  it("returns original string for invalid date", () => {
    expect(formatEventDate("not-a-date")).toBe("not-a-date");
  });
});

describe("formatEventDateRange", () => {
  // ── Same day ──────────────────────────────────────────────────────────
  it("returns single date when start and end are the same day", () => {
    expect(
      formatEventDateRange("2025-10-09T07:00:00Z", "2025-10-09T11:30:00Z"),
    ).toBe("09 October 2025");
  });

  // ── Same month & year ─────────────────────────────────────────────────
  it("formats same-month range as 'dd - dd Month YYYY'", () => {
    expect(
      formatEventDateRange("2026-01-07T07:00:00Z", "2026-01-12T11:30:00Z"),
    ).toBe("07 - 12 January 2026");
  });

  // ── Different month, same year ────────────────────────────────────────
  it("formats different-month range as 'dd Month - dd Month YYYY'", () => {
    expect(
      formatEventDateRange("2026-01-12T00:00:00+10:00", "2026-02-01T00:00:00+10:00"),
    ).toBe("12 January - 01 February 2026");
  });

  // ── Different year ────────────────────────────────────────────────────
  it("formats different-year range as 'dd Month YYYY - dd Month YYYY'", () => {
    expect(
      formatEventDateRange("2026-12-29T00:00:00+10:00", "2027-01-03T00:00:00+10:00"),
    ).toBe("29 December 2026 - 03 January 2027");
  });

  // ── Fallbacks ─────────────────────────────────────────────────────────
  it("falls back to single date when no end date provided", () => {
    expect(formatEventDateRange("2025-10-09T07:00:00Z")).toBe(
      "09 October 2025",
    );
  });

  it("falls back to single date when end date is undefined", () => {
    expect(formatEventDateRange("2025-10-09T07:00:00Z", undefined)).toBe(
      "09 October 2025",
    );
  });

  it("falls back to single date when end date is invalid", () => {
    expect(formatEventDateRange("2025-10-09T07:00:00Z", "bad")).toBe(
      "09 October 2025",
    );
  });

  it("returns raw start string when start date is invalid", () => {
    expect(formatEventDateRange("bad-date", "2025-10-09T07:00:00Z")).toBe(
      "bad-date",
    );
  });
});

describe("formatEventTime", () => {
  it("formats morning time in 12-hour lowercase", () => {
    const result = formatEventTime("2025-10-09T07:00:00Z");
    // Locale-dependent — check structure rather than exact value
    expect(result).toMatch(/\d{1,2}:\d{2}\s?(am|pm)/);
  });

  it("returns empty string for invalid date", () => {
    expect(formatEventTime("not-a-date")).toBe("");
  });
});
