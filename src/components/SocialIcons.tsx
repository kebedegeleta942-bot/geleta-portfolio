import { Icon, type IconName } from "./Icon";
import { socialLinks } from "../data/socialLinks";

const iconFor: Record<string, IconName> = {
  email: "mail",
  github: "github",
  linkedin: "linkedin",
  telegram: "send",
};

/** Renders only links that have a real URL, so there are never dead icons. */
export function SocialIcons({ className = "" }: { className?: string }) {
  const live = socialLinks.filter((l) => l.href);
  if (live.length === 0) return null;
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social links">
      {live.map((l) => (
        <li key={l.key}>
          <a
            href={l.href!}
            target={l.key === "email" ? undefined : "_blank"}
            rel={l.key === "email" ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            title={l.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-fg"
          >
            <Icon name={iconFor[l.key]} />
          </a>
        </li>
      ))}
    </ul>
  );
}
