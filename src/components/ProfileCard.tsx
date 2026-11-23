import { Icon } from "./Icon";
import { availability } from "../data/contact";
import { profile } from "../data/profile";

/** Three-word identity, taken from the portfolio's positioning statement. */
const tags = [
  { label: "CSE Student", color: "var(--c-amber)" },
  { label: "Full-Stack Developer", color: "var(--c-sky)" },
  { label: "AI Enthusiast", color: "var(--c-violet)" },
];

function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute h-5 w-5 border-accent ${className}`} />
  );
}

/**
 * Profile box. Shows your photo when `photoUrl` is set in data/profile.ts,
 * otherwise the monogram. The frame, tags and caption are identical either way.
 */
export function ProfileCard() {
  const hasPhoto = Boolean(profile.photoUrl);

  return (
    <figure
      className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border bg-surface"
      style={{
        borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))",
        boxShadow:
          "0 0 0 6px color-mix(in srgb, var(--accent) 7%, transparent), 0 28px 56px -28px rgba(0,0,0,0.6)",
      }}
    >
      {hasPhoto ? (
        <img
          src={profile.photoUrl}
          alt={`Portrait of ${profile.name}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <>
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center pb-24" aria-hidden="true">
            <span
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                border: "2px dashed color-mix(in srgb, var(--accent) 55%, transparent)",
                background: "color-mix(in srgb, var(--accent) 8%, var(--surface))",
              }}
            >
              <span className="font-display text-6xl font-extrabold tracking-tight text-accent">{profile.initials}</span>
            </span>
          </div>
        </>
      )}

      {/* Corner brackets */}
      <Corner className="left-3 top-3 rounded-tl-md border-l-2 border-t-2" />
      <Corner className="right-3 top-3 rounded-tr-md border-r-2 border-t-2" />

      {/* Top labels */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-5 font-mono text-[0.7rem]">
        <span className="rounded-full bg-bg/70 px-2.5 py-1 text-muted backdrop-blur">{"// profile"}</span>
        {availability.open && (
          <span className="flex items-center gap-1.5 rounded-full bg-bg/70 px-2.5 py-1 text-accent backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Open to work
          </span>
        )}
      </div>

      {/* Caption */}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-line bg-bg/85 p-5 backdrop-blur">
        <p className="font-display text-lg font-bold leading-tight">{profile.name}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
          <Icon name="map-pin" size={13} /> {profile.location}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Roles">
          {tags.map((t) => (
            <li
              key={t.label}
              className="rounded-full px-2.5 py-0.5 font-mono text-[0.68rem]"
              style={{
                color: t.color,
                background: `color-mix(in srgb, ${t.color} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${t.color} 45%, transparent)`,
              }}
            >
              {t.label}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
