"use client";

import { ReactNode, useEffect, useState } from "react";
import { SynexAvatar, type Mood } from "@/components/synex-avatar/SynexAvatar";

/* Characteristic pieces of the SYNEX app, rebuilt as UI (no screenshots).
   All tiles share one base size so they can ride the ribbon and land in the grid. */
export const TILE_W = 360;
export const TILE_H = 250;

const mono = "font-mono uppercase tracking-[0.18em]";

function Tile({ children, ember = false, className = "" }: { children: ReactNode; ember?: boolean; className?: string }) {
  return (
    <div
      className={`relative w-full h-full rounded-[26px] overflow-hidden p-5 ${
        ember
          ? "bg-[linear-gradient(150deg,#ff7a3d_0%,#ff5a1f_45%,#c2300c_100%)] shadow-[inset_0_1px_0_rgba(255,230,210,0.5)]"
          : "bg-[linear-gradient(180deg,#1a1716_0%,#0c0b0b_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      } border ${ember ? "border-[#ffb38a]/50" : "border-white/10"} ${className}`}
    >
      {children}
    </div>
  );
}

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`${mono} text-[9px] ${light ? "text-white/80" : "text-ember-400"}`}>{children} {"//"}</span>;
}

/* SYN, the in-app AI assistant (real avatar from the app) */
const MOODS: Mood[] = ["happy", "thinking", "celebrate", "wink", "scan"];
export function SynTile() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % MOODS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <Tile>
      <div className="absolute -right-10 -bottom-16 w-64 h-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.35),transparent)]" />
      <Label>Asistente con IA</Label>
      <div className="relative mt-3 flex items-center gap-4">
        <SynexAvatar size={104} mood={MOODS[i]} look="wander" glow />
        <div className="rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10 px-3.5 py-2.5 text-[13px] leading-snug text-white/85 max-w-[150px]">
          Te acompaño toda la noche.
        </div>
      </div>
      <span className="absolute left-5 bottom-4 text-[34px] font-bold tracking-[-0.05em] text-white">SYN</span>
    </Tile>
  );
}

/* Rank ladder (real ranks from the app) */
const RANKS = ["SUJETO_00", "EXPUESTO", "REACTIVO", "INMERSO", "PERSISTENTE", "CRÓNICO"];
const TIERS = ["I", "II", "III", "IV", "V", "VI"];
export function RangosTile() {
  const current = 3;
  return (
    <Tile>
      <div className="flex items-center justify-between">
        <Label>Tu rango</Label>
        <span className={`${mono} text-[9px] text-white/40`}>fase IV</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid place-items-center w-12 h-12 rounded-full text-lg font-bold text-white bg-[radial-gradient(circle_at_30%_30%,#ff8a55,#e5410f_60%,#9a2508)] shadow-[0_0_24px_rgba(255,90,31,0.6)]">4</span>
        <div>
          <span className={`${mono} block text-[9px] text-white/45`}>rango</span>
          <span className="block text-2xl font-bold tracking-[-0.03em] text-white">{RANKS[current]}</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-1.5">
        {TIERS.map((tier, idx) => (
          <div key={tier} className="flex flex-col items-center gap-1.5">
            <span className={`h-1.5 w-full rounded-full ${idx <= current ? "bg-ember-500" : "bg-white/10"}`} />
            <span className={`text-[10px] font-semibold ${idx === current ? "text-white" : "text-white/35"}`}>{tier}</span>
          </div>
        ))}
      </div>
      <span className="absolute left-5 bottom-4 text-[11px] text-white/50">
        falta <span className="text-white font-semibold">1 exposición</span> para PERSISTENTE
      </span>
    </Tile>
  );
}

/* PSY DOSIS points card */
export function PsyDosisTile() {
  return (
    <Tile ember>
      <div className="absolute -right-6 -top-10 w-40 h-40 rounded-full border-[18px] border-white/10" />
      <div className="flex items-center justify-between">
        <span className={`${mono} text-[11px] font-bold text-white`}>PSY DOSIS</span>
        <span className="rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-semibold text-white/90">INMERSO</span>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-white mb-2">
          <path d="M18 2l4 4M17 7l-3-3M14.5 4.5L5 14l-1 6 6-1 9.5-9.5M9 10l5 5M7 12l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[58px] leading-none font-bold tracking-[-0.06em] text-white">2.340</span>
      </div>
      <div className="mt-5 h-2 rounded-full bg-black/25 overflow-hidden">
        <span className="block h-full w-[72%] rounded-full bg-white" />
      </div>
      <span className="absolute left-5 bottom-4 text-[11px] text-white/85">se ganan asistiendo · <span className="font-semibold text-white">se canjean por premios</span></span>
    </Tile>
  );
}

/* Subject profile with sound signature */
export function ExpedienteTile() {
  const bars = [40, 70, 55, 85, 35, 60, 90, 50, 75, 45, 65, 30, 80, 55];
  return (
    <Tile>
      <div className="flex items-center justify-between">
        <Label>Ficha de sujeto</Label>
        <span className={`${mono} text-[8px] text-ember-500`}>confidencial</span>
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-[30px] font-bold tracking-[-0.03em] text-ember-500">SNX-0142</span>
        <span className="text-[12px] text-white/50">fase IV · 3 asistencias</span>
      </div>
      <span className={`${mono} mt-3 block text-[8px] text-white/45`}>firma sonora</span>
      <div className="relative mt-2 h-[72px] rounded-2xl bg-white/[0.04] border border-white/[0.07] overflow-hidden">
        <div className="absolute inset-x-3 bottom-0 top-3 flex items-end gap-[5px] opacity-50">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-ember-600" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="relative flex flex-wrap gap-1.5 p-2.5">
          {["Psytrance", "Hard Techno", "Hypnotic"].map((g) => (
            <span key={g} className="rounded-full bg-ember-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(255,90,31,0.4)]">{g}</span>
          ))}
        </div>
      </div>
    </Tile>
  );
}

/* Night avatar: live vitals for harm reduction */
const VITALS = [
  ["Hidratación", 78],
  ["Temperatura", 54],
  ["Corazón", 62],
  ["Energía", 70],
  ["Lucidez", 86],
] as const;
export function NocheTile() {
  return (
    <Tile>
      <div className="flex items-center justify-between">
        <Label>Avatar nocturno</Label>
        <span className="flex items-center gap-1.5 text-[10px] text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-[#6fd07a]" />modo noche</span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <SynexAvatar size={84} mood="zen" glow={false} />
        <div className="flex-1 flex flex-col gap-2">
          {VITALS.map(([name, v]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="w-[74px] text-[10px] text-white/55">{name}</span>
              <span className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <span className="block h-full rounded-full bg-ember-500" style={{ width: `${v}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-5 right-5 bottom-4 flex gap-1.5">
        {["Agua", "Ventilé", "Descansé"].map((a) => (
          <span key={a} className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/75">+ {a}</span>
        ))}
      </div>
    </Tile>
  );
}

/* Journey / roadmap: the community builds the project */
const PHASES = ["Origen", "Reacción en cadena", "Fase III", "Fase IV"];
export function RecorridoTile() {
  return (
    <Tile>
      <Label>Recorrido</Label>
      <span className="mt-2 block text-[22px] font-bold leading-tight tracking-[-0.03em] text-white">Sos parte del experimento<br />desde el origen.</span>
      <div className="absolute left-5 right-5 bottom-6">
        <div className="relative flex items-center justify-between">
          <span className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-ember-500 via-ember-500/60 to-white/10" />
          {PHASES.map((p, i) => (
            <span key={p} className="relative flex flex-col items-center gap-2">
              <span className={`grid place-items-center w-8 h-8 rounded-full text-[11px] font-bold ${i < 2 ? "bg-ember-500 text-white shadow-[0_0_16px_rgba(255,90,31,0.6)]" : i === 2 ? "bg-[#1a1716] text-white border border-ember-500" : "bg-[#1a1716] text-white/40 border border-white/10"}`}>
                {i < 2 ? "✓" : TIERS[i]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </Tile>
  );
}

/* Extras that only ride the ribbon */
export function MedallasTile() {
  return (
    <Tile>
      <Label>Historial de exposiciones</Label>
      <div className="mt-6 flex justify-between px-1">
        {[["03", "MAY"], ["21", "JUN"], ["12", "JUL"]].map(([d, m]) => (
          <span key={d} className="grid place-items-center w-[84px] h-[84px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff8a55,#e5410f_60%,#8f2206)] shadow-[0_0_28px_rgba(255,90,31,0.5),inset_0_0_0_3px_rgba(255,200,170,0.35)]">
            <span className="text-center leading-none">
              <span className="block text-[28px] font-bold text-white">{d}</span>
              <span className="block text-[9px] font-semibold text-white/80 mt-1">{m}</span>
            </span>
          </span>
        ))}
      </div>
      <span className="absolute left-5 bottom-4 text-[11px] text-white/50">3 medallas</span>
    </Tile>
  );
}

export function TicketTile() {
  return (
    <Tile ember>
      <Label light>Invitación</Label>
      <span className="mt-3 block text-[26px] font-bold leading-tight tracking-[-0.03em] text-white">Te sumaron<br />al experimento</span>
      <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between rounded-2xl bg-black/25 px-4 py-3">
        <span className="text-[30px] font-bold tracking-[-0.04em] text-white">10% OFF</span>
        <span className="text-[10px] text-white/80 text-right leading-tight">+80 PSY DOSIS<br />cada uno</span>
      </div>
    </Tile>
  );
}

export function CountdownTile() {
  return (
    <Tile>
      <Label>El experimento continúa</Label>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-[26px] font-bold leading-[0.95] tracking-[-0.03em] text-white">Volvemos<br />en</span>
        <span className="text-[72px] leading-none font-bold tracking-[-0.06em] text-ember-gradient">2027</span>
      </div>
      <div className="absolute left-5 right-5 bottom-5 flex items-center gap-2">
        {["I", "II", "III"].map((p) => (
          <span key={p} className="flex-1 h-9 grid place-items-center rounded-xl bg-ember-500 text-white text-sm font-bold">{p}</span>
        ))}
        <span className="flex-1 h-9 grid place-items-center rounded-xl border border-dashed border-ember-500/70 text-white text-sm font-bold">IV</span>
      </div>
    </Tile>
  );
}
