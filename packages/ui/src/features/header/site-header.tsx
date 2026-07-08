"use client";

import * as React from "react";
import { cn } from "@repo/ui/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SiteHeaderProps {
  /** Logo image source URL */
  logoSrc?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Top bar links (e.g., About Us, Health Packages, Contact Us) */
  topLinks?: NavItem[];
  /** Main navigation links */
  mainNavLinks?: NavItem[];
  /** Patient portal URL */
  portalUrl?: string;
  /** Phone number to display */
  phoneNumber?: string;
  /** Phone number tel: link */
  phoneHref?: string;
  /** Available languages */
  languages?: { label: string; href: string; active?: boolean }[];
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Book appointment URL */
  bookAppointmentUrl?: string;
  /** Book appointment label */
  bookAppointmentLabel?: string;
  /** Callback when search is submitted */
  onSearch?: (query: string) => void;
}

export function SiteHeader({
  logoSrc = "https://burjeelmedicalcity.com/wp-content/uploads/2025/08/logo.png",
  logoAlt = "Burjeel Medical City",
  topLinks = [
    { label: "About Us", href: "/about-us/" },
    { label: "Health Packages", href: "/health-packages/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
  mainNavLinks = [
    { label: "Home", href: "/", active: true },
    { label: "Specialities", href: "/bmc-specialities/" },
    { label: "Our Experts", href: "/our-expert/" },
    { label: "Global Patients", href: "/global-patients/" },
  ],
  portalUrl = "/book-an-appointment/",
  phoneNumber = "80023",
  phoneHref = "tel:+97180023",
  languages = [
    { label: "English", href: "/", active: true },
    { label: "العربية", href: "/ar/" },
  ],
  searchPlaceholder = "Dr. Name, Speciality",
  bookAppointmentUrl = "/book-an-appointment/",
  bookAppointmentLabel = "Book Appointment",
  onSearch,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const langRef = React.useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const activeLanguage = languages.find((l) => l.active) || languages[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bs-body-bg font-montserrat shadow-header">
      <nav className="py-3 lg:py-0">
        <div className="container mx-auto px-4 relative">
          {/* Mobile header */}
          <div className="flex items-center justify-between lg:hidden">
            <a href="/" className="shrink-0">
              <img src={logoSrc} alt={logoAlt} className="h-10 w-auto" />
            </a>
            <div className="flex items-center gap-3">
              <a
                href={phoneHref}
                className="flex items-center gap-1 text-bs-primary font-semibold text-sm"
              >
                <PhoneIcon className="text-bs-primary" />
                <span>{phoneNumber}</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-0 border-0 text-bs-secondary"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <HamburgerIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop header: Logo left spanning both rows, content right */}
          <div className="hidden lg:flex items-stretch">
            {/* Logo — spans both rows */}
            <a href="/" className="shrink-0 flex items-center pr-8 self-center">
              <img src={logoSrc} alt={logoAlt} className="h-12 xl:h-14 w-auto" />
            </a>

            {/* Right content — two rows */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Top row: secondary links (center) + actions (right) */}
              <div className="flex items-center justify-between py-2">
                {/* Top Nav Links — centered */}
                <ul className="flex items-center gap-5">
                  {topLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-bs-body-color/60 hover:text-bs-body-color transition-colors font-medium text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Right actions: Portal, Phone, Language */}
                <div className="flex items-center gap-4">
                  <a
                    href={portalUrl}
                    className="inline-flex items-center gap-1.5 text-bs-primary font-semibold text-sm hover:opacity-75 transition-opacity"
                  >
                    <PortalIcon className="text-bs-primary" />
                    <span>Patient Portal</span>
                  </a>

                  <a
                    href={phoneHref}
                    className="flex items-center gap-1.5 text-bs-primary font-semibold text-sm hover:opacity-75 transition-opacity"
                  >
                    <PhoneIcon className="text-bs-primary" />
                    <span>{phoneNumber}</span>
                  </a>

                  {/* Language Dropdown */}
                  <div className="relative" ref={langRef}>
                    <button
                      onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                      className="flex items-center gap-1 text-bs-primary font-semibold text-sm hover:opacity-75 transition-opacity"
                    >
                      <span>{activeLanguage?.label}</span>
                      <ChevronDownIcon className="text-bs-primary" />
                    </button>
                    {langDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-black/10 py-1 min-w-30 z-50">
                        {languages.map((lang) => (
                          <a
                            key={lang.href}
                            href={lang.href}
                            className={cn(
                              "block px-4 py-2 text-sm hover:bg-bs-light-blue transition-colors",
                              lang.active
                                ? "text-bs-secondary font-semibold"
                                : "text-bs-body-color"
                            )}
                          >
                            {lang.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom row: main nav links + search + CTA */}
              <div className="flex items-center justify-between py-2.5 border-t border-black/5">
                {/* Main Nav Links */}
                <ul className="flex items-center gap-6">
                  {mainNavLinks.map((link) => (
                    <li key={link.href} className="relative">
                      <a
                        href={link.href}
                        className={cn(
                          "text-base font-semibold transition-colors pb-2.5",
                          link.active
                            ? "text-bs-secondary"
                            : "text-bs-body-color hover:text-bs-secondary"
                        )}
                      >
                        {link.label}
                      </a>
                      {link.active && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bs-secondary rounded-full" />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Search + Book Appointment */}
                <div className="flex items-center gap-3">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center border border-black/25 rounded-full overflow-hidden"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="px-4 py-2 text-sm bg-transparent border-0 outline-none w-45 xl:w-50 placeholder:text-black/50"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-white border-0 text-black hover:text-bs-secondary transition-colors"
                      aria-label="Search"
                    >
                      <SearchIcon />
                    </button>
                  </form>

                  <a
                    href={bookAppointmentUrl}
                    className="inline-flex items-center px-6 py-2.5 bg-bs-primary text-white text-sm font-semibold rounded-full hover:bg-bs-primary-hover transition-colors"
                  >
                    {bookAppointmentLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[64px] bg-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col gap-6">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-black/25 rounded-full overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 px-4 py-2.5 text-sm bg-transparent border-0 outline-none placeholder:text-black/50"
            />
            <button
              type="submit"
              className="px-3 py-2.5 bg-white border-0 text-black"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </form>

          {/* Main Nav */}
          <ul className="flex flex-col gap-4">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-base font-semibold block py-1",
                    link.active
                      ? "text-bs-secondary"
                      : "text-bs-body-color hover:text-bs-secondary"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="border-black/10" />

          {/* Top Links */}
          <ul className="flex flex-col gap-3">
            {topLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-bs-body-color/60 hover:text-bs-body-color font-semibold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="border-black/10" />

          {/* Portal & Language */}
          <div className="flex flex-col gap-3">
            <a
              href={portalUrl}
              className="flex items-center gap-2 text-bs-primary font-semibold text-sm"
            >
              <PortalIcon className="text-bs-primary" />
              <span>Patient Portal</span>
            </a>

            <div className="flex items-center gap-3">
              {languages.map((lang) => (
                <a
                  key={lang.href}
                  href={lang.href}
                  className={cn(
                    "text-sm font-semibold",
                    lang.active ? "text-bs-secondary" : "text-bs-body-color/60"
                  )}
                >
                  {lang.label}
                </a>
              ))}
            </div>
          </div>

          {/* Book Appointment */}
          <a
            href={bookAppointmentUrl}
            className="inline-flex items-center justify-center px-5 py-3 bg-bs-primary text-white text-sm font-semibold rounded-full hover:bg-bs-primary-hover transition-colors w-full"
          >
            {bookAppointmentLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────

function PortalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("w-3.5 h-3.5", className)}
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1c-3.315 0-6 1.79-6 4v1h12v-1c0-2.21-2.685-4-6-4z" />
      <path d="M14 3.5V2h-1v1.5h-1.5v1H13V6h1V4.5h1.5v-1H14z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("w-3.5 h-3.5", className)}
    >
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("w-3 h-3", className)}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
