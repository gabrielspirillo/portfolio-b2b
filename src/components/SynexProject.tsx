"use client";

import { useEffect, useState } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { SynexAvatar } from "@/components/synex-avatar/SynexAvatar";
import { Tag, SynexLogo, CaseCover, CaseIntro, StatPair, ValueCard, CardFooterLink } from "@/components/project/kit";
import { MAudience, MStreak, MPoints, MVitals, MJourney } from "@/components/project/motions";

const VALUES = [
  { k: "expediente", M: MAudience },
  { k: "rangos", M: MStreak },
  { k: "juego", M: MPoints },
  { k: "noche", M: MVitals },
  { k: "recorrido", M: MJourney },
];

/* SYN alternating between watching (eyes follow the cursor) and thinking (limbs out) */
function SynAlternating({ size }: { size: number }) {
  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setThinking((v) => !v), 3400);
    return () => clearInterval(id);
  }, []);
  return <SynexAvatar size={size} mood={thinking ? "thinking" : "idle"} look={thinking ? "still" : "cursor"} glow shadow />;
}

function SynStage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute left-1/2 bottom-[-40%] w-[80%] aspect-square -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,31,0.5),rgba(255,90,31,0.1)_55%,transparent)]" />
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 520 325" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="260" cy="420" r="210" stroke="white" strokeOpacity="0.12" />
        <circle cx="260" cy="420" r="300" stroke="white" strokeOpacity="0.07" strokeDasharray="2 8" />
      </svg>
      {children}
    </>
  );
}

/* Card: first item of "Recent work" */
export function SynexCard({ onOpen }: { onOpen: () => void }) {
  const { t } = useLanguage();
  const { playEarcon } = useAudio();
  const [hover, setHover] = useState(false);

  // Touch screens have no hover: SYN alternates on its own
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
      <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_100%,#3a1206_0%,#120807_45%,#070606_100%)]">
        <SynStage>
          <div className="absolute inset-0 grid place-items-center pt-6 scale-[0.72] sm:scale-100">
            <SynexAvatar size={132} mood={hover ? "thinking" : "idle"} look="cursor" glow shadow />
          </div>
        </SynStage>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
        <span className="text-[12px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {t("synex_tag")}</span>
        <h3 className="mt-3 mb-1"><SynexLogo className="h-[15px]" /></h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(t("synex_card_roi"))}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {t("synex_tags").split(", ").slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <CardFooterLink label={t("read_more")} />
      </div>
    </button>
  );
}

/* Modal content */
export function SynexDetail() {
  const { t } = useLanguage();
  return (
    <>
      <CaseCover>
        <SynStage>
          <div className="absolute inset-0 grid place-items-center pt-4">
            <SynAlternating size={120} />
          </div>
        </SynStage>
      </CaseCover>

      <CaseIntro eyebrow={t("synex_tag")} title={t("synex_title")} desc={t("synex_desc")} />
      <StatPair a={["2/3", t("synex_stat_1")]} b={["100%", t("synex_stat_2")]} />

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4">
        <span className="block text-[15px] font-semibold text-white">{t("synex_syn_title")}</span>
        <span className="mt-1 block text-[13px] leading-relaxed text-white/55">{rich(t("synex_syn_desc"))}</span>
      </div>

      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
        {VALUES.map(({ k, M }, i) => (
          <ValueCard key={k} Motion={M} title={t(`synex_v_${k}_title`)} desc={t(`synex_v_${k}_desc`)} wide={i === VALUES.length - 1} />
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
