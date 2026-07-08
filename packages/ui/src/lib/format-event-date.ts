/**
 * Event date/time formatting utilities.
 *
 * Pure functions for formatting ISO date strings into display strings
 *
 * Date format: zero-padded day, full month name, 4-digit year.
 * Time format: 12-hour with lowercase am/pm (e.g. "7:00 am").
 */

/** Zero-pads a number to two digits. */
function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

/**
 * Formats an ISO date string to "09 October 2025" (zero-padded day, no ordinal).
 * Used as fallback when no end date is provided.
 */
export function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate;

  const day = pad2(date.getDate());
  const month = date.toLocaleDateString('en-AU', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Formats a date range from two ISO date strings.
 *
 * Scenarios:
 * - Same day:            "09 October 2025"
 * - Same month & year:   "07 - 12 January 2026"
 * - Different month:     "12 January - 01 February 2026"
 * - Different year:      "29 December 2026 - 03 January 2027"
 * - No end date:         falls back to formatEventDate(start)
 */
export function formatEventDateRange(startIso: string, endIso?: string): string {
  const start = new Date(startIso);
  if (isNaN(start.getTime())) return startIso;

  if (!endIso) return formatEventDate(startIso);

  const end = new Date(endIso);
  if (isNaN(end.getTime())) return formatEventDate(startIso);

  const sDay = start.getDate();
  const eDay = end.getDate();
  const sMonth = start.getMonth();
  const eMonth = end.getMonth();
  const sYear = start.getFullYear();
  const eYear = end.getFullYear();

  const sMonthName = start.toLocaleDateString('en-AU', { month: 'long' });
  const eMonthName = end.toLocaleDateString('en-AU', { month: 'long' });

  // Same day — single date
  if (sDay === eDay && sMonth === eMonth && sYear === eYear) {
    return `${pad2(sDay)} ${sMonthName} ${sYear}`;
  }

  // Same month & year — "07 - 12 January 2026"
  if (sMonth === eMonth && sYear === eYear) {
    return `${pad2(sDay)} - ${pad2(eDay)} ${sMonthName} ${sYear}`;
  }

  // Different month, same year — "12 January - 01 February 2026"
  if (sYear === eYear) {
    return `${pad2(sDay)} ${sMonthName} - ${pad2(eDay)} ${eMonthName} ${eYear}`;
  }

  // Different year — "29 December 2026 - 03 January 2027"
  return `${pad2(sDay)} ${sMonthName} ${sYear} - ${pad2(eDay)} ${eMonthName} ${eYear}`;
}

/** Formats an ISO date string to "7:00 am" (12-hour, lowercase am/pm, FSD BR02). */
export function formatEventTime(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  return date
    .toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase();
}
