"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { playEarcon } = useAudio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        x: 50,
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="py-16 md:py-32 relative z-10 border-t border-carbon-800/50 bg-[#000] overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,70vw)] h-[min(800px,70vw)] rounded-full bg-white/[0.015] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-carbon-900/40 border border-carbon-800/60 rounded-2xl overflow-hidden backdrop-blur-sm p-8 md:p-12 lg:p-16 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left Side: Text and Button */}
            <div ref={textRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-6 px-4 py-1.5 border border-carbon-700 rounded-full inline-block bg-carbon-900 bg-opacity-50">
                {t("stack_eyebrow")}
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mt-2 leading-tight mb-6 max-w-lg">
                {t("stack_title")}
              </h3>
              <p className="text-silver-200/80 font-light leading-relaxed md:text-lg mb-10 max-w-md">
                {t("stack_desc")}
              </p>
              
              <Button
                onClick={() => {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t("collab_btn")}
              </Button>
            </div>
            
            {/* Right Side: Image */}
            <div ref={imageRef} className="relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
              <img 
                src="https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775654516/Generated_Image_April_07_2026_-_8_42PM_eu6thm.png" 
                alt="Tech Stack Showcase" 
                className="w-full max-w-[600px] h-auto object-contain rounded-2xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
