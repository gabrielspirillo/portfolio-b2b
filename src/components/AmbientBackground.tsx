"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const v = (vars: Record<string, string>) => vars as CSSProperties;

// Hairline curves from the brand banner, in a 1440x900 design space
const LINES = [
  { d: "M980 -20 C 1020 300, 1180 520, 1500 640", dur: "11s", delay: "0s" },
  { d: "M760 920 C 900 640, 1160 560, 1500 520", dur: "13s", delay: "-4s" },
  { d: "M-40 260 C 220 300, 420 180, 620 -20", dur: "10s", delay: "-7s" },
  { d: "M-60 720 C 260 640, 520 760, 820 940", dur: "14s", delay: "-2s" },
  { d: "M1120 -40 C 1180 160, 1320 260, 1500 280", dur: "9s", delay: "-5s" },
];

// Scale a design-space path to the container's pixel size (for CSS offset-path)
const scalePath = (d: string, sx: number, sy: number) => {
  let i = 0;
  return d.replace(/-?\d+(\.\d+)?/g, (n) => String(+(Number(n) * (i++ % 2 ? sy : sx)).toFixed(1)));
};

/**
 * Page backdrop: static ember glows + the banner's hairlines (one static SVG,
 * painted once) with small "comets" of light travelling along them.
 * Comets move with CSS offset-path on their own layers, so nothing large is
 * repainted per frame; the frosted cards above pick them up as a soft glow.
 */
export function AmbientBackground() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[] | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const update = () => {
      const sx = box.clientWidth / 1440;
      const sy = box.clientHeight / 900;
      setPaths(LINES.map((l) => scalePath(l.d, sx, sy)));
    };
    update();
    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(update, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute -right-[20vw] -bottom-[30vh] w-[85vw] h-[85vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.26),rgba(229,65,15,0.08)_55%,transparent)]" />
      <div className="absolute -left-[25vw] -top-[25vh] w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.09),transparent)]" />

      <div ref={boxRef} className="line-drift absolute -inset-[4%]" style={v({ "--dur": "26s" })}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="bg-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FFA27A" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {LINES.map((l) => (
            <path key={l.d} d={l.d} stroke="url(#bg-arc)" strokeOpacity="0.2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {paths?.map((p, i) => (
          <span
            key={i}
            className="comet"
            style={{ offsetPath: `path("${p}")`, ...v({ "--dur": LINES[i].dur, "--d": LINES[i].delay }) }}
          />
        ))}
      </div>
    </div>
  );
}
