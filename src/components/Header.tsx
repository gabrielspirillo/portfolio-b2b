"use client";

import { useState } from "react";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";

const WHATSAPP = "https://wa.link/bdi66k";

function LangToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { playEarcon } = useAudio();
  return (
    <div className="relative flex items-center rounded-full p-0.5 bg-white/[0.06] border border-white/10 w-[76px]">
      <span
        className="absolute top-0.5 bottom-0.5 w-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: language === "es" ? "translateX(0)" : "translateX(100%)" }}
      />
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => {
            if (language !== l) {
              playEarcon();
              toggleLanguage();
            }
          }}
          className={`relative z-10 flex-1 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-300 ${language === l ? "text-black" : "text-white/60 hover:text-white"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { playEarcon } = useAudio();
  const { t } = useLanguage();

  const navItems = [
    { key: "nav_services", href: "#services" },
    { key: "nav_projects", href: "#projects" },
    { key: "nav_testimonials", href: "#testimonials" },
    { key: "nav_contact", href: "#contact" },
  ];

  const close = () => {
    playEarcon();
    setIsOpen(false);
  };

  return (
    <header className="fixed top-3 md:top-4 inset-x-0 z-50 px-3 md:px-6">
      <div className="glass-blur mx-auto max-w-5xl h-14 rounded-full pl-5 pr-2 flex items-center justify-between">
        <a href="#about" onClick={playEarcon} className="relative z-10 flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white">
          <span className="text-ember-500">{"//"}</span> Gabriel Salvador Pirillo
        </a>

        <nav className="relative z-10 hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={playEarcon}
              className="px-3.5 py-2 rounded-full text-[13px] font-medium text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <div className="hidden md:block">
            <LangToggle />
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playEarcon}
            className="group glass-ember relative overflow-hidden hidden sm:inline-flex items-center gap-2 h-10 pl-4 pr-3 rounded-full text-[13px] font-semibold"
          >
            <span className="absolute inset-0 rounded-full bg-carbon-950 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-[2]" />
            <span className="relative z-10">{t("nav_cta")}</span>
            <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-4 h-4 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </a>
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/[0.06]"
            onClick={() => {
              playEarcon();
              setIsOpen((o) => !o);
            }}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d={isOpen ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden glass-blur mx-auto max-w-5xl mt-2 rounded-3xl p-3 origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="relative z-10 flex flex-col">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} onClick={close} className="px-4 py-3 rounded-2xl text-base font-medium text-white/80 hover:bg-white/[0.06]">
              {t(item.key)}
            </a>
          ))}
          <div className="flex items-center justify-between px-4 pt-3 mt-2 border-t border-white/10">
            <span className="text-sm text-white/50">{t("nav_language")}</span>
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
