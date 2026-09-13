"use client";

/**
 * SendButton — recreates the "Send Button Concept" interaction from
 * https://dribbble.com/shots/3296016-Send-Button-Concept: the label squashes
 * flat (a quick flip, in the same spirit as the site's split-flap board),
 * unfolds into a paper plane, and flies off the edge trailing a line. On
 * resolve, a new flipped-in label reports the result.
 *
 * Driven by the same state machine ContactForm already uses, so this is a
 * drop-in replacement for the previous plain button.
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type SendButtonState = "idle" | "sending" | "sent" | "error";

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 11.5L21 3L13.5 21L11 13.5L3 11.5Z" fill="currentColor" />
      <path d="M11 13.5L21 3L3 11.5L11 13.5Z" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M4 12.5L9.5 18L20 6"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}

// A single flip-in label: squashes in from zero height, like a flap
// dropping into place. Shared by every state so switching between them
// always reads as the same consistent gesture. The `key` that lets
// AnimatePresence track it is set by the caller, not here.
const FlipLabel = React.forwardRef<
  HTMLSpanElement,
  { children: React.ReactNode; className?: string }
>(function FlipLabel({ children, className }, ref) {
  return (
    <motion.span
      ref={ref}
      initial={{ scaleY: 0.05, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0.05, opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn("inline-flex items-center justify-center gap-2 origin-center", className)}
    >
      {children}
    </motion.span>
  );
});

// The launch sequence: label is already gone (flipped out by the caller);
// this renders the plane unfolding, flying past the edge, and its trail.
// If the request is still pending once the plane is gone (~0.75s), three
// small dots pulse so a slow send never just looks like a blank button.
const LaunchingPlane = React.forwardRef<HTMLSpanElement>(function LaunchingPlane(_props, ref) {
  return (
    <motion.span
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* fading trail line the plane leaves behind */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: [0, 70, 110], opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.75, times: [0, 0.35, 1], ease: "easeOut" }}
      />
      <motion.span
        className="absolute"
        initial={{ scaleY: 0.05, opacity: 0, x: -8, rotate: 0, scale: 0.6 }}
        animate={{
          scaleY: 1,
          opacity: [0, 1, 1, 0],
          x: [-8, 0, 60, 150],
          rotate: [0, -6, 4, 10],
          scale: [0.6, 1, 0.9, 0.55],
        }}
        transition={{ duration: 0.75, times: [0, 0.2, 0.55, 1], ease: "easeIn" }}
      >
        <PaperPlaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.span>
      {/* still waiting on a slower request */}
      <motion.span
        className="absolute flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-neutral-400"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: 0.8 + i * 0.15 }}
          />
        ))}
      </motion.span>
    </motion.span>
  );
});

export function SendButton({
  state,
  disabled,
  className,
}: {
  state: SendButtonState;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "relative flex h-[3.25rem] w-full items-center justify-center overflow-hidden rounded-lg bg-white text-sm font-semibold text-black transition-colors duration-300 hover:bg-neutral-200 active:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-90 sm:text-base",
        state === "error" && "text-red-700",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" && (
          <FlipLabel key="idle">
            Send
            <PaperPlaneIcon className="h-4 w-4" />
          </FlipLabel>
        )}
        {state === "sending" && <LaunchingPlane key="launch" />}
        {state === "sent" && (
          <FlipLabel key="sent">
            <CheckIcon className="h-4 w-4" />
            Message sent
          </FlipLabel>
        )}
        {state === "error" && <FlipLabel key="error">Error — try again</FlipLabel>}
      </AnimatePresence>
    </button>
  );
}
