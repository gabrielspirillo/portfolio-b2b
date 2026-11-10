"use client";

import type { ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, CaseIntro, StatPair, ValueCard, CardFooterLink } from "@/components/project/kit";
import { AgendaFill, MAgenda, MVoice, MWhatsApp, MRecord, MTasks, MDashboard } from "@/components/project/futura-motions";

const VALUES = [
  { k: "voz", M: MVoice },
  { k: "wa", M: MWhatsApp },
  { k: "agenda", M: MAgenda },
  { k: "ficha", M: MRecord },
  { k: "tareas", M: MTasks },
  { k: "panel", M: MDashboard },
];

function FuturaWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-[17px] font-semibold tracking-[0.32em] text-white">FUTURA</span>
      <span className="text-[13px] font-medium text-white/55">Solutions</span>
    </span>
  );
}

function FuturaStage({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute inset-x-[10%] bottom-[-45%] h-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.4),transparent)]" />
      {children}
    </>
  );
}

/* Ember glass panel with the agenda filling itself */
function EmberAgenda({ className = "" }: { className?: string }) {
  return (
    <div className={`pm-stage glass-ember absolute rounded-[20px] overflow-hidden ${className}`}>
      <div className="relative z-10 w-full h-full">
        <AgendaFill tone="ember" />
      </div>
    </div>
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
      <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_100%,#2a0e05_0%,#100807_45%,#070606_100%)]">
        <FuturaStage>
          <EmberAgenda className="inset-x-[9%] top-[13%] bottom-[13%] shadow-[0_30px_60px_-20px_rgba(255,90,31,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]" />
        </FuturaStage>
      </div>
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("fu_tag")}</span>
        <h3 className="mt-3 mb-1"><FuturaWordmark /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("fu_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("fu_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

export function FuturaDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="relative h-56 md:h-64 rounded-[22px] overflow-hidden border border-white/10 bg-[radial-gradient(120%_110%_at_50%_100%,#3a1206_0%,#120807_48%,#070606_100%)]">
        <FuturaStage>
          <EmberAgenda className="left-[7%] right-[7%] top-[22%] bottom-[10%] shadow-[0_30px_60px_-20px_rgba(255,90,31,0.55)]" />
        </FuturaStage>
        <div className="absolute left-5 top-5"><FuturaWordmark /></div>
      </div>

      <CaseIntro eyebrow={t("fu_tag")} title={t("fu_title")} desc={t("fu_desc")} />
      <StatPair a={["94%", t("fu_stat_1")]} b={["60%", t("fu_stat_2")]} />

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }) => (
          <ValueCard key={k} Motion={M} title={t(`fu_v_${k}_title`)} desc={t(`fu_v_${k}_desc`)} benefit={t(`fu_v_${k}_benefit`)} />
        ))}
      </ul>

      <p className="mt-8 text-base leading-relaxed text-white/65">
        <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
        {rich(t("fu_result"))}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {t("fu_tags").split(", ").map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </>
  );
}
