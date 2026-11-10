"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useAudio } from "@/lib/audio";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Modal } from "@/components/ui/Modal";
import { WebMotion, MobileMotion, AutomationMotion, DesignMotion, SoundMotion } from "@/components/ServiceMotion";

const ICONS: ReactNode[] = [
  <path key="w" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  <path key="m" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  <path key="a" d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />,
  <path key="d" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  <path key="s" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />,
];
const GRAPHICS = [<WebMotion key="w" />, <MobileMotion key="m" />, <AutomationMotion key="a" />, <DesignMotion key="d" />, <SoundMotion key="s" />];

export function ServicesGrid() {
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const services = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`serv_${i + 1}_title`),
    desc: t(`serv_${i + 1}_desc`),
    detail: t(`serv_${i + 1}_detail`),
    span: i === 0 ? "md:col-span-2" : "",
  }));

  // Cursor-following specular highlight (CSS vars only, no re-render)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".svc-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    grid.addEventListener("pointermove", onMove);
    return () => grid.removeEventListener("pointermove", onMove);
  }, []);


  return (
    <section id="services" className="relative w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow={t("services_eyebrow")} title={t("services_title")} />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <button
              key={i}
              type="button"
              className={`svc-card reveal glass glass-hover group text-left rounded-[28px] p-6 md:p-8 flex flex-col overflow-hidden ${svc.span}`}
              onMouseEnter={playEarcon}
              onClick={() => {
                playEarcon();
                setActive(i);
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(255,90,31,0.10), transparent 60%)" }}
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/80 group-hover:text-ember-400 transition-colors duration-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">{ICONS[i]}</svg>
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] group-hover:bg-ember-500 group-hover:border-transparent transition-colors duration-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <h3 className="relative z-10 mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">{svc.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55 max-w-md">{rich(svc.desc)}</p>
              <div className="relative z-10 mt-auto w-full">{GRAPHICS[i]}</div>
            </button>
          ))}
        </div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} className="max-w-2xl">
        {active !== null && (
          <>
            <span className="text-[13px] font-medium text-white/50">
              <span className="text-ember-500 font-semibold">{"//"}</span> {t("services_eyebrow")}
            </span>
            <h3 className="mt-3 mb-8 pr-12 text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-white">{services[active].title}</h3>
            <div className="detail-dark text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: services[active].detail }} />
          </>
        )}
      </Modal>
    </section>
  );
}
