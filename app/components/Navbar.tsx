"use client";
import React, { useState, useEffect, useRef } from "react";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "./ui/FloatingNavbar";
import Hero from "./Hero";
import Projects from "./Projects";
import Contact from "./Contact";

const CustomFloatingNav: React.FC<{
  navItems: { name: string; link: string; icon: React.ReactNode }[];
}> = ({ navItems }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
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
      threshold: 0.3,
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
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <FloatingNav
        navItems={navItems.map((item) => ({
          name: item.name,
          link: `#${item.link}`,
          icon: item.icon,
        }))}
      />
    </div>
  );
};

export default function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "hero",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "contact",
      icon: (
        <IconMessage className="h-5 w-5 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <CustomFloatingNav navItems={navItems} />
      <Content />
    </div>
  );
}

const Content: React.FC = () => (
  <main>
    <section id="hero" className="relative z-10">
      <Hero />
    </section>
    <section id="projects" className="relative z-10">
      <Projects />
    </section>
    <section id="contact" className="relative z-10 w-full h-full">
      <Contact />
    </section>
  </main>
);
