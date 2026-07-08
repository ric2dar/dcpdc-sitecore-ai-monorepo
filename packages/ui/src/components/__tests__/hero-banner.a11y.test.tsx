// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/vitest-axe.d.ts" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { axeRunOptions } from "../../test/axe-config.js";
import { HeroBanner } from "../../features/hero/hero-banner.js";

describe("HeroBanner Accessibility", () => {
  it("home variant has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="home"
        headline="Welcome to Sitecore Sandbox"
        description="Supporting safe and healthy workplaces."
        buttonText="Get started"
        buttonHref="/start"
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("generic variant with breadcrumbs has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="generic"
        headline="About us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("home variant with image has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="home"
        headline="Welcome to Sitecore Sandbox"
        description="Supporting safe workplaces."
        buttonText="Get started"
        buttonHref="/start"
        imageSrc="/hero.jpg"
        imageAlt="Workers on site"
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("generic variant with image has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="generic"
        headline="Making a claim"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Claims" }]}
        imageSrc="/hero.jpg"
        imageAlt="Office workers"
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("home variant with button (no href) has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="home"
        headline="Contact us"
        buttonText="Call now"
        onButtonClick={() => {}}
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("text-only mode (no image) has no accessibility violations", async () => {
    const { container } = render(
      <HeroBanner
        variant="generic"
        headline="Privacy policy"
        description="How we handle your data."
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });
});
