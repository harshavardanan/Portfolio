import React from "react";
import { cn } from "./lib/utils";
import { Spotlight } from "./Spotlight";
import { FlipWords } from "./flip-words";

export default function SpotlightPreview() {
  const words = ["MERN", "Full"];
  return (
    <div className="h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Harshavardanan, <br />
          Fullstack Web Developer.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          I'm a passionate web developer who loves creating dynamic and
          user-friendly web applications. I enjoy turning ideas into reality
          with clean code, intuitive designs, and a focus on seamless user
          experiences.
        </p>
      </div>
    </div>
  );
}
