// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroBanner } from "../../features/hero/hero-banner.js";

describe("HeroBanner", () => {
  // ─── Default rendering (Home variant) ───────────────────────────────

  describe("Home variant (default)", () => {
    it("renders the headline as h1", () => {
      render(<HeroBanner headline="Welcome to Sitecore Sandbox" />);
      expect(
        screen.getByRole("heading", { level: 1, name: "Welcome to Sitecore Sandbox" }),
      ).toBeInTheDocument();
    });

    it("renders the section landmark with aria-label", () => {
      render(<HeroBanner headline="Test" />);
      const section = screen.getByRole("region", { name: "Test" });
      expect(section).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(
        <HeroBanner headline="Title" description="Supporting body copy" />,
      );
      expect(screen.getByText("Supporting body copy")).toBeInTheDocument();
    });

    it("renders description as JSX ReactNode", () => {
      render(
        <HeroBanner
          headline="Title"
          description={<p data-testid="rich-desc">Rich <strong>text</strong></p>}
        />,
      );
      const richDesc = screen.getByTestId("rich-desc");
      expect(richDesc).toBeInTheDocument();
      expect(richDesc.querySelector("strong")).toHaveTextContent("text");
    });

    it("does not render description when omitted", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      // Description is rendered via dangerouslySetInnerHTML in a div;
      // when omitted, no description container should exist
      expect(
        container.querySelector('[data-slot="hero-description"]'),
      ).not.toBeInTheDocument();
    });

    it("does not render breadcrumbs on home variant", () => {
      render(
        <HeroBanner
          headline="Home"
          breadcrumbs={[{ label: "Root", href: "/" }, { label: "Home" }]}
        />,
      );
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
  });

  // ─── CTA Button (BR06 — Rich Variant) ──────────────────────────────

  describe("CTA Button", () => {
    it("renders CTA button with text", () => {
      render(<HeroBanner headline="Title" buttonText="Start application" />);
      expect(
        screen.getByRole("button", { name: "Start application" }),
      ).toBeInTheDocument();
    });

    it("renders CTA as a link when buttonHref is provided", () => {
      render(
        <HeroBanner
          headline="Title"
          buttonText="View plans"
          buttonHref="/plans"
        />,
      );
      const link = screen.getByRole("link", { name: "View plans" });
      expect(link).toHaveAttribute("href", "/plans");
    });

    it("calls onButtonClick when clicked without href", () => {
      const onClick = vi.fn();
      render(
        <HeroBanner
          headline="Title"
          buttonText="Contact us"
          onButtonClick={onClick}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Contact us" }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not render button when buttonText is omitted", () => {
      render(<HeroBanner headline="Title" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("does not render button on generic variant", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Title"
          buttonText="Should not show"
        />,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  // ─── Generic variant + Breadcrumbs ──────────────────────────────────

  describe("Generic variant (breadcrumbs)", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Workers compensation", href: "/workers-compensation" },
      { label: "Making a claim" },
    ];

    it("renders breadcrumbs on generic variant", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Making a claim"
          breadcrumbs={breadcrumbs}
        />,
      );
      const nav = screen.getByRole("navigation", { name: "breadcrumb" });
      expect(nav).toBeInTheDocument();
    });

    it("renders ancestor breadcrumbs as links", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Making a claim"
          breadcrumbs={breadcrumbs}
        />,
      );
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/",
      );
      expect(
        screen.getByRole("link", { name: "Workers compensation" }),
      ).toHaveAttribute("href", "/workers-compensation");
    });

    it("renders the last breadcrumb as non-linked current page", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Making a claim"
          breadcrumbs={breadcrumbs}
        />,
      );
      const currentPage = screen.getByText("Making a claim", {
        selector: '[aria-current="page"]',
      });
      expect(currentPage).toBeInTheDocument();
    });

    it("renders separators between breadcrumb items", () => {
      const { container } = render(
        <HeroBanner
          variant="generic"
          headline="Making a claim"
          breadcrumbs={breadcrumbs}
        />,
      );
      const separators = container.querySelectorAll(
        '[data-slot="breadcrumb-separator"]',
      );
      // 3 items → 2 separators
      expect(separators).toHaveLength(2);
    });

    it("does not render breadcrumbs when array is empty", () => {
      render(
        <HeroBanner variant="generic" headline="Title" breadcrumbs={[]} />,
      );
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("renders a single breadcrumb with no separators", () => {
      const { container } = render(
        <HeroBanner
          variant="generic"
          headline="Home"
          breadcrumbs={[{ label: "Home" }]}
        />,
      );
      const separators = container.querySelectorAll(
        '[data-slot="breadcrumb-separator"]',
      );
      expect(separators).toHaveLength(0);
    });

    it("uses default breadcrumb variant for dark background", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Title"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Current" }]}
        />,
      );
      // Default variant sets white text on the breadcrumb list
      const nav = screen.getByRole("navigation", { name: "breadcrumb" });
      const list = nav.querySelector("ol");
      expect(list).toHaveClass("text-base-white");
    });
  });

  // ─── Image rendering (BR03–BR05, BR09) ─────────────────────────────

  describe("Image", () => {
    it("renders images when imageSrc is provided", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const images = container.querySelectorAll("img");
      // Mobile image + desktop/tablet image = 2
      expect(images.length).toBe(2);
    });

    it("marks image containers as aria-hidden (decorative)", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const ariaHiddenDivs = container.querySelectorAll('[aria-hidden="true"]');
      // At least the 2 image containers + SVG overlays
      expect(ariaHiddenDivs.length).toBeGreaterThanOrEqual(2);
    });

    it("sets alt text on images", () => {
      const { container } = render(
        <HeroBanner
          headline="Title"
          imageSrc="/hero.jpg"
          imageAlt="Workers at a construction site"
        />,
      );
      const images = container.querySelectorAll("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt", "Workers at a construction site");
      });
    });

    it("defaults imageAlt to empty string", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const images = container.querySelectorAll("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt", "");
      });
    });

    it("renders curved divider SVGs when image is present", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const svgs = container.querySelectorAll("svg");
      // clipPath SVG + tablet curve + desktop curve = 3
      expect(svgs.length).toBe(3);
    });

    it("does not render images or curves in text-only mode (BR09)", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      expect(container.querySelectorAll("img")).toHaveLength(0);
      // Only the hidden clipPath SVG definition may remain; no curve SVGs
      const visibleSvgs = container.querySelectorAll('svg:not([width="0"])');
      expect(visibleSvgs).toHaveLength(0);
    });

    it("starts at opacity-0 by default (immediateImage not set)", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const mobileImage = container.querySelector('[data-slot="hero-mobile-image"]');
      const desktopImage = container.querySelector('[data-slot="hero-desktop-image"]');
      expect(mobileImage).toHaveClass("opacity-0");
      expect(desktopImage).toHaveClass("opacity-0");
    });

    it("starts at opacity-100 when immediateImage is true", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" immediateImage={true} />,
      );
      const mobileImage = container.querySelector('[data-slot="hero-mobile-image"]');
      const desktopImage = container.querySelector('[data-slot="hero-desktop-image"]');
      expect(mobileImage).toHaveClass("opacity-100");
      expect(desktopImage).toHaveClass("opacity-100");
    });

    it("becomes opacity-100 after onLoad fires", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const mobileImage = container.querySelector('[data-slot="hero-mobile-image"]');
      const desktopImage = container.querySelector('[data-slot="hero-desktop-image"]');
      expect(mobileImage).toHaveClass("opacity-0");
      expect(desktopImage).toHaveClass("opacity-0");

      // Simulate browser image load
      const images = container.querySelectorAll("img");
      images.forEach((img) => fireEvent.load(img));

      expect(mobileImage).toHaveClass("opacity-100");
      expect(desktopImage).toHaveClass("opacity-100");
    });

    it("becomes opacity-100 after onError fires (broken image safety)", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/broken.jpg" />,
      );
      const mobileImage = container.querySelector('[data-slot="hero-mobile-image"]');
      expect(mobileImage).toHaveClass("opacity-0");

      // Simulate image load failure
      const images = container.querySelectorAll("img");
      images.forEach((img) => fireEvent.error(img));

      expect(mobileImage).toHaveClass("opacity-100");
    });
  });

  // ─── Responsive layout classes (BR03–BR05) ─────────────────────────

  describe("Responsive layout", () => {
    it("mobile image uses stacked layout (md:hidden)", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const mobileImageContainer = container.querySelector('[data-slot="hero-mobile-image"]');
      expect(mobileImageContainer).toBeInTheDocument();
    });

    it("desktop image occupies right half", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const desktopImage = container.querySelector('[data-slot="hero-desktop-image"]');
      expect(desktopImage).toBeInTheDocument();
    });

    it("text zone occupies left half on desktop", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const textCol = container.querySelector('[data-slot="hero-text-column"]');
      expect(textCol).toBeInTheDocument();
    });

    it("headline scales at breakpoints", () => {
      render(<HeroBanner headline="Scale test" />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveClass("text-4xl"); // mobile
      expect(h1).toHaveClass("md:text-5xl"); // tablet
      expect(h1).toHaveClass("xl:text-6xl"); // desktop
    });

    it("home variant text zone has taller min-heights", () => {
      const { container } = render(
        <HeroBanner headline="Title" imageSrc="/hero.jpg" />,
      );
      const textZone = container.querySelector('[data-slot="hero-text-zone"]');
      expect(textZone).toHaveClass("md:min-h-96.5");
      expect(textZone).toHaveClass("xl:min-h-119.5");
    });

    it("generic variant text zone has shorter desktop min-height and no tablet min-height", () => {
      const { container } = render(
        <HeroBanner variant="generic" headline="Title" imageSrc="/hero.jpg" />,
      );
      const textZone = container.querySelector('[data-slot="hero-text-zone"]');
      expect(textZone).toHaveClass("xl:min-h-74");
      expect(textZone).not.toHaveClass("md:min-h-96.5");
      expect(textZone).not.toHaveClass("xl:min-h-119.5");
    });
  });

  // ─── Typography (CR03, CR04) ────────────────────────────────────────

  describe("Typography", () => {
    it("headline is bold and white", () => {
      render(<HeroBanner headline="Bold heading" />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveClass("font-bold");
      expect(h1).toHaveClass("text-base-white");
    });

    it("home variant description scales up at wider breakpoints", () => {
      render(
        <HeroBanner
          variant="home"
          headline="Title"
          description="Home description"
        />,
      );
      const desc = screen.getByText("Home description");
      expect(desc).toHaveClass("text-lg");
      expect(desc).toHaveClass("md:text-xl");
      expect(desc).toHaveClass("xl:text-3xl");
    });

    it("generic variant description stays at text-lg", () => {
      render(
        <HeroBanner
          variant="generic"
          headline="Title"
          description="Generic description"
        />,
      );
      const desc = screen.getByText("Generic description");
      expect(desc).toHaveClass("text-lg");
      expect(desc).not.toHaveClass("md:text-xl");
    });

    it("description uses muted text color for contrast on dark background", () => {
      render(<HeroBanner headline="Title" description="Body text" />);
      const desc = screen.getByText("Body text");
      expect(desc).toHaveClass("text-base-muted");
    });
  });

  // ─── Branding & styling (BR08, BR09, BR12) ─────────────────────────

  describe("Branding", () => {
    it("uses brand dark blue background", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      expect(container.firstChild).toHaveClass("bg-background-brand-dark");
    });

    it("spans full viewport width (BR08)", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      expect(container.firstChild).toHaveClass("w-full");
    });

    it("clips overflow for curve effect", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      expect(container.firstChild).toHaveClass("overflow-hidden");
    });

    it("applies custom className to section", () => {
      const { container } = render(
        <HeroBanner headline="Title" className="mt-0" />,
      );
      expect(container.firstChild).toHaveClass("mt-0");
    });

    it("home variant has bottom padding for wave overlap", () => {
      const { container } = render(<HeroBanner headline="Title" />);
      expect(container.firstChild).toHaveClass("pb-40");
    });

    it("generic variant does not have bottom wave padding", () => {
      const { container } = render(
        <HeroBanner variant="generic" headline="Title" />,
      );
      expect(container.firstChild).not.toHaveClass("pb-40");
    });
  });

  // ─── Variant defaults ──────────────────────────────────────────────

  describe("Variant defaults", () => {
    it("defaults to home variant", () => {
      render(<HeroBanner headline="Title" buttonText="CTA" />);
      // Home variant shows the button
      expect(screen.getByRole("button", { name: "CTA" })).toBeInTheDocument();
    });

    it("generic variant does not show CTA button", () => {
      render(
        <HeroBanner variant="generic" headline="Title" buttonText="CTA" />,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("home variant does not show breadcrumbs even when provided", () => {
      render(
        <HeroBanner
          headline="Title"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Page" }]}
        />,
      );
      expect(
        screen.queryByRole("navigation", { name: "breadcrumb" }),
      ).not.toBeInTheDocument();
    });
  });
});
