"use client";
import React, { useEffect, useState } from "react";

interface Skill {
  name: string;
  category: string;
  icon?: string; // optional
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL!}/api/skills`
        );
        const data = await response.json();
        console.log("data:", data);
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);
  console.log("skills:", skills);

  return (
    <div className="projects-container bg-black text-white px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
          Skills Forged in the Shadows
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          A collection of battle-tested tools and technologies from the depths
          of my coding cave.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div>
              <p className="text-sm font-semibold text-white">{skill.name}</p>
              <p className="text-xs text-gray-300 capitalize">
                {skill.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
