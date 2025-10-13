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
    <div className="projects-container bg-black text-white px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="w-full py-12 text-center">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text="Welcome to "
            words={["Fight Club", "Code Cave"]}
          />
        </motion.div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <HoverEffect items={paginatedProjects} />
        {projects.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`w-10 h-10 flex items-center justify-center bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 disabled:opacity-40`}
            >
              <IconArrowNarrowLeft className="text-neutral-200" />
            </button>

            <span className="text-white text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 disabled:opacity-40`}
            >
              <IconArrowNarrowRight className="text-neutral-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
