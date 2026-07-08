# GitHub Copilot Instructions for DCPDC Sitecore AI Website

## Project Overview

**DCPDC Sitecore AI Website** - a Turborepo monorepo containing a Sitecore XM Cloud rendering host and Storybook documentation.

## Monorepo Structure

```
dcpdc-sitecore-ai-monorepo/
├── apps/
│   ├── sitecore-rendering/     # Next.js 15 Sitecore rendering host
│   └── storybook/              # Storybook 10 component documentation
├── packages/
│   ├── ui/                     # @repo/ui - Shared component library
│   ├── eslint-config/          # @repo/eslint-config
│   └── typescript-config/      # @repo/typescript-config
```

## Key Technologies

- **Next.js 15** - React framework with SSG capabilities
- **React 19** - Component-based UI library
- **Sitecore Content SDK** - Official SDK for Sitecore XM Cloud
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS (new syntax)
- **shadcn/ui** - Accessible component primitives
- **Turborepo** - Monorepo build system

## Critical Conventions

### Package Naming (IMPORTANT)
- Use `@repo/` prefix for internal packages (NOT `@workspace/`)
- Examples: `@repo/ui/components/button`, `@repo/ui/globals.css`

### Node.js Version
- **Required**: Node.js 22+ (enforced via `.nvmrc`)

### Tailwind CSS v4 Syntax
Design tokens in `packages/ui/src/styles/globals.css`:
- `@theme inline` - Define design tokens (maps CSS variables to Tailwind utilities)
- `@utility` - Custom utilities
- `@source` - Glob patterns for content scanning
- `@custom-variant` - Custom variants (e.g., `dark`)
- `@layer base` - Base typography and element styles

## Design System - DCPDC Sitecore AI

### Colors

**IMPORTANT**: Always use existing design token classes (e.g. `text-base-foreground`, `border-base-muted-foreground`, `bg-primary-blue-500`) defined in `packages/ui/src/styles/globals.css` instead of hardcoded hex values. If a color is not yet available as a token, add it to `globals.css` (both `:root` and `@theme inline`) before using it. Never use arbitrary hex values like `text-[#006AF5]` in components or stories when a token exists.

```css
--color-primary-blue-500: #006AF5;  /* Primary action */
--color-orange-500: #FF6900;        /* Accent/CTA */
--color-grey-*: 10 shades (50-900)
--color-green-*: Success states
--color-yellow-*: Warning states
```

### globals.css Structure

The `packages/ui/src/styles/globals.css` file is the single source of truth for all design tokens. It follows this structure:

| Section | Purpose |
|---------|---------|
| `:root` | CSS custom properties (variables) for colors, spacing, typography, shadows |
| `.dark` | Dark mode overrides |
| `@theme inline` | Maps CSS variables to Tailwind utility classes |
| `@layer base` | Base HTML element styles (h1-h6, body, links) |

**When adding new tokens:**
1. Add the CSS variable in `:root` (e.g., `--my-color: #006AF5;`)
2. Add the Tailwind mapping in `@theme inline` (e.g., `--color-my-color: var(--my-color);`)
3. Add dark mode variant in `.dark` if needed

**Hex Code Convention:**
- **Always use UPPERCASE hex codes** (e.g., `#006AF5`, not `#006af5`)
- This ensures consistency across the codebase and matches Figma exports

### Typography
- Font: Source Sans 3 (variable weight)
- Sizes: `text-xs` to `text-heading-3xl`

### Border Radius
- `rounded-full` for pill-shaped buttons
- `rounded-lg` (12px) for cards

### Button Variants
- `primary` - Blue fill, white text, pill shape
- `secondary` - White bg, blue border, pill shape
- `tertiary` - Transparent, blue text, underline on hover
- `destructive`, `ghost`, `link`

### Illustrated Icons
41 custom SVG icons in `packages/ui/src/components/icons/`:
```tsx
import { IllustratedIcon } from "@repo/ui/components/icons";
<IllustratedIcon name="worker" size="lg" />
```
Categories: People, Technology, Other

## File Locations

| What | Where |
|------|-------|
| Design tokens | `packages/ui/src/styles/globals.css` |
| shadcn primitives | `packages/ui/src/components/` |
| Feature components | `packages/ui/src/features/` |
| Icons | `packages/ui/src/components/icons/` |
| Sitecore renderings | `apps/sitecore-rendering/src/components/renderings/` |
| UI stories | `apps/storybook/stories/ui/` |
| Feature stories | `apps/storybook/stories/features/` |
| Environment config | `apps/sitecore-rendering/.env.local` |

## Component Creation Workflow

### 1. Adding shadcn Components (Primitives)

Download components from the shadcn registry to `packages/ui`:

```bash
# From the packages/ui directory
cd packages/ui
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

The `components.json` in `packages/ui` configures the output:
```json
{
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui/lib/utils"
  }
}
```

Components are installed to: `packages/ui/src/components/`

### 2. Creating Storybook Stories for Primitives

Create stories in `apps/storybook/stories/ui/`:

```tsx
// apps/storybook/stories/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/components/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "destructive", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button Label",
    variant: "primary",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary" } };
```

### 3. Creating Feature Components

For complex, composed UI (e.g., dashboard cards, forms), create in `packages/ui/src/features/`:

```
packages/ui/src/features/
├── dashboard/
│   ├── hero-banner.tsx
│   └── stats-card.tsx
├── auth/
│   └── login-form.tsx
└── shared/
    └── page-header.tsx
```

Feature components import shadcn primitives:

```tsx
// packages/ui/src/features/dashboard/stats-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export interface StatsCardProps {
  title: string;
  value: string;
  onAction?: () => void;
}

export function StatsCard({ title, value, onAction }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-heading-2xl">{value}</p>
        {onAction && <Button onClick={onAction}>View Details</Button>}
      </CardContent>
    </Card>
  );
}
```

### 4. Creating Feature Stories

Create stories for features in `apps/storybook/stories/features/`:

```tsx
// apps/storybook/stories/features/dashboard/stats-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsCard } from "@repo/ui/features/dashboard/stats-card";
import { fn } from "@storybook/test";

const meta: Meta<typeof StatsCard> = {
  title: "Features/Dashboard/StatsCard",
  component: StatsCard,
  parameters: { layout: "centered" },
  args: {
    title: "Total Claims",
    value: "1,234",
    onAction: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutAction: Story = { args: { onAction: undefined } };
```

### 5. Creating Sitecore Renderings

Sitecore renderings are **thin adapters** that:
- Import feature components from `@repo/ui/features/*`
- Fetch data using API hooks or Sitecore fields
- Handle Sitecore editor mode
- Pass props to the UI component

Create in `apps/sitecore-rendering/src/components/renderings/`:

#### Fields vs Params (IMPORTANT)

Sitecore rendering props have two distinct data sources:

| Property | Purpose | Examples |
|----------|---------|---------|
| **`fields`** | CMS-authored **content** — rendered with JSS helpers (`JssText`, `JssRichText`, `JssLink`) for inline editing | `Label: Field<string>`, `Title: Field<string>`, `Content: Field<string>`, `Link: LinkField`, `Image: ImageField` |
| **`params`** | Rendering-level **presentation/configuration** — set per rendering instance in Sitecore, not content-editable | `Size`, `Variant`, `Side`, `styles`, `RenderingIdentifier` |

**Rule**: Only put content-related data in the `fields` interface. Everything else (size, variant, layout options, configuration) belongs in `params`.

#### Interface Pattern

```tsx
import { ComponentProps } from 'lib/component-props';
import { Field, LinkField } from '@sitecore-content-sdk/nextjs';

// 1. Intersect ComponentProps (provides params, rendering) with fields interface
type ButtonRenderingProps = ComponentProps & IButtonFields;

// 2. I-prefixed interface for fields — only CMS content
interface IButtonFields {
  fields: {
    Label: Field<string>;    // Content — editable in CMS
    Link: LinkField;          // Content — editable in CMS
  };
}

// 3. Read presentation config from params (PascalCase keys)
const size = props.params['Size'] || 'default';
```

#### Variant Exports

When a component has multiple visual variants, create **individual named const exports** for each one. Sitecore maps each named export to a rendering variant — content authors select from a dropdown in the authoring UI.

```tsx
// Shared renderer — keeps variant logic DRY
const renderButton = (variant: ButtonVariant, props: ButtonRenderingProps) => {
  const { fields, params } = props;
  const size = params['Size'] || 'default';
  return (
    <Button variant={variant} size={size}>
      <JssText field={fields.Label} />
    </Button>
  );
};

// Individual named exports — one per Sitecore rendering variant
export const Default = (props: ButtonRenderingProps) => renderButton('primary', props);
export const Secondary = (props: ButtonRenderingProps) => renderButton('secondary', props);
export const Tertiary = (props: ButtonRenderingProps) => renderButton('tertiary', props);
```

For components with a **single variant**, use `export default`:

```tsx
export default function StatsCardRendering({ fields }: StatsCardRenderingProps) {
  return <StatsCard title={fields?.Title?.value || ""} />;
}
```

#### Full Example (Single Variant)

```tsx
// apps/sitecore-rendering/src/components/renderings/dashboard/StatsCard.tsx
import { StatsCard } from "@repo/ui/features/dashboard/stats-card";
import { Text } from "@sitecore-content-sdk/nextjs";
import { isEditorActive } from "@sitecore-content-sdk/nextjs/utils";
import type { Field } from "@sitecore-content-sdk/nextjs";

interface StatsCardRenderingProps {
  fields: {
    title: Field<string>;
    value: Field<string>;
  };
}

export default function StatsCardRendering({ fields }: StatsCardRenderingProps) {
  // Handle Sitecore Experience Editor
  if (isEditorActive()) {
    return (
      <div className="p-4 border border-dashed">
        <Text field={fields?.title} tag="h3" />
        <Text field={fields?.value} tag="p" />
      </div>
    );
  }

  return (
    <StatsCard
      title={fields?.title?.value || ""}
      value={fields?.value?.value || ""}
      onAction={() => console.log("Action clicked")}
    />
  );
}
```

## Component Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    Sitecore CMS                             │
│                  (Content & Fields)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│     apps/sitecore-rendering/src/components/renderings/      │
│                                                             │
│   • Thin adapter components                                 │
│   • Fetch data (Sitecore fields, API hooks)                │
│   • Handle isEditorActive() for Experience Editor          │
│   • Import and render feature components                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│           packages/ui/src/features/                         │
│                                                             │
│   • Complex, composed UI components                         │
│   • Business logic presentation                             │
│   • Import shadcn primitives                                │
│   • Fully documented in Storybook                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│           packages/ui/src/components/                       │
│                                                             │
│   • shadcn/ui primitives (Button, Card, Dialog, etc.)      │
│   • Downloaded via `npx shadcn@latest add`                 │
│   • Styled with DCPDC design tokens                          │
└─────────────────────────────────────────────────────────────┘
```

## Figma Integration

Design tokens from **DCPDC Signature X Design System**:
- Figma URL: `figma.com/design/DcXK8DKH5c1kBCqOJblnyA`

When creating new components from a Figma design:
1. Use Figma MCP tools to extract design context (colors, spacing, typography)
2. Download required shadcn primitives: `npx shadcn@latest add [component]`
3. Create feature component in `packages/ui/src/features/`
4. Create Storybook story with interactive controls
5. Create Sitecore rendering adapter if needed

## Coding Standards

### Naming Conventions
- **Variables/Functions**: camelCase (`handleClick`, `isChecked`)
- **Components**: PascalCase (`CheckboxField`, `CardCategory`)
- **Constants**: UPPER_SNAKE_CASE (`VALID_VARIANTS`, `VALID_SIZES`)
- **Directories**: kebab-case (`card-category/`, `alert-dialog/`)
- **Types/Interfaces**: PascalCase, prefix interfaces with `I` for Sitecore field models (`ICheckboxFields`, `ButtonVariant`)

### File Naming
- **UI primitives** (`packages/ui/src/components/`): kebab-case (`checkbox.tsx`, `alert-dialog.tsx`)
- **Feature components** (`packages/ui/src/features/`): kebab-case in kebab-case folders (`cards/card-category.tsx`)
- **Sitecore renderings** (`apps/sitecore-rendering/src/components/renderings/`): PascalCase (`Checkbox.tsx`, `Button.tsx`)
- **Stories** (`apps/storybook/stories/`): kebab-case with `.stories.tsx` suffix (`checkbox.stories.tsx`)
- **Tests** (`packages/ui/src/components/__tests__/`): kebab-case with `.test.tsx` suffix (`checkbox.test.tsx`)
- **Storybook story titles**: Use path format matching folder structure (`"UI/Checkbox"`, `"Features/Cards/CardCategory"`)

### Export Conventions
- UI primitives: named exports (`export { Checkbox, CheckboxField }`)
- Sitecore renderings: default export (`export default Default`)
- Feature components: named exports

### Git Branch Naming
- Feature branches: `feature/dcpdc-{ticket}-{short-description}` (e.g. `feature/dcpdc-302-checkbox`)

### Commit Messages
- Follow conventional commits: `feat(scope):`, `refactor(scope):`, `fix(scope):`
- Scopes: `ui`, `storybook`, `sitecore`

### TypeScript
- Use strict mode
- Prefer type assertions over `any`
- Enable strict null checks

## Common Commands

```bash
# Install dependencies
npm install

# Start all apps
npm run dev

# Start only Storybook
npm run dev --workspace=apps/storybook

# Add shadcn component
cd packages/ui && npx shadcn@latest add [component]

# Build all
npm run build

# Lint all
npm run lint

# Run tests
npm run test --workspace=packages/ui

# Run tests once (CI)
npm run test:run --workspace=packages/ui

# Run tests with coverage
npm run test:coverage --workspace=packages/ui
```

## Testing

### Testing Framework
- **Vitest** - Fast unit testing framework
- **@testing-library/react** - React component testing utilities
- **jsdom** - DOM environment for tests

### Test File Locations

| What | Where |
|------|-------|
| Component tests | `packages/ui/src/components/__tests__/` |
| Test setup | `packages/ui/src/test/setup.ts` |
| Vitest config | `packages/ui/vitest.config.ts` |

### Writing Component Tests

Create test files in `packages/ui/src/components/__tests__/`:

```tsx
// packages/ui/src/components/__tests__/button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button.js";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-[#006AF5]");
  });
});
```

### Test Conventions

1. **File naming**: `[component].test.tsx` (e.g., `button.test.tsx`)
2. **Import extensions**: Use `.js` extension for relative imports (required by `moduleResolution: node16`)
3. **Use `vi.fn()`** for mocking functions
4. **Use `screen.getByRole()`** for accessible queries
5. **Test variants, sizes, interactions, and accessibility**

### Running Tests

```bash
# Watch mode (development)
cd packages/ui && npm run test

# Single run (CI)
cd packages/ui && npm run test:run

# With coverage report
cd packages/ui && npm run test:coverage
```

### Coverage Report

Coverage reports are generated at `packages/ui/coverage/index.html`. View in browser for detailed line-by-line coverage.

### Accessibility Testing

Uses `vitest-axe` (axe-core) for automated WCAG 2.1 accessibility testing.

**Test file location**: `packages/ui/src/components/__tests__/accessibility.test.tsx`

**Example accessibility test**:

```tsx
/// <reference path="../../test/vitest-axe.d.ts" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "../button.js";

describe("Accessibility (axe-core)", () => {
  it("button has no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Run accessibility tests**:
```bash
cd packages/ui && npm run test:run -- accessibility
```

## Accessibility Guidelines

### Making Components Accessible

All components MUST follow WCAG 2.1 AA guidelines:

1. **Semantic HTML**: Use correct elements (`<button>`, `<a>`, `<nav>`, etc.)
2. **ARIA attributes**: Add roles, labels, and descriptions where needed
3. **Keyboard navigation**: Ensure Tab/Enter/Escape work correctly
4. **Focus indicators**: Use `focus-visible:ring-2` or similar styles
5. **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text

### Component Accessibility Checklist

| Component Type | Required Attributes |
|----------------|---------------------|
| **Button** | `type="button"` (default), disabled state styling |
| **Link** | External links: `target="_blank" rel="noopener noreferrer"` + "(opens in new tab)" screen reader text |
| **Icon** | Decorative: `aria-hidden="true"`. Meaningful: `aria-label="description"` |
| **Dialog** | Focus trap, ESC to close, `role="dialog"`, `aria-labelledby`, `aria-describedby` |
| **Navigation** | `role="navigation"`, `aria-label="description"` |
| **Pagination** | `aria-current="page"` on active item, `aria-label` on prev/next |

### IllustratedIcon Accessibility

```tsx
// Decorative (default) - hidden from screen readers
<IllustratedIcon name="worker" />

// Meaningful - provides alt text
<IllustratedIcon name="worker" alt="Worker illustration" />
```

### External Link Pattern

External links must inform screen reader users they open in a new tab:

```tsx
<Link href="https://example.com" external>
  External site
</Link>
// Automatically adds:
// - target="_blank" rel="noopener noreferrer"
// - <span className="sr-only">(opens in new tab)</span>
```

### Focus States

All interactive elements must have visible focus indicators:

```css
/* DCPDC focus ring pattern */
focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#006AF5]

/* Or shadow pattern for links */
focus-visible:shadow-[0px_0px_0px_3px_rgba(0,106,245,0.5)]
```

## Environment Variables

Required in `apps/sitecore-rendering/.env.local`:
```env
NODE_TLS_REJECT_UNAUTHORIZED=0
NEXT_PUBLIC_DEFAULT_SITE_NAME=dev
NEXT_PUBLIC_SITECORE_API_KEY=your-key
NEXT_PUBLIC_SITECORE_API_HOST=https://your-instance.sitecorecloud.io
```

## Common Issues

### SSL Certificate Error (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`)
Already handled in package.json scripts via `NODE_TLS_REJECT_UNAUTHORIZED=0`

### esbuild Error -88
```bash
rm -rf node_modules package-lock.json
nvm use 22
npm install
```

### Module Not Found for @repo/ui
Ensure imports use `@repo/` not `@workspace/` prefix.
