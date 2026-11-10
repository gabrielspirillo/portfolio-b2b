"use client";

import { ReactNode, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

// Dark liquid-glass dialog. Locks page scroll and closes on Esc.
export function Modal({ open, onClose, className = "", children }: { open: boolean; onClose: () => void; className?: string; children: ReactNode }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overscroll-contain" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className={`glass-blur relative w-full max-h-[90vh] rounded-[28px] ${className}`}>
        <button
          onClick={onClose}
          aria-label={t("close_button")}
          className="absolute z-20 top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.14] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div className="relative z-10 max-h-[90vh] overflow-y-auto overscroll-contain p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
