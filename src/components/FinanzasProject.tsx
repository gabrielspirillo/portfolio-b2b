"use client";

import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Tag, SynexLogo, CaseCover, CaseIntro, StatPair, ValueCard, CardFooterLink } from "@/components/project/kit";
import { PnlChart, MPnl, MPace, MTeam, MReceipt, MTicket } from "@/components/project/motions";

const VALUES = [
  { k: "pnl", M: MPnl },
  { k: "pulso", M: MPace },
  { k: "equipo", M: MTeam },
  { k: "comprobantes", M: MReceipt },
  { k: "entradas", M: MTicket },
];

/* Orange glass panel holding the live P&L chart */
function EmberPnl({ className = "" }: { className?: string }) {
  return (
    <div className={`pm-stage glass-ember absolute rounded-[20px] overflow-hidden ${className}`}>
      <div className="relative z-10 w-full h-full">
        <PnlChart tone="ember" label="P&L · Evento 02" />
      </div>
    </div>
  );
}

function FinStage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-x-[10%] bottom-[-45%] h-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.4),transparent)]" />
      {children}
    </>
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
      <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_100%,#2a0e05_0%,#100807_45%,#070606_100%)]">
        <FinStage>
          <EmberPnl className="inset-x-[9%] top-[14%] bottom-[14%] shadow-[0_30px_60px_-20px_rgba(255,90,31,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]" />
        </FinStage>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("synex_tag")}</span>
        <h3 className="mt-3 mb-1 flex items-center gap-2.5">
          <SynexLogo className="h-[15px]" />
          <span className="text-[15px] font-medium text-white/60 border-l border-white/20 pl-2.5 leading-none">Finanzas</span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("fin_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("fin_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

/* Modal content */
export function FinanzasDetail() {
  const { t } = useLanguage();
  return (
    <>
      <CaseCover product="Finanzas">
        <FinStage>
          <EmberPnl className="left-[7%] right-[7%] top-[22%] bottom-[10%] shadow-[0_30px_60px_-20px_rgba(255,90,31,0.55)]" />
        </FinStage>
      </CaseCover>

      <CaseIntro eyebrow={t("synex_tag")} title={t("fin_title")} desc={t("fin_desc")} />
      <StatPair a={["2º", t("fin_stat_1")]} b={["100%", t("fin_stat_2")]} />

      <ul className="mt-6 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }, i) => (
          <ValueCard
            key={k}
            Motion={M}
            title={t(`fin_v_${k}_title`)}
            desc={t(`fin_v_${k}_desc`)}
            benefit={t(`fin_v_${k}_benefit`)}
            wide={i === VALUES.length - 1}
          />
        ))}
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
