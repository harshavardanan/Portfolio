"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  return (
    <AuroraBackground className="bg-zinc-900 dark:bg-zinc-900">
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
        <h2 className="text-xl md:text-3xl font-light text-gray-300">
          But you can call me{" "}
          <span className="text-indigo-400 font-medium">Harsh</span>.
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl">
          I’m a passionate developer who crafts scalable, innovative web
          solutions. Let’s collaborate and make something amazing together.
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 text-lg shadow-lg transition-transform transform hover:scale-105">
          Explore My Work
        </button>
      </motion.div>
    </AuroraBackground>
  );
};

export default Hero;
