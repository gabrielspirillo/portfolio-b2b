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

// Live on the clinic's website: the widget switches on inside its own site
export function MLive() {
  return (
    <Frame label="Tu web · 1 día">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full rounded-lg border border-white/10 bg-white/[0.04] overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/[0.07]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
            <span className="ml-2 rounded-full bg-white/[0.06] px-2 py-[1px] text-[8px] text-white/50">tuclinica.com</span>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 py-2.5">
            <span className="flex flex-col gap-1">
              <span className="h-1.5 w-20 rounded-full bg-white/25" />
              <span className="h-1.5 w-14 rounded-full bg-white/15" />
            </span>
            <span className="relative h-6 w-[108px] text-[9px] font-semibold">
              <span className="sf-off absolute inset-0 grid place-items-center rounded-full border border-white/15 text-white/45">Desactivado</span>
              <span className="sf-on absolute inset-0 grid place-items-center rounded-full bg-ember-500 text-white shadow-[0_0_14px_rgba(255,90,31,0.5)]">Simula tu sonrisa ✓</span>
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Funnel comparison, as on the product site: without vs with Smile Fast
function Lane({ ok, steps, result, label }: { ok: boolean; steps: string[]; result: string; label: string }) {
  return (
    <div className={`rounded-2xl px-5 py-5 md:px-6 grid md:grid-cols-[150px_1fr_150px] gap-5 md:gap-6 items-center ${ok ? "glass-ember" : "border border-white/10 bg-white/[0.03]"}`}>
      <div className="relative z-10 flex md:flex-col items-center md:items-start gap-3">
        <span className={`w-8 h-8 rounded-full grid place-items-center text-[13px] ${ok ? "bg-white text-ember-600" : "border border-white/20 text-white/60"}`}>{ok ? "✓" : "✕"}</span>
        <span className={`text-[15px] font-semibold ${ok ? "text-white" : "text-white/70"}`}>{label}</span>
      </div>
      <div className="relative z-10 px-7 md:px-6">
        <div className="relative flex justify-between">
          <span className={`absolute left-[7px] right-[7px] top-[7px] h-px ${ok ? "bg-white/50" : "bg-white/15"}`} />
          <span className={`${ok ? "sf-pulse-ok bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" : "sf-pulse-ko bg-white/50"} absolute top-[4px] w-[7px] h-[7px] -ml-[3.5px] rounded-full`} />
          {steps.map((st, i) => {
            const last = i === steps.length - 1;
            return (
              <span key={st} className="relative flex flex-col items-center w-0">
                <span className={`w-[15px] h-[15px] rounded-full ${last ? (ok ? "bg-white" : "bg-white/40") : ok ? "bg-ember-600 border border-white/70" : "bg-[#151313] border border-white/25"}`} />
                <span className={`mt-2.5 w-[64px] md:w-[72px] text-center text-[10px] md:text-[11px] leading-tight ${ok ? "text-white/95" : last ? "text-white/75" : "text-white/50"}`}>{st}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className={`relative z-10 md:border-l md:pl-5 ${ok ? "md:border-white/30" : "md:border-white/10"}`}>
        <span className={`block text-[9px] font-semibold tracking-[0.18em] ${ok ? "text-white/80" : "text-white/40"}`}>RESULTADO</span>
        <span className={`mt-1 block text-[15px] font-semibold leading-tight ${ok ? "text-white" : "text-white/60"}`}>{result}</span>
      </div>
    </div>
  );
}
export function FunnelCompare({ t }: { t: (k: string) => string }) {
  return (
    <div className="flex flex-col gap-3">
      <Lane ok={false} label={t("sf_without")} steps={t("sf_without_steps").split(" | ")} result={t("sf_without_result")} />
      <Lane ok label={t("sf_with")} steps={t("sf_with_steps").split(" | ")} result={t("sf_with_result")} />
    </div>
  );
}
