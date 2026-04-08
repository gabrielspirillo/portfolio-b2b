"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { playEarcon } = useAudio();
  const { t } = useLanguage();

  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    if (activeService !== null) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, 
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeService]);

  const services = [
    {
      title: t("serv_1_title"),
      desc: t("serv_1_desc"),
      detail: t("serv_1_detail"),
      colSpan: "md:col-span-2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      graphic: (
        <div className="mt-8 h-40 md:h-48 w-full rounded-2xl border border-carbon-700 bg-carbon-800/20 relative overflow-hidden group-hover:border-black/10 group-hover:bg-black/5 transition-colors duration-400">
          <img 
            src="https://i.ibb.co/6LqX5D5/1-Desarrollo-Web.jpg" 
            alt="Desarrollo Web B2B" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )
    },
    {
      title: t("serv_2_title"),
      desc: t("serv_2_desc"),
      detail: t("serv_2_detail"),
      colSpan: "md:col-span-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      graphic: (
        <div className="mt-8 h-40 md:h-48 w-full rounded-2xl border border-carbon-700 bg-carbon-800/20 relative overflow-hidden group-hover:border-black/10 group-hover:bg-black/5 transition-colors duration-400 flex items-center justify-center">
          <img 
            src="https://i.ibb.co/F4ZPryQ1/Mobile-app-ios-android.jpg" 
            alt="Desarrollo Móvil" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )
    },
    {
      title: t("serv_3_title"),
      desc: t("serv_3_desc"),
      detail: t("serv_3_detail"),
      colSpan: "md:col-span-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      graphic: (
        <div className="mt-8 h-40 md:h-48 w-full rounded-2xl border border-carbon-700 bg-carbon-800/20 relative overflow-hidden group-hover:border-black/10 group-hover:bg-black/5 transition-colors duration-400">
          <img 
            src="https://i.ibb.co/21Skx37z/3-Automatizaciones-con-IA-Workflows.jpg" 
            alt="Automatización IA y n8n" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
          />
        </div>
      )
    },
    {
      title: t("serv_4_title"),
      desc: t("serv_4_desc"),
      detail: t("serv_4_detail"),
      colSpan: "md:col-span-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      graphic: (
        <div className="mt-8 h-40 md:h-48 w-full shrink-0 rounded-2xl border border-carbon-700 bg-carbon-800/20 flex items-center justify-center relative overflow-hidden group-hover:border-black/10 group-hover:bg-black/5 transition-colors duration-400">
          <img 
            src="https://i.ibb.co/4wrnn2C7/UI-UX-Graphic-Design.jpg" 
            alt="UI UX Branding" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )
    },
    {
      title: t("serv_5_title"),
      desc: t("serv_5_desc"),
      detail: t("serv_5_detail"),
      colSpan: "md:col-span-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      graphic: (
        <div className="mt-8 h-40 md:h-48 w-full shrink-0 rounded-2xl border border-carbon-700 bg-carbon-800/20 flex items-center justify-center relative overflow-hidden group-hover:border-black/10 group-hover:bg-black/5 transition-colors duration-400">
          <img 
            src="https://i.ibb.co/tTQT1gBN/5-Ingenieri-a-de-Sonido.jpg" 
            alt="Sound Engineering" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
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
      id="services" 
      ref={containerRef}
      className="py-32 outline-none relative"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-4 border-b border-carbon-700 pb-4 inline-block">
            {t("services_eyebrow")}
          </h2>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mt-2 drop-shadow-md">
            {t("services_title")}
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div 
              key={i}
              className={`bento-card relative ${svc.colSpan} bg-carbon-900 border border-carbon-700 p-8 md:p-10 rounded-2xl overflow-hidden group cursor-pointer`}
              onMouseEnter={playEarcon}
              onClick={() => {
                playEarcon();
                setActiveService(i);
              }}
            >
              {/* White Expand Hover Physical Background */}
              <span className="absolute inset-[-1px] bg-white scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start h-full justify-between w-full">
                <div className="flex-1 flex flex-col h-full justify-between w-full">
                  <div>
                    <div className="mb-8 opacity-80 group-hover:opacity-100 text-silver-200 group-hover:text-carbon-950 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {svc.icon}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white group-hover:text-carbon-950 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-3 pr-12">
                      {svc.title}
                    </h3>
                    <p className="text-silver-200 group-hover:text-carbon-800 font-light text-sm max-w-[85%] leading-relaxed transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {svc.desc}
                    </p>
                  </div>
                  
                  {svc.graphic}
                </div>
              </div>
              
              {/* Animated Corner Plus Indicator */}
              <div className="absolute z-10 w-11 h-11 rounded-full flex items-center justify-center bg-carbon-800/80 border border-carbon-700/50 top-8 right-8 group-hover:bg-carbon-950 group-hover:border-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 shadow-lg md:shadow-none">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 text-white transform transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180"
                >
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expansion Modal */}
      {activeService !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-contain">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
            onClick={() => setActiveService(null)}
          />
          <div 
            ref={modalRef} 
            data-lenis-prevent="true"
            className="relative z-[60] bg-white border border-black/5 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          >
             <button 
                onClick={() => setActiveService(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-carbon-200/50 bg-[#f2f2f4] hover:bg-[#e5e5e5] flex items-center justify-center text-carbon-950 transition-colors rounded-full"
             >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             
             <div className="flex items-center gap-4 text-xs font-mono mb-6 text-carbon-800 font-bold">
               <span className="uppercase tracking-widest border-b border-carbon-800/20 pb-1">Contexto Conceptual</span>
             </div>

             <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-8 pr-12">
               {services[activeService].title}
             </h3>

             <div className="p-6 md:p-8 bg-[#f2f2f4] border border-[#e5e5e5] rounded-xl leading-relaxed text-carbon-700 text-sm md:text-base font-medium">
                {services[activeService].detail}
             </div>
          </div>
        </div>
      )}
    </section>
  );
}
