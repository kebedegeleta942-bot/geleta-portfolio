import type { CSSProperties, ReactNode } from "react";
import { ContactForm } from "../components/ContactForm";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { availability, contactMethods, links, type ContactMethod } from "../data/contact";
import { techIcons } from "../data/techIcons";

function MethodIcon({ icon, size = 20 }: { icon: ContactMethod["icon"]; size?: number }) {
  if (icon === "github-brand" || icon === "telegram-brand") {
    const d = icon === "github-brand" ? techIcons.github : techIcons.telegram;
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
        <path d={d} />
      </svg>
    );
  }
  return <Icon name={icon} size={size} />;
}

/** One row in the contact list. Clickable when a real value exists, otherwise a clear placeholder. */
function MethodRow({ m }: { m: ContactMethod }) {
  const tint: CSSProperties = {
    color: m.color,
    background: `color-mix(in srgb, ${m.color} 14%, transparent)`,
    border: `1px solid color-mix(in srgb, ${m.color} 40%, transparent)`,
  };
  const tile = (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={tint}>
      <MethodIcon icon={m.icon} />
    </span>
  );

  if (m.value && m.href) {
    return (
      <a
        href={m.href}
        target={m.external ? "_blank" : undefined}
        rel={m.external ? "noopener noreferrer" : undefined}
        className="interest-card flex items-center gap-4 rounded-2xl border bg-surface p-3.5"
        style={{ "--c": m.color, borderColor: `color-mix(in srgb, ${m.color} 38%, var(--line))` } as CSSProperties}
      >
        {tile}
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted">{m.label}</span>
          <span className="block truncate text-sm font-medium">{m.value}</span>
        </span>
        <Icon name="arrow-up-right" size={16} className="shrink-0 text-muted" />
      </a>
    );
  }

  if (m.key === "location") {
    return (
      <div
        className="flex items-center gap-4 rounded-2xl border bg-surface p-3.5"
        style={{ borderColor: `color-mix(in srgb, ${m.color} 38%, var(--line))` }}
      >
        {tile}
        <span>
          <span className="block text-xs text-muted">{m.label}</span>
          <span className="block text-sm font-medium">{m.value}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-line p-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-muted" style={{ border: "1px dashed var(--line)" }}>
        <MethodIcon icon={m.icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{m.label}</span>
        <span className="block break-words text-sm text-muted">[Add yours: {m.placeholder}]</span>
      </span>
    </div>
  );
}

interface ActionProps {
  href: string | null;
  external?: boolean;
  download?: string;
  variant: "primary" | "ghost";
  missing: string;
  children: ReactNode;
}

/** Renders a link when a real URL exists, otherwise a visibly disabled button (never a dead link). */
function Action({ href, external, download, variant, missing, children }: ActionProps) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} w-full sm:w-auto`;
  if (!href) {
    return (
      <span className={`${cls} cursor-not-allowed opacity-50`} role="link" aria-disabled="true" title={missing}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
    >
      {children}
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 md:py-28" aria-labelledby="contact-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow mb-4">
              <span className="text-muted">07</span> <span aria-hidden="true">/</span> Contact
            </p>
            <h2 id="contact-title" className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Have an Idea? Let&apos;s Build Something Meaningful.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              <p>
                I&apos;m always interested in connecting with people, exploring innovative ideas, collaborating on
                meaningful projects, and discussing how technology can solve real-world problems.
              </p>
              <p>
                Whether you have a project in mind, an interesting opportunity, a technical question, or simply want to
                exchange ideas, I&apos;d be happy to hear from you.
              </p>
            </div>

            {availability.open && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
                <Icon name="circle-check" size={16} />
                {availability.label}
              </p>
            )}
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <ul className="space-y-3">
              {contactMethods.map((m) => (
                <li key={m.key}>
                  <MethodRow m={m} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Action href={links.email} variant="primary" missing="Add your email in src/data/profile.ts">
                <Icon name="mail" size={16} /> Email Me
              </Action>
              <Action href={links.github} external variant="ghost" missing="Add your GitHub URL in src/data/socialLinks.ts">
                <Icon name="github" size={16} /> GitHub Profile
              </Action>
              <Action href={links.linkedin} external variant="ghost" missing="Add your LinkedIn URL in src/data/socialLinks.ts">
                <Icon name="linkedin" size={16} /> Connect on LinkedIn
              </Action>
            </div>
            <div className="mt-3">
              <Action href={links.cv} external variant="ghost" missing="Add your resume link in src/data/profile.ts">
                <Icon name="file-text" size={16} /> View Resume
              </Action>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
