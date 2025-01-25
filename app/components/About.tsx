"use client";
import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { FlipWords } from "./ui/flip-words";

// Minimal intro text
const introText = `Hi, I’m Harshavardanan Moorthy, a full-stack developer with over 3 years of experience building impactful web applications.`;

// Flip words for tech stack
const flipWords = ["React", "Node.js", "Express", "MongoDB", "Azure"];

// Component for the about page
const About: React.FC = () => {
  return (
    <div className="h-[100vh] w-full bg-black text-white bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-8">
        {/* Typewriter Effect */}
        <TypewriterEffectSmooth
          words={[
            { text: "Build" },
            { text: "awesome" },
            { text: "apps" },
            { text: "with" },
            {
              text: "Harshavardanan.",
              className: "text-blue-500 ",
            },
          ]}
        />

        {/* Minimal Intro Text */}
        <p className="text-lg max-w-3xl text-center text-white opacity-90">
          {introText}
        </p>

        {/* Flip Words for Tech Stack */}
        <div className="flex space-x-4 text-2xl font-semibold text-white">
          I code in <FlipWords words={flipWords} />
        </div>

        {/* Call to action buttons */}
      </div>

      {/* Mask for background effect */}
      <div className="absolute inset-0 pointer-events-none bg-black bg-opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
    </div>
  );
};

export default About;
