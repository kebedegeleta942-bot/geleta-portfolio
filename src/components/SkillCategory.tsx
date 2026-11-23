import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { levelLabels, levelShort, type Skill, type SkillGroup } from "../data/skills";
import { techIcons } from "../data/techIcons";

/** Fixed 20px slot so every row aligns, whether it has a logo or not. */
function TechMark({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" role="img" aria-label={`${skill.name} logo`} className="shrink-0">
        <path d={techIcons[skill.icon]} />
      </svg>
    );
  }
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
    </span>
  );
}

function LevelMark({ level }: { level: NonNullable<Skill["level"]> }) {
  const dot =
    level === "hands-on"
      ? "bg-current"
      : level === "familiar"
        ? "border border-current"
        : "border border-dashed border-current";
  return (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted" title={levelLabels[level]}>
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      <span aria-hidden="true">{levelShort[level]}</span>
      <span className="sr-only">{levelLabels[level]}</span>
    </span>
  );
}

export function SkillCategory({ group, index, delay = 0 }: { group: SkillGroup; index: number; delay?: number }) {
  const hasLevels = group.skills.some((s) => s.level);
  const c = group.color;

  return (
    <Reveal delay={delay} className="h-full min-w-0">
      <article
        className="group/cat flex h-full flex-col rounded-2xl border bg-surface p-6 transition-transform duration-300 hover:-translate-y-0.5"
        style={
          {
            "--c": c,
            borderColor: `color-mix(in srgb, ${c} 40%, var(--line))`,
            borderTop: `3px solid ${c}`,
            boxShadow: `0 0 0 4px color-mix(in srgb, ${c} 5%, transparent)`,
          } as CSSProperties
        }
      >
        <header>
          <p className="font-mono text-xs" style={{ color: c }}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold">{group.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{group.description}</p>
        </header>

        {hasLevels ? (
          <ul className="mt-5 divide-y divide-line/70">
            {group.skills.map((s) => (
              <li
                key={s.name}
                className="skill-row flex items-center justify-between gap-3 rounded-md px-1 py-2.5 text-sm"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span style={{ color: c }}>
                    <TechMark skill={s} />
                  </span>
                  <span className="min-w-0 break-words">{s.name}</span>
                </span>
                {s.level && <LevelMark level={s.level} />}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <li
                key={s.name}
                className="skill-pill rounded-full border px-3 py-1.5 text-sm"
                style={{
                  borderColor: `color-mix(in srgb, ${c} 35%, var(--line))`,
                  background: `color-mix(in srgb, ${c} 6%, transparent)`,
                }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  );
}
