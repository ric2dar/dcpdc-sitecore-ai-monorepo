# WCAG 2.2 AA — Manual QA Testing Checklist

> **Purpose:** Cover WCAG 2.2 AA success criteria that cannot be verified through automated testing (axe-core / vitest-axe).  
> **Usage:** Complete this checklist during QA for each release or significant UI change.

---

## How to Use

- Test with at least **two browsers** (Chrome + Safari recommended)
- Test with at least **one screen reader** (VoiceOver on macOS, NVDA on Windows)
- Test at minimum **three viewports**: mobile (414px), tablet (1024px), desktop (1440px)
- Mark each item: ✅ Pass | ❌ Fail | ⏭️ N/A

---

## Principle 1 — Perceivable

### 1.2.3 Audio Description or Media Alternative (A)
- [ ] All prerecorded video content has either an audio description track or a text transcript
- [ ] The alternative conveys the same information as the video

### 1.2.4 Captions (Live) (AA)
- [ ] Any live video content provides real-time captions
- [ ] ⏭️ Skip if no live video features exist

### 1.2.5 Audio Description (Prerecorded) (AA)
- [ ] Prerecorded video provides audio descriptions for visual-only content
- [ ] Audio descriptions are synchronised with the video content

### 1.3.2 Meaningful Sequence (A)
- [ ] Reading order in the DOM matches the visual presentation order
- [ ] CSS positioning does not create a different reading order from the DOM
- [ ] Tab order follows a logical sequence (left-to-right, top-to-bottom)

### 1.3.3 Sensory Characteristics (A)
- [ ] Instructions do not rely solely on shape, colour, size, or position (e.g., "click the round button" or "the red link")
- [ ] Error messages use text labels, not just colour

### 1.4.5 Images of Text (AA)
- [ ] Text is rendered as HTML text, not as images
- [ ] Exceptions: logos and branding may use images of text
- [ ] Any images of text have equivalent alt text

### 1.4.10 Reflow (AA)
> ℹ️ *Partially automated — Playwright E2E tests verify 5 key components at 320px. Manual check confirms full-page behaviour.*
- [ ] Content reflows to a single column at 320px CSS width without horizontal scrolling
- [ ] No loss of content or functionality at 320px width
- [ ] Data tables may scroll horizontally (this is acceptable)
- [ ] Test: Zoom browser to 400% at 1280px width

### 1.4.11 Non-text Contrast (AA)
- [ ] UI component boundaries (form fields, buttons) have ≥ 3:1 contrast ratio
- [ ] Graphical elements required for understanding (icons, chart data) have ≥ 3:1 contrast ratio
- [ ] Focus indicators have ≥ 3:1 contrast ratio against adjacent colours
- [ ] Custom checkbox/radio visual indicators meet contrast requirements

### 1.4.13 Content on Hover or Focus (AA)
> ℹ️ *Partially automated — Playwright E2E tests cover DropdownMenu and MegaMenu. Manual check confirms other hover/focus patterns.*
- [ ] Tooltips/popovers can be dismissed with Escape key without moving focus
- [ ] Hoverable content remains visible while pointer is over it
- [ ] Focusable content remains visible while it has focus
- [ ] Content persists until user dismisses it, it is no longer relevant, or hover/focus is removed

---

## Principle 2 — Operable

### 2.1.2 No Keyboard Trap (A)
- [ ] Focus can always be moved away from any component using Tab or Shift+Tab
- [ ] If a component traps focus (modal, dialog), Escape releases it
- [ ] No infinite keyboard loops exist

### 2.4.3 Focus Order (A)
- [ ] Tab order follows a logical, meaningful sequence
- [ ] After closing a modal/dialog, focus returns to the triggering element
- [ ] Skip links move focus to main content area

### 2.4.5 Multiple Ways (AA)
- [ ] At least two ways to reach every page (e.g., navigation + search, navigation + sitemap)
- [ ] Exception: pages that are steps in a process

### 2.4.6 Headings and Labels (AA)
- [ ] Headings describe the topic or purpose of the content section
- [ ] Form labels describe the purpose of the input
- [ ] Headings follow a logical hierarchy (no skipping levels, e.g., h1 → h3)

### 2.4.7 Focus Visible (AA)
- [ ] All interactive elements show a visible focus indicator when focused via keyboard
- [ ] Focus indicators have sufficient contrast (≥ 3:1) against surrounding content
- [ ] Focus indicators are visible in both light and dark mode (if applicable)

### 2.4.11 Focus Not Obscured (Minimum) (AA) — **WCAG 2.2 New**
> ℹ️ *Partially automated — Playwright E2E tests verify focus is not obscured by the sticky GlobalHeader. Manual check confirms other fixed/sticky elements.*
- [ ] When an element receives keyboard focus, it is not entirely hidden by sticky headers, footers, or other fixed-position content
- [ ] Tabbing through the page, focused elements are always at least partially visible
- [ ] Test with the sticky global header present

### 2.5.1 Pointer Gestures (A)
- [ ] Multi-point gestures (pinch, swipe) have single-pointer alternatives
- [ ] Path-based gestures have alternative single-point activation
- [ ] Carousel: arrow buttons exist alongside swipe gestures

### 2.5.2 Pointer Cancellation (A)
- [ ] Actions trigger on up-event (mouseup/pointerup), not on down-event
- [ ] User can move pointer off the target before releasing to cancel the action
- [ ] Exception: down-event is essential (e.g., keyboard keys, drag interactions)

### 2.5.7 Dragging Movements (AA) — **WCAG 2.2 New**
> ℹ️ *Partially automated — Playwright E2E tests verify all 3 carousel variants have button alternatives. Manual check confirms any new drag interactions.*
- [ ] Any drag-and-drop interaction has a single-pointer alternative (e.g., buttons, menus)
- [ ] ⏭️ Skip if no drag interactions exist in the current UI

### 2.5.8 Target Size (Minimum) (AA) — **WCAG 2.2 New**
- [ ] Interactive targets are at least 24×24 CSS pixels
- [ ] Or the target has sufficient spacing from adjacent targets
- [ ] Exceptions: inline text links, browser-default controls

---

## Principle 3 — Understandable

### 3.2.1 On Focus (A)
- [ ] Moving focus to a component does not trigger a change of context (page navigation, form submission, modal opening)
- [ ] Focus events may reveal content but must not redirect or submit

### 3.2.2 On Input (A)
- [ ] Changing a form input value does not automatically cause a context change
- [ ] Exception: the user was advised of the behaviour before interacting

### 3.2.3 Consistent Navigation (AA)
- [ ] Navigation menus appear in the same relative order across all pages
- [ ] Primary navigation, breadcrumbs, and footer remain consistent

### 3.2.4 Consistent Identification (AA)
- [ ] Components with the same functionality use the same labels across pages
- [ ] Icons with the same meaning use the same image/symbol across pages

### 3.2.6 Consistent Help (A) — **WCAG 2.2 New**
- [ ] Help mechanisms (contact info, chat, FAQ links) appear in the same relative order on every page
- [ ] ⏭️ Skip if no help mechanisms exist yet

### 3.3.1 Error Identification (A)
- [ ] Errors are identified in text (not just colour)
- [ ] Error messages clearly indicate which field has the error
- [ ] Errors are announced to screen readers (via aria-live or role="alert")

### 3.3.2 Labels or Instructions (A)
- [ ] All form fields have visible labels
- [ ] Required fields are indicated (not just with colour)
- [ ] Instruction text is provided where input format is not obvious

### 3.3.3 Error Suggestion (AA)
- [ ] When an input error is detected, suggestions for correction are provided
- [ ] Suggestions are specific and actionable (e.g., "Email must include @")

### 3.3.4 Error Prevention (Legal, Financial, Data) (AA)
- [ ] Submissions that involve legal/financial commitments are reversible, checked, or confirmed
- [ ] Users can review and correct data before final submission
- [ ] ⏭️ Skip if no legal/financial forms exist

### 3.3.7 Redundant Entry (A) — **WCAG 2.2 New**
- [ ] Previously entered information is auto-populated or available for selection in multi-step forms
- [ ] Users are not asked to re-enter the same information within the same session
- [ ] Exception: security-sensitive fields (passwords, verification codes)

### 3.3.8 Accessible Authentication (Minimum) (AA) — **WCAG 2.2 New**
- [ ] Authentication does not require a cognitive function test (e.g., puzzle, memory task)
- [ ] If CAPTCHA is used, an alternative is provided (audio, logic-based)
- [ ] Password managers and browser autofill are not blocked
- [ ] ⏭️ Skip if no authentication flows exist yet

---

## Screen Reader Testing Checklist

Perform the following with **VoiceOver** (macOS) or **NVDA** (Windows):

### Navigation
- [ ] All pages have a descriptive `<title>`
- [ ] Headings hierarchy is announced correctly (h1, h2, h3...)
- [ ] Landmarks are announced (banner, navigation, main, contentinfo)
- [ ] Skip link is available and works

### Interactive Components
- [ ] Buttons announce their label and role
- [ ] Links announce their text and destination context
- [ ] Form fields announce their labels when focused
- [ ] Error messages are announced when they appear
- [ ] Accordion state (expanded/collapsed) is announced
- [ ] Modal/dialog opening and closing is announced
- [ ] Carousel position is announced (e.g., "slide 2 of 5")

### Content
- [ ] Images have appropriate alt text (or are marked decorative)
- [ ] Tables announce headers when navigating cells
- [ ] Lists are announced as lists with item count

---

## Testing Tools

| Tool | Purpose | URL |
|------|---------|-----|
| axe DevTools | Browser extension for automated checks | [axe DevTools](https://www.deque.com/axe/devtools/) |
| WAVE | Visual accessibility evaluation | [wave.webaim.org](https://wave.webaim.org/) |
| Colour Contrast Analyser | Manual contrast checking | [TPGi CCA](https://www.tpgi.com/color-contrast-checker/) |
| VoiceOver | macOS screen reader | Built into macOS (Cmd+F5) |
| NVDA | Windows screen reader | [nvaccess.org](https://www.nvaccess.org/) |
| Accessibility Insights | Keyboard + visual testing | [accessibilityinsights.io](https://accessibilityinsights.io/) |

---

*Checklist based on WCAG 2.2 Level AA requirements. See [docs/wcag-2.2-aa-coverage-report.md](./wcag-2.2-aa-coverage-report.md) for the automated coverage report.*
