"use client";

/**
 * Site-wide Motion config: `reducedMotion="user"` makes every Motion
 * animation on the site (this Reveal wrapper, the split-flap boards, the
 * send button, etc.) automatically respect the OS-level "reduce motion"
 * accessibility setting — those get swapped to instant, transform-free
 * transitions with no extra code anywhere else.
 */

import React from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
