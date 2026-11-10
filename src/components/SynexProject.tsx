"use client";

import { ReactNode, useEffect, useState } from "react";
import type React from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { SynexAvatar } from "@/components/synex-avatar/SynexAvatar";

/* SYN alternating between watching (eyes follow the cursor) and thinking (limbs out) */
function SynAlternating({ size }: { size: number }) {
  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setThinking((v) => !v), 3400);
    return () => clearInterval(id);
  }, []);
  return <SynexAvatar size={size} mood={thinking ? "thinking" : "idle"} look={thinking ? "still" : "cursor"} glow shadow />;
}

/* ---- Small motions that illustrate each value proposition (CSS only) ---- */

// Know who comes: the crowd gets scanned and each subject lights up with its profile
function MotionAudience() {
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
function MotionStreak() {
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
function MotionGame() {
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
function MotionCare() {
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
const NODES = [[30, 22], [30, 78], [100, 12], [170, 22], [170, 78], [100, 88]];
function MotionCommunity() {
  return (
    <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
      {NODES.map(([x, y], i) => (
        <path key={i} className="sx-link" d={`M${x} ${y} L100 50`} pathLength={100} stroke="#FF5A1F" strokeWidth="1.2" style={{ ["--i" as string]: i }} />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} className="sx-member" cx={x} cy={y} r="5" fill="#2a2726" stroke="rgba(255,255,255,0.25)" style={{ ["--i" as string]: i }} />
      ))}
      <circle className="sx-core" cx="100" cy="50" r="13" fill="#FF5A1F" />
      <circle cx="100" cy="50" r="13" fill="none" stroke="#FF5A1F" className="sx-ring" />
    </svg>
  );
}

const MOTIONS: Record<string, () => React.JSX.Element> = {
  expediente: MotionAudience,
  rangos: MotionStreak,
  juego: MotionGame,
  noche: MotionCare,
  recorrido: MotionCommunity,
};

const VALUES = ["expediente", "rangos", "juego", "noche", "recorrido"];

function Tag({ children }: { children: ReactNode }) {
  return <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/60">{children}</span>;
}

/* Premium card: first item of "Recent work" */
export function SynexCard({ onOpen }: { onOpen: () => void }) {
  const { t } = useLanguage();
  const { playEarcon } = useAudio();
  const [hover, setHover] = useState(false);

  // Touch screens have no hover: SYN alternates between watching and thinking
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) return;
    const id = setInterval(() => setHover((h) => !h), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      className="reveal glass glass-hover group text-left snap-start shrink-0 w-[84vw] sm:w-[60vw] lg:w-[520px] rounded-[28px] p-2 flex flex-col"
      onMouseEnter={() => {
        playEarcon();
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        playEarcon();
        onOpen();
      }}
    >
      {/* Preview: SYN watching; on hover it thinks (limbs out) */}
      <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_100%,#3a1206_0%,#120807_45%,#070606_100%)]">
        <div className="absolute left-1/2 bottom-[-35%] w-[90%] aspect-square -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.55),rgba(255,90,31,0.12)_55%,transparent)]" />
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 520 325" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="260" cy="400" r="200" stroke="white" strokeOpacity="0.12" />
          <circle cx="260" cy="400" r="290" stroke="white" strokeOpacity="0.08" strokeDasharray="2 8" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/synex-logo.png" alt="SYNEX" className="absolute left-5 top-5 h-3 w-auto" />
        <div className="absolute inset-0 grid place-items-center pt-6 scale-[0.72] sm:scale-100">
          <SynexAvatar size={132} mood={hover ? "thinking" : "idle"} look="cursor" glow shadow />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400">
          <span className="font-semibold">{"//"}</span> {t("synex_tag")}
        </span>
        <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-white">SYNEX</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("synex_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("synex_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
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
export function SynexDetail() {
  const { t } = useLanguage();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/synex-logo.png" alt="SYNEX" className="h-3.5 md:h-4 w-auto" />
      <h3 className="mt-5 pr-12 text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-white">{t("synex_title")}</h3>
      <p className="mt-4 text-base md:text-lg leading-relaxed text-white/65">{rich(t("synex_desc"))}</p>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="glass-ember rounded-[22px] px-5 py-5">
          <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">2/3</span>
          <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/90">{t("synex_stat_1")}</span>
        </div>
        <div className="glass rounded-[22px] px-5 py-5">
          <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">100%</span>
          <span className="relative z-10 mt-2 block text-[13px] text-white/55">{t("synex_stat_2")}</span>
        </div>
      </div>

      {/* SYN: one avatar alternating between watching and thinking */}
      <div className="mt-8 rounded-[24px] overflow-hidden border border-white/10 bg-[radial-gradient(120%_120%_at_50%_100%,#2a0e05_0%,#0c0908_60%)]">
        <div className="relative flex justify-center pt-9 pb-7">
          <div className="absolute bottom-0 left-1/2 w-56 h-56 -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.38),transparent)]" />
          <SynAlternating size={112} />
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <span className="block text-[15px] font-semibold text-white">{t("synex_syn_title")}</span>
          <span className="mt-1 block text-sm leading-relaxed text-white/60">{rich(t("synex_syn_desc"))}</span>
        </div>
      </div>

      {/* Value propositions */}
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
                  {t(`synex_v_${k}_title`)}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-white/55">{rich(t(`synex_v_${k}_desc`))}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-base leading-relaxed text-white/65">
        <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
        {rich(t("synex_result"))}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {t("synex_tags").split(", ").map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <Button href="https://synex-music.com" target="_blank" rel="noopener noreferrer">{t("synex_cta")}</Button>
      </div>
    </>
  );
}
