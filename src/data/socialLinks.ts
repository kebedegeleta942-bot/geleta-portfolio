import { profile } from "./profile";

export type SocialKey = "email" | "github" | "linkedin" | "telegram";

export interface SocialLink {
  key: SocialKey;
  label: string;
  /** null = not provided yet. Unset links are hidden in the hero/footer and shown as placeholders in Contact. */
  href: string | null;
  /** What to show as the visible value when set. */
  display: string | null;
  placeholder: string;
}

export const socialLinks: SocialLink[] = [
  {
    key: "email",
    label: "Email",
    href: profile.email ? `mailto:${profile.email}` : null,
    display: profile.email || null,
    placeholder: "your.email@example.com",
  },
  { key: "github", label: "GitHub", href:"https://github.com/kebedegeleta942-bot", display: "github.com/kebedegeleta942-bot", placeholder: "github.com/kebedegeleta942-bot" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/geleta-kebede-65b005352", display: "linkedin.com/geleta-kebede-65b005352", placeholder: "linkedin.com/in/geleta-kebede-65b005352" },
  { key: "telegram", label: "Telegram", href: "https://t.me/milahn134579912356788", display: "telegram.com/milahn134579912356788", placeholder: "t.me/milahn134579912356788" },
];
