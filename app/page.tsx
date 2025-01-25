import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {" "}
        <section id="hero" className="relative z-10">
          <Hero />
        </section>
        <section id="about" className="relative z-10">
          <About />
        </section>
        <section id="projects" className="relative z-10">
          <Projects />
        </section>
        <section id="contact" className="relative z-10">
          <Contact />
        </section>
      </main>
    </>
  );
}
