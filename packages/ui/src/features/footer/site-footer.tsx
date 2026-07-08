"use client";

import * as React from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteFooterProps {
  /** Logo image source URL */
  logoSrc?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Tagline below the logo */
  tagline?: string;
  /** Quick links column 1 */
  quickLinks?: FooterLink[];
  /** Quick links column 2 */
  quickLinksSecondary?: FooterLink[];
  /** Contact address */
  address?: string;
  /** Contact phone number */
  phone?: string;
  /** Phone href for tel: link */
  phoneHref?: string;
  /** Contact email */
  email?: string;
  /** App Store download URL */
  appStoreUrl?: string;
  /** Google Play download URL */
  playStoreUrl?: string;
  /** App download description */
  appDescription?: string;

  /** Legal links (privacy policy, terms, etc.) */
  legalLinks?: FooterLink[];
  /** Copyright notice */
  copyright?: string;
}

export function SiteFooter({
  logoSrc = "https://burjeelmedicalcity.com/wp-content/uploads/2025/08/logo.png",
  logoAlt = "Burjeel Medical City",
  tagline = "Burjeel Medical City is a state-of-the-art quaternary healthcare facility in Abu Dhabi, United Arab Emirates.",
  quickLinks = [
    { label: "About Us", href: "/about-us/" },
    { label: "Find a Doctor", href: "/our-expert/" },
    { label: "Specialities", href: "/bmc-specialities/" },
    { label: "Insurance", href: "/bmc-insurance/" },
    { label: "Institutes", href: "/institute/" },
    { label: "Health Packages", href: "/health-packages/" },
    { label: "Technology", href: "/technology/" },
  ],
  quickLinksSecondary = [
    { label: "Book Appointment", href: "/book-an-appointment/" },
    { label: "Blogs, News & Media", href: "/blogs/" },
    { label: "Testimonials", href: "/bmc-testimonials/" },
    { label: "Feedback", href: "/feedback/" },
    { label: "Visitor Information", href: "/visitor-information/" },
  ],
  address = "Mohammed Bin Zayed City, Abu Dhabi, UAE",
  phone = "+971 80023",
  phoneHref = "tel:+97180023",
  email = "info@burjeelmedicalcity.com",
  appStoreUrl = "https://apps.apple.com/ae/app/burjeel-health/id1603973269",
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.burjeelPatientPortalNative",
  appDescription = "Get easy access to appointments, medical records, and more with the Burjeel Health App.",

  legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms & Conditions", href: "/terms-conditions/" },
  ],
  copyright = `© ${new Date().getFullYear()} Burjeel Medical City. All rights reserved.`,
}: SiteFooterProps) {
  return (
    <footer className="bg-bs-primary text-white font-montserrat">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Logo & Tagline */}
          <div className="lg:col-span-3 min-w-0">
            <a href="/" className="inline-block mb-4">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-10 lg:h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed">{tagline}</p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="lg:col-span-2 min-w-0">
            <h3 className="text-base font-medium uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-bs-secondary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="lg:col-span-2 min-w-0">
            <h3 className="text-base font-medium uppercase tracking-wider mb-4 invisible">
              More Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinksSecondary.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-bs-secondary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 min-w-0">
            <h3 className="text-base font-medium uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-bs-secondary" />
                <span>{address}</span>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 hover:text-bs-secondary transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 shrink-0 text-bs-secondary" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-bs-secondary transition-colors"
                >
                  <EmailIcon className="w-4 h-4 shrink-0 text-bs-secondary" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="lg:col-span-3 min-w-0">
            <h3 className="text-base font-medium uppercase tracking-wider mb-4">
              Download App
            </h3>
            <p className="text-white/60 text-sm mb-4">{appDescription}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Download on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Get it on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4">
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white">
            <span>{copyright}</span>
            <div className="flex items-center gap-3">
              {legalLinks.map((link, i) => (
                <React.Fragment key={link.href}>
                  {i > 0 && (
                    <span className="w-px h-3 bg-white/20 inline-block" />
                  )}
                  <a
                    href={link.href}
                    className="hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
