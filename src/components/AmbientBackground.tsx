import type { CSSProperties } from "react";

const v = (vars: Record<string, string>) => vars as CSSProperties;

// Hairline curves taken from the brand banner (viewBox 1440x900)
const LINES = [
  { d: "M980 -20 C 1020 300, 1180 520, 1500 640", dur: "11s", delay: "0s" },
  { d: "M760 920 C 900 640, 1160 560, 1500 520", dur: "13s", delay: "-4s" },
  { d: "M-40 260 C 220 300, 420 180, 620 -20", dur: "10s", delay: "-7s" },
  { d: "M-60 720 C 260 640, 520 760, 820 940", dur: "14s", delay: "-2s" },
  { d: "M1120 -40 C 1180 160, 1320 260, 1500 280", dur: "9s", delay: "-5s" },
];

/**
 * Page backdrop: static ember glows + the banner's hairlines, which drift
 * slowly while small pulses of light travel along them.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute -right-[20vw] -bottom-[30vh] w-[85vw] h-[85vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.26),rgba(229,65,15,0.08)_55%,transparent)]" />
      <div className="absolute -left-[25vw] -top-[25vh] w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.09),transparent)]" />

      <svg className="line-drift absolute -inset-[4%] w-[108%] h-[108%]" style={v({ "--dur": "26s" })} viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="bg-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFA27A" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {LINES.map((l) => (
          <g key={l.d}>
            <path d={l.d} stroke="url(#bg-arc)" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d={l.d}
              pathLength={100}
              className="line-flow"
              stroke="#FF7A45"
              strokeOpacity="0.9"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={v({ "--dur": l.dur, "--d": l.delay })}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
