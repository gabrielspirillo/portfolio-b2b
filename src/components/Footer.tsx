"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/lib/audio";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { playEarcon } = useAudio();
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    
    const updateHeight = () => {
      setFooterHeight(footerRef.current?.offsetHeight || 0);
    };
    
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(footerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="relative w-full z-0 transform-gpu"
      style={{ 
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        height: footerHeight > 0 ? `${footerHeight}px` : "auto"
      }}
      id="footer"
    >
      <div 
        className="fixed bottom-0 left-0 w-full" 
        style={{ height: footerHeight > 0 ? `${footerHeight}px` : "auto" }}
      >
        <footer 
          ref={footerRef}
          className="w-full bg-[#111111] text-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] mt-4"
        >
          <div className="max-w-6xl mx-auto px-8 py-16 md:py-24 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
              
              {/* Left Side: Brand */}
              <div className="col-span-1 md:col-span-5 lg:col-span-6 flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-4 text-xl font-medium tracking-tight hover:text-white text-silver-100 transition-colors w-max" onClick={playEarcon}>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                       <path d="M6 12L12 6M12 6L18 12M12 6V18" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  Gabriel Pirillo
                </Link>
                <p className="text-silver-200/60 text-sm font-light leading-relaxed max-w-sm mt-2">
                  {t("footer_desc")}
                </p>
                <div className="flex items-center gap-5 mt-4">
                  <a href="https://www.linkedin.com/in/gabrielpirillo/" target="_blank" rel="noopener noreferrer" className="text-silver-200/80 hover:text-white transition-colors" onClick={playEarcon}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/gabrielpirillo" target="_blank" rel="noopener noreferrer" className="text-silver-200/80 hover:text-white transition-colors" onClick={playEarcon}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Side: Links */}
              <div className="col-span-1 md:col-span-7 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 pt-4 md:pt-0">
                
                <div className="flex flex-col gap-5">
                  <h4 className="text-silver-100 font-medium text-sm mb-1 tracking-wide">{t("footer_help")}</h4>
                  <ul className="flex flex-col gap-4">
                    <li><Link href="#services" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_serv")}</Link></li>
                    <li><Link href="#projects" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_proj")}</Link></li>
                    <li><Link href="#tech-stack" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_stack")}</Link></li>
                  </ul>
                </div>

                <div className="flex flex-col gap-5">
                  <h4 className="text-silver-100 font-medium text-sm mb-1 tracking-wide">{t("footer_know")}</h4>
                  <ul className="flex flex-col gap-4">
                    <li><Link href="#about" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_about")}</Link></li>
                    <li><Link href="#education" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_edu")}</Link></li>
                    <li><Link href="#testimonials" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">{t("footer_test")}</Link></li>
                  </ul>
                </div>

                <div className="flex flex-col gap-5">
                  <h4 className="text-silver-100 font-medium text-sm mb-1 tracking-wide">{t("footer_contact")}</h4>
                  <ul className="flex flex-col gap-4">
                    <li><a href="https://w.app/e9lg2x" target="_blank" rel="noopener noreferrer" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light">WhatsApp</a></li>
                    <li><a href="mailto:gabriel.s.pirillo@gmail.com" onClick={playEarcon} className="text-silver-200/80 hover:text-white transition-colors text-sm font-light whitespace-nowrap">gabriel.s.pirillo@gmail.com</a></li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-carbon-800/60 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-silver-200/50 text-xs font-light tracking-wide text-center md:text-left">
                &copy; {new Date().getFullYear()} Gabriel Pirillo. {t("footer_rights")}
              </p>
              <div className="flex gap-6 text-xs text-silver-200/50 font-light underline-offset-4 decoration-carbon-700/50">
                {/* Legals Removed per request */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
