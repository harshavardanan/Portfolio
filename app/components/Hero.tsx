"use client";
import React from "react";
import SpotlightPreview from "./ui/SpotlightPreview";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

const Hero = () => {
  // return <SpotlightPreview />;
  return (
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
        <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mt-2">
          FullStack Web Developer
        </p>
        {/* <p className="mt-6 font-normal text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          I'm a passionate web developer who loves creating dynamic and
          user-friendly web applications. I enjoy turning ideas into reality
          with clean code, intuitive designs, and a focus on seamless user
          experiences.
        </p> */}
      </motion.h1>
    </LampContainer>
  );
};

export default Hero;
