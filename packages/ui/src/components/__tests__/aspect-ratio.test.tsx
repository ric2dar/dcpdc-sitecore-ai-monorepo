// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "../aspect-ratio.js";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="/photo.jpg" alt="Landscape" />
      </AspectRatio>,
    );
    expect(screen.getByAltText("Landscape")).toBeInTheDocument();
  });

  it("sets data-slot attribute", () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>Content</div>
      </AspectRatio>,
    );
    expect(container.querySelector("[data-slot='aspect-ratio']")).toBeInTheDocument();
  });

  it("forwards additional props", () => {
    render(
      <AspectRatio ratio={4 / 3} data-testid="ar">
        <div />
      </AspectRatio>,
    );
    expect(screen.getByTestId("ar")).toBeInTheDocument();
  });
});
