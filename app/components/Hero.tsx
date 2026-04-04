"use client";
import React from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const Hero = () => {
  return (
    <div className="flex items-center justify-center w-full bg-black py-8 px-2 sm:p-8 md:p-12 lg:p-16 md:min-h-[80vh]">
      <div className="w-full max-w-[1600px] mx-auto">
        <TextFlippingBoard
          text={"HARSHAVARDANAN\nFULLSTACK DEVELOPER"}
          className="!max-w-none !w-full !h-auto !rounded-none !p-0 !bg-black !shadow-none"
        />
      </div>
    </div>
  );
};

export default Hero;
