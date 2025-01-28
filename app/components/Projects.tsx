"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="projects-container py-20 bg-black min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        Project Highlights
      </h1>
      {projects.length === 0 ? (
        <p className="text-white text-center text-lg">Loading projects...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {currentProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card bg-zinc-900 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
              >
                <WobbleCard className="relative">
                  <img
                    src={`https://opengraph.githubassets.com/1/${project.html_url.replace(
                      "https://github.com/",
                      ""
                    )}`}
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2">
                    {project.description || "No description available."}
                  </p>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:-translate-y-1 focus:ring focus:ring-emerald-300"
                  >
                    View on GitHub
                  </a>
                </WobbleCard>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 space-x-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`py-2 px-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 focus:ring ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
