import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@repo/ui/components/breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "inverse"],
      description:
        "Visual style variant - default for dark backgrounds (hero sections), inverse for light backgrounds",
    },
  },
  args: {
    variant: "default",
  },
  decorators: [
    (Story, context) => (
      <div
        className={`p-8 rounded-lg ${
          context.args.variant === "inverse"
            ? "bg-white"
            : "bg-primary-blue-700"
        }`}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default breadcrumb with white text for dark backgrounds (hero sections).
 * Clicking a link takes you to that page.
 * The current page is shown with an underline and is not a link.
 */
export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers">Workers</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers/claims">Claims</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Make a claim</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Inverse variant for use on light backgrounds.
 * Dark text with appropriate hover and focus states.
 */
export const Inverse: Story = {
  args: {
    variant: "inverse",
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/employers">Employers</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Insurance</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Shared ellipsis story renderer — used by WithEllipsis and InverseWithEllipsis
 * to eliminate duplicated state / JSX logic.
 */
function EllipsisStory({
  hiddenItems,
  lastLink,
  currentPage,
  ...breadcrumbProps
}: React.ComponentProps<typeof Breadcrumb> & {
  hiddenItems: { href: string; label: string }[];
  lastLink: { href: string; label: string };
  currentPage: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Breadcrumb {...breadcrumbProps}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {isExpanded ? (
          <>
            {hiddenItems.map((item) => (
              <Fragment key={item.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))}
            {/* Collapse toggle — AC6: second tap collapses */}
            <BreadcrumbItem>
              <BreadcrumbEllipsis
                expanded={true}
                onClick={() => setIsExpanded(false)}
              />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis
                expanded={false}
                onClick={() => setIsExpanded(true)}
              />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbLink href={lastLink.href}>{lastLink.label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * When navigating to level 3, 4, or 5 pages, an ellipsis shows hidden pages.
 * Clicking the ellipsis reveals the entire breadcrumb trail.
 * A second tap on the ellipsis collapses the trail back (AC6).
 */
export const WithEllipsis: Story = {
  render: (args) => (
    <EllipsisStory
      {...args}
      hiddenItems={[
        { href: "/workers/claims", label: "Claims" },
        { href: "/workers/claims/types", label: "Claim types" },
      ]}
      lastLink={{
        href: "/workers/claims/types/psychological",
        label: "Psychological injury",
      }}
      currentPage="Make a claim"
    />
  ),
};

/**
 * Inverse variant with ellipsis for light backgrounds.
 * Demonstrates the expand/collapse toggle (AC6) on light backgrounds.
 */
export const InverseWithEllipsis: Story = {
  args: {
    variant: "inverse",
  },
  render: (args) => (
    <EllipsisStory
      {...args}
      hiddenItems={[
        { href: "/employers/insurance", label: "Insurance" },
        { href: "/employers/insurance/premiums", label: "Premiums" },
      ]}
      lastLink={{
        href: "/employers/insurance/premiums/calculate",
        label: "Calculate",
      }}
      currentPage="Results"
    />
  ),
};

/**
 * Simple two-level breadcrumb showing immediate parent and current page.
 */
export const Simple: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>About us</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Long breadcrumb trail showing many navigation levels.
 * Demonstrates wrapping behavior on narrow screens.
 */
export const LongTrail: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers">Workers</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers/claims">Claims</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers/claims/types">
            Claim types
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workers/claims/types/psychological">
            Psychological injury
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Make a claim</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Demonstrates truncation behaviour for long breadcrumb labels (AC14).
 * Links and the current page truncate with CSS ellipsis at max-w-48 (mobile) / sm:max-w-64 (desktop).
 * Add a `title` attribute so the full text is available on hover.
 */
export const Truncation: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/employers"
            title="Employers and insured organisations"
          >
            Employers and insured organisations
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/employers/insurance-premiums"
            title="Understanding your insurance premiums and how they work"
          >
            Understanding your insurance premiums and how they work
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage title="Calculate your estimated premium for the upcoming financial year">
            Calculate your estimated premium for the upcoming financial year
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
