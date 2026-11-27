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
  { key: "github", label: "GitHub", href: null, display: null, placeholder: "github.com/your-username" },
  { key: "linkedin", label: "LinkedIn", href: null, display: null, placeholder: "linkedin.com/in/your-handle" },
  { key: "telegram", label: "Telegram", href: null, display: null, placeholder: "t.me/your_username" },
];
