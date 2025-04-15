"use client";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { FollowPointer } from "./ui/follow-pointer";
import { useEffect, useState } from "react";

export function GlobalCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none">
      <AnimatePresence>
        {isVisible && <FollowPointer x={x} y={y} />}
      </AnimatePresence>
    </div>
  );
}
