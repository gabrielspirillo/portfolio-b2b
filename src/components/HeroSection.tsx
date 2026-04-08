"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Entry Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-element", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-32"
    >
      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
        
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="hero-element inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-silver-200 border border-carbon-700 px-3 py-1 bg-carbon-800/50 mb-8 font-mono">
            <span className="w-1.5 h-1.5 bg-silver-100 rounded-full animate-pulse" />
            {t("hero_badge")}
          </div>

          <h1 className="hero-element text-5xl md:text-7xl font-semibold tracking-tighter leading-tight text-silver-100 mb-6">
            Gabriel, <br />
            <span className="text-silver-200 font-light mt-2 block">
              Full Stack Developer.
            </span>
          </h1>

          <p className="hero-element text-base md:text-lg text-silver-200/80 max-w-xl font-light leading-relaxed mb-4">
            {t("hero_description")}
          </p>

          <p className="hero-element text-sm md:text-base text-silver-100/90 font-medium max-w-xl leading-relaxed mb-10 font-mono tracking-tight bg-carbon-800/30 border border-carbon-700/50 p-4 rounded-r-2xl border-l-2 border-l-silver-200">
            &gt; _ {t("hero_agile")}
          </p>

          <Button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-element mt-4"
          >
            {t("hero_cta")}
          </Button>
        </div>

        <div 
          className="hero-element w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden border-2 border-carbon-700 bg-carbon-800 shrink-0 relative"
          dangerouslySetInnerHTML={{
            __html: `
              <video 
                src="https://res.cloudinary.com/dcnik6ovx/video/upload/v1775590423/IMG_7596_gctekf.mp4" 
                autoplay 
                loop 
                muted 
                playsinline
                onclick="if(this.paused) this.play()"
                style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; cursor: pointer;"
              ></video>
            `
          }}
        />

      </div>
    </section>
  );
}
