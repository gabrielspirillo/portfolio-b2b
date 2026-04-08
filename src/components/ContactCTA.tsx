"use client";

import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactCTA() {
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Parallax Effect
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-32 outline-none relative z-10 overflow-hidden"
    >
      {/* Background Image with GSAP Parallax Hook */}
      <img
        ref={imageRef}
        src="https://res.cloudinary.com/dcnik6ovx/image/upload/v1775663519/IMG_4360_tb1fuj.jpg"
        alt="Studio Environment"
        className="absolute top-[-20%] left-0 w-full h-[140%] object-cover pointer-events-none opacity-[0.35]"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-20">
        
        {/* Glassmorphic Box */}
        <div className="bg-carbon-900/30 backdrop-blur-md border border-carbon-700/50 p-12 md:p-16 relative overflow-hidden group shadow-2xl rounded-2xl">
          
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white mb-4 relative z-10 drop-shadow-lg">
            {t("contact_title_1")}
          </h2>
          <p className="text-base md:text-lg text-silver-200/90 max-w-xl mx-auto mb-10 font-light relative z-10 drop-shadow-md">
            {t("contact_desc")}
          </p>

          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            <Button 
              href="https://w.app/e9lg2x"
              target="_blank"
              rel="noopener noreferrer"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              }
            >
              WhatsApp
            </Button>
            
            <a 
              href="mailto:gabriel.s.pirillo@gmail.com"
              onMouseEnter={playEarcon}
              className="text-silver-200/60 hover:text-white transition-colors text-sm font-light tracking-wide hover:underline underline-offset-4 decoration-carbon-500 drop-shadow-md"
            >
              {t("contact_email_cta")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

