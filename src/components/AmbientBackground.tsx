"use client";

import { useEffect, useRef } from "react";

/**
 * Page backdrop: slow-drifting ember glows, breathing hairline arcs (from the
 * brand banner) and, on desktop, a soft light that trails the cursor.
 * Everything animates through transform/opacity only.
 */
export function AmbientBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty, raf = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      spot.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      spot.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="ambient-glow g1 absolute -right-[20vw] -bottom-[30vh] w-[85vw] h-[85vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.28),rgba(229,65,15,0.08)_55%,transparent)]" />
      <div className="absolute -left-[25vw] -top-[25vh] w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.10),transparent)]" />
      <div className="ambient-glow g3 absolute left-[35vw] top-[10vh] w-[40vw] h-[40vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,140,80,0.06),transparent)]" />

      <svg className="ambient-arcs absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <path d="M980 -20 C 1020 300, 1180 520, 1500 640" stroke="url(#arc)" strokeWidth="1" />
        <path d="M760 920 C 900 640, 1160 560, 1500 520" stroke="url(#arc)" strokeWidth="1" />
        <path d="M-40 260 C 220 300, 420 180, 620 -20" stroke="url(#arc)" strokeWidth="1" />
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFA27A" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Cursor light (desktop only) */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 w-[700px] h-[700px] rounded-full opacity-0 transition-opacity duration-700 bg-[radial-gradient(closest-side,rgba(255,110,50,0.09),transparent)]"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
