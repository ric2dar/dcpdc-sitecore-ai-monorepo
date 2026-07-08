# WCAG 2.2 AA — Automated Accessibility Test Coverage Report

> **Project:** 
> **Date:** 
> **Tool:** axe-core 4.11.1 via vitest-axe 0.1.0  
> **Test runner:** Vitest + @testing-library/react  
> **Total a11y test files:** 53  
> **Total a11y test cases:** 171  

---

## Executive Summary

The project uses **axe-core 4.11.1** (Deque) to perform automated WCAG compliance scanning across **53 component-level test files** containing **171 individual test cases**. Tests run against every variant/state of each component using `vitest-axe`'s `toHaveNoViolations()` matcher.

axe-core is configured with explicit WCAG 2.2 AA targeting via a shared `axeRunOptions` configuration (`packages/ui/src/test/axe-config.ts`) that filters to `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and `wcag22aa` tags. This ensures only WCAG-relevant rules are evaluated, covering **66 rules** mapped to **23 WCAG success criteria** across levels A and AA (WCAG 2.0, 2.1, and 2.2).

Additionally, **48 behavioural test files** exercise keyboard interaction, ARIA attributes, and focus management patterns — complementing the automated scans with interaction-level coverage.

---

## WCAG 2.2 AA Success Criteria Coverage

### ✅ Criteria Covered by Automated Tests (axe-core)

The following WCAG 2.2 Level A and AA success criteria are automatically checked by axe-core whenever `toHaveNoViolations()` runs:

#### Principle 1 — Perceivable

| SC | Name | Level | axe-core Rules | Status |
|----|------|-------|----------------|--------|
| 1.1.1 | Non-text Content | A | `image-alt`, `input-image-alt`, `object-alt`, `role-img-alt`, `svg-img-alt`, `aria-meter-name`, `aria-progressbar-name` | ✅ Covered |
| 1.2.1 | Audio-only and Video-only | A | `audio-caption` | ✅ Covered |
| 1.2.2 | Captions (Prerecorded) | A | `video-caption` | ✅ Covered |
| 1.3.1 | Info and Relationships | A | `aria-hidden-body`, `aria-required-children`, `aria-required-parent`, `definition-list`, `dlitem`, `list`, `listitem`, `p-as-heading`, `table-fake-caption`, `td-has-header`, `td-headers-attr`, `th-has-data-cells` | ✅ Covered |
| 1.3.4 | Orientation | AA | `css-orientation-lock` | ✅ Covered |
| 1.3.5 | Identify Input Purpose | AA | `autocomplete-valid` | ✅ Covered |
| 1.4.1 | Use of Color | A | `link-in-text-block` | ✅ Covered |
| 1.4.2 | Audio Control | A | `no-autoplay-audio` | ✅ Covered |
| 1.4.3 | Contrast (Minimum) | AA | `color-contrast` | ✅ Covered |
| 1.4.4 | Resize Text | AA | `meta-viewport` | ✅ Covered |
| 1.4.12 | Text Spacing | AA | `avoid-inline-spacing` | ✅ Covered |

#### Principle 2 — Operable

| SC | Name | Level | axe-core Rules | Status |
|----|------|-------|----------------|--------|
| 2.1.1 | Keyboard | A | `frame-focusable-content`, `scrollable-region-focusable`, `server-side-image-map` | ✅ Covered |
| 2.1.3 | Keyboard (No Exception) | AAA¹ | `scrollable-region-focusable` | ✅ Covered |
| 2.2.1 | Timing Adjustable | A | `meta-refresh` | ✅ Covered |
| 2.2.2 | Pause, Stop, Hide | A | `blink`, `marquee` | ✅ Covered |
| 2.4.1 | Bypass Blocks | A | `bypass` | ✅ Covered |
| 2.4.2 | Page Titled | A | `document-title` | ✅ Covered |
| 2.4.4 | Link Purpose (In Context) | A | `area-alt`, `link-name` | ✅ Covered |
| 2.5.3 | Label in Name | A | `label-content-name-mismatch` | ✅ Covered |
| **2.5.8** | **Target Size (Minimum)** | **AA** | `target-size` | ✅ **Covered (WCAG 2.2 new)** |

#### Principle 3 — Understandable

| SC | Name | Level | axe-core Rules | Status |
|----|------|-------|----------------|--------|
| 3.1.1 | Language of Page | A | `html-has-lang`, `html-lang-valid`, `html-xml-lang-mismatch` | ✅ Covered |
| 3.1.2 | Language of Parts | AA | `valid-lang` | ✅ Covered |
| 3.3.2 | Labels or Instructions | A | `form-field-multiple-labels` | ✅ Covered |

#### Principle 4 — Robust

| SC | Name | Level | axe-core Rules | Status |
|----|------|-------|----------------|--------|
| 4.1.2 | Name, Role, Value | A | `aria-allowed-attr`, `aria-command-name`, `aria-hidden-focus`, `aria-input-field-name`, `aria-required-attr`, `aria-roles`, `aria-valid-attr`, `aria-valid-attr-value`, `button-name`, `duplicate-id-aria`, `frame-title`, `input-button-name`, `label`, `link-name`, `nested-interactive`, `select-name`, + 12 more | ✅ Covered |

> ¹ 2.1.3 is AAA but axe-core includes it by default; reported here for completeness.

---

### ⚠️ Criteria Partially Covered (Behavioural Tests Only)

These criteria have no axe-core rule but **are addressed through manual/behavioural unit tests** (keyboard events, ARIA attribute assertions, focus management) found across 48 test files:

| SC | Name | Level | How Tested | Components Covered |
|----|------|-------|------------|--------------------|
| 1.3.2 | Meaningful Sequence | A | DOM order tests in component tests | Breadcrumb, Pagination, Table |
| 2.1.2 | No Keyboard Trap | A | `fireEvent.keyDown(Escape)` tests | Sheet, Lightbox, MobileNavigation, GlobalAlert |
| 2.4.3 | Focus Order | A | Focus management tests | Sheet, Lightbox, InPageNavMenu, Carousel |
| 2.4.7 | Focus Visible | AA | `focus-visible:ring-*` classes asserted | Button, Link, Checkbox, RadioGroup |
| 3.2.1 | On Focus | A | Focus handler tests | SearchInput, NavigationMenu |
| 3.2.2 | On Input | A | Change handler tests | Checkbox, RadioGroup, SearchInput |
| 3.3.1 | Error Identification | A | Error state rendering tests | Checkbox, Callout |
| 4.1.3 | Status Messages | AA | `role="status"` / `aria-live` assertions | GlobalAlert, Callout, Badge |

---

### ❌ Criteria NOT Covered by Automated Tests

The following WCAG 2.2 AA success criteria have **no automated test coverage** in the current suite. These typically require manual testing, browser-level testing, or integration/E2E testing.

#### Cannot Be Automated (Require Human Judgement)

| SC | Name | Level | Why Not Automatable | Recommendation |
|----|------|-------|---------------------|----------------|
| 1.2.3 | Audio Description or Media Alternative | A | Requires evaluating whether audio descriptions are sufficient | Add manual test checklist for video components |
| 1.2.4 | Captions (Live) | AA | Requires live content evaluation | N/A unless live video is used |
| 1.2.5 | Audio Description (Prerecorded) | AA | Requires evaluating media alternatives | Add manual test checklist for video components |
| 1.3.3 | Sensory Characteristics | A | Requires evaluating instructions for sensory-only cues | Manual review of content |
| 1.4.5 | Images of Text | AA | Requires evaluating whether text is used instead of images | Manual design review |
| 1.4.11 | Non-text Contrast | AA | axe only covers text contrast; UI borders, icons, and focus indicators need manual checking | Manual review with colour contrast analyser tool |
| 2.4.5 | Multiple Ways | AA | Requires evaluating site-level navigation alternatives | E2E/integration test or manual |
| 2.4.6 | Headings and Labels | AA | Requires evaluating descriptive quality | Manual content review |
| 2.5.1 | Pointer Gestures | A | Requires evaluating gesture alternatives | Manual testing of touch interactions |
| 2.5.2 | Pointer Cancellation | A | Requires evaluating up-event behaviour | Manual testing |
| 3.2.3 | Consistent Navigation | AA | Requires cross-page comparison | E2E test or manual review |
| 3.2.4 | Consistent Identification | AA | Requires cross-page comparison | E2E test or manual review |
| 3.3.3 | Error Suggestion | AA | Requires evaluating suggestion quality | Manual review of form validation |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Context-dependent evaluation | Manual review where applicable |

#### Could Be Automated (Gaps to Close)

| SC | Name | Level | Status |
|----|------|-------|--------|
| 1.4.4 | Resize Text | AA | axe checks `meta-viewport` only; Playwright tests at 200% zoom planned |
| ~~1.4.10~~ | ~~Reflow~~ | ~~AA~~ | ✅ **Done** — Playwright E2E tests verify no horizontal overflow at 320px width |
| ~~1.4.13~~ | ~~Content on Hover or Focus~~ | ~~AA~~ | ✅ **Done** — Playwright E2E tests verify Escape dismissal, hover persistence, and pointer hoverable for DropdownMenu and MegaMenu |
| ~~2.4.11~~ | ~~Focus Not Obscured (Minimum)~~ | ~~AA~~ | ✅ **Done** — Playwright E2E tests verify focused elements are not hidden by sticky GlobalHeader |
| ~~2.5.7~~ | ~~Dragging Movements~~ | ~~AA~~ | ✅ **Done** — Playwright E2E tests verify all carousel variants have Previous/Next button alternatives and keyboard navigation |
| 3.2.6 | Consistent Help | A | **WCAG 2.2 new** — Verify help mechanisms appear in same relative order across pages (when built) |
| 3.3.7 | Redundant Entry | A | **WCAG 2.2 new** — Verify forms auto-populate or allow selection of previously entered data (when built) |
| 3.3.8 | Accessible Authentication (Minimum) | AA | **WCAG 2.2 new** — Verify no cognitive function test is required for login (when built) |

---

## WCAG 2.2 — New Success Criteria Summary

WCAG 2.2 introduced **9 new success criteria**. Here is their coverage status in this project:

| SC | Name | Level | Automated Coverage | Notes |
|----|------|-------|--------------------|-------|
| 2.4.11 | Focus Not Obscured (Minimum) | AA | ❌ Not covered | Needs Playwright/E2E tests with sticky header scenarios |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA | — | Out of scope (AAA) |
| 2.4.13 | Focus Appearance | AAA | — | Out of scope (AAA) |
| 2.5.7 | Dragging Movements | AA | ❌ Not covered | Verify single-pointer alternatives exist for any drag UI |
| 2.5.8 | Target Size (Minimum) | AA | ✅ **Covered** | axe-core `target-size` rule runs on all 53 test files |
| 3.2.6 | Consistent Help | A | ❌ Not covered | Needs cross-page E2E verification |
| 3.3.7 | Redundant Entry | A | ❌ Not covered | Needs form flow E2E tests |
| 3.3.8 | Accessible Authentication (Minimum) | AA | ❌ Not covered | Review when auth flows are implemented |
| 3.3.9 | Accessible Authentication (Enhanced) | AAA | — | Out of scope (AAA) |

---

## Recommendations

### Priority 1 — Quick Wins (axe-core configuration)

1. ~~**Add `runOnly` configuration for WCAG 2.2 AA**~~ ✅ **Done** — All 53 a11y test files now use a shared `axeRunOptions` config (`packages/ui/src/test/axe-config.ts`) that explicitly targets `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` tags.

2. ~~**Add Storybook accessibility addon**~~ ✅ **Already in place** — `@storybook/addon-a11y` is installed and configured in `apps/storybook/.storybook/main.ts`.

### Priority 2 — Close WCAG 2.2 Gaps

3. ~~**Add Playwright E2E tests for Focus Not Obscured (2.4.11)**~~ ✅ **Done** — `apps/storybook/e2e/wcag-2.4.11-focus-not-obscured.spec.ts` verifies focused elements (outside the header itself) are not entirely obscured by the sticky GlobalHeader, and that below-fold elements remain visible after scrolling.

4. ~~**Add Playwright E2E tests for Reflow (1.4.10)**~~ ✅ **Done** — `apps/storybook/e2e/wcag-1.4.10-reflow.spec.ts` checks 5 key stories at 320px viewport for horizontal overflow. Carousels are exempt (internal scroll containers). All stories pass.

5. ~~**Add Playwright E2E tests for Content on Hover or Focus (1.4.13)**~~ ✅ **Done** — `apps/storybook/e2e/wcag-1.4.13-hover-focus-content.spec.ts` verifies DropdownMenu and MegaMenu content can be dismissed with Escape, persists while interacting, and appears on hover/focus.

6. ~~**Audit drag interactions for 2.5.7 (Dragging Movements)**~~ ✅ **Done** — `apps/storybook/e2e/wcag-2.5.7-dragging-movements.spec.ts` verifies all 3 carousel variants (UI/Carousel, CardCarousel, MediaCarousel) provide Previous/Next button alternatives, buttons are functional, and keyboard navigation works.

### Priority 3 — Structural Improvements

7. ~~**Add `@storybook/addon-a11y`**~~ ✅ **Already in place** — Installed and configured.

8. ~~**Create a manual testing checklist**~~ ✅ **Done** — See [`docs/wcag-2.2-manual-qa-checklist.md`](./wcag-2.2-manual-qa-checklist.md) for non-automatable criteria (1.2.3, 1.2.5, 1.3.3, 1.4.5, 2.4.5, 2.4.6, 3.2.3, 3.2.4, 3.3.3, 3.3.4, plus all WCAG 2.2 new criteria and screen reader testing).

9. **Add consistent help verification (3.2.6)** — When help/contact mechanisms are built, add E2E tests verifying they appear in the same relative location across pages.

10. **Add redundant entry tests (3.3.7)** — When multi-step forms are implemented, add tests verifying previously entered data is auto-populated or selectable.

---

## Methodology

- **Automated scanning:** Every component renders in jsdom via `@testing-library/react`, then `axe(container, axeRunOptions)` runs with explicit WCAG 2.2 AA tag filtering (via shared config in `packages/ui/src/test/axe-config.ts`).
- **Behavioural testing:** Unit tests in `*.test.tsx` files verify keyboard interaction (`fireEvent.keyDown`), ARIA attribute correctness (`getByRole`, `aria-*` assertions), and focus management.
- **E2E testing:** Playwright tests in `apps/storybook/e2e/` verify WCAG criteria that require real browser behaviour — viewport reflow (1.4.10), hover/focus content dismissal (1.4.13), focus obscuration by sticky elements (2.4.11), and drag alternatives (2.5.7).
- **Coverage scope:** Tests cover the `@repo/ui` package (shared component library). Sitecore rendering adapters are not separately tested for a11y since they delegate to the UI components.

### Limitations of Automated Testing

Automated tools like axe-core can detect approximately **30–40% of WCAG issues**. The remaining criteria require:
- **Manual inspection** (content quality, sensory cues, meaningful sequence)
- **Browser-based testing** (colour contrast with computed styles, reflow at different viewports)
- **Assistive technology testing** (screen readers like NVDA/JAWS/VoiceOver)
- **User testing** (cognitive accessibility, usability)

---

*Report generated from codebase analysis of `packages/ui/src/components/__tests__/` and `packages/ui/src/features/__tests__/`.*
