"use client";

import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, CaseIntro, StatPair, ValueCard, CardFooterLink } from "@/components/project/kit";
import { BeforeAfter, MSim, MVita, MLead, MLive, FunnelCompare } from "@/components/project/smile-motions";

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

export function SmileFastDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="pm-stage relative h-64 md:h-80 rounded-[22px] overflow-hidden border border-white/10 bg-[#9fb3c6]">
        <BeforeAfter className="absolute inset-0" />
        <div className="absolute left-4 bottom-4 rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2.5">
          <SmileFastLogo className="h-4" />
        </div>
      </div>

      <CaseIntro eyebrow={t("sf_tag")} title={t("sf_title")} desc={t("sf_desc")} />
      <StatPair a={["+38%", t("sf_stat_1")]} b={["65%", t("sf_stat_2")]} />

      {/* The patient journey, real screens */}
      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {STEPS.map((n) => (
            <figure key={n}>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={`/smilefast/step${n}.webp`} alt={t(`sf_step_${n}`)} className="w-full h-full object-cover object-top" />
              </div>
              <figcaption className="mt-2 px-0.5 text-[12px] leading-snug text-white/60">
                <span className="text-ember-500 font-semibold mr-1">{String(n).padStart(2, "0")}</span>
                {t(`sf_step_${n}`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }) => (
          <ValueCard
            key={k}
            Motion={M}
            title={t(`sf_v_${k}_title`)}
            desc={t(`sf_v_${k}_desc`)}
            benefit={t(`sf_v_${k}_benefit`)}
          />
        ))}
      </ul>

      <div className="mt-8">
        <span className="text-[13px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("sf_funnel_eyebrow")}</span>
        <h4 className="mt-2 mb-5 text-2xl md:text-[1.7rem] font-semibold tracking-[-0.03em] text-white">{t("sf_funnel_title")}</h4>
        <FunnelCompare t={t} />
      </div>

      <p className="mt-8 text-base leading-relaxed text-white/65">
        <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
        {rich(t("sf_result"))}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {t("sf_tags").split(", ").map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </>
  );
}
