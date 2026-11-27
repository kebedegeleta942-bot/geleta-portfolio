import { Icon } from "./Icon";
import { availability } from "../data/contact";
import { profile } from "../data/profile";

/** Identity tags, taken from the portfolio's positioning statement. */
const tags = [
  { label: "4th-Year CSE Student", color: "var(--c-amber)" },
  { label: "Full-Stack Developer", color: "var(--c-sky)" },
  { label: "AI Enthusiast", color: "var(--c-violet)" },
];

/**
 * Profile box: the photo sits in its own framed window inside the card, and the
 * caption lives on the card surface below it, so light photo backgrounds never
 * fight with the dark theme. Shows the monogram until `photoUrl` is set in data/profile.ts.
 */
export function ProfileCard() {
  const hasPhoto = Boolean(profile.photoUrl);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Offset outlines behind the card give depth without glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border-2"
        style={{ borderColor: "color-mix(in srgb, var(--c-violet) 55%, transparent)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-2 -translate-y-2 rounded-[1.75rem] border"
        style={{ borderColor: "color-mix(in srgb, var(--c-sky) 45%, transparent)" }}
      />

      <figure
        className="group relative rounded-[1.75rem] border-2 bg-surface p-3"
        style={{
          borderColor: "var(--accent)",
          boxShadow: "0 28px 56px -28px rgba(0,0,0,0.6)",
        }}
      >
        {/* Photo window */}
        <div
          className="relative aspect-[10/11] overflow-hidden rounded-2xl"
          style={{ border: "1px solid color-mix(in srgb, var(--accent) 35%, var(--line))", background: "var(--surface-2)" }}
        >
          {hasPhoto ? (
            <img
              src={profile.photoUrl}
              alt={`Portrait of ${profile.name}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          ) : (
            <>
              <div className="bg-grid absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span
                  className="flex h-40 w-40 items-center justify-center rounded-full"
                  style={{
                    border: "2px dashed color-mix(in srgb, var(--accent) 55%, transparent)",
                    background: "color-mix(in srgb, var(--accent) 8%, var(--surface))",
                  }}
                >
                  <span className="font-display text-6xl font-extrabold tracking-tight text-accent">
                    {profile.initials}
                  </span>
                </span>
              </div>
            </>
          )}

          {/* Labels on the photo: solid, so they read the same on any photo */}
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.7rem]"
            style={{ background: "var(--bg)", color: "var(--fg)", border: "1px solid var(--line)" }}
          >
            {"// profile"}
          </span>
          {availability.open && (
            <span
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium text-accent"
              style={{ background: "var(--bg)", border: "1px solid color-mix(in srgb, var(--accent) 55%, transparent)" }}
            >
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Open to work
            </span>
          )}
        </div>

        {/* Caption on the card surface */}
        <figcaption className="px-2 pb-2 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-xl font-bold leading-tight">{profile.name}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <Icon name="map-pin" size={13} /> {profile.location}
              </p>
            </div>
            <span className="mt-1 h-1 w-10 shrink-0 rounded-full" style={{ background: "var(--accent)" }} aria-hidden="true" />
          </div>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Roles">
            {tags.map((t) => (
              <li
                key={t.label}
                className="rounded-full px-2.5 py-0.5 font-mono text-[0.68rem]"
                style={{
                  color: t.color,
                  background: `color-mix(in srgb, ${t.color} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${t.color} 50%, transparent)`,
                }}
              >
                {t.label}
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
}
