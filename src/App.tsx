import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Interests } from "./sections/Interests";
import { Learning } from "./sections/Learning";
import { Philosophy } from "./sections/Philosophy";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Interests />
        <Philosophy />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
