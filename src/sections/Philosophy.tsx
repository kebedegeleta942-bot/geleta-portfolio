import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { principles } from "../data/approach";

export function Philosophy() {
  return (
    <section id="approach" className="border-t border-line py-20 md:py-28" aria-labelledby="approach-title">
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow="My Approach"
          title="How I Think About Technology"
          intro="My approach to engineering is guided by curiosity, critical thinking, and the belief that technology should solve meaningful problems."
          id="approach-title"
        />

        <ol className="max-w-4xl">
          {principles.map((p, i) => {
            const isLast = i === principles.length - 1;
            return (
              <Reveal as="li" key={p.title} delay={60} className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8">
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium"
                    style={
                      {
                        color: p.color,
                        border: `1.5px solid ${p.color}`,
                        background: `color-mix(in srgb, ${p.color} 12%, var(--bg))`,
                      } as CSSProperties
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {!isLast && (
                    <span
                      className="my-2 w-px flex-1"
                      style={{ background: `linear-gradient(${p.color}, ${principles[i + 1].color})`, opacity: 0.45 }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className={`grid gap-x-10 gap-y-2 md:grid-cols-[1fr_1.3fr] ${isLast ? "" : "pb-12"}`}>
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:pt-2 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted md:pt-2">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
