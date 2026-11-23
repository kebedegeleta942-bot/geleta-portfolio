import { ProfileCard } from "../components/ProfileCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const highlights = [
  {
    title: "Problem Solver",
    text: "Understanding real-world challenges and developing practical solutions.",
    color: "var(--accent)",
  },
  {
    title: "Continuous Learner",
    text: "Exploring new technologies and expanding technical knowledge.",
    color: "var(--c-sky)",
  },
  {
    title: "Technology Enthusiast",
    text: "Interested in the intersection of software, innovation, and societal impact.",
    color: "var(--c-violet)",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28" aria-labelledby="about-title">
      <div className="container-page">
        <SectionHeading index="01" eyebrow="About" title="Beyond Code. Focused on Solutions." id="about-title" />

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <ProfileCard />
          </Reveal>

          <div>
            <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>
                I am a Computer Science and Engineering student driven by curiosity, problem-solving, and the
                possibilities of technology.
              </p>
              <p>
                My journey involves exploring software development, understanding complex systems, and
                transforming ideas into practical applications.
              </p>
              <p>
                I enjoy working across different areas of computing, from frontend experiences and backend
                architecture to databases, data-driven systems, and emerging technologies.
              </p>
              <p>
                For me, software engineering is more than writing code. It is about understanding challenges,
                thinking critically, designing effective solutions, and continuously improving.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 80}>
                  <div
                    className="h-full rounded-2xl border p-5"
                    style={{
                      borderColor: `color-mix(in srgb, ${h.color} 45%, var(--line))`,
                      borderTop: `3px solid ${h.color}`,
                      background: `color-mix(in srgb, ${h.color} 8%, var(--surface))`,
                    }}
                  >
                    <h3 className="font-display text-base font-bold" style={{ color: h.color }}>
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
