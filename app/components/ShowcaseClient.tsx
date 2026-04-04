"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

export interface SanityProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  mainImage: {
    asset: { _ref: string };
    alt?: string;
    demoUrl?: string;
  };
}

const ITEMS_PER_PAGE = 6;

export default function ShowcaseClient({ projects }: { projects: SanityProject[] }) {
  const [currentPage, setCurrentPage] = useState(0);

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
    <div className="bg-black text-white px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28 relative z-10 w-full overflow-hidden">
      {/* ── Background Detail ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-neutral-900/40 blur-[120px] -z-10 pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Featured <span className="text-neutral-500">Apps</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          A showcase of the major applications I have built and deployed.
        </p>
        <div className="mt-6 mx-auto w-12 h-1 bg-neutral-800" />
      </div>

      {/* ── Projects Grid ── */}
      <div className="max-w-7xl mx-auto relative">
        {projects.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedProjects.map((project) => (
                <article
                  key={project._id}
                  className="group flex flex-col bg-neutral-950 border border-neutral-900 overflow-hidden hover:border-neutral-700 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
                    {project.mainImage ? (
                      <Image
                        src={
                          (project.mainImage as any).demoUrl ||
                          urlFor(project.mainImage).width(800).height(450).fit("crop").url()
                        }
                        alt={project.mainImage.alt || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
                        unoptimized={!!(project.mainImage as any).demoUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-800">
                        No Cover
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-80" />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 sm:pt-5">
                    <h3 className="text-xl font-semibold mb-3 tracking-tight text-white line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Technologies Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] sm:text-xs font-mono px-2 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800 rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Links */}
                    <div className="mt-auto flex flex-wrap gap-4 pt-4 border-t border-neutral-900">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-sm font-medium text-white hover:text-neutral-300 transition-colors duration-300 group/link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                          Live Demo
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </a>
                      )}
                      
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-white transition-colors duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {projects.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center gap-4 sm:gap-6 mt-10 sm:mt-14">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 focus:outline-none transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-400 hover:text-white hover:border-neutral-700"
                  aria-label="Previous page"
                >
                  <IconArrowNarrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <span className="text-neutral-500 text-xs sm:text-sm font-mono tracking-widest uppercase">
                  Page {currentPage + 1} / {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 focus:outline-none transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-400 hover:text-white hover:border-neutral-700"
                  aria-label="Next page"
                >
                  <IconArrowNarrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20 border border-dashed border-neutral-800 bg-neutral-950/50 rounded-lg">
            <p className="text-neutral-500 text-sm tracking-wide font-mono">
              TRANSMISSION EMPTY. NO APPS FOUND.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
