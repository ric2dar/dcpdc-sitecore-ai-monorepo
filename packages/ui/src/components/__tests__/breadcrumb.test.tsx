// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../test/jest-dom.d.ts" />
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../breadcrumb.js";

describe("Breadcrumb", () => {
  describe("Rendering", () => {
    it("renders as nav element with aria-label", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const nav = screen.getByRole("navigation", { name: "breadcrumb" });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("data-slot", "breadcrumb");
    });

    it("renders BreadcrumbList as ordered list", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-slot", "breadcrumb-list");
    });

    it("renders BreadcrumbItem as list item", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveAttribute("data-slot", "breadcrumb-item");
    });

    it("renders BreadcrumbLink as anchor", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test">Test</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Test" });
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("data-slot", "breadcrumb-link");
    });

    it("renders complete breadcrumb trail", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Products" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("applies custom className to components", () => {
      render(
        <Breadcrumb className="custom-nav">
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem className="custom-item">
              <BreadcrumbLink href="/" className="custom-link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByRole("navigation")).toHaveClass("custom-nav");
      expect(screen.getByRole("list")).toHaveClass("custom-list");
      expect(screen.getAllByRole("listitem")[0]).toHaveClass("custom-item");
      expect(screen.getByRole("link")).toHaveClass("custom-link");
    });
  });

  describe("BreadcrumbPage (current page)", () => {
    it("renders with aria-current='page'", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("aria-current", "page");
    });

    it("renders with aria-disabled='true'", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("aria-disabled", "true");
    });

    it("has role='link' but is not clickable", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("role", "link");
      expect(page).toHaveAttribute("data-slot", "breadcrumb-page");
    });

    it("applies custom className", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="custom-page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("Current")).toHaveClass("custom-page");
    });

    // BR08: Current page should NOT be in tab order
    it("has tabIndex=-1 to exclude from tab order (BR08)", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("BreadcrumbSeparator", () => {
    it("renders with aria-hidden='true'", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("renders with role='presentation'", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("role", "presentation");
    });

    it("renders default chevron icon", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator.querySelector("svg")).toBeInTheDocument();
    });

    it("renders custom separator content", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  describe("BreadcrumbEllipsis", () => {
    it("renders as button element", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(
        screen.getByRole("button", { name: /show more breadcrumbs/i }),
      ).toBeInTheDocument();
    });

    it("has aria-label for screen readers", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Show more breadcrumbs");
    });

    it("calls onClick when clicked", () => {
      const handleClick = vi.fn();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis onClick={handleClick} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("has type='button' attribute", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applies custom className", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis className="custom-ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveClass("custom-ellipsis");
    });

    it("renders aria-expanded=false when collapsed", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis expanded={false} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("renders aria-expanded=true when expanded", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis expanded={true} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("omits aria-expanded when expanded prop is undefined", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-expanded");
    });
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(
        <Breadcrumb variant="default">
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      // Text color set on list, inherited by children
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("text-base-white");

      // Link has variant-specific focus ring
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveClass("focus-visible:ring-base-white");
    });

    it("renders inverse variant correctly", () => {
      render(
        <Breadcrumb variant="inverse">
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      // Text color set on list, inherited by children
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("text-base-foreground");

      // Link has variant-specific focus ring
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveClass("focus-visible:ring-primary-blue-500");
    });

    it("passes variant through context to BreadcrumbEllipsis", () => {
      render(
        <Breadcrumb variant="inverse">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-muted");
      expect(button).toHaveClass("focus-visible:ring-primary-blue-500");
    });

    it("uses default variant when not specified", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("text-base-white");
    });
  });

  describe("BreadcrumbLink with asChild", () => {
    it("renders slot when asChild is true", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href="/custom" data-testid="custom-link">
                  Custom Link
                </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByTestId("custom-link");
      expect(link).toHaveAttribute("href", "/custom");
      expect(link).toHaveAttribute("data-slot", "breadcrumb-link");
    });
  });

  describe("Keyboard navigation", () => {
    it("links are focusable via Tab", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      const homeLink = screen.getByRole("link", { name: "Home" });
      const productsLink = screen.getByRole("link", { name: "Products" });

      homeLink.focus();
      expect(document.activeElement).toBe(homeLink);

      productsLink.focus();
      expect(document.activeElement).toBe(productsLink);
    });

    it("ellipsis button is focusable", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe("Integration scenarios", () => {
    it("renders long breadcrumb trail with ellipsis pattern", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/parent">Parent</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /show more/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Parent" })).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("handles empty breadcrumb gracefully", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList></BreadcrumbList>
        </Breadcrumb>,
      );
      expect(
        screen.getByRole("navigation", { name: "breadcrumb" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });

  describe("Business Rules Compliance", () => {
    // BR07: Do use aria-label="Breadcrumb" on the nav container
    it("BR07: has aria-label on nav container", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(
        screen.getByRole("navigation", { name: "breadcrumb" }),
      ).toBeInTheDocument();
    });

    // BR05: Separators are not links (aria-hidden)
    it("BR05: separators are not interactive (aria-hidden)", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator).toHaveAttribute("role", "presentation");
    });

    // BR05: Current page is not a link
    it("BR05: current page has aria-disabled", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("aria-disabled", "true");
      expect(page).toHaveAttribute("aria-current", "page");
    });

    // BR08: Current page not in tab order
    it("BR08: current page excluded from tab order", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveAttribute("tabIndex", "-1");
    });

    // BR10: Touch targets minimum 44px
    it("BR10: links have minimum touch target height", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveClass("min-h-11"); // min-h-11 = 44px (11 * 4px)
    });

    it("BR10: ellipsis has minimum touch target size", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-11"); // size-11 = 44px
    });

    it("BR10: current page has minimum touch target height", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveClass("min-h-11");
    });

    // BR11: Default state - all appear same (color inherited from list)
    it("BR11: links and current page have same color in default state", () => {
      render(
        <Breadcrumb variant="default">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      // Text color is set on the list and inherited by all children
      const list = screen.getByRole("list");
      expect(list).toHaveClass("text-base-white");
    });

    // BR04: Hover state shows underline
    it("BR04: links have hover:underline class", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveClass("hover:underline");
    });

    // BR04: Current page cursor remains default
    it("BR04: current page has cursor-default", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText("Current");
      expect(page).toHaveClass("cursor-default");
    });

    // BR05: Ellipsis is clickable
    it("BR05: ellipsis is a clickable button", () => {
      const handleClick = vi.fn();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis onClick={handleClick} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const button = screen.getByRole("button", {
        name: /show more breadcrumbs/i,
      });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // AC06: aria-expanded on ellipsis toggle
    it("AC06: ellipsis has aria-expanded=false in collapsed state", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis expanded={false} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("AC06: ellipsis has aria-expanded=true in expanded state", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis expanded={true} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    // AC14: Truncation on links and current page
    it("AC14: links have truncation classes", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                A very long breadcrumb label that should truncate
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("truncate");
      expect(link).toHaveClass("max-w-48");
      expect(link).toHaveClass("sm:max-w-64");
    });

    it("AC14: current page has truncation classes", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                A very long current page title that should truncate
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByText(
        "A very long current page title that should truncate",
      );
      expect(page).toHaveClass("truncate");
      expect(page).toHaveClass("max-w-48");
      expect(page).toHaveClass("sm:max-w-64");
    });

    // Ellipsis hover uses valid design token
    it("ellipsis default variant has hover:bg-base-white/10 class", () => {
      render(
        <Breadcrumb variant="default">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button")).toHaveClass("hover:bg-base-white/10");
    });
  });
});
