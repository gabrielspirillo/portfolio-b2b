"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { playEarcon } = useAudio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-element", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about-me" 
      ref={containerRef}
      className="py-32 relative z-10 border-t border-carbon-800/50 bg-[#000]"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16 md:mb-24">
             <h2 className="about-element text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-4 border-b border-carbon-700 pb-4 inline-block">
               {t("about_eyebrow")}
             </h2>
             <h3 className="about-element text-3xl md:text-5xl font-semibold tracking-tight text-silver-100 mt-4 leading-tight max-w-3xl">
               {t("about_title")}
             </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
           
           {/* Left Section - Video */}
           <div className="lg:col-span-5">
             {/* Elite Video Graphic */}
             <div 
               className="about-element w-full aspect-[4/5] rounded-2xl overflow-hidden border border-carbon-700 bg-carbon-900 relative shadow-2xl"
               dangerouslySetInnerHTML={{
                 __html: `
                   <video 
                     src="https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775594991/IMG_6870_kwqpia.mp4" 
                     autoplay 
                     loop 
                     muted 
                     playsinline
                     style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"
                   ></video>
                 `
               }}
             />
           </div>

           {/* Right Section - Paragraphs */}
           <div className="lg:col-span-7 flex flex-col gap-6 text-silver-200/80 font-light leading-relaxed">
              <p className="about-element text-base md:text-lg text-silver-100">
                {t("about_intro")}
              </p>
              
              <ul className="about-element flex flex-col gap-5 mt-4 text-sm md:text-base">
                <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-silver-100 mt-2 shrink-0"></div>
                   <span><strong className="text-white font-medium">{t("about_l1_title")}:</strong> {t("about_l1_desc")}</span>
                </li>
                <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-silver-100 mt-2 shrink-0"></div>
                   <span><strong className="text-white font-medium">{t("about_l2_title")}:</strong> {t("about_l2_desc")}</span>
                </li>
                <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-silver-100 mt-2 shrink-0"></div>
                   <span><strong className="text-white font-medium">{t("about_l3_title")}:</strong> {t("about_l3_desc")}</span>
                </li>
                <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-silver-100 mt-2 shrink-0"></div>
                   <span><strong className="text-white font-medium">{t("about_l4_title")}:</strong> {t("about_l4_desc")}</span>
                </li>
              </ul>

              <div className="about-element border-l-2 border-silver-200/30 pl-6 mt-6">
                 <p className="text-lg md:text-xl text-white font-medium leading-snug">
                   {t("about_conclusion").split("\n").map((line, i) => (
                     <span key={i} className="block">{line}</span>
                   ))}
                 </p>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
}
