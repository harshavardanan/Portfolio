import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="pt-16" suppressHydrationWarning={true}>
        <section id="hero" className="relative z-10">
          <Hero />
        </section>
        <section id="about" className="relative z-10">
          <About />
        </section>
        <section id="skills" className="relative z-10">
          <Skills />
        </section>
        <section id="projects" className="relative z-10">
          <Projects />
        </section>
        <section id="contact" className="relative z-10">
          <Contact />
        </section>
      </main>
    </div>
  );
}
