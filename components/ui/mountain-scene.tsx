"use client";

/**
 * MountainScene — a layered, halftone-dotted landscape illustration, all
 * inline SVG (no photo asset). Built as an original piece in the site's own
 * black/indigo/cyan palette, in the spirit of the misty-mountain reference
 * image the Contact section is modeled on, rather than reusing that image.
 */

import React from "react";

export function MountainScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b0c1a" />
          <stop offset="55%" stopColor="#131233" />
          <stop offset="100%" stopColor="#05050a" />
        </linearGradient>
        <linearGradient id="ms-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b3672" />
          <stop offset="100%" stopColor="#211f45" />
        </linearGradient>
        <linearGradient id="ms-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241f52" />
          <stop offset="100%" stopColor="#171339" />
        </linearGradient>
        <linearGradient id="ms-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141230" />
          <stop offset="100%" stopColor="#0a0918" />
        </linearGradient>
        <radialGradient id="ms-glow" cx="50%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#6D64F7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6D64F7" stopOpacity="0" />
        </radialGradient>
        <pattern id="ms-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" />
        </pattern>
        <linearGradient id="ms-dots-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="35%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0.9" />
        </linearGradient>
        <mask id="ms-dots-mask">
          <rect width="800" height="600" fill="url(#ms-dots-fade)" />
        </mask>
      </defs>

      {/* sky */}
      <rect width="800" height="600" fill="url(#ms-sky)" />
      <rect width="800" height="600" fill="url(#ms-glow)" />

      {/* far mountains — soft, rounded ridgeline */}
      <path
        d="M0 300
           C 60 250, 100 250, 140 285
           S 220 220, 280 260
           S 360 200, 420 245
           S 500 210, 560 250
           S 650 215, 710 255
           S 770 235, 800 260
           L800 600 L0 600 Z"
        fill="url(#ms-far)"
      />
      {/* mid mountains */}
      <path
        d="M0 400
           C 70 345, 120 340, 170 380
           S 250 320, 310 365
           S 400 310, 460 360
           S 540 315, 600 365
           S 690 330, 750 375
           S 790 365, 800 370
           L800 600 L0 600 Z"
        fill="url(#ms-mid)"
      />
      {/* near mountains */}
      <path
        d="M0 480
           C 80 420, 140 415, 200 460
           S 300 400, 370 450
           S 460 400, 530 450
           S 620 405, 690 455
           S 760 430, 800 450
           L800 600 L0 600 Z"
        fill="url(#ms-near)"
      />

      {/* halftone dot texture over everything, denser toward the bottom */}
      <rect width="800" height="600" fill="url(#ms-dots)" mask="url(#ms-dots-mask)" opacity="0.5" />

      {/* a small cluster of houses with glowing windows, nestled in the valley */}
      <g opacity="0.9">
        {[
          { x: 150, y: 520, w: 34, h: 20 },
          { x: 190, y: 535, w: 28, h: 17 },
          { x: 130, y: 545, w: 24, h: 15 },
        ].map((h, i) => (
          <g key={i}>
            <rect x={h.x} y={h.y} width={h.w} height={h.h} rx="2" fill="#0d0c1f" stroke="#2a2760" />
            <polygon
              points={`${h.x - 2},${h.y} ${h.x + h.w / 2},${h.y - 10} ${h.x + h.w + 2},${h.y}`}
              fill="#141235"
            />
            <circle cx={h.x + h.w / 2} cy={h.y + h.h / 2} r="2" fill="#ffb35c" />
          </g>
        ))}
      </g>

      {/* stars */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 137) % 800;
        const y = (i * 53) % 220;
        const r = (i % 3) * 0.4 + 0.5;
        return <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={0.3 + (i % 5) * 0.1} />;
      })}
    </svg>
  );
}
