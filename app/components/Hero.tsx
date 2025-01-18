"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { FlipWords } from "./ui/flip-words";

const Hero = () => {
  const words = ["React", "Nodejs", "Expressjs", "MongoDB", "TailwindCSS"];

  return (
    <AuroraBackground className="bg-black dark:bg-black">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Hello, I’m <span className="text-blue-400">Harshavardanan</span>.
        </h1>

        <div className="text-4xl mx-auto font-normal text-white dark:bg-black">
          I build apps with
          <FlipWords className=" text-white-400" words={words} /> <br />
        </div>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 text-lg shadow-lg transition-transform transform hover:scale-105">
          Explore My Work
        </button>
      </motion.div>
    </AuroraBackground>
  );
};

export default Hero;
