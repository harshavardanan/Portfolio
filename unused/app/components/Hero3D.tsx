"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Hero3D – interactive procedural "developer workstation" rendered with three.js.
 *
 * - drag to rotate, scroll to zoom, auto-rotates when idle
 * - every mesh is generated in code (see ./three/workstationScene.js)
 * - three + addons are loaded lazily on the client so nothing runs on the server
 *
 * The previous split-flap hero lives in ./Hero.tsx and is untouched.
 */

type Props = {
  /** Wheel over the canvas zooms the model (and therefore does not scroll the page). */
  enableZoom?: boolean;
  /** Extra classes for the outer wrapper (height, etc.). */
  className?: string;
};

export default function Hero3D({ enableZoom = true, className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const [THREE, orbit, rounded, room, scene] = await Promise.all([
          import("three"),
          import("three/examples/jsm/controls/OrbitControls.js"),
          import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
          import("./three/workstationScene"),
        ]);
        if (disposed || !mountRef.current) return;

        const app = scene.mountWorkstation(
          THREE,
          {
            OrbitControls: orbit.OrbitControls,
            RoundedBoxGeometry: rounded.RoundedBoxGeometry,
            RoomEnvironment: room.RoomEnvironment,
          },
          mountRef.current,
          {
            enableZoom,
            idleDelay: 3000,
            autoRotateSpeed: 0.9,
            maxPixelRatio: 1.75,
            onReady: () => {
              if (!disposed) setReady(true);
            },
          },
        );
        cleanup = () => app.dispose();
      } catch (err) {
        console.error("Hero3D failed to start", err);
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [enableZoom]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-black h-[88svh] min-h-[540px] max-h-[1100px] ${className}`}
    >
      {/* WebGL canvas mounts here */}
      <div
        ref={mountRef}
        className="absolute inset-0"
        style={{ touchAction: "none" }}
        aria-label="Interactive 3D developer workstation. Drag to rotate, scroll to zoom."
        role="img"
      />

      {/* soft vignette so overlay text stays readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* overlay copy – pointer-events on so touches here still scroll the page */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 sm:p-10 lg:p-14 pointer-events-auto">
        <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-neutral-500">
          Portfolio
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
          HARSHAVARDANAN
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-neutral-400 font-light">
          Fullstack Developer
        </p>
        <p className="mt-3 font-mono text-[10px] sm:text-xs text-neutral-500">
          <span className="text-indigo-300">drag</span> rotate ·{" "}
          <span className="text-indigo-300">scroll</span> zoom ·{" "}
          <span className="text-indigo-300">idle</span> auto-rotate
        </p>
      </div>

      {/* loading / fallback states */}
      {!ready && !failed && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-[#6D64F7] animate-spin" />
        </div>
      )}
      {failed && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
          3D view unavailable in this browser.
        </div>
      )}
    </div>
  );
}
