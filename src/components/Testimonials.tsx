"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4 text-silver-100">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { playEarcon } = useAudio();

  const reviews = [
    {
      name: t("test_1_name"),
      role: t("test_1_role"),
      text: t("test_1_text"),
      image: "https://i.ibb.co/vvm1JQNS/IMG-4353.jpg"
    },
    {
      name: t("test_2_name"),
      role: t("test_2_role"),
      text: t("test_2_text"),
    },
    {
      name: t("test_3_name"),
      role: t("test_3_role"),
      text: t("test_3_text"),
      image: "https://i.ibb.co/Mjfgzn9/IMG-4355.jpg"
    },
    {
      name: t("test_4_name"),
      role: t("test_4_role"),
      text: t("test_4_text")
    },
    {
      name: t("test_5_name"),
      role: t("test_5_role"),
      text: t("test_5_text")
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
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
      id="testimonials" 
      ref={containerRef}
      className="py-32 outline-none relative z-10"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-4 border-b border-carbon-700 pb-4 inline-block">
              {t("test_eyebrow")}
            </h2>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight text-silver-100 mt-2">
              {t("test_title")}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                playEarcon();
                if (scrollContainerRef.current) {
                  const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 340;
                  scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
                }
              }} 
              className="w-12 h-12 rounded-full border border-carbon-700 bg-carbon-900 flex items-center justify-center hover:bg-carbon-800 transition-colors text-silver-200 hover:text-white group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => {
                playEarcon();
                if (scrollContainerRef.current) {
                  const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 340;
                  scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
                }
              }} 
              className="w-12 h-12 rounded-full border border-carbon-700 bg-carbon-900 flex items-center justify-center hover:bg-carbon-800 transition-colors text-silver-200 hover:text-white group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="testimonial-card relative bg-carbon-900 border border-carbon-700 p-8 rounded-2xl group hover:bg-carbon-800/40 transition-colors shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
              onMouseEnter={playEarcon}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-1 mb-6 opacity-80 cursor-default">
                  {[...Array(5)].map((_, idx) => (
                    <StarIcon key={idx} />
                  ))}
                </div>
                
                <p className="text-silver-200 leading-relaxed font-light text-sm mb-8 flex-1 cursor-default">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto border-t border-carbon-800 pt-6">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-carbon-800 border border-carbon-700 flex items-center justify-center font-mono font-medium text-silver-100 text-sm shrink-0">
                     {review.image ? (
                        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                     ) : (
                        review.name.charAt(0)
                     )}
                   </div>
                   <div>
                     <h4 className="text-silver-100 font-medium tracking-tight text-sm">
                       {review.name}
                     </h4>
                     <p className="text-xs font-mono text-silver-200/50 uppercase tracking-widest mt-1">
                       {review.role}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
