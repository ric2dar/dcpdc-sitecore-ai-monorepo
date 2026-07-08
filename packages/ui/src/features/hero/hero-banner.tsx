import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";


/**
 * Hero Banner component
 *
 * Two variants:
 * - "home"    — Used on landing pages. Shows a CTA button; no breadcrumbs.
 * - "generic" — Used on internal content pages. Shows breadcrumbs; no button.
 *
 * Responsive layout:
 * - Mobile   : Stacked. Optional image at top (152px, concave bottom curve), text below.
 * - Tablet   : Side-by-side. Text left (50%), image right (50%) with concave left curve. Headline 48px.
 * - Desktop  : Side-by-side. Text left (50%), image right (50%) with concave left curve. Headline 60px.
 *
 * Text-only mode: When imageSrc is omitted the hero renders as a full-width solid dark-blue block.
 *
 * Figma node: 25521:7868 (spec), 26755:4944 (home desktop), 26755:5273 (home tablet),
 *             24516:8102 (generic desktop), 24516:8161 (generic tablet), 24516:8108 (generic mobile)
 */

// ── Module-level constants ──────────────────────────────────────────────

/*
 * Navy curve overlay — Figma "Vector" layer.
 *
 * In Figma the vector is ~2.4× the hero height (1005×1135 vs 478px hero)
 * and positioned with ~61% extending above. The hero clips it via
 * overflow-hidden, so only the gentle upper portion of the concave curve
 * is visible — ending well before the bottom-right corner.
 *
 * The normalized curve path is identical across all three breakpoints
 * (desktop/tablet/mobile). We use viewBox 0 0 100 100 with
 * preserveAspectRatio="none" and different CSS sizing per breakpoint.
 *
 * The path fills the area to the LEFT of the Figma curve (the navy region
 * overlaying the image). It seamlessly connects with the navy hero
 * background on the left.
 */
const CURVE_PATH =
  "M0,0 C0.26,10.84 1.93,24.82 7.45,40.03 C15.66,62.66 42.30,83.37 100,100 L0,100 Z";

/*
 * Mobile clip path — based on Figma vector (node 26755-5367, viewBox 0 0 391 210)
 * normalized to 0–1 for clipPathUnits="objectBoundingBox".
 *
 * In Figma, the vector is positioned at (-47, -32) relative to the image
 * container, so the curve origin is OUTSIDE the visible area. The path
 * extends to x=-0.12 and y=-0.15 (beyond the element boundaries) so that
 * the curve enters the visible area ~22% below the top-left corner —
 * matching the Figma layout where the curve starts below the top.
 *
 * Shape: top-right → past top-left → curve origin (outside) → concave
 * curve sweeping to bottom-right → close via right edge.
 */
const MOBILE_CLIP_PATH =
  "M1,0 L-0.12,0 L-0.12,-0.15 C-0.11739,-0.04159 0.01933,0.24814 0.07453,0.40028 C0.15663,0.62661 0.42303,0.83365 1,1 Z";

/** SVG positioning for the tablet curve overlay (md–xl) */
const TABLET_CURVE_STYLE = {
  left: "0%",
  top: "-47%",
  width: "133%",
  height: "213%",
} as const;

/** SVG positioning for the desktop curve overlay (≥ xl) */
const DESKTOP_CURVE_STYLE = {
  left: "-4%",
  top: "-61%",
  width: "133%",
  height: "238%",
} as const;

/** Shared classes for the hero CTA button / link */
const CTA_CLASSES =
  "inline-flex h-11 items-center gap-2 rounded-full bg-base-white px-4 py-1.5 text-lg font-semibold leading-7 text-background-brand-dark shadow-xs hover:bg-base-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-white focus-visible:ring-offset-2 focus-visible:ring-offset-background-brand-dark";

// ── Types ───────────────────────────────────────────────────────────────

export interface HeroBreadcrumb {
  /** Display label for the breadcrumb item */
  label: string;
  /** Navigation href. Omit for the current (last) breadcrumb item. */
  href?: string;
}

export interface HeroBannerProps {
  /**
   * "home"    – landing pages (shows CTA button, no breadcrumbs).
   * "generic" – functional / content pages (shows breadcrumbs, no button).
   * @default "home"
   */
  variant?: "home" | "generic";

  /** Primary page headline (rendered as h1) */
  headline: React.ReactNode;

  /** Optional body content. Supports rich text (pass a JSS RichText component or plain string). */
  description?: React.ReactNode;

  /**
   * Breadcrumb trail for the "generic" variant.
   * The last item is treated as the current page and rendered as non-linked text.
   */
  breadcrumbs?: HeroBreadcrumb[];

  /** CTA button label; only rendered for the "home" variant. */
  buttonText?: string;

  /** CTA button destination href; only applied when buttonText is provided. */
  buttonHref?: string;

  /** Link target (e.g. "_blank"). When "_blank", adds rel="noopener noreferrer" and sr-only hint. */
  buttonTarget?: string;

  /** CTA button click handler; used when buttonHref is not provided. */
  onButtonClick?: () => void;

  /**
   * Optional hero image URL.
   * When omitted the hero renders in text-only mode (solid dark-blue block).
   */
  imageSrc?: string;

  /**
   * Alt text for the hero image. Passed through to the `<img>` element for
   * SEO even though image containers are `aria-hidden` (decorative).
   */
  imageAlt?: string;

  /**
   * When true, the image zone renders at full opacity immediately without
   * waiting for the browser's onLoad event. Use for static/fallback images
   * that don't involve client-side randomisation.
   * @default false
   */
  immediateImage?: boolean;

  /** Additional class names applied to the outer <section> element. */
  className?: string;
}

// ── Sub-components ──────────────────────────────────────────────────────

/** Mobile image zone (< md): stacked above text with concave clip */
function HeroMobileImage({
  src,
  alt,
  clipId,
  immediateImage = false,
}: {
  src: string;
  alt: string;
  clipId: string;
  immediateImage?: boolean;
}) {
  const [loaded, setLoaded] = React.useState(immediateImage);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (immediateImage) return;
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [immediateImage]);

  return (
    <div
      aria-hidden="true"
      data-slot="hero-mobile-image"
      className={cn(
        "relative h-52.5 md:hidden transition-opacity duration-300 ease-out motion-reduce:duration-0",
        loaded ? "opacity-100" : "opacity-0",
      )}
      style={{ clipPath: `url(#${clipId})` }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

/** Desktop / Tablet image zone (≥ md): right half with curved navy divider */
function HeroDesktopImage({
  src,
  alt,
  immediateImage = false,
}: {
  src: string;
  alt: string;
  immediateImage?: boolean;
}) {
  const [loaded, setLoaded] = React.useState(immediateImage);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (immediateImage) return;
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [immediateImage]);

  return (
    <div
      aria-hidden="true"
      data-slot="hero-desktop-image"
      className={cn(
        "absolute inset-y-0 right-0 hidden md:block md:left-1/2 transition-opacity duration-300 ease-out motion-reduce:duration-0",
        loaded ? "opacity-100" : "opacity-0",
      )}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Tablet curve (md–xl) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute text-background-brand-dark xl:hidden"
        style={TABLET_CURVE_STYLE}
        aria-hidden="true"
      >
        <path d={CURVE_PATH} fill="currentColor" />
      </svg>
      {/* Desktop curve (≥ xl) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute hidden text-background-brand-dark xl:block"
        style={DESKTOP_CURVE_STYLE}
        aria-hidden="true"
      >
        <path d={CURVE_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}

/** CTA rendered as an `<a>` when href is provided, otherwise a `<button>` */
function HeroCta({
  text,
  href,
  target,
  onClick,
}: {
  text: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}) {
  const isExternal = target === "_blank";

  if (href) {
    return (
      <a
        href={href}
        className={CTA_CLASSES}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {text}
        {isExternal && <span className="sr-only">(opens in new tab)</span>}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={CTA_CLASSES}>
      {text}
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────

export function HeroBanner({
  variant = "home",
  headline,
  description,
  breadcrumbs,
  buttonText,
  buttonHref,
  buttonTarget,
  onButtonClick,
  imageSrc,
  imageAlt = "",
  immediateImage = false,
  className,
}: HeroBannerProps) {
  const headlineId = React.useId();
  const clipPathId = React.useId();
  // useId returns colons (e.g. ":r1:") which are invalid in url() references
  const safeClipId = `hero-curve-${clipPathId.replace(/:/g, "")}`;

  return (
    <section
      aria-labelledby={headlineId}
      className={cn(
        "relative w-full overflow-hidden bg-background-brand-dark",
        /* Extra bottom padding on home variant to accommodate the wave overlap area */
        variant === "home" && "pb-40",
        className,
      )}
    >
      {/* Hidden SVG defining the mobile curve clipPath */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={safeClipId} clipPathUnits="objectBoundingBox">
            <path d={MOBILE_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {imageSrc && (
        <HeroMobileImage
          key={imageSrc}
          src={imageSrc}
          alt={imageAlt}
          clipId={safeClipId}
          immediateImage={immediateImage}
        />
      )}

      {imageSrc && (
        <HeroDesktopImage
          key={imageSrc}
          src={imageSrc}
          alt={imageAlt}
          immediateImage={immediateImage}
        />
      )}

      {/* ── Text content zone ─────────────────────────────────────────── */}
      <div
        data-slot="hero-text-zone"
        className={cn(
          "relative flex min-h-80 items-center px-6 py-8 md:px-8 md:py-12 xl:px-16",
          variant === "home"
            ? "md:min-h-96.5 xl:min-h-119.5"
            : "xl:min-h-74",
        )}
      >
        <div className="mx-auto w-full max-w-346">
          <div data-slot="hero-text-column" className="flex w-full flex-col gap-8 md:w-1/2">
            {/* Breadcrumbs — generic variant only */}
            {variant === "generic" && breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb variant="default">
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.href ?? crumb.label}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={crumb.href}>
                              {crumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}

            {/* Headline + Description */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 id={headlineId} className="font-bold text-base-white text-4xl leading-4xl md:text-5xl md:leading-tight xl:text-6xl xl:leading-headline">
                {headline}
              </h1>

              {description && (
                <div
                  data-slot="hero-description"
                  className={cn(
                    "text-base-muted leading-lg [&_p]:m-0",
                    variant === "home"
                      ? "text-lg md:text-xl xl:text-3xl xl:leading-headline"
                      : "text-lg",
                  )}
                >
                  {description}
                </div>
              )}
            </div>

            {/* CTA Button — home variant only */}
            {variant === "home" && buttonText && (
              <div>
                <HeroCta
                  text={buttonText}
                  href={buttonHref}
                  target={buttonTarget}
                  onClick={onButtonClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
