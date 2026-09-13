"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

// First message is the one that matters most — it's what loads on screen,
// and the board returns to it at the end of every loop. The rest are short,
// on-brand lines that cycle in behind it. Add, remove, or reword freely;
// text wraps automatically at ~22 columns, so longer lines are fine.
const MESSAGES: string[] = [
  "HARSHAVARDANAN,\nFULLSTACK DEVELOPER",
  "LET'S BUILD\nSOMETHING GREAT",
  "THE FIRST RULE OF FIGHT CLUB IS THAT YOU DO NOT TALK ABOUT FIGHT CLUB.",
];

const MESSAGE_INTERVAL_MS = 6000;

const Hero = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  const next = useCallback(
    () => setMsgIndex((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, MESSAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex items-center justify-center w-full bg-black py-8 px-2 sm:p-8 sm:min-h-dvh md:p-12 lg:p-16">
      <div className="w-full max-w-[1600px] mx-auto">
        <TextFlippingBoard
          text={MESSAGES[msgIndex]}
          className="!max-w-none !w-full !h-auto !rounded-none !p-0 !bg-black !shadow-none"
        />
      </div>
    </div>
  );
};

export default Hero;
