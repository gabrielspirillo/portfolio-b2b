"use client";

import { CSSProperties, useRef } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { Button } from "@/components/ui/Button";

// Real screens of the SYNEX app (captured from the app's own preview routes)
const SCREENS = ["root", "home", "expediente", "checkin", "premios", "invite", "protocolo", "roadmap"];

export function SynexShowcase() {
  const { t } = useLanguage();
  const { playEarcon } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "2/3", label: t("synex_stat_1"), ember: true },
    { value: "100%", label: t("synex_stat_2") },
    { value: "3", label: t("synex_stat_3") },
  ];

  return (
    <section id="synex" data-anim className="relative w-full py-24 md:py-32">
      <div className="px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-end">
            <div className="reveal">
              <Eyebrow>{t("synex_eyebrow")}</Eyebrow>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/synex-logo.png" alt="SYNEX" className="mt-7 h-4 md:h-5 w-auto" />
              <h2 className="mt-6 text-[2rem] leading-[1.05] md:text-5xl font-semibold tracking-[-0.035em] text-white max-w-xl">
                {t("synex_title")}
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/60 max-w-xl">{rich(t("synex_desc"))}</p>
            </div>

            <div className="reveal grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.value} className={`${s.ember ? "glass-ember" : "glass"} rounded-[24px] p-4 md:p-5 flex flex-col justify-between min-h-[132px]`}>
                  <span className="relative z-10 text-3xl md:text-[2.6rem] font-bold tracking-[-0.05em] leading-none text-white">{s.value}</span>
                  <span className={`relative z-10 mt-4 text-[12px] md:text-[13px] leading-snug ${s.ember ? "text-white/90 font-semibold" : "text-white/55"}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
              <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
              {rich(t("synex_result"))}
            </p>
            <CarouselArrows target={scrollRef} />
          </div>
        </div>
      </div>

      {/* App screens */}
      <div
        ref={scrollRef}
        className="hide-scrollbar mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pt-6 pb-14 md:px-[max(1.25rem,calc((100vw-72rem)/2))] md:scroll-px-[max(1.25rem,calc((100vw-72rem)/2))]"
        style={{ scrollbarWidth: "none" }}
      >
        {SCREENS.map((key, i) => (
          <figure key={key} className="reveal snap-start shrink-0 w-[62vw] sm:w-[230px] md:w-[250px]">
            <div
              className="levitate"
              style={{ ["--lev-dur" as string]: `${6 + (i % 3)}s`, ["--lev-delay" as string]: `-${i * 0.9}s`, ["--lev-amp" as string]: "-8px" } as CSSProperties}
            >
              <div className="glass rounded-[38px] p-[7px] shadow-[0_30px_60px_-30px_rgba(255,90,31,0.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  decoding="async"
                  src={`/synex/${key}.webp`}
                  alt={t(`synex_s_${key}_title`)}
                  width={585}
                  height={1266}
                  className="relative z-10 block w-full h-auto rounded-[31px]"
                />
              </div>
            </div>
            <figcaption className="mt-5 px-1">
              <span className="block text-[15px] font-semibold tracking-tight text-white">
                <span className="text-ember-500 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                {t(`synex_s_${key}_title`)}
              </span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-white/55">{rich(t(`synex_s_${key}_desc`))}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="px-5">
        <div className="reveal max-w-6xl mx-auto mt-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[13px] font-medium text-white/50">
              <span className="text-ember-500 font-semibold">{"//"}</span> {t("synex_backstage")}
            </span>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium text-white/70">
                {t(`synex_chip_${n}`)}
              </span>
            ))}
          </div>
          <Button href="https://synex-music.com" target="_blank" rel="noopener noreferrer" onClick={playEarcon} className="self-start md:self-auto shrink-0">
            {t("synex_cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
