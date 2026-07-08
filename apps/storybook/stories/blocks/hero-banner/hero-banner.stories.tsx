import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroBanner } from "@repo/ui/features/hero/hero-banner";

// Placeholder image for stories — replaces the Figma placeholder
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=80";

const meta: Meta<typeof HeroBanner> = {
  title: "Blocks/HeroBanner/HeroBanner",
  component: HeroBanner,
  tags: ["autodocs"],
  parameters: {
    // Full-width layout so the curved divider and responsive behaviour are visible
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Hero Section component for pages. Two variants: **home** (landing pages — CTA button, no breadcrumbs) and **generic** (internal pages — breadcrumbs, no button). ",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["home", "generic"],
      description: "home = CTA button; generic = breadcrumbs",
    },
    headline: { control: "text" },
    description: { control: "text" },
    buttonText: { control: "text" },
    buttonHref: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    onButtonClick: { action: "button clicked" },
  },
  args: {
    variant: "home",
    headline: "Short engaging headline",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales.",
    buttonText: "Get started",
    buttonHref: "#",
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: "Hero image",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Home variant ────────────────────────────────────────────────────────────

/**
 * Default home hero — used on landing / topic-collection pages.
 * Features the large headline, description, and a white CTA button.
 * The concave curve divider separates the text zone from the image zone.
 */
export const HomeWithImage: Story = {
  name: "Home / With Image (Desktop)",
  globals: {
    viewport: { value: undefined, isRotated: false },
  },
  args: {
    variant: "home",
  },
};

/**
 * Home hero without an image — renders as a full-width solid dark-blue block.
 * Used when no contextual visual is available.
 */
export const HomeTextOnly: Story = {
  name: "Home / Text Only",
  globals: {
    viewport: { value: undefined, isRotated: false },
  },
  args: {
    variant: "home",
    imageSrc: undefined,
    imageAlt: undefined,
  },
};

// ─── Generic variant ─────────────────────────────────────────────────────────

/**
 * Generic hero — used on functional content pages (search results, T&Cs, policy pages).
 * Shows breadcrumb navigation above the headline. No CTA button.
 */
export const GenericWithImage: Story = {
  name: "Generic / With Image (Desktop)",
  globals: {
    viewport: { value: undefined, isRotated: false },
  },
  args: {
    variant: "generic",
    buttonText: undefined,
    buttonHref: undefined,
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Breadcrumb", href: "#" },
      { label: "Header Section Five" },
    ],
  },
};

/**
 * Generic hero without an image — text-only dark-blue block with breadcrumbs.
 */
export const GenericTextOnly: Story = {
  name: "Generic / Text Only",
  globals: {
    viewport: { value: undefined, isRotated: false },
  },
  args: {
    variant: "generic",
    imageSrc: undefined,
    imageAlt: undefined,
    buttonText: undefined,
    buttonHref: undefined,
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Section", href: "#" },
      { label: "Current Page" },
    ],
  },
};

/**
 * Generic hero with a single-level breadcrumb (no intermediate items).
 */
export const GenericShallowBreadcrumb: Story = {
  name: "Generic / Shallow Breadcrumb",
  globals: {
    viewport: { value: undefined, isRotated: false },
  },
  args: {
    variant: "generic",
    imageSrc: PLACEHOLDER_IMAGE,
    buttonText: undefined,
    buttonHref: undefined,
    breadcrumbs: [{ label: "Home", href: "#" }, { label: "Current Page" }],
  },
};

// ─── Tablet viewport ──────────────────────────────────────────────────────────

/**
 * Home hero at tablet width (1024px).
 * Headline scales to 48px and the description uses 20px body text.
 */
export const HomeTablet: Story = {
  name: "Home / Tablet Viewport",
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
  args: {
    variant: "home",
  },
};

// ─── Mobile viewport ─────────────────────────────────────────────────────────

/**
 * Generic hero on mobile — image stacks above the headline block.
 * The branded concave-bottom wave marks the transition between zones.
 */
export const GenericMobile: Story = {
  name: "Generic / Mobile Viewport",
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
  args: {
    variant: "generic",
    buttonText: undefined,
    buttonHref: undefined,
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Breadcrumb", href: "#" },
      { label: "Header Section Five" },
    ],
  },
};

export const HomeMobile: Story = {
  name: "Home / Mobile Viewport",
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
  args: {
    variant: "home",
  },
};

// ─── Image Randomiser demo ───────────────────────────────────────────────────

const COLLECTION_IMAGES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&auto=format&fit=crop&q=80",
];

/**
 * Simulates the image randomiser behaviour (FSD BR10).
 * The image zone starts hidden, a random image is picked after a short delay,
 * then the image fades in over 300ms once loaded. Text content is visible immediately.
 * Click "Remount component" in the toolbar to re-trigger the animation.
 */
export const ImageRandomiser: Story = {
  name: "Home / Image Randomiser",
  render: () => {
    const [imageSrc, setImageSrc] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
      // Simulate the sessionStorage resolve delay (~50-100ms in production)
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * COLLECTION_IMAGES.length);
        setImageSrc(COLLECTION_IMAGES[randomIndex]);
      }, 500); // exaggerated to 500ms so you can see the fade
      return () => clearTimeout(timer);
    }, []);

    return (
      <HeroBanner
        variant="home"
        headline="Short engaging headline"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales."
        buttonText="Get started"
        buttonHref="#"
        imageSrc={imageSrc}
        imageAlt="Randomised hero image"
      />
    );
  },
};
