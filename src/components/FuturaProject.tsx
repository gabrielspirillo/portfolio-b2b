"use client";

import type { CSSProperties, ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, FlagES, CardFooterLink } from "@/components/project/kit";
import { MAgenda, MVoice, MWhatsApp, MRecord, MTasks, MDashboard } from "@/components/project/futura-motions";
import { FuturaBrand } from "@/components/project/brand-board";

const VALUES = [
  { k: "voz", M: MVoice },
  { k: "wa", M: MWhatsApp },
  { k: "agenda", M: MAgenda },
  { k: "ficha", M: MRecord },
  { k: "tareas", M: MTasks },
  { k: "panel", M: MDashboard },
];

export function FuturaLogo({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="FUTURA">
      <span className="font-extrabold tracking-[0.01em] text-white leading-none" style={{ fontSize: size }}>FUTURA</span>
      <span className="rounded-full bg-[#70A697]" style={{ width: size * 0.36, height: size * 0.36, marginLeft: size * 0.3 }} />
    </span>
  );
}

export function FuturaCard({ onOpen }: { onOpen: () => void }) {
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
      <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[#0d1512]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/futura/panel.webp"
          alt="FUTURA · panel"
          className="absolute inset-0 w-full h-full object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("fu_tag")} <FlagES /></span>
        <h3 className="mt-3 mb-1"><FuturaLogo /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("fu_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("fu_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

const RICH = "font-semibold text-[#161a19]";
const up = (d: number) => ({ ["--d" as string]: d }) as CSSProperties;

function AuroraValue({ Motion, title, desc, benefit, d }: { Motion: () => ReactNode; title: string; desc: string; benefit: string; d: number }) {
  return (
    <li className="sd-up fl-panel rounded-[22px] p-2 flex flex-col" style={up(d)}>
      <div className="fl-stage pm-stage relative h-36 rounded-[16px] overflow-hidden border border-white/80">
        <Motion />
      </div>
      <div className="px-3 pt-4 pb-3 flex-1 flex flex-col">
        <span className="block text-[15px] font-semibold text-[#161a19]">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-[#6a706e] flex-1">{rich(desc, RICH)}</span>
        <span className="fl-soft mt-3 self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold">
          <span className="w-1 h-1 rounded-full bg-[#479183]" />
          {benefit}
        </span>
      </div>
    </li>
  );
}

/* The whole case opens in FUTURA's own "Aurora" look (light liquid glass) */
export function FuturaDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="sd-up fl-panel relative rounded-[24px] p-2" style={up(60)}>
        <div className="relative rounded-[18px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/futura/panel.webp" alt="FUTURA · panel general" className="block w-full h-auto" />
          <div className="fl-glassbtn absolute left-3 bottom-3 rounded-full px-4 py-2">
            <span className="inline-flex items-center">
              <span className="font-extrabold tracking-[0.01em] text-[#161a19] leading-none text-[15px]">FUTURA</span>
              <span className="ml-1.5 w-[6px] h-[6px] rounded-full bg-[#5fa896]" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <span className="sd-up inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37766a]" style={up(180)}>
          <span>{"//"}</span> {t("fu_tag")} <FlagES />
        </span>
        <h3 className="sd-up mt-2 pr-12 text-3xl md:text-[2.4rem] leading-[1.05] font-bold tracking-[-0.035em] text-[#161a19]" style={up(260)}>{t("fu_title")}</h3>
        <p className="sd-up mt-4 text-base md:text-lg leading-relaxed text-[#6a706e]" style={up(340)}>{rich(t("fu_desc"), RICH)}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="sd-up fl-hero rounded-[22px] px-5 py-5" style={up(440)}>
          <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none">94%</span>
          <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/85">{t("fu_stat_1")}</span>
        </div>
        <div className="sd-up fl-panel rounded-[22px] px-5 py-5" style={up(520)}>
          <span className="block text-4xl font-bold tracking-[-0.05em] leading-none text-[#161a19]">60%</span>
          <span className="mt-2 block text-[13px] text-[#6a706e]">{t("fu_stat_2")}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {[["agenda", "fu_shot_agenda"], ["whatsapp", "fu_shot_wa"]].map(([img, key], i) => (
          <figure key={img} className="sd-up fl-panel rounded-[22px] p-2" style={up(600 + i * 100)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={`/futura/${img}.webp`} alt={t(key)} className="block w-full h-auto rounded-[16px]" />
            <figcaption className="px-3 pt-3 pb-1.5 text-[13px] text-[#6a706e]">
              <span className="text-[#479183] font-semibold mr-1.5">{"//"}</span>
              {t(key)}
            </figcaption>
          </figure>
        ))}
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }, i) => (
          <AuroraValue key={k} Motion={M} title={t(`fu_v_${k}_title`)} desc={t(`fu_v_${k}_desc`)} benefit={t(`fu_v_${k}_benefit`)} d={700 + i * 70} />
        ))}
      </ul>

      <FuturaBrand />

      <p className="mt-8 text-base leading-relaxed text-[#6a706e]">
        <span className="text-[#479183] font-semibold mr-2">{"//"}</span>
        {rich(t("fu_result"), RICH)}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {t("fu_tags").split(", ").map((tag) => (
            <span key={tag} className="fl-glassbtn rounded-full px-2.5 py-1 text-[11px] font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
}
