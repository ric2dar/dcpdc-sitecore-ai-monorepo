import * as React from "react";
import { cn } from "@repo/ui/lib/utils";

// Types
export type IllustratedIconSize = "sm" | "md" | "lg" | "xl";
export type IllustratedIconName =
  // People
  | "worker"
  | "employer"
  | "provider"
  | "accessibility"
  | "profile-account"
  | "worker-office"
  | "worker-regional"
  | "worker-customer-service"
  | "worker-construction"
  | "worker-hospitality"
  | "person-collaboration"
  | "person-connection"
  | "person-empowered"
  | "person-achievement"
  | "person-care"
  | "healthcare-provider"
  // Hand & Gesture
  | "hand"
  | "hand-growth"
  | "hand-warning"
  | "hand-dollar"
  | "hand-palm"
  | "hand-injury"
  | "hand-burn"
  | "heart-hands"
  | "heart-hand"
  // Head & Mind
  | "head"
  | "head-bandaid"
  | "head-cloud"
  | "head-sun"
  | "head-doodle"
  | "head-brain"
  | "head-storm"
  | "head-heart"
  | "doodle"
  // Technology
  | "cursor"
  | "browser"
  | "laptop"
  | "laptop-settings"
  | "laptop-support"
  | "laptop-cloud"
  | "settings"
  | "cyber-security"
  | "cyber-security-lock"
  | "maintenance"
  | "globe"
  | "media"
  | "home"
  | "security"
  | "email"
  // Communication
  | "close"
  | "information"
  | "question"
  | "alert"
  | "success"
  | "mail"
  | "message"
  | "conversation"
  | "communication-alert"
  | "phone"
  | "location"
  | "support-headset"
  // Nature
  | "sun"
  | "sun-clouds"
  | "cloud"
  | "lightning"
  | "growth"
  | "flower"
  | "umbrella"
  | "cyclone"
  // Documents & Office
  | "notepad"
  | "clipboard"
  | "spiral-law"
  | "spiral-notebook"
  | "document-rejected"
  | "document-medical"
  | "document-successful"
  | "document-checklist"
  | "document-edit"
  | "document-add"
  | "document-time"
  | "document-setting"
  | "folder-storage"
  | "folder-favourite"
  | "calendar"
  | "paperclip"
  | "pen"
  | "pin"
  // Finance
  | "payments"
  | "percentage"
  | "finance-exchange"
  | "finance-receipt"
  | "finance-card"
  | "finance-analytics"
  | "finance-increase"
  | "finance-decrease"
  // Health
  | "hospital"
  | "lungs"
  | "bone-break"
  | "bandaid"
  | "bandaid-cross"
  | "blood-donation"
  | "heart"
  | "heartbeat"
  | "heart-cross"
  // Wellness & Sports
  | "sports-shoe"
  | "sports-bike"
  | "sports-dumbbell"
  | "apple"
  | "mindfulness"
  | "coffee"
  // Tools
  | "repair-tools"
  | "wrench"
  | "hammer"
  // Business
  | "governance-decision"
  | "governance-scales"
  | "creativity"
  | "briefcase"
  | "award"
  | "speedometer"
  // Navigation & Time
  | "compass"
  | "compass-north"
  | "compass-direction"
  | "refresh"
  | "alarm"
  | "clock"
  // Other
  | "flag"
  | "book"
  | "newspaper"
  | "plane"
  | "binoculars"
  | "puzzle"
  | "trophy"
  | "lightbulb"
  | "key"
  | "lock"
  | "target"
  | "first-nations"
  | "flame"
  | "watering-can";

export interface IllustratedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IllustratedIconName;
  size?: IllustratedIconSize;
  alt?: string;
}

const sizeClasses: Record<IllustratedIconSize, string> = {
  sm: "size-11", // 44px
  md: "size-12", // 48px
  lg: "size-15", // 60px
  xl: "size-20", // 80px
};

// SVG imports map - using require for Next.js compatibility
const iconPaths: Record<IllustratedIconName, string> = {
  // People
  worker: "/icons/worker.svg",
  employer: "/icons/employer.svg",
  provider: "/icons/provider.svg",
  accessibility: "/icons/accessibility.svg",
  "profile-account": "/icons/profile-account.svg",
  "worker-office": "/icons/worker-office.svg",
  "worker-regional": "/icons/worker-regional.svg",
  "worker-customer-service": "/icons/worker-customer-service.svg",
  "worker-construction": "/icons/worker-construction.svg",
  "worker-hospitality": "/icons/worker-hospitality.svg",
  "person-collaboration": "/icons/person-collaboration.svg",
  "person-connection": "/icons/person-connection.svg",
  "person-empowered": "/icons/person-empowered.svg",
  "person-achievement": "/icons/person-achievement.svg",
  "person-care": "/icons/person-care.svg",
  "healthcare-provider": "/icons/healthcare-provider.svg",
  // Hand & Gesture
  hand: "/icons/hand.svg",
  "hand-growth": "/icons/hand-growth.svg",
  "hand-warning": "/icons/hand-warning.svg",
  "hand-dollar": "/icons/hand-dollar.svg",
  "hand-palm": "/icons/hand-palm.svg",
  "hand-injury": "/icons/hand-injury.svg",
  "hand-burn": "/icons/hand-burn.svg",
  "heart-hands": "/icons/heart-hands.svg",
  "heart-hand": "/icons/heart-hand.svg",
  // Head & Mind
  head: "/icons/head.svg",
  "head-bandaid": "/icons/head-bandaid.svg",
  "head-cloud": "/icons/head-cloud.svg",
  "head-sun": "/icons/head-sun.svg",
  "head-doodle": "/icons/head-doodle.svg",
  "head-brain": "/icons/head-brain.svg",
  "head-storm": "/icons/head-storm.svg",
  "head-heart": "/icons/head-heart.svg",
  doodle: "/icons/doodle.svg",
  // Technology
  cursor: "/icons/cursor.svg",
  browser: "/icons/browser.svg",
  laptop: "/icons/laptop.svg",
  "laptop-settings": "/icons/laptop-settings.svg",
  "laptop-support": "/icons/laptop-support.svg",
  "laptop-cloud": "/icons/laptop-cloud.svg",
  settings: "/icons/settings.svg",
  "cyber-security": "/icons/cyber-security.svg",
  "cyber-security-lock": "/icons/cyber-security-lock.svg",
  maintenance: "/icons/maintenance.svg",
  globe: "/icons/globe.svg",
  media: "/icons/media.svg",
  home: "/icons/home.svg",
  security: "/icons/security.svg",
  email: "/icons/email.svg",
  // Communication
  close: "/icons/close.svg",
  information: "/icons/information.svg",
  question: "/icons/question.svg",
  alert: "/icons/alert.svg",
  success: "/icons/success.svg",
  mail: "/icons/mail.svg",
  message: "/icons/message.svg",
  conversation: "/icons/conversation.svg",
  "communication-alert": "/icons/communication-alert.svg",
  phone: "/icons/phone.svg",
  location: "/icons/location.svg",
  "support-headset": "/icons/support-headset.svg",
  // Nature
  sun: "/icons/sun.svg",
  "sun-clouds": "/icons/sun-clouds.svg",
  cloud: "/icons/cloud.svg",
  lightning: "/icons/lightning.svg",
  growth: "/icons/growth.svg",
  flower: "/icons/flower.svg",
  umbrella: "/icons/umbrella.svg",
  cyclone: "/icons/cyclone.svg",
  // Documents & Office
  notepad: "/icons/notepad.svg",
  clipboard: "/icons/clipboard.svg",
  "spiral-law": "/icons/spiral-law.svg",
  "spiral-notebook": "/icons/spiral-notebook.svg",
  "document-rejected": "/icons/document-rejected.svg",
  "document-medical": "/icons/document-medical.svg",
  "document-successful": "/icons/document-successful.svg",
  "document-checklist": "/icons/document-checklist.svg",
  "document-edit": "/icons/document-edit.svg",
  "document-add": "/icons/document-add.svg",
  "document-time": "/icons/document-time.svg",
  "document-setting": "/icons/document-setting.svg",
  "folder-storage": "/icons/folder-storage.svg",
  "folder-favourite": "/icons/folder-favourite.svg",
  calendar: "/icons/calendar.svg",
  paperclip: "/icons/paperclip.svg",
  pen: "/icons/pen.svg",
  pin: "/icons/pin.svg",
  // Finance
  payments: "/icons/payments.svg",
  percentage: "/icons/percentage.svg",
  "finance-exchange": "/icons/finance-exchange.svg",
  "finance-receipt": "/icons/finance-receipt.svg",
  "finance-card": "/icons/finance-card.svg",
  "finance-analytics": "/icons/finance-analytics.svg",
  "finance-increase": "/icons/finance-increase.svg",
  "finance-decrease": "/icons/finance-decrease.svg",
  // Health
  hospital: "/icons/hospital.svg",
  lungs: "/icons/lungs.svg",
  "bone-break": "/icons/bone-break.svg",
  bandaid: "/icons/bandaid.svg",
  "bandaid-cross": "/icons/bandaid-cross.svg",
  "blood-donation": "/icons/blood-donation.svg",
  heart: "/icons/heart.svg",
  heartbeat: "/icons/heartbeat.svg",
  "heart-cross": "/icons/heart-cross.svg",
  // Wellness & Sports
  "sports-shoe": "/icons/sports-shoe.svg",
  "sports-bike": "/icons/sports-bike.svg",
  "sports-dumbbell": "/icons/sports-dumbbell.svg",
  apple: "/icons/apple.svg",
  mindfulness: "/icons/mindfulness.svg",
  coffee: "/icons/coffee.svg",
  // Tools
  "repair-tools": "/icons/repair-tools.svg",
  wrench: "/icons/wrench.svg",
  hammer: "/icons/hammer.svg",
  // Business
  "governance-decision": "/icons/governance-decision.svg",
  "governance-scales": "/icons/governance-scales.svg",
  creativity: "/icons/creativity.svg",
  briefcase: "/icons/briefcase.svg",
  award: "/icons/award.svg",
  speedometer: "/icons/speedometer.svg",
  // Navigation & Time
  compass: "/icons/compass.svg",
  "compass-north": "/icons/compass-north.svg",
  "compass-direction": "/icons/compass-direction.svg",
  refresh: "/icons/refresh.svg",
  alarm: "/icons/alarm.svg",
  clock: "/icons/clock.svg",
  // Other
  flag: "/icons/flag.svg",
  book: "/icons/book.svg",
  newspaper: "/icons/newspaper.svg",
  plane: "/icons/plane.svg",
  binoculars: "/icons/binoculars.svg",
  puzzle: "/icons/puzzle.svg",
  trophy: "/icons/trophy.svg",
  lightbulb: "/icons/lightbulb.svg",
  key: "/icons/key.svg",
  lock: "/icons/lock.svg",
  target: "/icons/target.svg",
  "first-nations": "/icons/first-nations.svg",
  flame: "/icons/flame.svg",
  "watering-can": "/icons/watering-can.svg",
};

/**
 * @example
 * ```tsx
 * <IllustratedIcon name="worker" size="lg" />
 * <IllustratedIcon name="laptop" size="md" alt="Technology services" />
 * ```
 */
export function IllustratedIcon({
  name,
  size = "lg",
  alt,
  className,
  ...props
}: IllustratedIconProps) {
  const iconPath = iconPaths[name];

  if (!iconPath) {
    console.warn(`IllustratedIcon: Unknown icon name "${name}"`);
    return null;
  }

  return (
    <div
      className={cn("relative shrink-0", sizeClasses[size], className)}
      role={alt ? "img" : "presentation"}
      aria-label={alt}
      {...props}
    >
      <img
        src={iconPath}
        alt={alt || ""}
        className="absolute inset-0 block size-full object-contain"
        aria-hidden={!alt}
      />
    </div>
  );
}

// Category-based exports for convenience
export const PeopleIcons = [
  "worker",
  "employer",
  "provider",
  "accessibility",
  "profile-account",
  "worker-office",
  "worker-regional",
  "worker-customer-service",
  "worker-construction",
  "worker-hospitality",
  "person-collaboration",
  "person-connection",
  "person-empowered",
  "person-achievement",
  "person-care",
  "healthcare-provider",
] as const;

export const HandIcons = [
  "hand",
  "hand-growth",
  "hand-warning",
  "hand-dollar",
  "hand-palm",
  "hand-injury",
  "hand-burn",
  "heart-hands",
  "heart-hand",
] as const;

export const HeadIcons = [
  "head",
  "head-bandaid",
  "head-cloud",
  "head-sun",
  "head-doodle",
  "head-brain",
  "head-storm",
  "head-heart",
  "doodle",
] as const;

export const TechnologyIcons = [
  "cursor",
  "browser",
  "laptop",
  "laptop-settings",
  "laptop-support",
  "laptop-cloud",
  "settings",
  "cyber-security",
  "cyber-security-lock",
  "maintenance",
  "globe",
  "media",
  "home",
  "security",
  "email",
] as const;

export const CommunicationIcons = [
  "close",
  "information",
  "question",
  "alert",
  "success",
  "mail",
  "message",
  "conversation",
  "communication-alert",
  "phone",
  "location",
  "support-headset",
] as const;

export const NatureIcons = [
  "sun",
  "sun-clouds",
  "cloud",
  "lightning",
  "growth",
  "flower",
  "umbrella",
  "cyclone",
] as const;

export const DocumentIcons = [
  "notepad",
  "clipboard",
  "spiral-law",
  "spiral-notebook",
  "document-rejected",
  "document-medical",
  "document-successful",
  "document-checklist",
  "document-edit",
  "document-add",
  "document-time",
  "document-setting",
  "folder-storage",
  "folder-favourite",
  "calendar",
  "paperclip",
  "pen",
  "pin",
] as const;

export const FinanceIcons = [
  "payments",
  "percentage",
  "finance-exchange",
  "finance-receipt",
  "finance-card",
  "finance-analytics",
  "finance-increase",
  "finance-decrease",
] as const;

export const HealthIcons = [
  "hospital",
  "lungs",
  "bone-break",
  "bandaid",
  "bandaid-cross",
  "blood-donation",
  "heart",
  "heartbeat",
  "heart-cross",
] as const;

export const WellnessIcons = [
  "sports-shoe",
  "sports-bike",
  "sports-dumbbell",
  "apple",
  "mindfulness",
  "coffee",
] as const;

export const ToolsIcons = [
  "repair-tools",
  "wrench",
  "hammer",
] as const;

export const BusinessIcons = [
  "governance-decision",
  "governance-scales",
  "creativity",
  "briefcase",
  "award",
  "speedometer",
] as const;

export const NavigationIcons = [
  "compass",
  "compass-north",
  "compass-direction",
  "refresh",
  "alarm",
  "clock",
] as const;

export const OtherIcons = [
  "flag",
  "book",
  "newspaper",
  "plane",
  "binoculars",
  "puzzle",
  "trophy",
  "lightbulb",
  "key",
  "lock",
  "target",
  "first-nations",
  "flame",
  "watering-can",
] as const;

export const AllIllustratedIcons = [
  ...PeopleIcons,
  ...HandIcons,
  ...HeadIcons,
  ...TechnologyIcons,
  ...CommunicationIcons,
  ...NatureIcons,
  ...DocumentIcons,
  ...FinanceIcons,
  ...HealthIcons,
  ...WellnessIcons,
  ...ToolsIcons,
  ...BusinessIcons,
  ...NavigationIcons,
  ...OtherIcons,
] as const;
