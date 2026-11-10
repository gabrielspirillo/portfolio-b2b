"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

const WHATSAPP = "https://wa.link/bdi66k";
const BRANDBOOST_LOGO = "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668501/Brandboost_AI_2_mm6lwr_kda9lz.png";

function RolePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-white/40 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white">
      <span className="opacity-80">{"//"}</span> {children}
    </span>
  );
}

export function HeroSection() {
  const { t } = useLanguage();
  const { playEarcon } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elements start hidden via CSS (.hero-element / .hero-card) to avoid a flash before hydration
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".hero-element", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, delay: 0.1 })
        .fromTo(
          ".hero-card",
          { y: 40, opacity: 0, rotate: 0 },
          { y: 0, opacity: 1, rotate: (i: number) => [-3, -1.5, -2][i], duration: 1.3, stagger: 0.12 },
          0.35
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full px-5 pt-32 pb-24 md:pt-40 md:pb-32 lg:min-h-[100svh] lg:flex lg:items-center">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-10 items-center">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <div className="hero-element glass-blur inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm md:text-[15px]">
            <span className="relative z-10 text-ember-500 font-semibold">{"//"}</span>
            <span className="relative z-10 font-semibold text-white">Gabriel Pirillo</span>
            <span className="relative z-10 w-px h-4 bg-white/20" />
            <span className="relative z-10 text-white/70">Full Stack Developer</span>
          </div>

          <h1 className="hero-element mt-8 text-[2.75rem] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[4.8vw] xl:text-[4.25rem] font-bold tracking-[-0.055em] text-white">
            <span className="lg:whitespace-nowrap">{t("hero_title_1")}</span>
            <br />
            <span className="text-ember-gradient pr-1">{t("hero_title_2")}</span>
          </h1>

          <div className="hero-element mt-10 flex items-center gap-5">
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 rounded-full p-[2px] bg-gradient-to-br from-ember-400 to-ember-700 shadow-[0_0_40px_-6px_rgba(255,90,31,0.7)]">
              <div
                className="w-full h-full rounded-full overflow-hidden bg-carbon-800 relative"
                dangerouslySetInnerHTML={{
                  __html: `<video src="https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto,w_200/v1775590423/IMG_7596_gctekf.mp4" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0"></video>`,
                }}
              />
            </div>
            <p className="text-base md:text-xl leading-snug text-white/75 max-w-md tracking-tight">{t("hero_sub")}</p>
          </div>

          <div className="hero-element mt-10 flex flex-wrap items-center gap-3">
            <Button href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t("hero_cta")}</Button>
            <a
              href="#projects"
              onClick={playEarcon}
              className="px-5 py-3 rounded-full text-[15px] font-medium text-white/70 hover:text-white transition-colors"
            >
              {t("hero_secondary")}
            </a>
          </div>
        </div>

        {/* Stacked glass cards (from the brand banner) */}
        <div className="relative flex flex-col gap-4 lg:pl-6 [perspective:1200px]">
          <div className="hero-card glass-ember rounded-[28px] p-6 md:p-7 lg:mr-10 origin-bottom-left">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <span className="text-xl md:text-2xl font-light tracking-[0.55em] text-white">SYNEX</span>
              <RolePill>Founder</RolePill>
            </div>
            <p className="relative z-10 mt-4 text-[15px] leading-snug text-white/90 max-w-sm">{t("card_synex_desc")}</p>
          </div>

          <div className="hero-card glass-ember rounded-[28px] p-6 md:p-7 lg:ml-8 origin-bottom-left">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BRANDBOOST_LOGO} alt="" className="h-6 w-auto brightness-0 invert" />
                <span className="text-xl md:text-2xl font-bold tracking-[-0.03em] text-white">Brandboost AI</span>
              </span>
              <RolePill>Co-Founder</RolePill>
            </div>
            <p className="relative z-10 mt-4 text-[15px] leading-snug text-white/90">{t("card_bb_desc")}</p>
          </div>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playEarcon}
            className="hero-card group glass-ember rounded-[28px] p-6 md:p-7 lg:ml-16 flex items-center justify-between gap-4 origin-bottom-left"
          >
            <span className="relative z-10">
              <span className="block text-sm text-white/85"><span className="opacity-80">{"//"}</span> {t("card_cta_eyebrow")}</span>
              <span className="block mt-1 text-xl font-bold tracking-[-0.03em] text-white lg:whitespace-nowrap">{t("card_cta_title")}</span>
            </span>
            <span className="relative z-10 w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-white flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-ember-600 transition-transform duration-500 group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
