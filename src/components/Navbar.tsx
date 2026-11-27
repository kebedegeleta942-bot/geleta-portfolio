import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { resumeViewUrl } from "../data/contact";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import type { Theme } from "../hooks/useTheme";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = [...navItems.map((n) => n.id), "approach", "learning"] as const;

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-fg ${
      active === id ? "text-fg" : "text-muted"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled || open ? "border-line bg-bg/90 backdrop-blur" : "border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#home" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-base font-bold tracking-tight">
          <span className="font-mono text-accent" aria-hidden="true">
            &lt;/&gt;
          </span>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={resumeViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost hidden sm:inline-flex"
          >
            <Icon name="file-text" size={16} /> View Resume
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base font-medium ${active === item.id ? "text-accent" : "text-fg"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={resumeViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full"
                onClick={() => setOpen(false)}
              >
                <Icon name="file-text" size={16} /> View Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
