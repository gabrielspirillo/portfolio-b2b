"use client";

import type { ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, CaseIntro, StatPair, CardFooterLink, CollabWith } from "@/components/project/kit";
import { RealtyDashboard, MAI, MMatch, MLeads, MRanking, MReport, MContract, MSign, MRecruit, MDirection, MDays } from "@/components/project/realty-motions";

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

function FeatureCard({ Motion, title, desc, benefit }: { Motion: () => ReactNode; title: string; desc: string; benefit: string }) {
  return (
    <li className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 flex flex-col">
      <div className="pm-stage relative aspect-[16/10] rounded-xl overflow-hidden bg-[radial-gradient(120%_120%_at_15%_0%,#1a5fe0_0%,#003DA5_45%,#00266f_100%)]">
        <Motion />
      </div>
      <div className="px-3 pt-4 pb-3 flex-1 flex flex-col">
        <span className="block text-[15px] font-semibold text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-white/55 flex-1">{rich(desc)}</span>
        <span className="mt-3 self-start inline-flex items-center gap-1.5 rounded-full bg-ember-500/12 border border-ember-500/25 px-2.5 py-1 text-[11px] font-semibold text-ember-400">
          <span className="w-1 h-1 rounded-full bg-ember-500" />
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
      <div className="pm-stage relative aspect-[16/10] rounded-[22px] overflow-hidden border border-white/10">
        <RealtyDashboard />
      </div>
      <div className="mt-5"><Lockup size="lg" /></div>

      <CaseIntro eyebrow={<CollabWith label={t("rw_collab")} />} title={t("rw_title")} desc={t("rw_desc")} />
      <StatPair a={["95%", t("rw_stat_1")]} b={["5", t("rw_stat_2")]} />

      <figure className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-5">
        <blockquote className="text-[15px] md:text-base leading-relaxed text-white/85">
          <span className="text-ember-500 font-semibold mr-1.5">&ldquo;</span>
          {t("rw_quote")}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-[12px] font-medium text-white/45">{t("rw_quote_by")}</figcaption>
      </figure>

      <div className="mt-8">
        <span className="text-[13px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("rw_goals_eyebrow")}</span>
        <h4 className="mt-2 mb-5 text-2xl md:text-[1.7rem] font-semibold tracking-[-0.03em] text-white">{t("rw_goals_title")}</h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
                <span className="text-ember-500 mr-1.5">{String(n).padStart(2, "0")}</span>
                {t(`rw_g_${n}_tag`)}
              </span>
              <span className="mt-2.5 block text-[15px] font-semibold leading-snug text-white">{t(`rw_g_${n}_title`)}</span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-white/55">{t(`rw_g_${n}_desc`)}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }) => (
          <FeatureCard key={k} Motion={M} title={t(`rw_v_${k}_title`)} desc={t(`rw_v_${k}_desc`)} benefit={t(`rw_v_${k}_benefit`)} />
        ))}
      </ul>

      <div className="mt-8">
        <span className="text-[13px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("rw_int_eyebrow")}</span>
        <h4 className="mt-2 mb-4 text-2xl md:text-[1.7rem] font-semibold tracking-[-0.03em] text-white">{t("rw_int_title")}</h4>
        <div className="flex flex-wrap gap-2">
          {INTEGRATIONS.map((n) => (
            <span key={n} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
              {n}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-8 text-base leading-relaxed text-white/65">
        <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
        {rich(t("rw_result"))}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {t("rw_tags").split(", ").map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </>
  );
}
