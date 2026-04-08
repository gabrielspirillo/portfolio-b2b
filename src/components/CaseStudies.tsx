"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  
  const [activeStudy, setActiveStudy] = useState<number | null>(null);

  useEffect(() => {
    if (activeStudy !== null) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, 
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeStudy]);

  const caseStudies = [
    {
      date: t("proj_1_date"),
      readTime: "7m read",
      tags: t("proj_1_tags").split(", "),
      title: t("proj_1_title"),
      roi: t("proj_1_roi"),
      detail: t("proj_1_detail"),
      media: {
        video: "https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775593458/IMG_4031_zvzd41.mp4",
        images: [
          "https://i.ibb.co/XkK2N30W/IMG-3763-3.jpg",
          "https://i.ibb.co/43jBPjL/IMG-3767-2.png",
          "https://i.ibb.co/1JqF8Ttj/IMG-3769-3.jpg",
          "https://i.ibb.co/k2LPrb7q/IMG-3770-3.jpg",
          "https://i.ibb.co/TBbJTfzM/IMG-3771-3.jpg",
          "https://i.ibb.co/HTqLdhLB/IMG-3772-2.jpg"
        ]
      },
      graphic: (
        <div className="absolute top-0 right-0 w-1/2 md:w-2/5 h-full pointer-events-none flex items-center justify-end overflow-hidden mask-image-linear-left opacity-30 group-hover:opacity-60 transition-opacity">
           <video 
              src="https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775593458/IMG_4031_zvzd41.mp4" 
              autoPlay loop muted playsInline
              className="w-full h-full object-cover shrink-0 transition-all duration-500"
           />
        </div>
      )
    },
    {
      date: t("proj_2_date"),
      readTime: "12m read",
      tags: t("proj_2_tags").split(", "),
      title: t("proj_2_title"),
      roi: t("proj_2_roi"),
      detail: t("proj_2_detail"),
      media: {
        images: [
          "https://i.ibb.co/xSbL0RmY/Captura-de-pantalla-2026-04-07-a-la-s-12-58-22.png",
          "https://i.ibb.co/bYyHrTn/Captura-de-pantalla-2026-04-07-a-la-s-12-58-42.png",
          "https://i.ibb.co/NgSX5Qdz/Captura-de-pantalla-2026-04-07-a-la-s-12-59-11.png"
        ]
      },
      graphic: (
        <div className="absolute top-0 right-0 w-1/2 md:w-2/5 h-full pointer-events-none flex items-center justify-end overflow-hidden mask-image-linear-left opacity-30 group-hover:opacity-60 transition-opacity">
           <img 
              src="https://i.ibb.co/xSbL0RmY/Captura-de-pantalla-2026-04-07-a-la-s-12-58-22.png" 
              alt="Symetria Mockup" 
              className="w-full h-full object-cover shrink-0 transition-all duration-500"
           />
        </div>
      )
    },
    {
      date: t("proj_3_date"),
      readTime: "10m read",
      tags: t("proj_3_tags").split(", "),
      title: t("proj_3_title"),
      roi: t("proj_3_roi"),
      detail: t("proj_3_detail"),
      isHtmlDetail: true,
      collabLogo: "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668501/Brandboost_AI_2_mm6lwr_kda9lz.png",
      media: {
        images: [
          "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668805/Captura_de_pantalla_2026-04-08_a_la_s_14.19.58_dadjzw.png"
        ]
      },
      graphic: (
        <div className="absolute top-0 right-0 w-1/2 md:w-2/5 h-full pointer-events-none flex items-center justify-end overflow-hidden mask-image-linear-left opacity-30 group-hover:opacity-60 transition-opacity">
           <img 
              src="https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668805/Captura_de_pantalla_2026-04-08_a_la_s_14.19.58_dadjzw.png" 
              alt="Gastro San Jose UI" 
              className="w-full h-full object-cover shrink-0 transition-all duration-500 rounded-lg filter drop-shadow-lg scale-110"
           />
        </div>
      )
    },
    {
      date: t("proj_4_date"),
      readTime: "8m read",
      tags: t("proj_4_tags").split(", "),
      title: t("proj_4_title"),
      roi: t("proj_4_roi"),
      detail: t("proj_4_detail"),
      isHtmlDetail: true,
      collabLogo: "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668501/Brandboost_AI_2_mm6lwr_kda9lz.png",
      media: {
        images: [
          "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775669196/photo-1555396273-367ea4eb4db5_otickk.avif"
        ]
      },
      graphic: (
        <div className="absolute top-0 right-0 w-1/2 md:w-2/5 h-full pointer-events-none flex items-center justify-end overflow-hidden mask-image-linear-left opacity-30 group-hover:opacity-60 transition-opacity">
           <img 
              src="https://res.cloudinary.com/dcnik6ovx/image/upload/v1775669196/photo-1555396273-367ea4eb4db5_otickk.avif" 
              alt="Comidas Bracamonte Delivery" 
              className="w-full h-full object-cover shrink-0 transition-all duration-500 rounded-lg filter drop-shadow-lg scale-110"
           />
        </div>
      )
    },
    {
      date: t("proj_5_date"),
      readTime: "9m read",
      tags: t("proj_5_tags").split(", "),
      title: t("proj_5_title"),
      roi: t("proj_5_roi"),
      detail: t("proj_5_detail"),
      isHtmlDetail: true,
      collabLogo: "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668501/Brandboost_AI_2_mm6lwr_kda9lz.png",
      media: {
        images: [
          "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775669802/Captura-de-pantalla-2025-06-04-a-las-10.24.41-1_cw7chc.png"
        ]
      },
      graphic: (
        <div className="absolute top-0 right-0 w-1/2 md:w-2/5 h-full pointer-events-none flex items-center justify-end overflow-hidden mask-image-linear-left opacity-30 group-hover:opacity-60 transition-opacity">
           <img 
              src="https://res.cloudinary.com/dcnik6ovx/image/upload/v1775669802/Captura-de-pantalla-2025-06-04-a-las-10.24.41-1_cw7chc.png" 
              alt="Clinicas Nobel Dashboard" 
              className="w-full h-full object-cover shrink-0 transition-all duration-500 rounded-lg filter drop-shadow-lg opacity-70"
           />
        </div>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-study-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-32 outline-none relative"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-4 border-b border-carbon-700 pb-4 inline-block">
              {t("projects_eyebrow")}
            </h2>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight text-silver-100 mt-2">
              {t("projects_title")}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                playEarcon();
                scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
              }} 
              className="w-12 h-12 rounded-full border border-carbon-700 bg-carbon-900 flex items-center justify-center hover:bg-carbon-800 transition-colors text-silver-200 hover:text-white group shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => {
                playEarcon();
                scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });
              }} 
              className="w-12 h-12 rounded-full border border-carbon-700 bg-carbon-900 flex items-center justify-center hover:bg-carbon-800 transition-colors text-silver-200 hover:text-white group shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {caseStudies.map((study, i) => (
            <article 
              key={i} 
              className="case-study-card group bg-carbon-900 border border-carbon-700 hover:border-carbon-200/50 pt-8 pb-8 pl-8 pr-4 rounded-2xl cursor-pointer relative overflow-hidden transition-colors w-[85vw] md:w-[700px] lg:w-[900px] snap-start flex flex-col min-h-[380px]"
              onMouseEnter={playEarcon}
              onClick={() => {
                playEarcon();
                setActiveStudy(i);
              }}
            >
              <div 
                className="absolute inset-y-0 right-0 w-1/2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity z-0" 
                style={{ background: 'linear-gradient(to right, transparent, #080808)' }} 
              />
              
              <div className="z-0">
                {study.graphic}
              </div>
              
              <div className="relative z-10 md:w-2/3 flex flex-col flex-1">
                <h3 className="text-2xl font-medium tracking-tight text-silver-100 mb-4 group-hover:text-white transition-colors flex items-center flex-wrap gap-3">
                  <span>{study.title}</span>
                  {study.collabLogo && (
                    <>
                      <span className="text-carbon-600 font-light text-xl">/</span>
                      <img 
                        src={study.collabLogo} 
                        alt="Collaboration Partner" 
                        className="h-4 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity" 
                      />
                    </>
                  )}
                </h3>
                
                <p className="text-silver-200 leading-relaxed font-light text-sm mb-8 max-w-sm flex-1">
                  {study.roi}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.tags.map((tag, tIndex) => (
                    <div 
                      key={tIndex}
                      className="px-3 py-1 bg-carbon-800 border border-carbon-700 text-[11px] font-mono text-silver-200"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 text-[10px] font-mono uppercase tracking-widest text-silver-200 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                Ver Detalles <span className="ml-1">→</span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {activeStudy !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-contain">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveStudy(null)}
          />
          <div 
            ref={modalRef}
            data-lenis-prevent="true"
            className="relative bg-carbon-900 border border-carbon-700 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl z-[60] overscroll-contain"
          >
             <button 
                onClick={() => setActiveStudy(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-silver-200 hover:text-white transition-colors border border-silver-200/20 bg-carbon-800"
             >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>

             <h3 className="text-3xl font-semibold tracking-tight text-silver-100 mb-2 pr-12 mt-4 flex flex-col md:flex-row md:items-center gap-4">
               <span>{caseStudies[activeStudy].title}</span>
             </h3>
             {caseStudies[activeStudy].collabLogo && (
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-mono text-silver-200 opacity-60">EN COLABORACIÓN CON:</span>
                  <img src={caseStudies[activeStudy].collabLogo} alt="Collaboration Partner" className="h-6 w-auto object-contain opacity-90" />
                </div>
             )}

             <p className="text-lg text-silver-200 font-light leading-relaxed mb-8">
                {caseStudies[activeStudy].roi}
             </p>

             {/* Dynamic Layout Check */}
             {caseStudies[activeStudy].isHtmlDetail ? (
                <div 
                  className="mb-8 w-full"
                  dangerouslySetInnerHTML={{ __html: caseStudies[activeStudy].detail }} 
                />
             ) : (
                <div className="p-6 bg-carbon-800/30 border border-carbon-800 mb-8 leading-relaxed text-silver-100/90 text-sm font-light">
                  {caseStudies[activeStudy].detail}
                </div>
             )}

             {caseStudies[activeStudy].media && (
                <div className="flex flex-col gap-4 mb-8">
                   {caseStudies[activeStudy].media?.video && (
                     <div className="relative w-full border border-carbon-700 bg-carbon-800/20 overflow-hidden flex items-center justify-center">
                       <video 
                         src={caseStudies[activeStudy].media.video}
                         autoPlay loop muted playsInline
                         className="w-full h-auto object-cover max-h-[70vh]"
                       />
                     </div>
                   )}
                   {caseStudies[activeStudy].media?.images?.map((img, idx) => (
                     <img 
                       key={idx} 
                       src={img} 
                       alt={`${caseStudies[activeStudy].title} Component ${idx + 1}`} 
                       className="w-full border border-carbon-700 bg-carbon-800/10" 
                     />
                   ))}
                </div>
             )}

             <div className="flex flex-wrap gap-2 mt-auto">
                {caseStudies[activeStudy].tags.map((tag, tIndex) => (
                  <div key={tIndex} className="px-3 py-1 bg-carbon-800 border border-carbon-700 text-[11px] font-mono text-silver-200">
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
