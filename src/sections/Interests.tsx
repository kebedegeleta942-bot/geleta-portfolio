import { InterestCard } from "../components/InterestCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { interests } from "../data/interests";

export function Interests() {
  const last = interests.length - 1;
  return (
    <section id="interests" className="border-t border-line py-20 md:py-28" aria-labelledby="interests-title">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Areas of Interest"
          title="Where My Curiosity Is Heading"
          intro="The technologies, disciplines, and ideas I'm exploring as I grow as an engineer."
          id="interests-title"
        />

        <Reveal>
          <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Status legend">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fg" aria-hidden="true" /> Building
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-fg" aria-hidden="true" /> Practicing
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-dashed border-fg" aria-hidden="true" /> Exploring
            </li>
          </ul>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 80}
              className={`min-w-0 ${i === last && interests.length % 3 === 1 ? "lg:col-start-2" : ""}`}
            >
              <InterestCard item={item} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
