// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/vitest-axe.d.ts" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { axeRunOptions } from "../../test/axe-config.js";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar.js";

describe("Avatar Accessibility", () => {
  it("avatar with image has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });

  it("avatar fallback only has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    const results = await axe(container, axeRunOptions);
    expect(results).toHaveNoViolations();
  });
});
