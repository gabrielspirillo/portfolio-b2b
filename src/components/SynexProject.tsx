"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { SynexAvatar } from "@/components/synex-avatar/SynexAvatar";

const ICONS: Record<string, ReactNode> = {
  expediente: <path d="M16 11a4 4 0 10-8 0M4 20c0-3 3.6-5 8-5s8 2 8 5M12 3v1" />,
  rangos: <path d="M4 18l5-5 4 4 7-9M14 8h6v6" />,
  juego: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />,
  noche: <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />,
  recorrido: <path d="M5 19V5M5 5h11l-2 3.5L16 12H5" />,
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
        <span className="absolute right-4 top-4 rounded-full bg-ember-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_6px_18px_rgba(255,90,31,0.45)]">
          2/3 SOLD OUT
        </span>
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

      {/* SYN: the two states */}
      <div className="mt-8 rounded-[24px] overflow-hidden border border-white/10 bg-[radial-gradient(120%_120%_at_50%_100%,#2a0e05_0%,#0c0908_60%)]">
        <div className="grid grid-cols-2">
          {([["idle", "synex_syn_watch"], ["thinking", "synex_syn_think"]] as const).map(([mood, label]) => (
            <div key={mood} className="relative flex flex-col items-center pt-8 pb-5">
              <div className="absolute bottom-0 left-1/2 w-40 h-40 -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.35),transparent)]" />
              <SynexAvatar size={96} mood={mood} look={mood === "idle" ? "cursor" : "still"} glow shadow />
              <span className="relative mt-4 text-[12px] font-medium text-white/55">{t(label)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <span className="block text-[15px] font-semibold text-white">{t("synex_syn_title")}</span>
          <span className="mt-1 block text-sm leading-relaxed text-white/60">{rich(t("synex_syn_desc"))}</span>
        </div>
      </div>

      {/* Value propositions */}
      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map((k, i) => (
          <li key={k} className={`rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 flex gap-3.5 ${i === VALUES.length - 1 ? "sm:col-span-2" : ""}`}>
            <span className="shrink-0 w-9 h-9 rounded-xl grid place-items-center bg-ember-500/15 text-ember-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">{ICONS[k]}</svg>
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-white">{t(`synex_v_${k}_title`)}</span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-white/55">{rich(t(`synex_v_${k}_desc`))}</span>
            </span>
          </li>
        ))}
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
