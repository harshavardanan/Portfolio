"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  imageAlt,
  liveUrl,
  repoUrl,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-lg shadow-lg hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(109,100,247,0.15)] hover:border-[#6D64F7]/40 transition-all duration-500 ease-out"
    >
      {/* ── Image Header ── */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#A78BFA] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        {/* ── Technology Tags ── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-[#6D64F7]/10 border border-[#6D64F7]/20 px-3 py-1 text-xs font-medium text-[#A78BFA] tracking-wide select-none hover:bg-[#6D64F7]/20 hover:border-[#6D64F7]/40 transition-colors duration-200"
            >
              #{tech}
            </span>
          ))}
        </div>

        {/* ── Action Buttons ── */}
        {(liveUrl || repoUrl) && (
          <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-white/10">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#6D64F7] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#6D64F7]/20 hover:bg-[#5B53E0] hover:shadow-lg hover:shadow-[#6D64F7]/30 active:scale-[0.97] transition-all duration-200"
                aria-label={`View live demo of ${title}`}
              >
                {/* Globe Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
                Live Demo
              </a>
            )}

            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-[0.97] transition-all duration-200"
                aria-label={`View source code of ${title}`}
              >
                {/* GitHub Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Subtle glow on hover ── */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#6D64F7]/10 via-transparent to-[#A78BFA]/10" />
    </motion.article>
  );
};

export default ProjectCard;
