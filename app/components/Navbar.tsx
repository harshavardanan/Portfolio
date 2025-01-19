"use client";
import React, { useState, useEffect } from "react";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Hero from "./Hero";
import Projects from "./Projects";
import Contact from "./Contact";

const FloatingNav: React.FC<{
  navItems: { name: string; link: string; icon: React.ReactNode }[];
}> = ({ navItems }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("home");
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    const handleSectionChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      });
    };
    const observer = new IntersectionObserver(handleSectionChange, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white dark:bg-black shadow-md z-50 transition-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.link)}
            className={`flex items-center space-x-2 text-sm font-medium transition ${
              activeSection === item.link
                ? "text-blue-500 dark:text-blue-400"
                : "text-neutral-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default function Navbar() {
  const navItems = [
    {
      name: "Hero",
      link: "hero",
      icon: <IconHome className="h-5 w-5" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconUser className="h-5 w-5" />,
    },
    {
      name: "Contact",
      link: "contact",
      icon: <IconMessage className="h-5 w-5" />,
    },
  ];

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
      <Content />
    </div>
  );
}

const Content: React.FC = () => (
  <main>
    <section id="hero" className="">
      <Hero />
    </section>
    <section
      id="projects"
      className="min-h-screen bg-gray-900 flex items-center justify-center"
    >
      <Projects />
    </section>
    <section
      id="contact"
      className="min-h-screen bg-green-500 flex items-center justify-center"
    >
      <Contact />
    </section>
  </main>
);

// "use client";
// import React from "react";
// import { FloatingNav } from "./ui/FloatingNavbar";
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
// import Hero from "./Hero";
// import Projects from "./Projects";
// import Contact from "./Contact";
// export function FloatingNavDemo() {
//   const navItems = [
//     {
//       name: "Hero",
//       link: "hero",
//       icon: <IconHome className="h-5 w-5" />,
//     },
//     {
//       name: "Projects",
//       link: "projects",
//       icon: <IconUser className="h-5 w-5" />,
//     },
//     {
//       name: "Contact",
//       link: "contact",
//       icon: <IconMessage className="h-5 w-5" />,
//     },
//   ];
//   return (
//     <div className="relative  w-full">
//       <FloatingNav navItems={navItems} />
//       <Content />
//     </div>
//   );
// }

// const Content: React.FC = () => (
//   <main>
//     <section id="hero" className="">
//       <Hero />
//     </section>
//     <section
//       id="projects"
//       className="min-h-screen bg-gray-900 flex items-center justify-center"
//     >
//       <Projects />
//     </section>
//     <section
//       id="contact"
//       className="min-h-screen bg-green-500 flex items-center justify-center"
//     >
//       <Contact />
//     </section>
//   </main>
// );
