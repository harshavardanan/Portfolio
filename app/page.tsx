import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
// import Navbar from "./components/Navbar";

import { GridBackgroundDemo } from "./components/ui/grid-backgorund";
export default function Home() {
  return (
    <main>
      <div>
        {/* <Navbar /> */}
        <Hero />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
