"use client";

import type { ReactNode } from "react";
import { rich } from "@/lib/rich";

export function Tag({ children }: { children: ReactNode }) {
  return <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/60">{children}</span>;
}

export function SynexLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/synex-logo.png" alt="SYNEX" className={`w-auto ${className}`} />;
}

/* Cover at the top of a case-study modal: visual + brand row */
export function CaseCover({ product, children }: { product?: string; children: ReactNode }) {
  return (
    <div className="relative h-56 md:h-64 rounded-[22px] overflow-hidden border border-white/10 bg-[radial-gradient(120%_110%_at_50%_100%,#3a1206_0%,#120807_48%,#070606_100%)]">
      {children}
      <div className="absolute left-5 top-5 flex items-center gap-2.5">
        <SynexLogo className="h-3" />
        {product && <span className="text-[13px] font-medium text-white/60 border-l border-white/20 pl-2.5">{product}</span>}
      </div>
    </div>
  );
}

export function CaseIntro({ eyebrow, title, desc }: { eyebrow: ReactNode; title: string; desc: string }) {
  return (
    <div className="mt-7">
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {eyebrow}</span>
      <h3 className="mt-2 text-3xl md:text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.035em] text-white">{title}</h3>
      <p className="mt-4 text-base md:text-lg leading-relaxed text-white/65">{rich(desc)}</p>
    </div>
  );
}

export function StatPair({ a, b }: { a: [string, string]; b: [string, string] }) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-3">
      <div className="glass-ember rounded-[22px] px-5 py-5">
        <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">{a[0]}</span>
        <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/90">{a[1]}</span>
      </div>
      <div className="glass rounded-[22px] px-5 py-5">
        <span className="relative z-10 block text-4xl font-bold tracking-[-0.05em] leading-none text-white">{b[0]}</span>
        <span className="relative z-10 mt-2 block text-[13px] text-white/55">{b[1]}</span>
      </div>
    </div>
  );
}

/* Value proposition: motion widget + title + description (+ benefit) */
export function ValueCard({ Motion, title, desc, benefit, wide = false }: { Motion: () => ReactNode; title: string; desc: string; benefit?: string; wide?: boolean }) {
  return (
    <li className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 flex flex-col ${wide ? "sm:col-span-2" : ""}`}>
      <div className="pm-stage sx-stage relative h-36 rounded-xl overflow-hidden border border-white/[0.06] bg-[linear-gradient(180deg,#121010_0%,#0b0a0a_100%)]">
        <Motion />
      </div>
      <div className="px-3 pt-4 pb-3 flex-1 flex flex-col">
        <span className="block text-[15px] font-semibold text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-white/55 flex-1">{rich(desc)}</span>
        {benefit && (
          <span className="mt-3 self-start inline-flex items-center gap-1.5 rounded-full bg-ember-500/12 border border-ember-500/25 px-2.5 py-1 text-[11px] font-semibold text-ember-400">
            <span className="w-1 h-1 rounded-full bg-ember-500" />
            {benefit}
          </span>
        )}
      </div>
    </li>
  );
}

export function CardFooterLink({ label }: { label: string }) {
  return (
    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ember-400">
      {label}
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* Spain flag (inline SVG: emoji flags don't render on Windows) */
export function FlagES({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={`inline-block w-[18px] h-3 rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)] ${className}`} aria-label="España">
      <rect width="3" height="2" fill="#AA151B" />
      <rect y="0.5" width="3" height="1" fill="#F1BF00" />
    </svg>
  );
}
