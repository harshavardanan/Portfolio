"use client";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
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
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div className="text-2xl font-bold">Logo</div>
        <ul className="flex gap-8 text-lg font-medium">
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
      </div>
    </nav>
  );
};

const navItems = [
  { name: "Home", link: "hero" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

export default Navbar;
