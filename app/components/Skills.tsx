import React from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
}

// GROQ query to fetch all skills
const query = groq`*[_type == "skill"] | order(category asc, name asc) {
  _id,
  name,
  category,
  "icon": icon.asset->url
}`;

// Server Component - fetches data directly from Sanity
const Skills = async () => {
  const skills: Skill[] = await client.fetch(query);

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
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-md hover:scale-105 transition-transform duration-300"
          >
            {skill.icon && (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 object-contain"
              />
            )}
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
