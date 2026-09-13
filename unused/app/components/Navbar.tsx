"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    const handleSectionChange = (entries: IntersectionObserverEntry[]) => {
      let foundSection = false;
      let closestSection: string | null = null;
      let minDistance = Infinity;

      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const rect = entry.boundingClientRect;
        const distance = Math.abs(rect.top);

        if (entry.isIntersecting) {
          foundSection = true;
          setActiveSection(sectionId);
        }

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = sectionId;
        }
      });

      if (!foundSection && closestSection) {
        setActiveSection(closestSection);
      }
    };

    const observer = new IntersectionObserver(handleSectionChange, {
      threshold: [0.25, 0.6],
      rootMargin: "0px 0px -15% 0px",
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
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-black transition-all ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div
          className="flex items-center gap-3 text-2xl font-bold hover:opacity-80 transition"
          onClick={() => scrollToSection("hero")}
        >
          <img
            src="./favicon.ico"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.link)}
                className={`hover:text-blue-400 transition-all ${
                  activeSection === item.link ? "text-blue-500" : "text-white"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden flex flex-col items-center bg-black bg-opacity-90 backdrop-blur-lg transition-all ${
          menuOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.link)}
            className={`block py-2 text-xl ${
              activeSection === item.link
                ? "text-blue-500"
                : "text-white hover:text-blue-400"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

const navItems = [
  { name: "About", link: "about" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

export default Navbar;
