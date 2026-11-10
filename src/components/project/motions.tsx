"use client";

import type { ReactNode } from "react";

/* Dashboard-style micro motions for the SYNEX case studies.
   One visual language: mono label top-left, one idea per widget,
   thin strokes, ember for what matters, grays for context, slow loops. */

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[9px] font-semibold tracking-[0.2em] uppercase ${className}`}>{children}</span>;
}

export function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 px-5 pt-4 pb-4 flex flex-col">
      <Mono className="text-white/40">{label}</Mono>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

/* ---------------- SYNEX ---------------- */






// Know who comes: the crowd gets scanned and each subject lights up with its profile
export function MAudience() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-5">
      <div className="relative grid grid-cols-6 gap-2">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="sx-dot w-3 h-3 rounded-full bg-white/15" style={{ ["--i" as string]: (i % 6) }} />
        ))}
        <span className="sx-scan absolute -top-2 -bottom-2 w-px bg-ember-400 shadow-[0_0_10px_2px_rgba(255,90,31,0.7)]" />
      </div>
      <div className="sx-profile rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
        <span className="block text-[11px] font-bold text-ember-500 tracking-wide">SNX-0142</span>
        <span className="block mt-1 text-[9px] text-white/55">3 asistencias</span>
        <span className="mt-1.5 flex gap-1">
          <span className="rounded-full bg-ember-500/80 px-1.5 py-[1px] text-[8px] text-white">psytrance</span>
          <span className="rounded-full bg-white/10 px-1.5 py-[1px] text-[8px] text-white/70">techno</span>
        </span>
      </div>
    </div>
  );
}

// Retention: each date attended extends the streak
export function MStreak() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
      <div className="relative w-full max-w-[230px] flex items-center justify-between">
        <span className="absolute left-3 right-3 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
        <span className="sx-track absolute left-3 right-3 top-1/2 h-[2px] -translate-y-1/2 bg-ember-500 origin-left" />
        {["I", "II", "III", "IV"].map((n, i) => (
          <span key={n} className="sx-node relative grid place-items-center w-8 h-8 rounded-full border border-white/15 bg-[#121010] text-[10px] font-bold text-white/50" style={{ ["--i" as string]: i }}>
            {n}
          </span>
        ))}
      </div>
      <span className="text-[10px] font-semibold tracking-[0.18em] text-white/45">RACHA</span>
    </div>
  );
}

// Gamification: points come in and fill the rank
export function MPoints() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-6">
      <div className="relative">
        <span className="text-[30px] font-bold tracking-[-0.05em] text-white leading-none">2.340</span>
        <span className="block text-[9px] font-semibold tracking-[0.18em] text-white/45 mt-1">PSY DOSIS</span>
        <span className="sx-plus absolute -right-9 -top-1 text-[12px] font-bold text-ember-400">+100</span>
      </div>
      <div className="flex items-end gap-1.5 h-14">
        {[30, 45, 60, 75, 90, 100].map((h, i) => (
          <span key={i} className="sx-bar w-2.5 rounded-sm bg-white/10 overflow-hidden relative" style={{ height: `${h}%`, ["--i" as string]: i }}>
            <span className="sx-fill absolute inset-0 bg-ember-500 origin-bottom" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Care at night: a calm heartbeat and hydration rising
export function MVitals() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 px-5">
      <svg viewBox="0 0 200 60" className="w-[62%] h-16" fill="none">
        <path d="M0 30 H60 L72 12 L86 50 L98 22 L106 30 H200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" />
        <path className="sx-ekg" d="M0 30 H60 L72 12 L86 50 L98 22 L106 30 H200" pathLength={100} stroke="#FF5A1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="relative w-7 h-16 rounded-full border border-white/15 overflow-hidden">
        <span className="sx-water absolute inset-x-0 bottom-0 h-full bg-ember-500/80 origin-bottom" />
      </div>
    </div>
  );
}

// Co-creation: the community connects to the project and it grows
const COMMUNITY_NODES = [[30, 22], [30, 78], [100, 12], [170, 22], [170, 78], [100, 88]];
export function MJourney() {
  return (
    <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
      {COMMUNITY_NODES.map(([x, y], i) => (
        <path key={i} className="sx-link" d={`M${x} ${y} L100 50`} pathLength={100} stroke="#FF5A1F" strokeWidth="1.2" style={{ ["--i" as string]: i }} />
      ))}
      {COMMUNITY_NODES.map(([x, y], i) => (
        <circle key={i} className="sx-member" cx={x} cy={y} r="5" fill="#2a2726" stroke="rgba(255,255,255,0.25)" style={{ ["--i" as string]: i }} />
      ))}
      <circle className="sx-core" cx="100" cy="50" r="13" fill="#FF5A1F" />
      <circle cx="100" cy="50" r="13" fill="none" stroke="#FF5A1F" className="sx-ring" />
    </svg>
  );
}


/* ---------------- SYNEX FINANZAS ---------------- */

// Receipts: AI reads the receipt and checks it matches the price.
// `tone="ember"` renders white-on-orange for cover panels.
export function MReceipt({ tone = "dark", big = false }: { tone?: "dark" | "ember"; big?: boolean }) {
  const fields = ["monto", "fecha", "banco"];
  const ember = tone === "ember";
  return (
    <div className={`absolute inset-0 flex items-center justify-center px-6 ${big ? "gap-9" : "gap-5"}`}>
      <div className={`relative overflow-hidden flex flex-col ${big ? "w-28 h-[136px] rounded-xl px-3.5 py-3.5 gap-2.5" : "w-16 h-[76px] rounded-lg px-2 py-2 gap-1.5"} ${ember ? "bg-white/20 border border-white/40" : "bg-white/[0.08] border border-white/15"}`}>
        {[80, 60, 70, 45, 65].map((w, i) => (
          <span key={i} className={`${big ? "h-1.5" : "h-1"} rounded-full ${ember ? "bg-white/70" : "bg-white/25"}`} style={{ width: `${w}%` }} />
        ))}
        <span className={`fx-read absolute inset-x-0 ${big ? "h-8" : "h-4"} bg-gradient-to-b from-transparent ${ember ? "via-white/70" : "via-ember-500/40"} to-transparent`} style={big ? { ["--scan" as string]: "170px" } : undefined} />
      </div>
      <div className={`flex flex-col ${big ? "gap-3" : "gap-1.5"}`}>
        {fields.map((f, i) => (
          <span key={f} className={`fx-field flex items-center ${big ? "gap-3 text-[15px] font-medium" : "gap-2 text-[10px]"} ${ember ? "text-white" : "text-white/70"}`} style={{ ["--i" as string]: i }}>
            <span className={`fx-check rounded-full grid place-items-center ${big ? "w-6 h-6 text-[12px]" : "w-3.5 h-3.5 text-[8px]"} ${ember ? "bg-white text-ember-600" : "bg-ember-500 text-white"}`}>✓</span>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}


// P&L chart. `tone="ember"` renders white-on-orange for the cover block.
export function PnlChart({ tone = "dark", label = "P&L · evento" }: { tone?: "dark" | "ember"; label?: string }) {
  const inc = "M0 70 C 30 66, 50 52, 80 46 S 140 26, 200 16";
  const cost = "M0 74 C 40 72, 70 64, 100 60 S 160 54, 200 52";
  const ember = tone === "ember";
  return (
    <div className="absolute inset-0 px-5 pt-4 pb-4 flex flex-col">
      <div className="flex items-center justify-between">
        <Mono className={ember ? "text-white/80" : "text-white/40"}>{label}</Mono>
        <span className="flex items-center gap-3 text-[10px]">
          <span className={`flex items-center gap-1.5 ${ember ? "text-white" : "text-white/60"}`}><span className={`w-3 h-[2px] rounded ${ember ? "bg-white" : "bg-ember-500"}`} />Ingresos</span>
          <span className={`flex items-center gap-1.5 ${ember ? "text-white/70" : "text-white/45"}`}><span className={`w-3 h-[2px] rounded ${ember ? "bg-black/45" : "bg-white/35"}`} />Costos</span>
        </span>
      </div>
      <div className="relative flex-1 mt-2">
        {/* Compositor-only reveal: the window slides in while the chart counter-slides */}
        <div className="pm-wipe absolute inset-0 overflow-hidden">
          <div className="pm-wipe-in absolute inset-0">
            <svg viewBox="0 0 200 84" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
          {[20, 42, 64].map((y) => (
            <line key={y} x1="0" x2="200" y1={y} y2={y} stroke={ember ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={`${inc} L200 52 S 160 54, 100 60 C 70 64, 40 72, 0 74 Z`} fill={ember ? "rgba(255,255,255,0.16)" : "rgba(255,90,31,0.10)"} />
          <path d={cost} stroke={ember ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.35)"} strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={inc} stroke={ember ? "#fff" : "#FF5A1F"} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
          </div>
        </div>
        <span className={`pm-result absolute right-0 top-0 -translate-y-1 rounded-md px-2 py-1 text-[10px] font-semibold ${ember ? "bg-white text-ember-600" : "bg-ember-500/15 text-ember-400"}`}>
          Resultado ▲
        </span>
      </div>
    </div>
  );
}
export function MPnl() {
  return <PnlChart />;
}

// Projection: sold vs projected vs capacity
export function MPace() {
  return (
    <Frame label="Proyección de venta">
      <div className="absolute inset-0 flex flex-col justify-center gap-2">
        <div className="relative h-2 rounded-full bg-white/[0.07] overflow-hidden">
          <span className="pm-proj absolute inset-y-0 left-0 w-full bg-white/20 origin-left" />
          <span className="pm-sold absolute inset-y-0 left-0 w-full bg-ember-500 origin-left" />
        </div>
        <div className="flex items-center gap-4 text-[10px] text-white/55">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-ember-500" />Vendidas</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-white/25" />Proyección</span>
          <span className="ml-auto text-white/30">Capacidad</span>
        </div>
      </div>
    </Frame>
  );
}

// Team goals: progress per promoter toward the target
export function MTeam() {
  const team = [["MR", 92], ["LC", 74], ["JP", 61], ["AS", 43]] as const;
  return (
    <Frame label="Metas del equipo">
      <div className="absolute inset-0 flex flex-col justify-center gap-[7px]">
        {team.map(([n, w], i) => (
          <div key={n} className="flex items-center gap-2.5">
            <span className="w-6 text-[9px] font-semibold text-white/45">{n}</span>
            <span className="relative flex-1 h-1 rounded-full bg-white/10">
              <span className="pm-race absolute inset-y-0 left-0 rounded-full origin-left" style={{ width: `${w}%`, background: i === 0 ? "#FF5A1F" : "rgba(255,255,255,0.45)", ["--i" as string]: i }} />
              <span className="absolute right-[10%] -top-1 h-3 w-px bg-white/30" />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}


// One tap authorizes, the ticket is sent automatically
export function MTicket() {
  return (
    <Frame label="Autorización">
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        <span className="pm-approve rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold text-white/80">Autorizar</span>
        <span className="relative w-16 h-px bg-white/12">
          <span className="pm-dot absolute -top-[2px] w-[5px] h-[5px] rounded-full bg-ember-500 shadow-[0_0_8px_rgba(255,90,31,0.9)]" />
        </span>
        <span className="pm-ticket rounded-md border border-white/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/50">ENTRADA</span>
      </div>
    </Frame>
  );
}
