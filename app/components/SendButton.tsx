"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "@/app/globals.css"; // Assuming Tailwind and global styles are set here

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, MorphSVGPlugin);
}

export default function SendButton() {
  useEffect(() => {
    MorphSVGPlugin.convertToPath("circle, rect");
    gsap.set("#paperPlaneRoute", { drawSVG: "0% 0%" });
    gsap.set("#rectSentItems", { x: "-=240" });

    const tl = gsap.timeline({ paused: true });

    tl.to("#base", { duration: 0.2, scale: 1, transformOrigin: "50% 50%" })
      .to(
        "#btnBase",
        { duration: 0.77, morphSVG: "#cBottom", ease: "power1.inOut" },
        "start"
      )
      .to("#btnBase", {
        duration: 0.23,
        morphSVG: "#cTop",
        ease: "power1.inOut",
      })
      .to("#btnBase", {
        duration: 0.2,
        morphSVG: "#cCenter",
        ease: "power1.inOut",
      })
      .to(
        "#btnBase",
        { duration: 0.5, morphSVG: "#cEnd", ease: "power1.inOut" },
        "revealStart"
      )
      .to("#rectSentItems", { x: "0", duration: 0.5 }, "revealStart")
      .to(
        "#mask1",
        { x: "-=260", duration: 0.5, ease: "power1.inOut" },
        "revealStart"
      )
      .to(
        "#paperPlane",
        { x: "-=205", duration: 0.5, ease: "power1.inOut" },
        "revealStart"
      )
      .to(
        "#paperPlanePath",
        { duration: 0.43, morphSVG: "#tickMark" },
        "start+=0.77"
      )
      .to(
        "#txtSend",
        { duration: 0.6, scale: 0, transformOrigin: "50% 50%" },
        "start"
      )
      .to(
        "#paperPlaneRoute",
        { drawSVG: "80% 100%", duration: 0.7, ease: "power1.inOut" },
        "start+=0.3"
      )
      .to(
        "#paperPlaneRoute",
        { drawSVG: "100% 100%", duration: 0.2, ease: "power1.inOut" },
        "start+=1"
      )
      .to(
        "#paperPlane",
        {
          duration: 1,
          ease: "power1.inOut",
          immediateRender: true,
          motionPath: {
            path: "#paperPlaneRoute",
            align: "#paperPlaneRoute",
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
          },
        },
        "start"
      )
      .to(
        "#paperPlanePath",
        { duration: 0.15, attr: { fill: "#ffffff" } },
        "start"
      )
      .to(
        "#paperPlanePath",
        { duration: 0.15, attr: { fill: "#4E67E8" } },
        "start+=0.77"
      );

    const base = document.getElementById("base");

    let ranOnce = false;

    const onBtnDown = () => {
      gsap.to("#base", {
        duration: 0.1,
        scale: 0.9,
        transformOrigin: "50% 50%",
      });
    };

    const onBtnUp = () => {
      if (ranOnce) {
        tl.restart();
        return;
      }
      ranOnce = true;
      tl.play();
    };

    base?.addEventListener("mousedown", onBtnDown);
    base?.addEventListener("mouseup", onBtnUp);

    return () => {
      base?.removeEventListener("mousedown", onBtnDown);
      base?.removeEventListener("mouseup", onBtnUp);
    };
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-[#291d89]">
      <svg
        viewBox="0 0 1400 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full font-bold"
      >
        send
      </svg>
    </main>
  );
}
