// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/vitest-axe.d.ts" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { axeRunOptions } from "../../test/axe-config.js";
import { HeroBlock } from "../hero/index.js";

describe("HeroBlock Accessibility", () => {
  it("home variant has no accessibility violations", async () => {
    const { container } = render(
      <HeroBlock
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
      <HeroBlock
        variant="generic"
        headline="About us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About us" },
        ]}
      />,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });
});
