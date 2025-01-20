"use client";
import React, { useState, useEffect } from "react";
import { WobbleCard } from "./ui/wobble-card";
import { motion } from "framer-motion"; // Ensure framer-motion is installed

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const Contact: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/harshavardanan/repos"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data: Repo[] = await res.json();
        setRepos(data);
        console.log("Fetched Repos:", data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="projects-container py-20 bg-black min-h-screen">
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        My GitHub Projects
      </h1>
      {repos.length === 0 ? (
        <p className="text-white text-center text-lg">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              <WobbleCard containerClassName="bg-zinc-900 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow min-h-[200px]">
                <img
                  src={`https://opengraph.githubassets.com/1/${repo.html_url.replace(
                    "https://github.com/",
                    ""
                  )}`}
                  alt={repo.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{repo.name}</h3>
                <p className="text-sm mb-2 line-clamp-2">
                  {repo.description || "No description available."}
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-emerald-500 text-white font-semibold py-1 px-3 rounded-full shadow-md transition-transform transform hover:-translate-y-1 text-sm">
                    View on GitHub
                  </button>
                </a>
              </WobbleCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
