"use client";

/**
 * SplitFlapHeading — a compact "departure board" style heading, built from
 * the same flip-card cells as the hero's TextFlippingBoard, but sized to fit
 * a single section title instead of a full 6x22 board.
 *
 * It stays blank until scrolled into view, then flips into place — a small
 * reveal so it doesn't just fire once on page load and go unseen.
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FlapCell } from "./text-flipping-board";

const BASE_COL_DELAY = 26;
const BASE_ROW_DELAY = 60;
const BASE_STEP_MS = 45;
const BASE_FLIP_S = 0.32;

export interface SplitFlapHeadingProps {
  /** Heading text. Use "\n" for explicit line breaks; otherwise it's one row. */
  text: string;
  className?: string;
  /** Total flip-in duration target, in seconds. Auto-scaled from column count if omitted. */
  duration?: number;
  /** Re-play the flip every time the heading re-enters the viewport (default: once). */
  replay?: boolean;
  /** Heading level for the (visually hidden) accessible label. */
  level?: 1 | 2 | 3 | 4;
}

export function SplitFlapHeading({
  text,
  className,
  duration,
  replay = false,
  level = 2,
}: SplitFlapHeadingProps) {
  const lines = useMemo(() => text.split("\n"), [text]);
  const cols = useMemo(() => Math.max(...lines.map((l) => l.length)), [lines]);
  const rows = lines.length;

  // Size the glyph off the board's OWN rendered width (via a CSS container
  // query unit), not the viewport — so it's the actual cell width that sets
  // the font, on a phone, a tablet, or a wide desktop alike. 0.72 matches the
  // font-to-cell-width ratio the hero's board already uses, so a letter fills
  // its flap instead of floating in a half-empty cell.
  const fontSize = useMemo(() => {
    const cellWidthCqw = 100 / cols;
    return `clamp(9px, ${(cellWidthCqw * 0.72).toFixed(3)}cqw, 48px)`;
  }, [cols]);

  const baseTotal =
    ((cols - 1) * BASE_COL_DELAY + (rows - 1) * BASE_ROW_DELAY + 8 * BASE_STEP_MS) / 1000;
  const dur = duration ?? baseTotal;
  const scale = dur / baseTotal;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));

  const [active, setActive] = useState(false);
  const playedRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!playedRef.current || replay) {
            playedRef.current = true;
            setActive(true);
          }
        } else if (replay) {
          setActive(false);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [replay]);

  // Center each line inside the shared column count, like a real split-flap sign.
  const grid = useMemo(
    () =>
      lines.map((line) => {
        const upper = line.toUpperCase();
        const left = Math.floor((cols - upper.length) / 2);
        const right = cols - upper.length - left;
        return " ".repeat(Math.max(0, left)) + upper + " ".repeat(Math.max(0, right));
      }),
    [lines, cols],
  );

  return (
    <div
      ref={wrapRef}
      role="heading"
      aria-level={level}
      aria-label={text.replace(/\n/g, " ")}
      className={cn("flex w-full flex-col gap-[3px] sm:gap-[4px]", className)}
      style={{ containerType: "inline-size" }}
    >
      {grid.map((line, r) => (
        <div
          key={r}
          className="grid gap-[3px] sm:gap-[4px] md:gap-[5px]"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {line.split("").map((ch, c) => (
            <FlapCell
              key={c}
              target={active ? ch : " "}
              delay={c * colDelay + r * rowDelay}
              stepMs={stepMs}
              flipDuration={flipDur}
              fontSize={fontSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
