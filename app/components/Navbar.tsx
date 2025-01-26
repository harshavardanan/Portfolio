"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    const handleSectionChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);

          // Get background color of the intersecting section
          const computedStyle = window.getComputedStyle(entry.target);
          const bgColor = computedStyle.backgroundColor;
          setBgColor(bgColor);

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div className="text-2xl font-bold">Logo</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={`#${item.link}`}
                className={`hover:text-blue-400 transition-all ${
                  activeSection === item.link ? "text-blue-500" : "text-white"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden flex flex-col items-center bg-black bg-opacity-90 backdrop-blur-lg transition-all ${
          menuOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={`#${item.link}`}
            onClick={() => setMenuOpen(false)}
            className={`block py-2 text-xl text-white ${
              activeSection === item.link
                ? "text-blue-500"
                : "hover:text-blue-400"
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

const navItems = [
  { name: "Home", link: "hero" },
  { name: "About", link: "about" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

export default Navbar;
