"use client";
import React from "react";
import Image from "next/image";
import img from "./logo.png";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const introText = `I am a passionate full-stack developer and open-source contributor, actively building and maintaining npm libraries that enhance the developer experience. With expertise in technologies like React, Node.js, Express, MongoDB, Tailwind CSS, Azure, Python, and JavaScript. I create scalable and efficient web applications. I am driven by a mission to empower developers, share knowledge, and contribute to the ever-evolving web development landscape.`;

const About: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white bg-grid-white/[0.2] flex flex-col items-center justify-center px-4 py-8 sm:px-8 md:px-16 space-y-6">
      <Image
        src={img}
        alt="Harshavardanan Moorthy"
        width={150}
        height={150}
        className="rounded-full border-4 border-blue-100 shadow-lg w-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] mx-auto"
      />
      <TypewriterEffectSmooth
        words={[
          { text: "👋 Hi there, I'm" },
          {
            text: "Harshavardanan Moorthy",
            className: "text-blue-500",
          },
        ]}
      />
      <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl text-center text-white opacity-90 leading-relaxed">
        <TextGenerateEffect words={introText} />
      </p>
      <div className="absolute inset-0 pointer-events-none bg-black bg-opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
    </div>
  );
};

export default About;
