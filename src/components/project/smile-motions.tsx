"use client";

import { Frame } from "@/components/project/motions";

/* Before / after slider: the "after" layer is revealed by a moving divider. */
export function BeforeAfter({ className = "", labels = true }: { className?: string; labels?: boolean }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/smilefast/before.webp" alt="Antes" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" />
      <div className="sf-after absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/smilefast/after.webp" alt="Simulación" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" />
      </div>
      <span className="sf-divider absolute inset-y-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-white shadow-lg grid place-items-center text-[11px] text-carbon-950">‹›</span>
      </span>
      {labels && (
        <>
          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">ANTES</span>
          <span className="absolute right-3 top-3 rounded-full bg-ember-500 px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] text-white">PROYECCIÓN</span>
        </>
      )}
    </div>
  );
}
export function MSim() {
  return (
    <div className="absolute inset-0 p-2">
      <BeforeAfter className="relative w-full h-full rounded-lg" />
    </div>
  );
}

// Clinical analysis: VITA shade scale, target lands on B1
const SHADES = ["#f6f1e4", "#f1ead7", "#ece2c8", "#e6d8b6", "#ddcca2", "#d3be8d"];
export function MVita() {
  const labels = ["B1", "A1", "B2", "A2", "A3", "A3.5"];
  return (
    <Frame label="Tono VITA · 6 parámetros">
      <div className="absolute inset-0 flex flex-col justify-center gap-2">
        <div className="relative flex gap-1.5">
          {SHADES.map((c, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="w-full h-9 rounded-md" style={{ background: c }} />
              <span className="text-[9px] text-white/50">{labels[i]}</span>
            </div>
          ))}
          <span className="sf-target absolute top-[-4px] h-[44px] rounded-lg border-2 border-ember-500 shadow-[0_0_14px_rgba(255,90,31,0.6)]" />
        </div>
        <span className="flex gap-1.5 text-[9px] text-white/45">
          {["Proporción áurea", "Arco", "Encía"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-2 py-[2px]">{t}</span>
          ))}
        </span>
      </div>
    </Frame>
  );
}

// Qualified lead lands in the panel and moves to booked
export function MLead() {
  return (
    <Frame label="Panel · Leads">
      <div className="absolute inset-0 flex items-center">
        <div className="sf-lead w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
          <span className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/smilefast/after.webp" alt="" className="w-full h-full object-cover object-[50%_30%]" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] font-semibold text-white">María F.</span>
            <span className="block text-[9px] text-white/50 whitespace-nowrap">Simulación · WhatsApp</span>
          </span>
          <span className="relative h-5 w-[78px] text-[9px] font-semibold">
            <span className="sf-st sf-st-1 absolute inset-0 grid place-items-center rounded-full bg-ember-500 text-white">NUEVO</span>
            <span className="sf-st sf-st-2 absolute inset-0 grid place-items-center rounded-full bg-white/10 text-white/80">Contactado</span>
            <span className="sf-st sf-st-3 absolute inset-0 grid place-items-center rounded-full bg-white text-carbon-950">✓ Cita</span>
          </span>
        </div>
      </div>
    </Frame>
  );
}

// Realistic video of the new smile
export function MVideo() {
  return (
    <div className="absolute inset-0 p-2">
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/smilefast/after.webp" alt="" className="sf-kb absolute inset-0 w-full h-full object-cover object-[50%_32%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">VÍDEO REALISTA</span>
        <div className="absolute left-3 right-3 bottom-3 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-white grid place-items-center">
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 ml-[1px]"><path d="M3 2l7 4-7 4z" fill="#0a0a0a" /></svg>
          </span>
          <span className="relative flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
            <span className="sf-progress absolute inset-0 bg-ember-500 origin-left" />
          </span>
        </div>
      </div>
    </div>
  );
}

// Funnel: visitor -> simulates -> lead -> booked
export function MFunnel() {
  const steps = ["Visitante", "Se simula", "Deja sus datos", "Agenda"];
  return (
    <Frame label="Embudo">
      <div className="absolute inset-0 flex items-center px-6">
        <div className="relative w-full flex justify-between">
          <span className="absolute left-3 right-3 top-[9px] h-px bg-white/12" />
          <span className="sf-flow absolute top-[5px] w-2.5 h-2.5 -ml-[5px] rounded-full bg-ember-500 shadow-[0_0_12px_rgba(255,90,31,0.9)]" />
          {steps.map((s, i) => (
            <span key={s} className="relative flex flex-col items-center gap-2 w-0">
              <span className={`sf-node sf-node-${i} w-[18px] h-[18px] rounded-full border border-white/20 bg-[#121010]`} />
              <span className="whitespace-nowrap text-[10px] text-white/55">{s}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
