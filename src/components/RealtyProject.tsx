"use client";

import type { CSSProperties, ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, CardFooterLink, CollabWith, Later } from "@/components/project/kit";
import { RealtyDashboard, MAI, MMatch, MLeads, MRanking, MReport, MContract, MSign, MRecruit, MDirection, MDays } from "@/components/project/realty-motions";
import { RealtyBrand } from "@/components/project/brand-board";

const VALUES = [
  { k: "ia", M: MAI },
  { k: "match", M: MMatch },
  { k: "leads", M: MLeads },
  { k: "ranking", M: MRanking },
  { k: "contrato", M: MContract },
  { k: "firma", M: MSign },
  { k: "informe", M: MReport },
  { k: "reclut", M: MRecruit },
  { k: "direccion", M: MDirection },
  { k: "dias", M: MDays },
];
const INTEGRATIONS = ["Portal REMAX", "WhatsApp 24/7", "Gmail", "Outlook", "Google Calendar", "Meta Ads", "Google Ads", "Claude · ChatGPT · Gemini (MCP)"];

function RealtyLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/realty/realty-logo-dark.png" alt="Realty by Brandboost" className={`w-auto ${className}`} />;
}
function RemaxLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/realty/remax-white.svg" alt="REMAX" className={`w-auto ${className}`} />;
}

/* REMAX × Realty lockup */
function Lockup({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center ${lg ? "gap-4" : "gap-3"}`}>
      <RemaxLogo className={lg ? "h-[22px]" : "h-[17px]"} />
      <span className={`text-white/35 font-light ${lg ? "text-xl" : "text-lg"}`}>×</span>
      <RealtyLogo className={lg ? "h-9" : "h-[30px]"} />
    </span>
  );
}

const INK = "font-semibold text-[#0d1b3e]";
const up = (d: number) => ({ ["--d" as string]: d }) as CSSProperties;

function FeatureCard({ Motion, title, desc, benefit, d }: { Motion: () => ReactNode; title: string; desc: string; benefit: string; d: number }) {
  return (
    <li className="sd-up rx-navy rounded-[22px] p-2 flex flex-col" style={up(d)}>
      <div className="pm-stage relative aspect-[16/10] rounded-[16px] overflow-hidden bg-[radial-gradient(120%_120%_at_15%_0%,#1a5fe0_0%,#003DA5_45%,#00266f_100%)]">
        <Motion />
      </div>
      <div className="px-3 pt-4 pb-3 flex-1 flex flex-col">
        <span className="block text-[15px] font-semibold text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-white/65 flex-1">{rich(desc)}</span>
        <span className="mt-3 self-start inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc1c2e]" />
          {benefit}
        </span>
      </div>
    </li>
  );
}

export function RealtyCard({ onOpen }: { onOpen: () => void }) {
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
      <div className="pm-stage relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          <RealtyDashboard />
        </div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="inline-flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-ember-400">
          <span className="font-semibold">{"//"}</span> <CollabWith label={t("rw_collab")} />
        </span>
        <h3 className="mt-3.5 mb-1"><Lockup /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("rw_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("rw_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

export function RealtyDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="sd-up rx-panel rounded-[24px] p-2" style={up(60)}>
        <div className="pm-stage relative aspect-[16/10] rounded-[18px] overflow-hidden">
          <RealtyDashboard />
        </div>
      </div>
      <div className="sd-up mt-6 flex items-center gap-4" style={up(140)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/realty/remax.svg" alt="REMAX" className="h-[20px] w-auto" />
        <span className="text-xl font-light text-[#0d1b3e]/30">×</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/realty/realty-logo.png" alt="Realty by Brandboost" className="h-10 w-auto" />
      </div>

      <div className="mt-6">
        <span className="sd-up inline-flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-[#003da5]" style={up(200)}>
          <span>{"//"}</span> <CollabWith label={t("rw_collab")} dark />
        </span>
        <h3 className="sd-up mt-2 pr-12 text-3xl md:text-[2.4rem] leading-[1.05] font-bold tracking-[-0.035em] text-[#0d1b3e]" style={up(260)}>{t("rw_title")}</h3>
        <p className="sd-up mt-4 text-base md:text-lg leading-relaxed text-[#5a6680]" style={up(320)}>{rich(t("rw_desc"), INK)}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="sd-up rx-blue rounded-[22px] px-5 py-5" style={up(400)}>
          <span className="block text-4xl font-bold tracking-[-0.05em] leading-none">95%</span>
          <span className="mt-2 block text-[13px] font-semibold text-white/85">{t("rw_stat_1")}</span>
        </div>
        <div className="sd-up rx-panel rounded-[22px] px-5 py-5" style={up(460)}>
          <span className="block text-4xl font-bold tracking-[-0.05em] leading-none text-[#0d1b3e]">5</span>
          <span className="mt-2 block text-[13px] text-[#5a6680]">{t("rw_stat_2")}</span>
        </div>
      </div>

      <figure className="sd-up rx-panel relative mt-3 rounded-[22px] pl-6 pr-5 py-5 overflow-hidden" style={up(520)}>
        <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#dc1c2e]" />
        <blockquote className="text-[15px] md:text-base leading-relaxed text-[#0d1b3e]">
          <span className="text-[#dc1c2e] font-bold mr-1.5">&ldquo;</span>
          {t("rw_quote")}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-[12px] font-semibold text-[#5a6680]">{t("rw_quote_by")}</figcaption>
      </figure>

      <div className="mt-9">
        <span className="text-[13px] font-semibold text-[#003da5]">{"//"} {t("rw_goals_eyebrow")}</span>
        <h4 className="mt-2 mb-5 text-2xl md:text-[1.7rem] font-bold tracking-[-0.03em] text-[#0d1b3e]">{t("rw_goals_title")}</h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`sd-up rounded-[22px] p-4 ${n === 2 ? "rx-blue" : "rx-panel"}`} style={up(560 + n * 60)}>
              <span className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${n === 2 ? "text-white/70" : "text-[#5a6680]"}`}>
                <span className={`mr-1.5 ${n === 2 ? "text-white" : "text-[#dc1c2e]"}`}>{String(n).padStart(2, "0")}</span>
                {t(`rw_g_${n}_tag`)}
              </span>
              <span className={`mt-2.5 block text-[15px] font-bold leading-snug ${n === 2 ? "text-white" : "text-[#0d1b3e]"}`}>{t(`rw_g_${n}_title`)}</span>
              <span className={`mt-1.5 block text-[13px] leading-relaxed ${n === 2 ? "text-white/75" : "text-[#5a6680]"}`}>{t(`rw_g_${n}_desc`)}</span>
            </div>
          ))}
        </div>
      </div>

      <Later>
      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }, i) => (
          <FeatureCard key={k} Motion={M} title={t(`rw_v_${k}_title`)} desc={t(`rw_v_${k}_desc`)} benefit={t(`rw_v_${k}_benefit`)} d={760 + i * 60} />
        ))}
      </ul>

      <div className="mt-9">
        <span className="text-[13px] font-semibold text-[#003da5]">{"//"} {t("rw_int_eyebrow")}</span>
        <h4 className="mt-2 mb-4 text-2xl md:text-[1.7rem] font-bold tracking-[-0.03em] text-[#0d1b3e]">{t("rw_int_title")}</h4>
        <div className="flex flex-wrap gap-2">
          {INTEGRATIONS.map((n) => (
            <span key={n} className="rx-glassbtn inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003da5]" />
              {n}
            </span>
          ))}
        </div>
      </div>

      <RealtyBrand />

      <p className="mt-8 text-base leading-relaxed text-[#5a6680]">
        <span className="text-[#dc1c2e] font-bold mr-2">{"//"}</span>
        {rich(t("rw_result"), INK)}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {t("rw_tags").split(", ").map((tag) => (
          <span key={tag} className="rx-glassbtn rounded-full px-2.5 py-1 text-[11px] font-medium">{tag}</span>
        ))}
      </div>
      </Later>
    </>
  );
}
