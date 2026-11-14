"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useTx } from "@/lib/i18n";
import { archivo, publicSans, signature } from "@/lib/brand-fonts";

/* Brand board: each client's design system shown in its OWN look
   (logo, palette, type, components, tokens). Cells rise in when scrolled
   into view; the specimen and a few components stay alive on a loop. */

type Swatch = { n: string; hex: string; big?: boolean };
type Theme = { bg: string; surface: string; ink: string; sub: string; line: string; radius: number; font?: string };

const v = (o: Record<string, string | number>) => o as CSSProperties;

function light(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

function Cell({ d, className = "", style, children }: { d: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`bb-cell relative min-w-0 ${className}`} style={{ ...style, ...v({ "--d": d }) }}>
      {children}
    </div>
  );
}
function Cap({ children, color }: { children: ReactNode; color: string }) {
  return <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color }}>{children}</span>;
}

function Board({
  theme,
  logo,
  logoBg,
  second,
  secondBg,
  palette,
  strip,
  display,
  displayLabel,
  sample,
  ui,
  tokens,
  className = "",
}: {
  theme: Theme;
  logo: ReactNode;
  logoBg: string;
  second: ReactNode;
  secondBg?: string;
  palette: Swatch[];
  strip?: { label: string; css: string };
  display: CSSProperties;
  displayLabel: string;
  sample: ReactNode;
  ui: ReactNode;
  tokens?: ReactNode;
  className?: string;
}) {
  const tx = useTx();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.dataset.in = "true", io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const t = theme;
  return (
    <div
      ref={ref}
      data-in="false"
      className={`bb mt-5 overflow-hidden rounded-[24px] border ${className}`}
      style={{ background: t.line, borderColor: t.line, color: t.ink, fontFamily: t.font }}
    >
      <div className="grid gap-px">
        {/* Logo + secondary mark */}
        <div className="grid sm:grid-cols-[1.3fr_1fr] gap-px">
          <Cell d={0} className="h-44 sm:h-52 grid place-items-center overflow-hidden" style={{ background: logoBg }}>
            <div className="bb-logo">{logo}</div>
            <span className="absolute left-4 bottom-3"><Cap color={light(logoBg) ? t.sub : "rgba(255,255,255,0.6)"}>{tx("Logotipo", "Logo")}</Cap></span>
          </Cell>
          <Cell d={90} className="h-44 sm:h-52 grid place-items-center overflow-hidden" style={{ background: secondBg ?? t.surface }}>
            {second}
          </Cell>
        </div>

        {/* Palette */}
        <Cell d={180} className="p-4 sm:p-5" style={{ background: t.surface }}>
          <Cap color={t.sub}>{tx("Color", "Color")}</Cap>
          <div className="mt-3 flex gap-1.5 sm:gap-2 h-32 sm:h-36">
            {palette.map((s, i) => (
              <div
                key={s.hex + s.n}
                className={`bb-swatch relative min-w-0 overflow-hidden flex flex-col justify-end p-2 sm:p-2.5 ${s.big ? "flex-[1.8]" : "flex-1"}`}
                style={{ background: s.hex, borderRadius: Math.min(t.radius, 16), boxShadow: s.hex.toLowerCase() === t.surface.toLowerCase() ? `inset 0 0 0 1px ${t.line}` : undefined, ...v({ "--i": i }) }}
              >
                <span className="text-[10px] sm:text-[11px] font-semibold leading-tight truncate" style={{ color: light(s.hex) ? "#111" : "#fff" }}>{s.n}</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase opacity-70 truncate" style={{ color: light(s.hex) ? "#111" : "#fff" }}>{s.hex}</span>
              </div>
            ))}
          </div>
          {strip && (
            <div className="mt-3">
              <div className="bb-strip h-2.5 rounded-full" style={{ background: strip.css }} />
              <span className="mt-1.5 block text-[10px]" style={{ color: t.sub }}>{strip.label}</span>
            </div>
          )}
        </Cell>

        {/* Type + components */}
        <div className="grid sm:grid-cols-2 gap-px">
          <Cell d={270} className="p-4 sm:p-5 min-h-[200px] flex flex-col" style={{ background: t.surface }}>
            <Cap color={t.sub}>{tx("Tipografía", "Typography")}</Cap>
            <div className="mt-2 flex items-end gap-4">
              <span className="bb-aa text-[76px] sm:text-[88px] leading-[0.9] tracking-[-0.04em]" style={display}>Aa</span>
              <span className="pb-2 text-[11px] leading-snug" style={{ color: t.sub }}>{displayLabel}</span>
            </div>
            <div className="mt-auto pt-4">{sample}</div>
          </Cell>
          <Cell d={360} className="p-4 sm:p-5 min-h-[200px] flex flex-col" style={{ background: t.surface }}>
            <Cap color={t.sub}>{tx("Componentes", "Components")}</Cap>
            <div className="mt-3 flex-1 flex flex-col justify-center gap-2.5">{ui}</div>
          </Cell>
        </div>

        {tokens && (
          <Cell d={450} className="p-4 sm:p-5" style={{ background: t.bg }}>
            {tokens}
          </Cell>
        )}
      </div>
    </div>
  );
}

function Header({ title, note }: { title: ReactNode; note: string }) {
  const tx = useTx();
  return (
    <>
      <span className="text-[13px] font-medium text-ember-400"><span className="font-semibold">{"//"}</span> {tx("Identidad visual", "Visual identity")}</span>
      <h4 className="mt-2 pr-12 md:pr-0 text-2xl md:text-[1.7rem] font-semibold tracking-[-0.03em] text-white">{title}</h4>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{note}</p>
    </>
  );
}

function Radii({ list, color, line, fill }: { list: [string, number][]; color: string; line: string; fill: string }) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {list.map(([n, r]) => (
        <span key={n} className="flex flex-col items-center gap-1.5">
          <span className="w-12 h-12 border" style={{ borderRadius: r, borderColor: line, background: fill }} />
          <span className="text-[10px] font-mono" style={{ color }}>{n}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- FUTURA */
export function FuturaBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#f7f8f8", surface: "#ffffff", ink: "#161a19", sub: "#6a706e", line: "#e6e9e9", radius: 22 };
  const scale = ["#f1faf6", "#ddf3ea", "#bbe7d6", "#91d7bd", "#6bc2a4", "#5fa896", "#479183", "#37766a", "#2e5f56", "#274e47"];
  return (
    <div className="mt-10">
      <Header
        title={<>{tx("Sistema de diseño", "Design system")} <span className="text-white/45">“Aurora”</span></>}
        note={tx(
          "Un verde clínico anclado en el color histórico del logo, superficies suaves y sombras difusas: una plataforma médica compleja que se siente liviana, calmada y confiable.",
          "A clinical green anchored in the logo's original color, soft surfaces and diffuse shadows: a complex medical platform that feels light, calm and trustworthy.",
        )}
      />
      <Board
        theme={t}
        logoBg="#f7f8f8"
        logo={
          <span className="inline-flex items-center">
            <span className="text-[44px] sm:text-[52px] font-extrabold tracking-[0.01em] text-[#161a19] leading-none">FUTURA</span>
            <span className="ml-3 w-4 h-4 rounded-full bg-[#5fa896] shadow-[0_10px_30px_-8px_rgba(71,145,131,0.6)]" />
          </span>
        }
        secondBg="#f7f8f8"
        second={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/futura/panel.webp" alt={tx("Panel de FUTURA", "FUTURA dashboard")} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-left-top" />
        }
        palette={[
          { n: tx("Marca", "Brand"), hex: "#5FA896", big: true },
          { n: tx("Acento", "Accent"), hex: "#479183" },
          { n: tx("Profundo", "Deep"), hex: "#2E5F56" },
          { n: tx("Tinta", "Ink"), hex: "#161A19" },
          { n: tx("Lienzo", "Canvas"), hex: "#F7F8F8" },
        ]}
        strip={{ label: tx("Escala de marca 50 → 900", "Brand scale 50 → 900"), css: `linear-gradient(90deg, ${scale.join(", ")})` }}
        display={{ fontWeight: 700, color: "#161a19" }}
        displayLabel={tx("Inter · escala tipográfica +20 % para lectura clínica", "Inter · type scale +20% for clinical reading")}
        sample={
          <div>
            <span className="block text-[20px] font-bold tracking-[-0.02em]">{tx("Agenda de hoy", "Today's schedule")}</span>
            <span className="block text-[13px] text-[#6a706e]">{tx("12 citas · 2 huecos recuperados", "12 appointments · 2 slots recovered")}</span>
          </div>
        }
        ui={
          <>
            <div className="flex flex-wrap gap-2">
              <span className="bb-press rounded-full bg-[#479183] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(71,145,131,0.45)]">{tx("Agendar cita", "Book appointment")}</span>
              <span className="rounded-full border border-[#d5dad9] bg-white px-4 py-2 text-[12px] font-semibold text-[#161a19]">{tx("Ver ficha", "View record")}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-[22px] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(22,26,25,0.04),0_8px_24px_-12px_rgba(22,26,25,0.18)] border border-[#eff1f1]">
              <span className="w-8 h-8 rounded-full bg-[#ddf3ea] text-[#37766a] grid place-items-center text-[11px] font-bold">CH</span>
              <span className="flex-1 leading-tight">
                <span className="block text-[12px] font-semibold">Carla H.</span>
                <span className="block text-[11px] text-[#6a706e]">15:00 · {tx("Fisioterapia", "Physiotherapy")}</span>
              </span>
              <span className="rounded-full bg-[#dcf7ec] px-2 py-0.5 text-[10px] font-semibold text-[#10b981]">{tx("Confirmada", "Confirmed")}</span>
            </div>
            <span className="flex items-center gap-2 rounded-[14px] border border-[#e6e9e9] bg-[#fbfcfc] px-3 py-2 text-[12px] text-[#a0a6a4]">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" /></svg>
              {tx("Buscar paciente", "Search patient")}<span className="bb-caret w-px h-3.5 bg-[#479183]" />
            </span>
          </>
        }
        tokens={
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Cap color={t.sub}>{tx("Radios", "Radius")}</Cap>
              <div className="mt-2"><Radii list={[["field 14", 14], ["card 22", 22], ["panel 26", 26], ["pill", 999]]} color={t.sub} line="#d5dad9" fill="#fbfcfc" /></div>
            </div>
            <div>
              <Cap color={t.sub}>{tx("Elevación", "Elevation")}</Cap>
              <div className="mt-2 flex gap-3">
                {["0 1px 2px rgba(22,26,25,0.04),0 8px 24px -12px rgba(22,26,25,0.12)", "0 2px 4px rgba(22,26,25,0.04),0 18px 40px -18px rgba(22,26,25,0.2)", "0 10px 30px -8px rgba(71,145,131,0.45)"].map((s, i) => (
                  <span key={i} className="flex flex-col items-center gap-1.5">
                    <span className="w-12 h-12 rounded-[14px] bg-white" style={{ boxShadow: s }} />
                    <span className="text-[10px] font-mono text-[#6a706e]">{["soft", "lifted", "glow"][i]}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

/* ---------------------------------------------------------------- SYNEX */
export function SynexBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#0a0806", surface: "#0f0b09", ink: "#ffffff", sub: "#8a8079", line: "#2a211b", radius: 22, font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", var(--font-inter), sans-serif' };
  return (
    <div className="mt-10">
      <Header
        title={<>{tx("Sistema de diseño", "Design system")} <span className="text-white/45">“Molten”</span></>}
        note={tx(
          "Negros cálidos y un naranja fundido sacados del flyer de la productora: la misma identidad vive en el póster, en la app de comunidad y en la de finanzas.",
          "Warm blacks and a molten orange taken from the promoter's flyer: one identity across the poster, the community app and the finance app.",
        )}
      />
      <Board
        theme={t}
        logoBg="#0a0806"
        logo={
          <span className="flex flex-col items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/synex/isotype-red.webp" alt="SYNEX" className="bb-float w-20 sm:w-24 h-auto drop-shadow-[0_0_30px_rgba(255,61,20,0.45)]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/synex-logo.png" alt="" className="h-3.5 w-auto" />
          </span>
        }
        secondBg="#0a0806"
        second={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/synex/poster.webp" alt={tx("Póster de SYNEX", "SYNEX poster")} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" />
        }
        palette={[
          { n: "Flame", hex: "#FF3D14", big: true },
          { n: "Ember", hex: "#FF6A1F" },
          { n: "Amber", hex: "#FF9A3C" },
          { n: "Card", hex: "#16110D" },
          { n: "Muted", hex: "#B3AAA2" },
        ]}
        strip={{ label: tx("Gradiente molten · 145°", "Molten gradient · 145°"), css: "linear-gradient(90deg, #ff8a3c 0%, #ff3d14 52%, #cf1420 100%)" }}
        display={{ fontWeight: 700, color: "#ffffff" }}
        displayLabel={tx("SF Pro Display · SF Mono para cifras", "SF Pro Display · SF Mono for figures")}
        sample={
          <div>
            <span className="block text-[20px] font-bold tracking-[-0.02em]">{tx("Esta noche · Club", "Tonight · Club")}</span>
            <span className="block font-mono text-[13px] text-[#b3aaa2] tabular-nums">23:30 → 06:00 · 2.340 pts</span>
          </div>
        }
        ui={
          <>
            <span className="bb-press self-start rounded-full px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(255,90,30,0.55)]" style={{ background: "linear-gradient(145deg,#ff8a3c 0%,#ff3d14 52%,#cf1420 100%)" }}>
              {tx("Comprar entrada", "Get ticket")}
            </span>
            <div className="flex items-center gap-3 rounded-[22px] border border-[#2a211b] bg-[#16110d] px-3.5 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/synex/isotype.webp" alt="" className="w-7 h-auto opacity-80" />
              <span className="flex-1 leading-tight">
                <span className="block text-[12px] font-semibold">{tx("Nivel 3 · Resident", "Level 3 · Resident")}</span>
                <span className="mt-1 block h-1.5 rounded-full bg-[#2a211b] overflow-hidden"><span className="bb-fill block h-full w-[68%] rounded-full bg-[#ff6a1f]" /></span>
              </span>
              <span className="font-mono text-[11px] text-[#ff9a3c]">68%</span>
            </div>
            <span className="self-start inline-flex items-center gap-1.5 rounded-full border border-[#ff3d14]/50 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#ff9a3c]">
              <span className="bb-live w-1.5 h-1.5 rounded-full bg-[#ff3d14]" /> LIVE
            </span>
          </>
        }
      />
    </div>
  );
}

/* ---------------------------------------------------------------- Realty (REMAX) */
export function RealtyBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#ffffff", surface: "#ffffff", ink: "#0d1b3e", sub: "#5a6680", line: "#e3e8f2", radius: 14, font: "var(--font-public-sans), sans-serif" };
  return (
    <div className={`mt-10 ${archivo.variable} ${publicSans.variable} ${signature.variable}`}>
      <Header
        title={tx("Sistema de diseño REMAX × Realty", "REMAX × Realty design system")}
        note={tx(
          "Construido sobre el azul y el rojo de REMAX, con Archivo para titular y Public Sans para leer: la plataforma se siente parte de la franquicia, y una firma manuscrita le da el toque humano a cada documento.",
          "Built on REMAX blue and red, with Archivo for headlines and Public Sans for reading: the platform feels part of the franchise, and a handwritten signature adds the human touch to every document.",
        )}
      />
      <Board
        theme={t}
        logoBg="#ffffff"
        logo={
          <span className="flex flex-col items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/realty/realty-logo.png" alt="Realty by Brandboost" className="h-16 sm:h-20 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/realty/remax.svg" alt="REMAX" className="h-4 w-auto" />
          </span>
        }
        secondBg="#003da5"
        second={
          <span className="flex flex-col items-center gap-2 text-white">
            <span className="text-[13px] font-semibold tracking-[0.02em] text-white/70" style={{ fontFamily: "var(--font-archivo)" }}>{tx("Firma digital", "E-signature")}</span>
            <span className="bb-wipe block text-[38px] sm:text-[52px] leading-none text-white whitespace-nowrap" style={{ fontFamily: "var(--font-signature)" }}>Carmen López</span>
            <span className="h-px w-48 bg-white/40" />
          </span>
        }
        palette={[
          { n: "REMAX Blue", hex: "#003DA5", big: true },
          { n: "REMAX Red", hex: "#DC1C2E" },
          { n: tx("Profundo", "Deep"), hex: "#002C78" },
          { n: tx("Tinta", "Ink"), hex: "#0D1B3E" },
          { n: "Sky", hex: "#EEF4FF" },
        ]}
        strip={{ label: tx("Tonos de estado · menta, lavanda, arena, rosa", "Status tints · mint, lavender, sand, rose"), css: "linear-gradient(90deg, #eaf7f1 0 25%, #f3f1fc 25% 50%, #fbf7ef 50% 75%, #fdf0f1 75% 100%)" }}
        display={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontStretch: "125%", color: "#0d1b3e" }}
        displayLabel={tx("Archivo (ancha) para titulares · Public Sans para textos · Mrs Saint Delafield para firmas", "Archivo (wide) for headlines · Public Sans for text · Mrs Saint Delafield for signatures")}
        sample={
          <div>
            <span className="block text-[20px] leading-tight tracking-[-0.01em]" style={{ fontFamily: "var(--font-archivo)", fontWeight: 800 }}>
              {tx("Toda tu oficina, ", "Your whole office, ")}<span className="text-[#003da5]">{tx("conectada.", "connected.")}</span>
            </span>
            <span className="block text-[13px] text-[#5a6680]">{tx("CRM, contratos y comisiones en un solo sistema", "CRM, contracts and commissions in one system")}</span>
          </div>
        }
        ui={
          <>
            <div className="flex flex-wrap gap-2">
              <span className="bb-press rounded-[10px] bg-[#003da5] px-4 py-2 text-[12px] font-semibold text-white">{tx("Agendar visita", "Book viewing")}</span>
              <span className="rounded-[10px] bg-[#dc1c2e] px-4 py-2 text-[12px] font-semibold text-white">{tx("Firmar", "Sign")}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-[14px] border border-[#e3e8f2] bg-white px-3 py-2.5">
              <span className="w-8 h-8 rounded-full bg-[#003da5] text-white grid place-items-center text-[11px] font-bold">MR</span>
              <span className="flex-1 leading-tight">
                <span className="block text-[12px] font-semibold">Marta R.</span>
                <span className="block text-[11px] text-[#5a6680]">10:30 · Los Leones 1240</span>
              </span>
              <span className="rounded-full bg-[#eef4ff] px-2 py-0.5 text-[10px] font-semibold text-[#003da5]">{tx("Visita", "Viewing")}</span>
            </div>
            <div className="flex gap-1.5">
              {[["#eaf7f1", "#137a52", tx("Realizado", "Done")], ["#fbf7ef", "#9a6a12", tx("Pendiente", "Pending")], ["#fdf0f1", "#b8131f", tx("Urgente", "Urgent")]].map(([b, c, l]) => (
                <span key={l} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ background: b, color: c }}>{l}</span>
              ))}
            </div>
          </>
        }
      />
    </div>
  );
}

/* ---------------------------------------------------------------- Smile Fast */
export function SmileBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#ffffff", surface: "#ffffff", ink: "#181818", sub: "#8a8f8d", line: "#ebeeed", radius: 999 };
  return (
    <div className="mt-10">
      <Header
        title={tx("Sistema de diseño clínico y monocromo", "Clinical, monochrome design system")}
        note={tx(
          "Blanco, negro y un gris salvia: la protagonista es la sonrisa del paciente, y el widget se integra en la web de cualquier clínica sin competir con su marca.",
          "White, black and a sage gray: the patient's smile is the hero, and the widget fits into any clinic's website without competing with its brand.",
        )}
      />
      <Board
        theme={t}
        logoBg="#181818"
        logo={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/smilefast/logo.png" alt="Smile Fast" className="h-9 sm:h-10 w-auto" />
        }
        secondBg="#f5f8f7"
        second={
          <span className="grid place-items-center">
            <span className="relative grid place-items-center w-20 h-20 rounded-full bg-[#181818]">
              <span className="w-8 h-8 rounded-full border-[3px] border-white" />
              <span className="bb-pulse absolute inset-0 rounded-full border border-[#181818]/30" />
            </span>
            <span className="mt-3 font-mono text-[10px] tracking-[0.3em] text-[#8a8f8d] flex items-center gap-1.5"><span className="bb-live w-1.5 h-1.5 rounded-full bg-[#9aa3a0]" />ONLINE</span>
          </span>
        }
        palette={[
          { n: tx("Tinta", "Ink"), hex: "#181818", big: true },
          { n: tx("Salvia", "Sage"), hex: "#9AA3A0" },
          { n: tx("Retrato", "Portrait"), hex: "#9CB4CC" },
          { n: tx("Campo", "Field"), hex: "#F5F8F7" },
          { n: tx("Lienzo", "Canvas"), hex: "#FFFFFF" },
        ]}
        display={{ fontWeight: 700, color: "#181818" }}
        displayLabel={tx("Grotesca de alto contraste · monoespaciada para estados", "High-contrast grotesque · monospace for states")}
        sample={
          <span className="block text-[21px] font-bold leading-tight tracking-[-0.025em]">
            {tx("Comienza tu ", "Start your ")}<span className="text-[#9aa3a0]">{tx("transformación", "transformation")}</span>
          </span>
        }
        ui={
          <>
            <div className="flex items-center">
              {[1, 2, 3, 4].map((n, i) => (
                <span key={n} className="flex items-center flex-1 last:flex-none">
                  <span className={`grid place-items-center w-7 h-7 rounded-full border text-[11px] ${i === 0 ? "border-[#181818] bg-[#181818] text-white" : "border-[#dfe3e2] text-[#8a8f8d]"}`}>{n}</span>
                  {i < 3 && <span className="flex-1 h-px bg-[#dfe3e2] mx-1" />}
                </span>
              ))}
            </div>
            <span className="rounded-full bg-[#f5f8f7] border border-[#ebeeed] px-4 py-2.5 text-[12px] text-[#181818]">María González<span className="bb-caret inline-block align-middle ml-0.5 w-px h-3.5 bg-[#181818]" /></span>
            <span className="bb-press rounded-full bg-[#181818] py-2.5 text-center text-[12px] font-semibold text-white">{tx("Continuar", "Continue")}</span>
          </>
        }
      />
    </div>
  );
}
