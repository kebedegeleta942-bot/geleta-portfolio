import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { projects, type Project } from "../data/projects";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="border-t border-line py-20 md:py-28" aria-labelledby="projects-title">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Featured Projects"
          title="What I've built, and what I'm designing."
          intro="Each project is labeled by what it really is: deployed, in progress, or still a concept."
          id="projects-title"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}

          <Reveal delay={projects.length * 80} className="h-full">
            <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted/40 bg-surface/50 p-8 text-center">
              <p className="font-display text-lg font-bold">More projects coming</p>
              <p className="mt-2 max-w-xs text-sm text-muted">
                New work is added here as it is finished and ready to show.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
