import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { SkillCategory } from "../components/SkillCategory";
import { levelLabels, skillGroups, type SkillLevel } from "../data/skills";

const legend: { level: SkillLevel; swatch: string }[] = [
  { level: "hands-on", swatch: "bg-fg" },
  { level: "familiar", swatch: "border border-fg" },
  { level: "learning", swatch: "border border-dashed border-fg" },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 md:py-28" aria-labelledby="skills-title">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Technical Skills"
          title="Foundations, full-stack, and AI."
          intro="Strong computer science fundamentals, complete applications from frontend to database, and an active interest in artificial intelligence. Experience is labeled honestly: no percentages, no inflated levels."
          id="skills-title"
        />

        <Reveal>
          <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Experience levels">
            {legend.map((l) => (
              <li key={l.level} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${l.swatch}`} aria-hidden="true" />
                {levelLabels[l.level]}
              </li>
            ))}
            <li className="text-muted/80">Foundations and AI topics are listed without a level.</li>
          </ul>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <SkillCategory key={g.id} group={g} index={i} delay={(i % 3) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
