import type { CSSProperties } from "react";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SocialIcons } from "../components/SocialIcons";
import { profile } from "../data/profile";

/** The architecture sketch mirrors how I actually build: client, API, database. */
function SystemMap() {
  const nodes = [
    { y: 28, label: "Client", detail: "React + TypeScript", color: "var(--c-sky)" },
    { y: 138, label: "API", detail: "Node.js + Express", color: "var(--accent)" },
    { y: 248, label: "Database", detail: "PostgreSQL", color: "var(--c-amber)" },
  ];
  return (
    <svg
      viewBox="0 0 360 340"
      className="h-auto w-full"
      role="img"
      aria-label="Architecture sketch: a React client calls a Node.js API, which stores data in PostgreSQL"
    >
      {[0, 1].map((i) => (
        <line
          key={i}
          x1="180"
          y1={nodes[i].y + 64}
          x2="180"
          y2={nodes[i + 1].y}
          stroke="var(--muted)"
          strokeWidth="2"
          className="flow-line"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label} transform={`translate(40 ${n.y})`}>
          <rect
            width="280"
            height="64"
            rx="14"
            style={{
              fill: `color-mix(in srgb, ${n.color} 12%, var(--surface))`,
              stroke: n.color,
              strokeWidth: 1.5,
            }}
          />
          <rect x="0" y="14" width="4" height="36" rx="2" style={{ fill: n.color }} />
          <rect x="18" y="20" width="24" height="24" rx="6" style={{ fill: n.color }} />
          <text x="30" y="37" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)" fill="var(--bg)">
            {`0${i + 1}`}
          </text>
          <text x="58" y="30" fontSize="15" fontWeight="700" fontFamily="var(--font-display)" fill="var(--fg)">
            {n.label}
          </text>
          <text x="58" y="48" fontSize="12" fontFamily="var(--font-mono)" fill="var(--muted)">
            {n.detail}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">Computer Science &amp; Engineering</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Building Technology That <span className="text-accent">Solves Real Problems.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              I&apos;m {profile.name}, a Computer Science and Engineering student passionate about software
              engineering, emerging technologies, and building meaningful digital solutions.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              Explore My Work <Icon name="arrow-right" size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
          </Reveal>
          <Reveal delay={280} className="mt-8 flex flex-wrap gap-2">
            <span className="chip-color" style={{ "--c": "var(--c-sky)" } as CSSProperties}>React</span>
            <span className="chip-color" style={{ "--c": "var(--c-violet)" } as CSSProperties}>TypeScript</span>
            <span className="chip-color" style={{ "--c": "var(--accent)" } as CSSProperties}>Node.js</span>
            <span className="chip-color" style={{ "--c": "var(--c-amber)" } as CSSProperties}>PostgreSQL</span>
          </Reveal>
          <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-5">
            <SocialIcons />
            <p className="flex items-center gap-2 text-sm text-muted">
              <Icon name="map-pin" size={16} /> {profile.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="card-strong p-6 md:p-8">
            <p className="mb-5 flex items-center justify-between font-mono text-xs text-muted">
              <span>how-i-build.svg</span>
              <span className="flex items-center gap-2">
                <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" /> full stack
              </span>
            </p>
            <SystemMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
