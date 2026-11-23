import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { learningAreas } from "../data/learning";

export function Learning() {
  return (
    <section id="learning" className="border-t border-line py-20 md:py-28" aria-labelledby="learning-title">
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Growth"
          title="Currently Learning"
          intro="Technology never stands still, and neither does my learning journey."
          id="learning-title"
        />

        <Reveal className="-mt-6 mb-10 max-w-2xl">
          <p className="text-base leading-relaxed text-muted">
            As a Computer Science and Engineering student, I continuously strengthen my theoretical foundations
            while exploring technologies and concepts that help me become a better engineer.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Currently Learning
          </p>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningAreas.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 80} className="min-w-0">
              <article
                className="learn-item h-full rounded-xl bg-surface p-5"
                style={
                  {
                    "--c": a.color,
                    borderStyle: "solid",
                    borderWidth: "1px 1px 1px 4px",
                    borderColor: `color-mix(in srgb, ${a.color} 25%, var(--line)) color-mix(in srgb, ${a.color} 25%, var(--line)) color-mix(in srgb, ${a.color} 25%, var(--line)) ${a.color}`,
                  } as CSSProperties
                }
              >
                <p className="font-mono text-xs" style={{ color: a.color }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
