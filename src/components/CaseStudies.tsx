"use client";

import { useRef, useState } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Modal } from "@/components/ui/Modal";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { SynexCard, SynexDetail } from "@/components/SynexProject";
import { FinanzasCard, FinanzasDetail } from "@/components/FinanzasProject";
import { FuturaCard, FuturaDetail } from "@/components/FuturaProject";
import { SmileFastCard, SmileFastDetail } from "@/components/SmileFastProject";
import { RealtyCard, RealtyDetail } from "@/components/RealtyProject";

const BRANDBOOST_LOGO = "https://res.cloudinary.com/dcnik6ovx/image/upload/v1775668501/Brandboost_AI_2_mm6lwr_kda9lz.png";

type Study = {
  key: number;
  cover: { video?: string; image?: string };
  images: string[];
  video?: string;
  isHtmlDetail?: boolean;
  collab?: boolean;
};

const STUDIES: Study[] = [
  {
    key: 1,
    cover: { video: "https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775593458/IMG_4031_zvzd41.mp4" },
    video: "https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775593458/IMG_4031_zvzd41.mp4",
    images: [
      "https://i.ibb.co/XkK2N30W/IMG-3763-3.jpg",
      "https://i.ibb.co/43jBPjL/IMG-3767-2.png",
      "https://i.ibb.co/1JqF8Ttj/IMG-3769-3.jpg",
      "https://i.ibb.co/k2LPrb7q/IMG-3770-3.jpg",
      "https://i.ibb.co/TBbJTfzM/IMG-3771-3.jpg",
      "https://i.ibb.co/HTqLdhLB/IMG-3772-2.jpg",
    ],
  },
  {
    key: 2,
    cover: { image: "https://i.ibb.co/xSbL0RmY/Captura-de-pantalla-2026-04-07-a-la-s-12-58-22.png" },
    images: [
      "https://i.ibb.co/xSbL0RmY/Captura-de-pantalla-2026-04-07-a-la-s-12-58-22.png",
      "https://i.ibb.co/bYyHrTn/Captura-de-pantalla-2026-04-07-a-la-s-12-58-42.png",
      "https://i.ibb.co/NgSX5Qdz/Captura-de-pantalla-2026-04-07-a-la-s-12-59-11.png",
    ],
  },
  {
    key: 3,
    isHtmlDetail: true,
    collab: true,
    cover: { image: "https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775668805/Captura_de_pantalla_2026-04-08_a_la_s_14.19.58_dadjzw.png" },
    images: ["https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775668805/Captura_de_pantalla_2026-04-08_a_la_s_14.19.58_dadjzw.png"],
  },
  {
    key: 4,
    isHtmlDetail: true,
    collab: true,
    cover: { image: "https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775669196/photo-1555396273-367ea4eb4db5_otickk.avif" },
    images: ["https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775669196/photo-1555396273-367ea4eb4db5_otickk.avif"],
  },
  {
    key: 5,
    isHtmlDetail: true,
    collab: true,
    cover: { image: "https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775669802/Captura-de-pantalla-2025-06-04-a-las-10.24.41-1_cw7chc.png" },
    images: ["https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775669802/Captura-de-pantalla-2025-06-04-a-las-10.24.41-1_cw7chc.png"],
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/60">{children}</span>;
}

export function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [synexOpen, setSynexOpen] = useState(false);
  const [finOpen, setFinOpen] = useState(false);
  const [fuOpen, setFuOpen] = useState(false);
  const [sfOpen, setSfOpen] = useState(false);
  const [rwOpen, setRwOpen] = useState(false);


  const data = STUDIES.map((s) => ({
    ...s,
    title: t(`proj_${s.key}_title`),
    roi: t(`proj_${s.key}_roi`),
    detail: t(`proj_${s.key}_detail`),
    tags: t(`proj_${s.key}_tags`).split(", "),
    date: t(`proj_${s.key}_date`),
  }));
  const current = active !== null ? data[active] : null;

  return (
    <section id="projects" data-anim className="relative w-full py-24 md:py-32">
      <div className="px-5"><div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow={t("projects_eyebrow")} title={t("projects_title")}>
          <CarouselArrows target={scrollRef} />
        </SectionHeader>
      </div></div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pt-6 pb-14 -mt-6 md:px-[max(1.25rem,calc((100vw-72rem)/2))] md:scroll-px-[max(1.25rem,calc((100vw-72rem)/2))]"
        style={{ scrollbarWidth: "none" }}
      >
        <FuturaCard onOpen={() => setFuOpen(true)} />
        <RealtyCard onOpen={() => setRwOpen(true)} />
        <SmileFastCard onOpen={() => setSfOpen(true)} />
        <SynexCard onOpen={() => setSynexOpen(true)} />
        <FinanzasCard onOpen={() => setFinOpen(true)} />
        {data.map((study, i) => (
          <button
            key={study.key}
            type="button"
            className="reveal glass glass-hover group text-left snap-start shrink-0 w-[84vw] sm:w-[60vw] lg:w-[400px] rounded-[28px] p-2 flex flex-col"
            onMouseEnter={playEarcon}
            onClick={() => {
              playEarcon();
              setActive(i);
            }}
          >
            <div className="relative z-10 aspect-[16/10] rounded-[22px] overflow-hidden bg-carbon-800">
              {study.cover.video ? (
                <video src={study.cover.video} autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={study.cover.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-medium text-white/80 backdrop-blur-md">{study.date}</span>
            </div>

            <div className="relative z-10 flex-1 flex flex-col px-4 pt-5 pb-4">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">{study.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55 flex-1">{rich(study.roi)}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {study.tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ember-400">
                {t("read_more")}
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      <Modal open={synexOpen} onClose={() => setSynexOpen(false)} className="max-w-3xl">
        {synexOpen && <SynexDetail />}
      </Modal>

      <Modal open={fuOpen} onClose={() => setFuOpen(false)} className="max-w-3xl fl-modal">
        {fuOpen && <FuturaDetail />}
      </Modal>

      <Modal open={rwOpen} onClose={() => setRwOpen(false)} className="max-w-3xl">
        {rwOpen && <RealtyDetail />}
      </Modal>

      <Modal open={sfOpen} onClose={() => setSfOpen(false)} className="max-w-3xl">
        {sfOpen && <SmileFastDetail />}
      </Modal>

      <Modal open={finOpen} onClose={() => setFinOpen(false)} className="max-w-3xl">
        {finOpen && <FinanzasDetail />}
      </Modal>

      <Modal open={current !== null} onClose={() => setActive(null)} className="max-w-3xl">
        {current && (
          <>
            <span className="text-[13px] font-medium text-white/50">
              <span className="text-ember-500 font-semibold">{"//"}</span> {current.date}
            </span>
            <h3 className="mt-3 pr-12 text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-white">{current.title}</h3>
            {current.collab && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-white/50">{t("proj_collab")}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BRANDBOOST_LOGO} alt="Brandboost AI" className="h-5 w-auto brightness-0 invert opacity-90" />
              </div>
            )}
            <p className="mt-6 text-lg leading-relaxed text-white/70">{rich(current.roi)}</p>

            {current.isHtmlDetail ? (
              <div className="detail-dark mt-8" dangerouslySetInnerHTML={{ __html: current.detail }} />
            ) : (
              <p className="mt-8 glass rounded-2xl p-5 text-sm leading-relaxed text-white/75">
                <span className="relative z-10">{current.detail}</span>
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              {current.video && (
                <video src={current.video} autoPlay loop muted playsInline className="w-full max-h-[70vh] object-cover rounded-2xl border border-white/10" />
              )}
              {current.images.map((img, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img} loading="lazy" decoding="async" src={img} alt={`${current.title} ${idx + 1}`} className="w-full rounded-2xl border border-white/10" />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {current.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
