"use client";

import type { ReactNode } from "react";

/* Dashboard-style micro motions for the SYNEX case studies.
   One visual language: mono label top-left, one idea per widget,
   thin strokes, ember for what matters, grays for context, slow loops. */

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[9px] font-semibold tracking-[0.2em] uppercase ${className}`}>{children}</span>;
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 px-5 pt-4 pb-4 flex flex-col">
      <Mono className="text-white/40">{label}</Mono>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

/* ---------------- SYNEX ---------------- */

// Know who comes: audience by genre (donut draws in)
export function MAudience() {
  const segs = [
    { len: 46, off: 0, c: "#FF5A1F" },
    { len: 32, off: 46, c: "rgba(255,255,255,0.6)" },
    { len: 22, off: 78, c: "rgba(255,255,255,0.18)" },
  ];
  return (
    <Frame label="Audiencia">
      <div className="absolute inset-0 flex items-center gap-6">
        <svg viewBox="0 0 64 64" className="w-[72px] h-[72px] -rotate-90">
          <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          {segs.map((s, i) => (
            <circle
              key={i} cx="32" cy="32" r="24" fill="none" stroke={s.c} strokeWidth="7" pathLength={100}
              strokeDasharray={`${s.len - 1.5} ${100 - s.len + 1.5}`} strokeDashoffset={-s.off}
              className="pm-seg" style={{ ["--i" as string]: i }}
            />
          ))}
        </svg>
        <ul className="flex flex-col gap-2">
          {["Psytrance", "Hard Techno", "Hypnotic"].map((g, i) => (
            <li key={g} className="pm-fade flex items-center gap-2 text-[11px] text-white/70" style={{ ["--i" as string]: i }}>
              <span className="w-2 h-2 rounded-[2px]" style={{ background: segs[i].c }} />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

// Retention: each date attended extends the streak
export function MStreak() {
  return (
    <Frame label="Asistencia por fecha">
      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-between">
          <span className="absolute left-1 right-1 h-px bg-white/12" />
          <span className="pm-line absolute left-1 right-1 h-px bg-ember-500 origin-left" />
          {["I", "II", "III", "IV"].map((n, i) => (
            <span key={n} className="relative flex flex-col items-center">
              <span className={`pm-node pm-node-${i} w-2.5 h-2.5 rounded-full bg-[#2a2726] ring-4 ring-[#0d0b0a]`} />
              <span className="absolute top-4 text-[10px] font-semibold text-white/45">{n}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Gamification: points push the rank forward
export function MPoints() {
  return (
    <Frame label="PSY DOSIS">
      <div className="absolute inset-0 flex flex-col justify-center gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-semibold tracking-[-0.04em] text-white leading-none">2.340</span>
          <span className="pm-plus text-[11px] font-semibold text-ember-400">+100</span>
        </div>
        <div>
          <div className="relative h-1 rounded-full bg-white/10 overflow-hidden">
            <span className="pm-progress absolute inset-y-0 left-0 w-full bg-ember-500 origin-left" />
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] font-semibold tracking-[0.14em] text-white/40">
            <span>INMERSO</span>
            <span>PERSISTENTE</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Care at night: live vitals breathing gently
export function MVitals() {
  const rows = [["Hidratación", 0], ["Temperatura", 1], ["Energía", 2]] as const;
  return (
    <Frame label="Modo noche">
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5">
        {rows.map(([name, i]) => (
          <div key={name} className="flex items-center gap-3">
            <span className="w-[74px] text-[10px] text-white/55">{name}</span>
            <span className="relative flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <span className="pm-vital absolute inset-y-0 left-0 w-full origin-left" style={{ ["--i" as string]: i, background: i === 0 ? "#FF5A1F" : "rgba(255,255,255,0.55)" }} />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Co-creation: the project grows phase by phase with the community
export function MJourney() {
  const phases = ["Origen", "Reacción en cadena", "Fase III", "Fase IV"];
  return (
    <Frame label="Recorrido">
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
        <div className="relative flex justify-between">
          <span className="absolute left-1 right-1 top-[5px] h-px bg-white/12" />
          <span className="pm-travel absolute top-0 z-10 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-ember-500 shadow-[0_0_12px_rgba(255,90,31,0.8)]" />
          {phases.map((p, i) => (
            <span key={p} className="relative flex flex-col items-center gap-2 w-0">
              <span className={`w-2.5 h-2.5 rounded-full ring-4 ring-[#0d0b0a] ${i < 3 ? "bg-white/70" : "border border-dashed border-white/40 bg-transparent"}`} />
              <span className={`whitespace-nowrap text-[10px] ${i < 3 ? "text-white/60" : "text-white/30"}`}>{p}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ---------------- SYNEX FINANZAS ---------------- */

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
        <svg viewBox="0 0 200 84" preserveAspectRatio="none" className="pm-reveal absolute inset-0 w-full h-full" fill="none">
          {[20, 42, 64].map((y) => (
            <line key={y} x1="0" x2="200" y1={y} y2={y} stroke={ember ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={`${inc} L200 52 S 160 54, 100 60 C 70 64, 40 72, 0 74 Z`} fill={ember ? "rgba(255,255,255,0.16)" : "rgba(255,90,31,0.10)"} />
          <path d={cost} stroke={ember ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.35)"} strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={inc} stroke={ember ? "#fff" : "#FF5A1F"} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
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

// AI receipt validation
export function MReceipt() {
  const checks = ["Monto", "Fecha", "Banco"];
  return (
    <Frame label="Validación de pago">
      <div className="absolute inset-0 flex items-center gap-6">
        <div className="relative w-14 h-[68px] rounded-md bg-white/[0.06] border border-white/12 overflow-hidden px-2 py-2.5 flex flex-col gap-1.5">
          {[80, 55, 70, 40].map((w, i) => (
            <span key={i} className="h-[3px] rounded-full bg-white/25" style={{ width: `${w}%` }} />
          ))}
          <span className="mt-auto h-[5px] w-[60%] rounded-full bg-white/45" />
          <span className="pm-scan absolute inset-x-0 h-px bg-ember-400 shadow-[0_0_10px_rgba(255,90,31,0.9)]" />
        </div>
        <ul className="flex flex-col gap-1.5">
          {checks.map((c, i) => (
            <li key={c} className="pm-check flex items-center gap-2 text-[11px]" style={{ ["--i" as string]: i }}>
              <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="#FF5A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {c}
            </li>
          ))}
        </ul>
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
