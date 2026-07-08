import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Slot } from "radix-ui";
import { cva } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";

/**
 * Breadcrumb component following WCQ Signature X Design System
 *
 * Features (from Figma requirements):
 * - Clicking/tapping a text link takes you to that page
 * - The last item (current page) is not a link
 * - The separators (chevron >) are not links
 * - When navigating to level 3, 4, or 5 pages, ellipsis shows hidden pages
 * - Clicking/tapping ellipsis reveals the entire breadcrumb trail
 *
 * Variants:
 * - default: White text for dark backgrounds (hero sections)
 * - inverse: Dark text for light backgrounds
 *
 * Text color is set on BreadcrumbList and inherited by all children.
 * Child components only define variant-specific interactive styles (hover, focus-visible).
 */

const breadcrumbListVariants = cva(
  "flex flex-wrap items-center gap-2.5 text-sm break-words",
  {
    variants: {
      variant: {
        default: "text-base-white",
        inverse: "text-base-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const breadcrumbLinkVariants = cva(
  // BR10: Minimum 44px touch target for mobile accessibility
  // AC14: Truncate long titles with ellipsis; full title available via title attribute
  // Note: inline-block (not inline-flex) is required for text-overflow: ellipsis to render '...'
  // BR04/BR11: Default state same as other items, hover shows underline
  "min-h-11 inline-block leading-11 transition-colors outline-none cursor-pointer max-w-48 sm:max-w-64 truncate hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-base-white",
        inverse: "focus-visible:ring-primary-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// BR10: Minimum 44px touch target, BR11: Same appearance as links in default state
// BR08: Not focusable (handled via tabIndex in component)
// AC14: Truncate long titles with ellipsis
const breadcrumbPageClasses =
  "min-h-11 inline-block leading-11 font-normal cursor-default max-w-48 sm:max-w-64 truncate";

const breadcrumbEllipsisVariants = cva(
  // BR10: Minimum 44px (size-11) touch target for mobile accessibility
  "flex size-11 items-center justify-center rounded-lg transition-colors outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "hover:bg-base-white/10 focus-visible:ring-base-white",
        inverse: "hover:bg-muted focus-visible:ring-primary-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Context for passing variant to child components
type BreadcrumbVariant = "default" | "inverse";
const BreadcrumbContext = React.createContext<BreadcrumbVariant>("default");

function Breadcrumb({
  variant = "default",
  ...props
}: React.ComponentProps<"nav"> & { variant?: BreadcrumbVariant }) {
  return (
    <BreadcrumbContext.Provider value={variant}>
      <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
    </BreadcrumbContext.Provider>
  );
}

function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  const variant = React.useContext(BreadcrumbContext);
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants({ variant }), className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const variant = React.useContext(BreadcrumbContext);
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkVariants({ variant }), className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      // BR08: Remove from tab order - only parent links should be focusable
      tabIndex={-1}
      className={cn(breadcrumbPageClasses, className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-[15px]", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  expanded,
  ...props
}: React.ComponentProps<"button"> & {
  /** Whether the hidden breadcrumb items are currently revealed. */
  expanded?: boolean;
}) {
  const variant = React.useContext(BreadcrumbContext);
  return (
    <button
      type="button"
      data-slot="breadcrumb-ellipsis"
      aria-label="Show more breadcrumbs"
      aria-expanded={expanded}
      className={cn(breadcrumbEllipsisVariants({ variant }), className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </button>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbVariant,
};
