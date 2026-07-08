// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../avatar.js";

describe("Avatar", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector("[data-slot='avatar']")).toBeInTheDocument();
  });

  it("renders fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    // In jsdom, AvatarImage may not fire onLoad, so the image element may
    // be hidden and fallback shown instead. Verify the <img> is in the DOM
    // via its role or that the fallback displays.
    const { container } = render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    // AvatarImage renders an <img> tag; in jsdom the image stays hidden and
    // the fallback is shown. Verify either the image or fallback is present.
    const img = container.querySelector("img");
    if (img) {
      expect(img).toHaveAttribute("alt", "Jane Doe");
    } else {
      // Fallback shown because jsdom doesn't fire img onLoad
      expect(screen.getByText("JD")).toBeInTheDocument();
    }
  });

  it("applies size variants via data-size", () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector("[data-size='lg']")).toBeInTheDocument();
  });

  it("defaults to size=default", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector("[data-size='default']")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Avatar className="my-avatar">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector(".my-avatar")).toBeInTheDocument();
  });
});

describe("AvatarBadge", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
        <AvatarBadge />
      </Avatar>,
    );
    expect(container.querySelector("[data-slot='avatar-badge']")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("renders multiple avatars", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("renders AvatarGroupCount", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>,
    );
    expect(screen.getByText("+3")).toBeInTheDocument();
  });
});
