"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Ensure framer-motion is installed

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/users/harshavardanan/repos"
      );
      const data: Project[] = await res.json();
      setProjects(data);
      console.log("Fetched Projects:", data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log("Projects state updated:", projects);
  }, [projects]);

  return (
    <div className="projects-container py-20 bg-black min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        My GitHub Projects
      </h1>
      {projects.length === 0 ? (
        <p className="text-white text-center text-lg">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card bg-zinc-900 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <img
                  src={`https://opengraph.githubassets.com/1/${project.html_url.replace(
                    "https://github.com/",
                    ""
                  )}`}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm mb-4">
                  {project.description || "No description available."}
                </p>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="relative group bg-emerald-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:-translate-y-1 focus:ring focus:ring-emerald-300">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center space-x-2">
                      <span>View on GitHub</span>
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  </button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
