"use client";

import type { CSSProperties, ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, CardFooterLink, Later } from "@/components/project/kit";
import { BeforeAfter, MSim, MVita, MLead, MLive, FunnelCompare } from "@/components/project/smile-motions";
import { SmileBrand } from "@/components/project/brand-board";

const VALUES = [
  { k: "sim", M: MSim },
  { k: "analisis", M: MVita },
  { k: "lead", M: MLead },
  { k: "live", M: MLive },
];
const STEPS = [1, 2, 3, 4];

function SmileFastLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/smilefast/logo.png" alt="Smile Fast" className={`w-auto ${className}`} />;
}

export function SmileFastCard({ onOpen }: { onOpen: () => void }) {
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
      <div className="pm-stage relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[#9fb3c6]">
        <BeforeAfter className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("sf_tag")}</span>
        <h3 className="mt-3 mb-1"><SmileFastLogo className="h-[22px]" /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("sf_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("sf_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

const INK = "font-semibold text-[#181818]";
const up = (d: number) => ({ ["--d" as string]: d }) as CSSProperties;

function SmileValue({ Motion, title, desc, benefit, d }: { Motion: () => ReactNode; title: string; desc: string; benefit: string; d: number }) {
  return (
    <li className="sd-up sm-ink rounded-[22px] p-2 flex flex-col" style={up(d)}>
      <div className="pm-stage sx-stage relative h-36 rounded-[16px] overflow-hidden border border-white/[0.08] bg-[linear-gradient(180deg,#232323_0%,#121212_100%)]">
        <Motion />
      </div>
      <div className="px-3 pt-4 pb-3 flex-1 flex flex-col">
        <span className="block text-[15px] font-semibold text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-white/60 flex-1">{rich(desc)}</span>
        <span className="mt-3 self-start inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
          <span className="w-1 h-1 rounded-full bg-white" />
          {benefit}
        </span>
      </div>
    </li>
  );
}

/* The case opens in Smile Fast's own clinical white/black look */
export function SmileFastDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="sd-up sm-panel rounded-[24px] p-2" style={up(60)}>
        <div className="pm-stage relative h-64 md:h-80 rounded-[18px] overflow-hidden bg-[#9fb3c6]">
          <BeforeAfter className="absolute inset-0" />
          <div className="absolute left-4 bottom-4 rounded-full bg-[#181818] px-4 py-2.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]">
            <SmileFastLogo className="h-4" />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <span className="sd-up inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[#6e7472]" style={up(160)}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#181818]" /> {t("sf_tag")}
        </span>
        <h3 className="sd-up mt-3 pr-12 text-3xl md:text-[2.4rem] leading-[1.05] font-bold tracking-[-0.035em] text-[#181818]" style={up(240)}>{t("sf_title")}</h3>
        <p className="sd-up mt-4 text-base md:text-lg leading-relaxed text-[#6e7472]" style={up(320)}>{rich(t("sf_desc"), INK)}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="sd-up sm-ink rounded-[22px] px-5 py-5" style={up(400)}>
          <span className="block text-4xl font-bold tracking-[-0.05em] leading-none">+38%</span>
          <span className="mt-2 block text-[13px] font-semibold text-white/80">{t("sf_stat_1")}</span>
        </div>
        <div className="sd-up sm-panel rounded-[22px] px-5 py-5" style={up(460)}>
          <span className="block text-4xl font-bold tracking-[-0.05em] leading-none text-[#181818]">65%</span>
          <span className="mt-2 block text-[13px] text-[#6e7472]">{t("sf_stat_2")}</span>
        </div>
      </div>

      {/* The patient journey, real screens */}
      <div className="sd-up sm-panel mt-6 rounded-[24px] p-3" style={up(540)}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {STEPS.map((n) => (
            <figure key={n}>
              <div className="aspect-[3/4] rounded-[16px] overflow-hidden bg-white border border-[#ebeeed]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={`/smilefast/step${n}.webp`} alt={t(`sf_step_${n}`)} className="w-full h-full object-cover object-top" />
              </div>
              <figcaption className="mt-2 px-0.5 text-[12px] leading-snug text-[#6e7472]">
                <span className="font-mono text-[#181818] font-semibold mr-1">{String(n).padStart(2, "0")}</span>
                {t(`sf_step_${n}`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Later>
      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }, i) => (
          <SmileValue key={k} Motion={M} title={t(`sf_v_${k}_title`)} desc={t(`sf_v_${k}_desc`)} benefit={t(`sf_v_${k}_benefit`)} d={620 + i * 70} />
        ))}
      </ul>

      <div className="mt-9">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#6e7472]">{t("sf_funnel_eyebrow")}</span>
        <h4 className="mt-2 mb-5 text-2xl md:text-[1.7rem] font-bold tracking-[-0.03em] text-[#181818]">{t("sf_funnel_title")}</h4>
        <div className="sm-ink rounded-[24px] p-3 md:p-4">
          <FunnelCompare t={t} />
        </div>
      </div>

      <SmileBrand />

      <p className="mt-8 text-base leading-relaxed text-[#6e7472]">
        <span className="text-[#181818] font-bold mr-2">{"//"}</span>
        {rich(t("sf_result"), INK)}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {t("sf_tags").split(", ").map((tag) => (
          <span key={tag} className="rounded-full border border-[#e3e7e5] bg-white px-2.5 py-1 text-[11px] font-medium text-[#4a4f4d]">{tag}</span>
        ))}
      </div>
      </Later>
    </>
  );
}
