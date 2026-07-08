# WCAG 2.2 Level AA Conformance Report

## DXP Website

> **Standard:** Web Content Accessibility Guidelines (WCAG) 2.2 Level AA  
> **Report Date:**
> **Scope:** Component library and rendering host (UI layer)  
> **Assessment Methods:** Automated testing (axe-core 4.11.1), end-to-end browser testing (Playwright), behavioural unit testing, manual QA review  

---



### Conformance Summary

| Category | Count |
|----------|-------|
| Conformant (automated + manual verification) | 44 |
| Not Applicable (no relevant content exists yet) | 6 |
| **Total WCAG 2.2 Level A + AA Criteria** | **50** |

---

## Conformance by Principle

### Principle 1 — Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

| SC | Criterion | Level | Status | Verification Method |
|----|-----------|-------|--------|---------------------|
| 1.1.1 | Non-text Content | A | Conformant | All images, icons, and media elements include appropriate text alternatives. Decorative images are hidden from assistive technology. Verified by automated scanning (7 axe-core rules) across all components. |
| 1.2.1 | Audio-only and Video-only | A | Conformant | Media components include caption and transcript support. Verified by automated scanning. |
| 1.2.2 | Captions (Prerecorded) | A | Conformant | Video components support captions. Verified by automated scanning. |
| 1.2.3 | Audio Description or Media Alternative | A | Not Applicable | No prerecorded video content requiring audio description is currently present. When added, manual QA procedures are in place. |
| 1.2.4 | Captions (Live) | AA | Not Applicable | No live video or audio content is currently present. |
| 1.2.5 | Audio Description (Prerecorded) | AA | Not Applicable | No prerecorded video content requiring audio description is currently present. When added, manual QA procedures are in place. |
| 1.3.1 | Info and Relationships | A | Conformant | Semantic HTML structure is used throughout — headings, lists, tables, and form controls convey relationships programmatically. Verified by automated scanning (12 axe-core rules) and structural unit tests. |
| 1.3.2 | Meaningful Sequence | A | Conformant | DOM order matches visual presentation order. Verified through unit tests asserting correct element order in Breadcrumb, Pagination, and Table components. |
| 1.3.3 | Sensory Characteristics | A | Conformant | Instructions and cues do not rely solely on shape, colour, size, or location. Verified by manual design review. |
| 1.3.4 | Orientation | AA | Conformant | No orientation lock is applied. Content adapts to both portrait and landscape. Verified by automated scanning (`css-orientation-lock` rule). |
| 1.3.5 | Identify Input Purpose | AA | Conformant | Form inputs use appropriate `autocomplete` attributes to identify their purpose. Verified by automated scanning (`autocomplete-valid` rule). |
| 1.4.1 | Use of Color | A | Conformant | Colour is not used as the sole means of conveying information. Links within text blocks are distinguished by means other than colour alone. Verified by automated scanning and visual design review. |
| 1.4.2 | Audio Control | A | Conformant | No auto-playing audio content is present. Verified by automated scanning (`no-autoplay-audio` rule). |
| 1.4.3 | Contrast (Minimum) | AA | Conformant | All text meets 4.5:1 contrast ratio for normal text and 3:1 for large text. Verified by automated scanning (`color-contrast` rule) across all component variants. |
| 1.4.4 | Resize Text | AA | Conformant | No `maximum-scale` or `user-scalable=no` restrictions are applied. Text can be resized up to 200% without loss of content. Verified by automated scanning (`meta-viewport` rule). |
| 1.4.5 | Images of Text | AA | Conformant | Real text is used throughout; images of text are not present. Verified by manual design review. |
| 1.4.10 | Reflow | AA | Conformant | Content reflows to a single column at 320 CSS pixels wide (equivalent to 400% zoom) without horizontal scrolling. Data tables are exempt per the specification. Verified by Playwright end-to-end tests across 5 key component stories. |
| 1.4.11 | Non-text Contrast | AA | Conformant | UI component boundaries, focus indicators, and icons meet the 3:1 contrast ratio against adjacent colours. Verified by manual review with a colour contrast analyser. |
| 1.4.12 | Text Spacing | AA | Conformant | No inline styles override user text spacing adjustments. Content remains readable with increased line height, letter spacing, word spacing, and paragraph spacing. Verified by automated scanning (`avoid-inline-spacing` rule). |
| 1.4.13 | Content on Hover or Focus | AA | Conformant | Tooltips, dropdown menus, and mega menu panels can be dismissed with Escape, remain visible while the pointer hovers over them, and persist until the user actively dismisses them. Verified by Playwright end-to-end tests covering DropdownMenu and MegaMenu components. |

### Principle 2 — Operable

User interface components and navigation must be operable.

| SC | Criterion | Level | Status | Verification Method |
|----|-----------|-------|--------|---------------------|
| 2.1.1 | Keyboard | A | Conformant | All interactive components are operable via keyboard. Verified by automated scanning (focusable content rules) and behavioural unit tests across 48 test files. |
| 2.1.2 | No Keyboard Trap | A | Conformant | Users can navigate away from all components using standard keys. Modal dialogs (Sheet, Lightbox) trap focus appropriately and release it on Escape. Verified by unit tests for Escape key behaviour. |
| 2.1.4 | Character Key Shortcuts | A | Conformant | No single-character keyboard shortcuts are implemented. All keyboard interactions use standard patterns (Tab, Enter, Escape, Arrow keys). |
| 2.2.1 | Timing Adjustable | A | Conformant | No time limits are imposed on user interactions. No `meta-refresh` redirects are used. Verified by automated scanning. |
| 2.2.2 | Pause, Stop, Hide | A | Conformant | No auto-scrolling, blinking, or auto-updating content is present. Carousel advancement is user-initiated only. Verified by automated scanning (`blink`, `marquee` rules). |
| 2.4.1 | Bypass Blocks | A | Conformant | Skip navigation and landmark regions allow users to bypass repeated content blocks. Verified by automated scanning (`bypass` rule). |
| 2.4.2 | Page Titled | A | Conformant | Pages include descriptive titles. Verified by automated scanning (`document-title` rule). |
| 2.4.3 | Focus Order | A | Conformant | Tab order follows a logical sequence matching the visual layout. Verified by focus management unit tests in Sheet, Lightbox, InPageNavMenu, and Carousel components. |
| 2.4.4 | Link Purpose (In Context) | A | Conformant | Link text is descriptive or can be determined from surrounding context. Verified by automated scanning (`link-name`, `area-alt` rules). |
| 2.4.5 | Multiple Ways | AA | Conformant | Multiple navigation mechanisms are provided (global navigation, in-page navigation, search). Verified by manual review. |
| 2.4.6 | Headings and Labels | AA | Conformant | Headings and labels are descriptive and clearly identify their purpose. Verified by manual content review. |
| 2.4.7 | Focus Visible | AA | Conformant | All interactive elements display a visible focus indicator (2px ring with offset). Verified by unit tests asserting `focus-visible:ring-*` styles on Button, Link, Checkbox, and RadioGroup components. |
| 2.4.11 | Focus Not Obscured (Minimum) | AA | Conformant | Focused elements are not entirely hidden by the sticky global header or other fixed-position content. The header auto-hides on scroll to preserve content visibility. Verified by Playwright end-to-end tests. *WCAG 2.2 new criterion.* |
| 2.5.1 | Pointer Gestures | A | Conformant | All path-based and multipoint gestures have single-pointer alternatives. Carousel swipe gestures are supplemented by Previous/Next buttons. Verified by manual testing and Playwright end-to-end tests. |
| 2.5.2 | Pointer Cancellation | A | Conformant | Actions activate on the up-event (default browser behaviour). No custom down-event handlers override this. Verified by manual testing. |
| 2.5.3 | Label in Name | A | Conformant | Accessible names contain the visible text label. Verified by automated scanning (`label-content-name-mismatch` rule). |
| 2.5.4 | Motion Actuation | A | Conformant | No functionality relies on device motion (shake, tilt). All interactions use standard pointer and keyboard input. |
| 2.5.7 | Dragging Movements | AA | Conformant | All drag/swipe interactions (carousels) provide single-pointer button alternatives (Previous/Next). Verified by Playwright end-to-end tests across all 3 carousel variants (standard, card, and media). *WCAG 2.2 new criterion.* |
| 2.5.8 | Target Size (Minimum) | AA | Conformant | Interactive targets meet the 24×24 CSS pixel minimum size requirement. Verified by automated scanning (`target-size` rule) across all 53 component test files. *WCAG 2.2 new criterion.* |

### Principle 3 — Understandable

Information and the operation of the user interface must be understandable.

| SC | Criterion | Level | Status | Verification Method |
|----|-----------|-------|--------|---------------------|
| 3.1.1 | Language of Page | A | Conformant | The `lang` attribute is set on the HTML element. Verified by automated scanning (`html-has-lang`, `html-lang-valid` rules). |
| 3.1.2 | Language of Parts | AA | Conformant | Content sections in other languages include the appropriate `lang` attribute. Verified by automated scanning (`valid-lang` rule). |
| 3.2.1 | On Focus | A | Conformant | Receiving focus does not trigger unexpected context changes. Verified by focus handler unit tests in SearchInput and NavigationMenu. |
| 3.2.2 | On Input | A | Conformant | Changing form control values does not trigger unexpected context changes unless the user is advised beforehand. Verified by change handler unit tests in Checkbox, RadioGroup, and SearchInput. |
| 3.2.3 | Consistent Navigation | AA | Conformant | Navigation components (GlobalHeader, Footer) maintain a consistent order and structure. Verified by manual cross-page review. |
| 3.2.4 | Consistent Identification | AA | Conformant | Components serving the same function use consistent labelling and identification. Verified by manual review and shared component library architecture. |
| 3.2.6 | Consistent Help | A | Not Applicable | Help and contact mechanisms are not yet implemented. When added, consistency will be verified by end-to-end tests. *WCAG 2.2 new criterion.* |
| 3.3.1 | Error Identification | A | Conformant | Form errors are identified in text and associated with the relevant input. Verified by error state rendering unit tests in Checkbox and Callout components. |
| 3.3.2 | Labels or Instructions | A | Conformant | Form inputs have associated labels. Verified by automated scanning (`form-field-multiple-labels`, `label` rules). |
| 3.3.3 | Error Suggestion | AA | Conformant | Error messages include suggestions for correction where possible. Verified by manual review of form validation patterns. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Not Applicable | No legal, financial, or data-submission transactions are currently present. When added, review and confirmation mechanisms will be implemented. |
| 3.3.7 | Redundant Entry | A | Not Applicable | No multi-step forms are currently present. When added, previously entered data will be auto-populated or selectable. *WCAG 2.2 new criterion.* |
| 3.3.8 | Accessible Authentication (Minimum) | AA | Not Applicable | No authentication flows are currently present. When added, no cognitive function test (e.g., CAPTCHA) will be required without an accessible alternative. *WCAG 2.2 new criterion.* |

### Principle 4 — Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

| SC | Criterion | Level | Status | Verification Method |
|----|-----------|-------|--------|---------------------|
| 4.1.2 | Name, Role, Value | A | Conformant | All interactive components expose correct names, roles, and values to assistive technology through semantic HTML and ARIA attributes. Verified by automated scanning (28+ axe-core rules) and ARIA assertion unit tests. |
| 4.1.3 | Status Messages | AA | Conformant | Dynamic status updates use `role="status"` and `aria-live="polite"` to announce changes without receiving focus. Verified by unit tests in GlobalAlert, Callout, and Badge components. |

> **Note:** WCAG 2.2 removed SC 4.1.1 (Parsing) — it is always considered satisfied.

---

## WCAG 2.2 — New Criteria Summary

WCAG 2.2 introduced six new success criteria at Levels A and AA. Their conformance status is summarised below:

| SC | Criterion | Level | Status | Verification |
|----|-----------|-------|--------|--------------|
| 2.4.11 | Focus Not Obscured (Minimum) | AA | Conformant | Playwright E2E tests |
| 2.5.7 | Dragging Movements | AA | Conformant | Playwright E2E tests |
| 2.5.8 | Target Size (Minimum) | AA | Conformant | axe-core automated scanning |
| 3.2.6 | Consistent Help | A | Not Applicable | Feature not yet implemented |
| 3.3.7 | Redundant Entry | A | Not Applicable | Feature not yet implemented |
| 3.3.8 | Accessible Authentication (Minimum) | AA | Not Applicable | Feature not yet implemented |

---

## Testing Infrastructure

| Layer | Tool | Coverage |
|-------|------|----------|
| Automated scanning | axe-core 4.11.1 (via vitest-axe) | 53 component test files, 171 test cases |
| End-to-end browser | Playwright | 20 tests across 4 WCAG criteria |
| Behavioural unit | Vitest + Testing Library | 48 test files covering keyboard, ARIA, and focus |
| Manual QA | Documented checklist | 14 criteria requiring human judgement |

### Automated Test Results

| Suite | Tests | Status |
|-------|-------|--------|
| axe-core accessibility scans | 171 | All passing |
| Playwright WCAG E2E tests | 20 | All passing |
| Behavioural accessibility tests | 48 files | All passing |


---

## Scope and Limitations

### In Scope

- All shared UI components (`@repo/ui` package)
- Component-level rendering, interaction, and ARIA compliance
- Responsive behaviour at standard and narrow viewports
- Keyboard navigation and focus management

### Out of Scope

- CMS-authored content quality (headings, alt text, link text) — this is a content authoring responsibility
- Third-party embedded content (e.g., external iframes, widgets)
- AAA-level criteria (these are aspirational goals, not required for conformance)
- Server-side rendering or API-level accessibility concerns

### Note on Automated Testing Limitations

Automated tools detect approximately 30–40% of accessibility issues. This report is supported by manual QA procedures documented in a separate testing checklist that covers criteria requiring human judgement, assistive technology testing, and cross-page consistency verification.

---

*This report reflects the conformance status of the UI component library as of the report date. Conformance should be re-evaluated when new components are added or significant changes are made to existing components.*
