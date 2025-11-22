"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { EncryptedText } from "./ui/encrypted-text";

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
          Harshavardanan&#44; <br />
          <div className="text-3xl font-extrabold mt-2 sm:text-4xl md:text-5xl">
            <EncryptedText
              text="FullStack Web Developer"
              encryptedClassName="text-neutral-600"
              revealedClassName="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
              revealDelayMs={50}
            />
          </div>
        </motion.h1>
      </LampContainer>
    </div>
  );
};

export default Hero;
