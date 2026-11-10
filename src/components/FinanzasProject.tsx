"use client";

import type React from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag } from "@/components/SynexProject";

/* ---- Motions (CSS only, black / orange / gray) ---- */

// P&L: income and costs per event, the result turns positive
function MotionPnl() {
  const rows = [
    { inc: 70, out: 52 },
    { inc: 84, out: 48 },
    { inc: 92, out: 44 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
      <div className="flex items-end gap-4 h-[64%]">
        {rows.map((r, i) => (
          <div key={i} className="flex items-end gap-1 h-full">
            <span className="fx-bar w-3 rounded-t-sm bg-ember-500" style={{ height: `${r.inc}%`, ["--i" as string]: i }} />
            <span className="fx-bar w-3 rounded-t-sm bg-white/25" style={{ height: `${r.out}%`, ["--i" as string]: i + 0.15 }} />
          </div>
        ))}
      </div>
      <div className="fx-result rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
        <span className="block text-[9px] font-semibold tracking-[0.18em] text-white/45">RESULTADO</span>
        <span className="block mt-1 text-[18px] font-bold tracking-[-0.03em] text-ember-400">+ $</span>
      </div>
    </div>
  );
}

// Live projection: sales pace vs capacity
function MotionPace() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-7">
      <div className="flex justify-between text-[9px] font-semibold tracking-[0.18em] text-white/45">
        <span>ENTRADAS</span>
        <span>PROYECCIÓN</span>
      </div>
      <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
        <span className="fx-proj absolute inset-y-0 left-0 w-full rounded-full bg-white/15 origin-left" />
        <span className="fx-sold absolute inset-y-0 left-0 w-full rounded-full bg-ember-500 origin-left" />
      </div>
      <div className="relative h-4">
        <span className="fx-marker absolute top-0 w-px h-3 bg-white/60" />
      </div>
    </div>
  );
}

// Team: RRPP racing toward their goals
function MotionTeam() {
  const team = [88, 72, 60, 45];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-7">
      {team.map((w, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className={`w-5 h-5 rounded-full grid place-items-center text-[9px] font-bold ${i === 0 ? "bg-ember-500 text-white" : "bg-white/10 text-white/60"}`}>{i + 1}</span>
          <span className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <span className="fx-race absolute inset-y-0 left-0 rounded-full origin-left" style={{ width: `${w}%`, background: i === 0 ? "#FF5A1F" : "rgba(255,255,255,0.35)", ["--i" as string]: i }} />
          </span>
        </div>
      ))}
      <span className="absolute right-7 top-[18%] bottom-[18%] w-px border-l border-dashed border-white/30" />
    </div>
  );
}

// Receipts: AI reads the receipt and checks it matches the price
function MotionReceipt() {
  const fields = ["monto", "fecha", "banco"];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-6">
      <div className="relative w-16 h-[76px] rounded-lg bg-white/[0.08] border border-white/15 overflow-hidden px-2 py-2 flex flex-col gap-1.5">
        {[80, 60, 70, 45, 65].map((w, i) => (
          <span key={i} className="h-1 rounded-full bg-white/25" style={{ width: `${w}%` }} />
        ))}
        <span className="fx-read absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-ember-500/40 to-transparent" />
      </div>
      <div className="flex flex-col gap-1.5">
        {fields.map((f, i) => (
          <span key={f} className="fx-field flex items-center gap-2 text-[10px] text-white/70" style={{ ["--i" as string]: i }}>
            <span className="fx-check w-3.5 h-3.5 rounded-full grid place-items-center bg-ember-500 text-[8px] text-white">✓</span>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// Authorize and the ticket goes out by itself
function MotionTicket() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
      <span className="fx-approve rounded-full px-3.5 py-1.5 text-[10px] font-semibold text-white border border-white/15">autorizar</span>
      <svg viewBox="0 0 80 20" className="w-20 h-5" fill="none">
        <path d="M2 10 H74" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="3 4" />
        <path className="fx-flow" d="M2 10 H74" pathLength={100} stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="fx-ticket relative rounded-lg bg-ember-500 px-3 py-2 text-[10px] font-bold text-white">
        ENTRADA
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0a0908]" />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0a0908]" />
      </span>
    </div>
  );
}

const MOTIONS: Record<string, () => React.JSX.Element> = {
  pnl: MotionPnl,
  pulso: MotionPace,
  equipo: MotionTeam,
  comprobantes: MotionReceipt,
  entradas: MotionTicket,
};
const VALUES = ["pnl", "pulso", "equipo", "comprobantes", "entradas"];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/synex-logo.png" alt="SYNEX" className="h-[15px] w-auto" />
      <span className="text-[15px] font-semibold tracking-tight text-white/70">Finanzas</span>
    </span>
  );
}

/* Card */
export function FinanzasCard({ onOpen }: { onOpen: () => void }) {
  const { t } = useLanguage();
  const { playEarcon } = useAudio();

  return (
    <button
      type="button"
      className="reveal glass glass-hover group text-left snap-start shrink-0 w-[84vw] sm:w-[60vw] lg:w-[520px] rounded-[28px] p-2 flex flex-col"
      onMouseEnter={playEarcon}
      onClick={() => {
        playEarcon();
        onOpen();
      }}
    >
      <div className="sx-stage relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_100%,#2a0e05_0%,#100807_45%,#070606_100%)]">
        <div className="absolute inset-x-[12%] bottom-[-40%] h-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.4),transparent)]" />
        <div className="absolute left-1/2 top-1/2 w-[280px] h-[150px] -translate-x-1/2 -translate-y-1/2 scale-[1.1] sm:scale-[1.4]">
          <MotionPnl />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400">
          <span className="font-semibold">{"//"}</span> {t("synex_tag")}
        </span>
        <h3 className="mt-3 mb-1"><Wordmark /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("fin_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("fin_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ember-400">
          {t("read_more")}
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </button>
  );
}

/* Modal content */
export function FinanzasDetail() {
  const { t } = useLanguage();
  return (
    <>
      <Wordmark />
      <h3 className="mt-5 pr-12 text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-white">{t("fin_title")}</h3>
      <p className="mt-4 text-base md:text-lg leading-relaxed text-white/65">{rich(t("fin_desc"))}</p>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="glass-ember rounded-[22px] px-5 py-5">
          <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">2º</span>
          <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/90">{t("fin_stat_1")}</span>
        </div>
        <div className="glass rounded-[22px] px-5 py-5">
          <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">100%</span>
          <span className="relative z-10 mt-2 block text-[13px] text-white/55">{t("fin_stat_2")}</span>
        </div>
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map((k, i) => {
          const M = MOTIONS[k];
          return (
            <li key={k} className={`rounded-2xl border border-white/[0.07] bg-white/[0.035] p-2 ${i === VALUES.length - 1 ? "sm:col-span-2" : ""}`}>
              <div className="sx-stage relative h-28 rounded-xl overflow-hidden bg-[radial-gradient(120%_120%_at_50%_100%,#1f0c06_0%,#0a0908_65%)] border border-white/[0.05]">
                <M />
              </div>
              <div className="px-3 pt-3.5 pb-2.5">
                <span className="block text-[15px] font-semibold text-white">
                  <span className="text-ember-500 mr-1.5">{"//"}</span>
                  {t(`fin_v_${k}_title`)}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-white/55">{rich(t(`fin_v_${k}_desc`))}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-base leading-relaxed text-white/65">
        <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
        {rich(t("fin_result"))}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {t("fin_tags").split(", ").map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </>
  );
}
