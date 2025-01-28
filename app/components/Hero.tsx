"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-12 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-6xl"
        >
          Harshavardanan <br />
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 sm:text-4xl md:text-5xl">
            FullStack Web Developer
          </p>
        </motion.h1>
      </LampContainer>
    </div>
  );
};

export default Hero;
