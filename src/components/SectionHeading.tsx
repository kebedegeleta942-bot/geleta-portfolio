import { Reveal } from "./Reveal";

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}

export function SectionHeading({ index, eyebrow, title, intro, id }: Props) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow mb-4">
        <span className="text-muted">{index}</span> <span aria-hidden="true">/</span> {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </Reveal>
  );
}
