"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { Liquid } from "@/components/ui/Liquid";

const IMAGES: Record<number, string> = {
  1: "https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto,w_120/v1775694117/IMG_3592_hsf7kc.webp",
  2: "https://i.ibb.co/vvm1JQNS/IMG-4353.jpg",
  4: "https://i.ibb.co/Mjfgzn9/IMG-4355.jpg",
};

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const reviews = [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`test_${n}_name`),
    role: t(`test_${n}_role`),
    text: t(`test_${n}_text`),
    image: IMAGES[n],
  }));

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32">
      <div className="px-5"><div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow={t("test_eyebrow")} title={t("test_title")}>
          <CarouselArrows target={scrollRef} />
        </SectionHeader>
      </div></div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pb-6 md:px-[max(1.25rem,calc((100vw-72rem)/2))] md:scroll-px-[max(1.25rem,calc((100vw-72rem)/2))]"
        style={{ scrollbarWidth: "none" }}
      >
        {reviews.map((r, idx) => (
          <figure key={r.name} className={`reveal ${idx === 0 ? "glass-ember overflow-hidden" : "glass"} snap-start shrink-0 w-[84vw] sm:w-[420px] rounded-[28px] p-7 flex flex-col`}>
            {idx === 0 && <Liquid sheen={false} />}
            <div className={`relative z-10 flex gap-0.5 ${idx === 0 ? "text-white" : "text-ember-500"}`} aria-label="5/5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <blockquote className={`relative z-10 mt-5 flex-1 text-[15px] leading-relaxed ${idx === 0 ? "text-white" : "text-white/75"}`}>&ldquo;{r.text}&rdquo;</blockquote>
            <figcaption className={`relative z-10 mt-7 pt-5 border-t ${idx === 0 ? "border-white/25" : "border-white/[0.08]"} flex items-center gap-3`}>
              <span className="w-11 h-11 shrink-0 rounded-full overflow-hidden bg-white/[0.06] border border-white/10 flex items-center justify-center text-sm font-semibold text-white">
                {r.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" decoding="async" src={r.image} alt={r.name} className="w-full h-full object-cover" />
                ) : (
                  r.name.charAt(0)
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white tracking-tight">{r.name}</span>
                <span className={`block text-xs mt-0.5 ${idx === 0 ? "text-white/75" : "text-white/45"}`}>{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
