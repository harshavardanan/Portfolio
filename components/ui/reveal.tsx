"use client";

/**
 * Reveal — a lightweight scroll-into-view entrance: fades and slides a
 * section up once as it crosses into the viewport.
 *
 * Kept deliberately cheap so it stays smooth on low-end devices:
 * - Only animates `opacity` and `transform` (compositor-only, no layout
 *   or paint work), never box-shadow/blur/color.
 * - Triggered by IntersectionObserver (via Motion's `whileInView`), not a
 *   per-frame scroll listener — there's no ongoing work between triggers.
 * - `viewport={{ once: true }}` — each section animates in a single time
 *   and then it's just static DOM; scrolling back up never re-triggers it.
 * - A plain eased tween, not a spring, so there's no iterative physics
 *   simulation running per frame.
 * - Wrap the app in `<MotionConfig reducedMotion="user">` (see layout.tsx)
 *   and Motion automatically swaps this to an instant, transform-free
 *   crossfade for anyone with "reduce motion" turned on at the OS level.
 */

import React from "react";
import { motion } from "motion/react";

export function Reveal({
  children,
  className,
  y = 28,
  duration = 0.6,
  delay = 0,
  amount = 0.03,
}: {
  children: React.ReactNode;
  className?: string;
  /** Starting vertical offset in px. */
  y?: number;
  duration?: number;
  delay?: number;
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
