"use client";

import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, FlagES, CaseIntro, StatPair, ValueCard, CardFooterLink } from "@/components/project/kit";
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

export function FuturaDetail() {
  const { t } = useLanguage();
  return (
    <>
      <div className="relative rounded-[22px] overflow-hidden border border-white/10 bg-[#0d1512]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/futura/panel.webp" alt="FUTURA · panel general" className="block w-full h-auto" />
                <div className="absolute left-4 bottom-4 rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2"><FuturaLogo size={16} /></div>
      </div>

      <CaseIntro eyebrow={<>{t("fu_tag")} <FlagES /></>} title={t("fu_title")} desc={t("fu_desc")} />
      <StatPair a={["94%", t("fu_stat_1")]} b={["60%", t("fu_stat_2")]} />

      <div className="mt-6 grid gap-3">
        {[["agenda", "fu_shot_agenda"], ["whatsapp", "fu_shot_wa"]].map(([img, key]) => (
          <figure key={img} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={`/futura/${img}.webp`} alt={t(key)} className="block w-full h-auto rounded-xl" />
            <figcaption className="px-3 pt-3 pb-1.5 text-[13px] text-white/55">
              <span className="text-ember-500 font-semibold mr-1.5">{"//"}</span>
              {t(key)}
            </figcaption>
          </figure>
        ))}
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }) => (
          <ValueCard key={k} Motion={M} title={t(`fu_v_${k}_title`)} desc={t(`fu_v_${k}_desc`)} benefit={t(`fu_v_${k}_benefit`)} />
        ))}
      </ul>

      <FuturaBrand />

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
