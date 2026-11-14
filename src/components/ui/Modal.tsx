"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/lib/i18n";

/**
 * Dark liquid-glass dialog with animated open AND close: the parent's state is
 * only cleared (onClose) once the exit animation has finished.
 * Locks page scroll; closes on Esc, backdrop click or the close button.
 */
export function Modal({ open, onClose, className = "", children }: { open: boolean; onClose: () => void; className?: string; children: ReactNode }) {
  const { t } = useLanguage();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const done = () => onCloseRef.current();
    if (!panelRef.current || !backdropRef.current) return done();
    gsap
      .timeline({ onComplete: done })
      .to(panelRef.current, { y: 16, scale: 0.97, opacity: 0, duration: 0.28, ease: "power2.in" }, 0)
      .to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    closing.current = false;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    // Pause decorative page motion behind the dialog: the blurred backdrop
    // would otherwise be re-rendered every frame
    root.classList.add("modal-open");
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" });
    gsap.fromTo(panelRef.current, { y: 28, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
    // Loops inside the dialog only run while visible in its scroll area
    const scroller = scrollRef.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.setAttribute("data-paused", String(!e.isIntersecting))),
      { root: scroller, rootMargin: "120px" }
    );
    const watch = () => scroller?.querySelectorAll(".pm-stage, .bb").forEach((el) => { el.setAttribute("data-anim", ""); io.observe(el); });
    watch();
    const raf = requestAnimationFrame(watch);
    const mo = new MutationObserver(watch);
    if (scroller) mo.observe(scroller, { childList: true, subtree: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      root.style.overflow = "";
      root.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, requestClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overscroll-contain" role="dialog" aria-modal="true">
      <div ref={backdropRef} className="absolute inset-0 bg-black/85" style={{ opacity: 0 }} onClick={requestClose} />
      <div ref={panelRef} className={`glass-blur modal-panel relative w-full max-h-[90vh] rounded-[28px] will-change-transform ${className}`} style={{ opacity: 0 }}>
        <button
          onClick={requestClose}
          aria-label={t("close_button")}
          className="absolute z-20 top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.14] hover:rotate-90 transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div ref={scrollRef} className="relative z-10 max-h-[90vh] overflow-y-auto overscroll-contain p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
