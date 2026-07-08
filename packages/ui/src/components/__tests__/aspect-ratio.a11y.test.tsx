// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/vitest-axe.d.ts" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { axeRunOptions } from "../../test/axe-config.js";
import { AspectRatio } from "../aspect-ratio.js";

describe("AspectRatio – Accessibility (axe-core)", () => {
  it("has no a11y violations with image content", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="/photo.jpg" alt="A beautiful landscape" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      </AspectRatio>,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations with generic content", async () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>Placeholder content</div>
      </AspectRatio>,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });
});
