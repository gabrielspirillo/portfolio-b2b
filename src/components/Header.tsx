"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { playEarcon } = useAudio();
  const { t, language, toggleLanguage } = useLanguage();

  const handleNavClick = () => {
    playEarcon();
    setIsOpen(false);
  };

  const navItems = [
    { key: "nav_services", href: "#services" },
    { key: "nav_projects", href: "#projects" },
    { key: "nav_testimonials", href: "#testimonials" },
    { key: "nav_contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-carbon-900/95 backdrop-blur-md border-b border-carbon-700">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="text-lg font-semibold tracking-tighter text-silver-100 hover:text-white transition-colors" onClick={playEarcon}>
           Gabriel Pirillo
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-xs font-mono text-silver-200 hover:text-silver-100 transition-colors uppercase tracking-widest"
              onClick={handleNavClick}
            >
              {t(item.key)}
            </Link>
          ))}
          
          <div className="w-px h-4 bg-carbon-700 mx-2" />

          {/* Language Toggle (Segmented Apple Style) */}
          <div className="relative flex items-center bg-carbon-800/80 rounded-full p-1 shadow-inner border border-carbon-700/50 w-24">
            {/* Sliding Drop Highlight */}
            <div 
              className="absolute top-1 bottom-1 w-11 bg-white rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-0"
              style={{
                transform: language === 'en' ? 'translateX(0)' : 'translateX(100%)'
              }}
            />
            <button
              onClick={() => {
                if (language !== 'en') {
                  playEarcon();
                  toggleLanguage();
                }
              }}
              className={`relative z-10 flex-1 text-center py-1 text-[10px] uppercase font-mono font-bold tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-black' : 'text-silver-200 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => {
                if (language !== 'es') {
                  playEarcon();
                  toggleLanguage();
                }
              }}
              className={`relative z-10 flex-1 text-center py-1 text-[10px] uppercase font-mono font-bold tracking-widest transition-colors duration-300 ${language === 'es' ? 'text-black' : 'text-silver-200 hover:text-white'}`}
            >
              ES
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-silver-200 hover:text-silver-100 transition-colors"
          onClick={() => {
            playEarcon();
            setIsOpen(!isOpen);
          }}
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-carbon-900 border-b border-carbon-700 flex flex-col p-6 gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm uppercase tracking-widest font-mono text-silver-200 hover:text-silver-100"
              onClick={handleNavClick}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="w-full h-px bg-carbon-800" />
          <div className="w-full flex items-center justify-between mt-2">
            <span className="text-sm uppercase tracking-widest font-mono text-silver-200">Idioma</span>
            <div className="relative flex items-center bg-carbon-800/80 rounded-full p-1 shadow-inner border border-carbon-700/50 w-24">
              <div 
                className="absolute top-1 bottom-1 w-11 bg-white rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-0"
                style={{
                  transform: language === 'en' ? 'translateX(0)' : 'translateX(100%)'
                }}
              />
              <button
                onClick={() => {
                  if (language !== 'en') {
                    playEarcon();
                    toggleLanguage();
                  }
                }}
                className={`relative z-10 flex-1 text-center py-1.5 text-[10px] uppercase font-mono font-bold tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-black' : 'text-silver-200 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  if (language !== 'es') {
                    playEarcon();
                    toggleLanguage();
                  }
                }}
                className={`relative z-10 flex-1 text-center py-1.5 text-[10px] uppercase font-mono font-bold tracking-widest transition-colors duration-300 ${language === 'es' ? 'text-black' : 'text-silver-200 hover:text-white'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
