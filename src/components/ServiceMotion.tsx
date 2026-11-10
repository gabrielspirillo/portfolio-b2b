"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";

// CSS custom properties helper (delays, durations, heights)
const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Dark "device screen" stage shared by every service animation.
 * Animations are pure CSS (transform/opacity) and pause while off-screen.
 */
function Stage({ children, glow }: { children: ReactNode; glow: [string, string] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-paused", String(!entry.isIntersecting)),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-paused="true"
      aria-hidden="true"
      className="sm-stage mt-8 h-40 md:h-48 w-full shrink-0 rounded-2xl border border-white/[0.07] group-hover:border-black/10 transition-[border-color,box-shadow] duration-500 group-hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]"
    >
      <div className="sm-orb" style={{ background: glow[0], left: "-10%", top: "-30%" }} />
      <div className="sm-orb" style={{ background: glow[1], right: "-10%", bottom: "-40%", ...v({ "--d": "-6s" }) }} />
      <div className="relative z-10 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------ 1. Web ------------------------------ */
const CODE_LINES = [
  { w: "38%", c: "#BF5AF2", i: 0 },
  { w: "62%", c: "#0A84FF", i: 1 },
  { w: "48%", c: "#ffffff55", i: 2 },
  { w: "70%", c: "#64D2FF", i: 2 },
  { w: "40%", c: "#ffffff55", i: 1 },
  { w: "56%", c: "#30D158", i: 1 },
  { w: "30%", c: "#BF5AF2", i: 0 },
];

export function WebMotion() {
  return (
    <Stage glow={["#0A84FF", "#BF5AF2"]}>
      <div className="absolute inset-x-[6%] top-[12%] -bottom-4 rounded-t-xl bg-[#111114] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Window chrome */}
        <div className="h-6 flex items-center gap-1.5 px-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 max-w-[220px] h-3 rounded-full bg-white/[0.06] relative overflow-hidden">
            <span className="sm-anim sm-load absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0A84FF] to-[#64D2FF]" />
          </div>
        </div>

        <div className="flex h-full">
          {/* Code panel */}
          <div className="w-[42%] border-r border-white/[0.06] p-3 flex flex-col gap-[7px]">
            {CODE_LINES.map((l, idx) => (
              <div key={idx} className="flex items-center gap-1.5" style={{ paddingLeft: l.i * 8 }}>
                <span className="text-[7px] leading-none text-white/20 font-mono w-2">{idx + 1}</span>
                <span
                  className="sm-anim sm-type h-[5px] rounded-full"
                  style={{ width: l.w, background: l.c, ...v({ "--d": `${idx * 0.22}s` }) }}
                />
                {idx === CODE_LINES.length - 1 && <span className="sm-caret w-[2px] h-2.5 bg-white/80 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Live preview */}
          <div className="flex-1 p-3 flex flex-col gap-2 relative">
            <div
              className="sm-anim sm-rise h-9 rounded-lg bg-gradient-to-br from-[#0A84FF] via-[#5E5CE6] to-[#BF5AF2] relative overflow-hidden"
              style={v({ "--d": "1.4s" })}
            >
              <span className="absolute left-2.5 top-2 h-1.5 w-[40%] rounded-full bg-white/80" />
              <span className="absolute left-2.5 top-[18px] h-1 w-[26%] rounded-full bg-white/45" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="sm-anim sm-pop h-11 rounded-lg bg-white/[0.06] border border-white/[0.06] p-1.5 flex flex-col gap-1"
                  style={v({ "--d": `${1.8 + n * 0.15}s` })}
                >
                  <span className="w-3 h-3 rounded-[4px]" style={{ background: ["#30D158", "#FF9F0A", "#FF375F"][n] }} />
                  <span className="h-1 w-[70%] rounded-full bg-white/25" />
                  <span className="h-1 w-[45%] rounded-full bg-white/15" />
                </div>
              ))}
            </div>

            {/* Performance score */}
            <div
              className="sm-anim sm-pop absolute right-4 top-[14px] flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 pl-1 pr-2 py-1"
              style={v({ "--d": "2.4s" })}
            >
              <svg viewBox="0 0 36 36" className="w-5 h-5 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#ffffff1a" strokeWidth="4" />
                <circle
                  className="sm-anim sm-ring"
                  cx="18" cy="18" r="15" fill="none" stroke="#30D158" strokeWidth="4" strokeLinecap="round"
                  pathLength={100} strokeDasharray="100"
                  style={v({ "--d": "2.4s" })}
                />
              </svg>
              <span className="text-[9px] font-semibold text-[#30D158] tabular-nums">100</span>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ----------------------------- 2. Mobile ----------------------------- */
const APP_ROWS = [
  { c: "linear-gradient(135deg,#0A84FF,#64D2FF)", w: "64%" },
  { c: "linear-gradient(135deg,#FF375F,#FF9F0A)", w: "48%" },
  { c: "linear-gradient(135deg,#30D158,#64D2FF)", w: "72%" },
  { c: "linear-gradient(135deg,#BF5AF2,#5E5CE6)", w: "54%" },
  { c: "linear-gradient(135deg,#FF9F0A,#FFD60A)", w: "60%" },
];

export function MobileMotion() {
  return (
    <Stage glow={["#5E5CE6", "#64D2FF"]}>
      {/* Phone */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[96px] h-[200px] rounded-[22px] border-[3px] border-[#2c2c30] bg-[#050507] shadow-[0_24px_50px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
        {/* Dynamic island */}
        <div className="sm-anim sm-island absolute left-1/2 -translate-x-1/2 top-1.5 h-[9px] w-[30px] rounded-full bg-black z-20 flex items-center justify-between px-1.5 overflow-hidden">
          <span className="sm-anim sm-island-in w-1 h-1 rounded-full bg-[#30D158]" />
          <span className="sm-anim sm-island-in flex items-end gap-[1.5px] h-2">
            {[0, 1, 2].map((b) => (
              <span key={b} className="sm-eq w-[1.5px] h-full bg-[#30D158] rounded-full" style={v({ "--h": 0.9, "--dur": `${0.6 + b * 0.15}s`, "--d": `-${b * 0.2}s` })} />
            ))}
          </span>
        </div>

        {/* Scrolling app feed */}
        <div className="absolute inset-x-1.5 top-6 bottom-0 overflow-hidden rounded-t-[10px]">
          <div className="sm-scroll flex flex-col">
            {[...APP_ROWS, ...APP_ROWS].map((r, idx) => (
              <div key={idx} className="h-[34px] mb-1.5 shrink-0 rounded-[9px] bg-white/[0.07] flex items-center gap-1.5 px-1.5">
                <span className="w-[22px] h-[22px] rounded-[7px] shrink-0" style={{ background: r.c }} />
                <span className="flex-1 flex flex-col gap-1">
                  <span className="h-1 rounded-full bg-white/50" style={{ width: r.w }} />
                  <span className="h-1 w-[40%] rounded-full bg-white/20" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating platform chips */}
      <div className="sm-float absolute left-[8%] top-[30%] rounded-full bg-white/[0.08] border border-white/10 px-2.5 py-1 text-[9px] font-medium text-white/80 flex items-center gap-1.5 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" /> iOS
      </div>
      <div className="sm-float absolute right-[8%] top-[55%] rounded-full bg-white/[0.08] border border-white/10 px-2.5 py-1 text-[9px] font-medium text-white/80 flex items-center gap-1.5 shadow-lg" style={v({ "--d": "-2s" })}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" /> Android
      </div>
    </Stage>
  );
}

/* --------------------------- 3. Automation --------------------------- */
const FLOWS = [
  { d: "M58 80 C 90 80, 100 80, 128 80", cls: "sm-flow-a", color: "#FF9F0A" },
  { d: "M172 80 C 205 80, 205 42, 238 42", cls: "sm-flow-b", color: "#30D158" },
  { d: "M172 80 C 205 80, 205 118, 238 118", cls: "sm-flow-b", color: "#0A84FF" },
];

function Node({ x, y, size = 34, color, glowCls, children }: { x: number; y: number; size?: number; color: string; glowCls: string; children: ReactNode }) {
  const h = size / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`sm-anim sm-bump ${glowCls}-bump`}>
        <rect x={-h - 5} y={-h - 5} width={size + 10} height={size + 10} rx={14} fill={color} className={`sm-anim ${glowCls}`} style={{ filter: "blur(8px)" }} />
        <rect x={-h} y={-h} width={size} height={size} rx={10} fill="#17171b" stroke="#ffffff1f" />
        {children}
      </g>
    </g>
  );
}

export function AutomationMotion() {
  return (
    <Stage glow={["#FF9F0A", "#BF5AF2"]}>
      <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sm-ai" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BF5AF2" />
            <stop offset="100%" stopColor="#0A84FF" />
          </linearGradient>
        </defs>

        {FLOWS.map((f, i) => (
          <g key={i}>
            <path d={f.d} fill="none" stroke="#ffffff1a" strokeWidth="1.5" strokeDasharray="3 4" />
            <path
              d={f.d} fill="none" stroke={f.color} strokeWidth="2.5" strokeLinecap="round"
              pathLength={100} strokeDasharray="14 200"
              className={`sm-anim ${f.cls}`}
              style={{ filter: `drop-shadow(0 0 4px ${f.color})` }}
            />
          </g>
        ))}

        {/* Trigger */}
        <Node x={40} y={80} color="#FF9F0A" glowCls="sm-glow-a">
          <path d="M2 -9 L-6 2 H0 L-2 9 L6 -2 H0 Z" fill="#FF9F0A" />
        </Node>

        {/* AI core */}
        <Node x={150} y={80} size={42} color="#BF5AF2" glowCls="sm-glow-b">
          <circle r="13" fill="none" stroke="url(#sm-ai)" strokeWidth="2" strokeDasharray="20 62" strokeLinecap="round" className="sm-spin" />
          <path d="M0 -7 C1 -2, 2 -1, 7 0 C2 1, 1 2, 0 7 C-1 2, -2 1, -7 0 C-2 -1, -1 -2, 0 -7 Z" fill="url(#sm-ai)" />
        </Node>

        {/* Outputs */}
        <Node x={256} y={42} size={30} color="#30D158" glowCls="sm-glow-c">
          <path d="M-5 0 L-1.5 3.5 L5 -3.5" fill="none" stroke="#30D158" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </Node>
        <Node x={256} y={118} size={30} color="#0A84FF" glowCls="sm-glow-c">
          <rect x="-6" y="-4.5" width="12" height="9" rx="2" fill="none" stroke="#0A84FF" strokeWidth="1.8" />
          <path d="M-5.5 -3.5 L0 0.5 L5.5 -3.5" fill="none" stroke="#0A84FF" strokeWidth="1.6" strokeLinejoin="round" />
        </Node>

        <text x="40" y="112" textAnchor="middle" className="fill-white/40" fontSize="7" fontFamily="inherit">Trigger</text>
        <text x="150" y="119" textAnchor="middle" className="fill-white/40" fontSize="7" fontFamily="inherit">AI Agent</text>
      </svg>
    </Stage>
  );
}

/* ----------------------------- 4. UI / UX ----------------------------- */
const SWATCHES = ["#0A84FF", "#BF5AF2", "#30D158", "#FF375F", "#FF9F0A"];

export function DesignMotion() {
  return (
    <Stage glow={["#FF375F", "#0A84FF"]}>
      <div className="sm-grid absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[150px]">
        <div className="absolute left-2 top-1 rounded-md bg-white/[0.06] border border-white/10 px-1.5 py-0.5 text-[8px] text-white/60 font-medium"># Frame 01</div>
        <div className="sm-float absolute right-1 top-1 rounded-md bg-white/[0.06] border border-white/10 px-1.5 py-0.5 text-[9px] text-white/80 font-semibold tracking-tight" style={v({ "--d": "-1s" })}>Aa</div>

        {/* Object being edited */}
        <div className="sm-anim sm-resize absolute left-[80px] top-[32px] w-[60px] h-[60px]" style={v({ "--dur": "6s" })}>
          <div className="sm-anim sm-morph absolute inset-0 overflow-hidden" style={v({ "--dur": "6s" })}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF] to-[#BF5AF2]" />
            <div className="sm-anim sm-recolor absolute inset-0 bg-gradient-to-br from-[#FF375F] to-[#FF9F0A]" style={v({ "--dur": "6s" })} />
          </div>
          <div className="absolute -inset-[5px] border border-[#0A84FF]">
            {["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-left-[3px] -bottom-[3px]", "-right-[3px] -bottom-[3px]"].map((pos) => (
              <span key={pos} className={`absolute ${pos} w-[6px] h-[6px] bg-white border border-[#0A84FF]`} />
            ))}
          </div>
        </div>

        {/* Palette */}
        <div className="absolute left-[59px] top-[115px] flex gap-2">
          {SWATCHES.map((c) => (
            <span key={c} className="w-[14px] h-[14px] rounded-full" style={{ background: c }} />
          ))}
          <span className="sm-anim sm-swatch absolute -left-[3px] -top-[3px] w-5 h-5 rounded-full border-[1.5px] border-white" style={v({ "--dur": "6s" })} />
        </div>

        {/* Cursor */}
        <svg viewBox="0 0 16 16" className="sm-anim sm-cursor absolute left-0 top-0 w-3.5 h-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" style={v({ "--dur": "6s" })}>
          <path d="M1 1 L14 6.5 L8 8 L6.5 14 Z" fill="white" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>
    </Stage>
  );
}

/* ------------------------------ 5. Sound ------------------------------ */
const BARS = Array.from({ length: 36 }, (_, i) => {
  const env = Math.sin((i / 35) * Math.PI); // louder in the middle
  return {
    h: (0.35 + env * 0.65 * (0.6 + 0.4 * Math.abs(Math.sin(i * 1.7)))).toFixed(2),
    dur: (0.7 + ((i * 37) % 9) / 10).toFixed(2),
    delay: (-((i * 53) % 13) / 10).toFixed(2),
  };
});

export function SoundMotion() {
  return (
    <Stage glow={["#FF375F", "#FF9F0A"]}>
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5">
        <span className="sm-pulse w-1.5 h-1.5 rounded-full bg-[#FF375F]" />
        <span className="text-[8px] font-medium text-white/70 tracking-wide">Master · −14 LUFS</span>
      </div>

      <div className="absolute inset-x-5 top-[22%] bottom-[22%] flex items-center justify-between">
        {BARS.map((b, i) => (
          <span
            key={i}
            className="sm-eq w-[3px] h-full rounded-full bg-gradient-to-t from-[#FF375F] via-[#FF6B4A] to-[#FF9F0A]"
            style={v({ "--h": b.h, "--dur": `${b.dur}s`, "--d": `${b.delay}s`, transformOrigin: "center" })}
          />
        ))}
      </div>

      {/* Playhead sweep */}
      <div className="absolute inset-x-5 top-[16%] bottom-[16%] overflow-hidden">
        <span className="sm-playhead absolute top-0 bottom-0 left-0 w-full">
          <span className="absolute top-0 bottom-0 left-0 w-px bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
        </span>
      </div>

      {/* Timeline */}
      <div className="absolute inset-x-5 bottom-4 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <span className="sm-progress absolute inset-0 bg-white/60 rounded-full" />
      </div>
    </Stage>
  );
}
