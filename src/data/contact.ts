import { profile } from "./profile";
import { socialLinks, type SocialKey } from "./socialLinks";
import type { IconName } from "../components/Icon";

/**
 * Contact section configuration.
 * The actual values (email, form endpoint, CV file) live in profile.ts and
 * socialLinks.ts: edit those two files and this section updates automatically.
 */

/**
 * Availability badge. Set to false to hide it whenever you are not open to new work.
 * It is only shown when true, so it never claims availability you do not have.
 */
export const availability = {
  open: true,
  label: "Open to Collaboration & Opportunities",
} as const;

export type MethodKey = SocialKey | "location";

export interface ContactMethod {
  key: MethodKey;
  label: string;
  /** Visible value. null = not provided yet (a placeholder row is shown). */
  value: string | null;
  href: string | null;
  external: boolean;
  placeholder: string;
  icon: IconName | "github-brand" | "telegram-brand";
  color: string;
}

const byKey = (key: SocialKey) => socialLinks.find((l) => l.key === key)!;

const method = (
  key: SocialKey,
  icon: ContactMethod["icon"],
  color: string,
  external: boolean,
): ContactMethod => {
  const l = byKey(key);
  return { key, label: l.label, value: l.display ?? l.href, href: l.href, external, placeholder: l.placeholder, icon, color };
};

export const contactMethods: ContactMethod[] = [
  method("email", "mail", "var(--accent)", false),
  method("github", "github-brand", "var(--c-violet)", true),
  method("linkedin", "linkedin", "var(--c-sky)", true),
  method("telegram", "telegram-brand", "var(--c-cyan)", true),
  {
    key: "location",
    label: "Location",
    value: profile.location,
    href: null,
    external: false,
    placeholder: "",
    icon: "map-pin",
    color: "var(--c-amber)",
  },
];

/** Shortcuts used by the three action buttons. */
export const links = {
  email: byKey("email").href,
  github: byKey("github").href,
  linkedin: byKey("linkedin").href,
  cv: profile.resumeUrl,
  cvFileName: profile.resumeFileName,
};
