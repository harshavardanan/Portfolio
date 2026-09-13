// import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Hero3D from "./components/Hero3D"; // 3D workstation hero (kept, swap in anytime)
import Projects from "./components/Projects";
import Showcase from "./components/Showcase";
import Contact from "./components/Contact";
import About from "./components/About";
import Skills from "./components/Skills";
import { Reveal } from "@/components/ui/reveal";

export default async function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <main suppressHydrationWarning={true}>
        <section id="hero" className="relative z-10">
          <Hero />
        </section>
        <section id="about" className="relative z-10">
          <Reveal>
            <About />
          </Reveal>
        </section>
        <section id="skills" className="relative z-10">
          <Reveal>
            <Skills />
          </Reveal>
        </section>
        <section id="projects" className="relative z-10">
          <Reveal>
            <Projects />
          </Reveal>
        </section>
        <section id="showcase" className="relative z-10">
          <Reveal>
            <Showcase />
          </Reveal>
        </section>
        <section id="contact" className="relative z-10">
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </main>
    </div>
  );
}
