"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { motion } from "motion/react";

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

interface TransformedProject {
  title: string;
  description: string;
  link: string;
  language: string;
}

const ITEMS_PER_PAGE = 6;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<TransformedProject[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/users/harshavardanan/repos"
      );
      const data: Project[] = await res.json();
      const transformed: TransformedProject[] = data.map((project) => ({
        title: project.name,
        description: project.description || "No description available",
        link: project.html_url,
        language: project.language ?? "",
      }));
      setProjects(transformed);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const paginatedProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="projects-container bg-black text-white px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
      <div className="w-full py-6 sm:py-8 md:py-12 text-center">
        <motion.div className="relative mx-2 sm:mx-4 my-3 sm:my-4 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center sm:flex-row">
          <LayoutTextFlip
            text="Welcome to "
            words={["Fight Club", "Code Cave"]}
          />
        </motion.div>
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 mt-3 sm:mt-4 px-4 sm:px-6 max-w-3xl mx-auto">
          Here&apos;s a few projects on my github which I have been working on
          for a while.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <HoverEffect items={paginatedProjects} />
        {projects.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-neutral-800 border-2 sm:border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <IconArrowNarrowLeft className="text-neutral-200 w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <span className="text-white text-xs sm:text-sm md:text-base font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-neutral-800 border-2 sm:border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <IconArrowNarrowRight className="text-neutral-200 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
