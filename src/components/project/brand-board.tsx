"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useTx } from "@/lib/i18n";
import { archivo, publicSans } from "@/lib/brand-fonts";

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
  showcase,
  className = "",
}: {
  theme: Theme;
  logo: ReactNode;
  logoBg: string;
  second?: ReactNode;
  secondBg?: string;
  showcase?: ReactNode;
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
        <div className={`grid gap-px ${second ? "sm:grid-cols-[1.3fr_1fr]" : ""}`}>
          <Cell d={0} className="h-44 sm:h-52 grid place-items-center overflow-hidden" style={{ background: logoBg }}>
            <div className="bb-logo">{logo}</div>
            <span className="absolute left-4 bottom-3"><Cap color={light(logoBg) ? t.sub : "rgba(255,255,255,0.6)"}>{tx("Logotipo", "Logo")}</Cap></span>
          </Cell>
          {second && (
            <Cell d={90} className="h-44 sm:h-52 grid place-items-center overflow-hidden" style={{ background: secondBg ?? t.surface }}>
              {second}
            </Cell>
          )}
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
            </div>
          )}
        </Cell>

        {/* Type + components */}
        <div className="grid sm:grid-cols-2 gap-px">
          <Cell d={270} className="p-4 sm:p-5 min-h-[200px] flex flex-col" style={{ background: t.surface }}>
            <Cap color={t.sub}>{tx("Tipografía", "Typography")}</Cap>
            <div className="mt-2 flex items-end gap-4">
              <span className="text-[76px] sm:text-[88px] leading-[0.9] tracking-[-0.04em]" style={display}>Aa</span>
              <span className="pb-2 text-[11px] leading-snug" style={{ color: t.sub }}>{displayLabel}</span>
            </div>
            <div className="mt-auto pt-4">{sample}</div>
          </Cell>
          <Cell d={360} className="p-4 sm:p-5 min-h-[200px] flex flex-col" style={{ background: t.surface }}>
            <Cap color={t.sub}>{tx("Componentes", "Components")}</Cap>
            <div className="mt-3 flex-1 flex flex-col justify-center gap-2.5">{ui}</div>
          </Cell>
        </div>

        {showcase && (
          <Cell d={420} className="p-4 sm:p-5" style={{ background: t.bg }}>
            {showcase}
          </Cell>
        )}

        {tokens && (
          <Cell d={450} className="p-4 sm:p-5" style={{ background: t.bg }}>
            {tokens}
          </Cell>
        )}
      </div>
    </div>
  );
}

function Header({ title, note, light = false, accent = "#37766a", ink = "#161a19", sub = "#6a706e" }: { title: ReactNode; note: string; light?: boolean; accent?: string; ink?: string; sub?: string }) {
  const tx = useTx();
  return (
    <>
      <span className={`text-[13px] ${light ? "font-semibold" : "font-medium text-ember-400"}`} style={light ? { color: accent } : undefined}><span className="font-semibold">{"//"}</span> {tx("Identidad visual", "Visual identity")}</span>
      <h4 className={`mt-2 pr-12 md:pr-0 text-2xl md:text-[1.7rem] font-semibold tracking-[-0.03em] ${light ? "" : "text-white"}`} style={light ? { color: ink } : undefined}>{title}</h4>
      <p className={`mt-3 text-[15px] leading-relaxed ${light ? "" : "text-white/60"}`} style={light ? { color: sub } : undefined}>{note}</p>
    </>
  );
}

/* ---------------------------------------------------------------- FUTURA */
/* The dashboard's main block, "Hoy": next appointments on a timeline and the
   assistant clearing what needs attention, live. Names without surnames. */
function FuturaToday() {
  const tx = useTx();
  const slots = [
    { h: "15:00", n: "Carla H.", s: tx("Visita recurrente", "Recurring visit") },
    { h: "15:30", n: "Manuel L.", s: tx("Primera visita", "First visit") },
    { h: "16:00", n: "Olivia F.", s: tx("Desde lista de espera", "From the waitlist") },
    { h: "16:30", n: "Saúl C.", s: tx("Revisión", "Check-up") },
  ];
  const att: [string, string, string][] = [
    ["20", "14", tx("sin confirmar · hoy y mañana", "unconfirmed · today and tomorrow")],
    ["19", "12", tx("esperan a una persona en WhatsApp", "waiting for a person on WhatsApp")],
    ["0", "2", tx("huecos ofrecidos a la lista de espera", "slots offered to the waitlist")],
  ];
  return (
    <div className="fl-hero rounded-[22px] overflow-hidden grid md:grid-cols-[1.55fr_1fr]">
      <div className="relative z-10 p-4 sm:p-5">
        <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55">{tx("Hoy", "Today")}</span>
        <span className="mt-1 block text-[18px] font-bold tracking-[-0.02em] text-white">{tx("Miércoles, 11 de noviembre", "Wednesday, November 11")}</span>
        <span className="block text-[12px] text-white/55">{tx("10 citas · siguiente a las 15:00", "10 appointments · next at 3:00 pm")}</span>
        <div className="relative mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {slots.map((x, i) => (
            <div key={x.h} className={`sd-k sd-in${4 + i * 4} relative rounded-[14px] px-2.5 py-2 ${i === 0 ? "bg-white text-[#161a19] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]" : "bg-white/[0.08] border border-white/15 text-white"}`} style={{ ["--from" as string]: "translateY(10px)" }}>
              <span className="flex items-center justify-between">
                <span className="text-[12px] font-bold tabular-nums">{x.h}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#479183]" : "bg-white/40"}`} />
              </span>
              <span className="mt-1 block text-[11px] font-semibold truncate">{x.n}</span>
              <span className={`block text-[9px] ${i === 0 ? "text-[#6a706e]" : "text-white/50"}`}>{x.s}</span>
              {i === 0 && (
                <span className="relative mt-1.5 block h-[16px]">
                  <span className="fdh-a absolute left-0 rounded-full bg-[#ddf3ea] px-1.5 py-[1px] text-[8px] font-bold text-[#37766a]">{tx("SIGUIENTE", "NEXT")}</span>
                  <span className="fdh-b absolute left-0 rounded-full bg-[#dcf7ec] px-1.5 py-[1px] text-[8px] font-bold text-[#10b981]">{tx("CONFIRMADA", "CONFIRMED")}</span>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="fdh-toast mt-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]">
          <span className="grid place-items-center w-4 h-4 rounded-full bg-[#25D366] text-white">
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="text-[11px] font-semibold text-[#161a19]">{tx("Carla confirmó por WhatsApp", "Carla confirmed on WhatsApp")}</span>
        </div>
      </div>
      <div className="relative z-10 m-2 md:ml-0 rounded-[18px] bg-white/[0.92] p-4">
        <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#6a706e]">{tx("Requiere atención", "Needs attention")}</span>
        <div className="mt-3 flex flex-col gap-2.5">
          {att.map(([a, b, l]) => (
            <div key={l} className="flex items-center gap-3">
              <span className="relative w-9 h-7 shrink-0 text-[20px] font-bold tabular-nums text-[#161a19]">
                <span className="fdh-a absolute left-0 top-0 leading-7">{a}</span>
                <span className="fdh-b absolute left-0 top-0 leading-7 text-[#479183]">{b}</span>
              </span>
              <span className="text-[11px] leading-snug text-[#6a706e]">{l}</span>
            </div>
          ))}
        </div>
        <span className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-[#37766a]">
          <span className="bb-live w-1.5 h-1.5 rounded-full bg-[#479183]" /> {tx("El asistente lo está resolviendo", "The assistant is handling it")}
        </span>
      </div>
    </div>
  );
}


export function FuturaBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#f7f8f8", surface: "#ffffff", ink: "#161a19", sub: "#6a706e", line: "#e6e9e9", radius: 22 };
  const scale = ["#f1faf6", "#ddf3ea", "#bbe7d6", "#91d7bd", "#6bc2a4", "#5fa896", "#479183", "#37766a", "#2e5f56", "#274e47"];
  return (
    <div className="mt-10">
      <Header
        light
        title={<>{tx("Sistema de diseño", "Design system")} <span className="text-[#479183]">“Aurora”</span></>}
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
            <span className="block text-[13px] text-[#6a706e]">{tx("10 citas · 2 huecos recuperados", "10 appointments · 2 slots recovered")}</span>
          </div>
        }
        showcase={<FuturaToday />}
        ui={
          <>
            <div className="flex flex-wrap gap-2">
              <span className="bb-press fl-primary rounded-full px-4 py-2 text-[12px] font-semibold">{tx("Agendar cita", "Book appointment")}</span>
              <span className="fl-glassbtn rounded-full px-4 py-2 text-[12px] font-semibold">{tx("Ver ficha", "View record")}</span>
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
      />
    </div>
  );
}

/* ---------------------------------------------------------------- SYNEX */
export function SynexBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#0a0806", surface: "#0f0b09", ink: "#ffffff", sub: "#8a8079", line: "#2a211b", radius: 22, font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", var(--font-inter), sans-serif' };
  const streak = [1, 1, 1, 1, 1, 0, 0];
  return (
    <div className="mt-10">
      <Header
        title={<>{tx("Sistema de diseño", "Design system")} <span className="text-[#ff6a1f]">“Molten”</span></>}
        note={tx(
          "Negros cálidos y un naranja fundido sacados del flyer de la productora: la misma identidad vive en el póster, en la app de comunidad y en la de finanzas.",
          "Warm blacks and a molten orange taken from the promoter's flyer: one identity across the poster, the community app and the finance app.",
        )}
      />
      <Board
        theme={t}
        logoBg="radial-gradient(120% 120% at 50% 120%, rgba(255,61,20,0.28), transparent 60%), #0a0806"
        logo={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/synex-logo.png" alt="SYNEX" className="h-6 sm:h-7 w-auto drop-shadow-[0_0_24px_rgba(255,106,31,0.35)]" />
        }
        palette={[
          { n: "Flame", hex: "#FF3D14", big: true },
          { n: "Ember", hex: "#FF6A1F" },
          { n: "Amber", hex: "#FF9A3C" },
          { n: "Card", hex: "#16110D" },
          { n: "Muted", hex: "#B3AAA2" },
        ]}
        strip={{ label: "", css: "linear-gradient(90deg, #ff8a3c 0%, #ff3d14 52%, #cf1420 100%)" }}
        display={{ fontWeight: 700, color: "#ffffff" }}
        displayLabel={tx("SF Pro Display · SF Mono para cifras", "SF Pro Display · SF Mono for figures")}
        sample={
          <div>
            <span className="block text-[20px] font-bold tracking-[-0.02em]">{tx("Esta noche · Club", "Tonight · Club")}</span>
            <span className="block font-mono text-[13px] text-[#b3aaa2] tabular-nums">23:30 → 06:00</span>
          </div>
        }
        ui={
          <>
            <span className="bb-press sx-molten self-start rounded-full px-5 py-2.5 text-[12px] font-semibold">{tx("Comprar entrada", "Get ticket")}</span>
            <div className="sx-glass rounded-[20px] px-4 py-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#b3aaa2]">{tx("Racha", "Streak")}</span>
                <span className="font-mono text-[11px] text-[#ff9a3c]">+100 PSY DOSIS</span>
              </div>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-[30px] font-bold leading-none tracking-[-0.04em]">5</span>
                <span className="pb-1 text-[12px] text-[#b3aaa2]">{tx("fechas seguidas", "nights in a row")}</span>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {streak.map((on, i) => (
                  <span key={i} className={`h-2 flex-1 rounded-full ${on ? "sx-streak" : "bg-[#2a211b]"} ${i === 4 ? "bb-live" : ""}`} />
                ))}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

/* ---------------------------------------------------------------- Realty (REMAX) */
export function RealtyBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#f7f9fd", surface: "#ffffff", ink: "#0d1b3e", sub: "#5a6680", line: "#e3e8f2", radius: 14, font: "var(--font-public-sans), sans-serif" };
  const spark = "M0 26 L12 22 L24 24 L36 16 L48 18 L60 10 L72 12 L90 3";
  return (
    <div className={`mt-10 ${archivo.variable} ${publicSans.variable}`}>
      <Header
        light
        accent="#003da5"
        ink="#0d1b3e"
        sub="#5a6680"
        title={tx("Sistema de diseño REMAX × Realty", "REMAX × Realty design system")}
        note={tx(
          "Construido sobre el azul y el rojo de REMAX, con Archivo para titular y Public Sans para leer: la plataforma se siente parte de la franquicia, con tarjetas, estados e indicadores pensados para el día a día de una oficina.",
          "Built on REMAX blue and red, with Archivo for headlines and Public Sans for reading: the platform feels part of the franchise, with cards, states and metrics designed for an office's daily work.",
        )}
      />
      <Board
        theme={t}
        logoBg="#ffffff"
        logo={
          <span className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/realty/realty-logo.png" alt="Realty by Brandboost" className="h-16 sm:h-20 w-auto" />
            <span className="hidden sm:block w-px h-12 bg-[#e3e8f2]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/realty/remax.svg" alt="REMAX" className="h-5 sm:h-6 w-auto" />
          </span>
        }
        palette={[
          { n: "REMAX Blue", hex: "#003DA5", big: true },
          { n: "REMAX Red", hex: "#DC1C2E" },
          { n: tx("Profundo", "Deep"), hex: "#002C78" },
          { n: tx("Tinta", "Ink"), hex: "#0D1B3E" },
          { n: "Sky", hex: "#EEF4FF" },
        ]}
        display={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontStretch: "125%", color: "#0d1b3e" }}
        displayLabel={tx("Archivo (ancha) para titulares · Public Sans para textos", "Archivo (wide) for headlines · Public Sans for text")}
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
              <span className="bb-press rx-btn rounded-full px-4 py-2 text-[12px] font-semibold">{tx("Agendar visita", "Book viewing")}</span>
              <span className="rx-btn-red rounded-full px-4 py-2 text-[12px] font-semibold">{tx("Captar", "List it")}</span>
              <span className="rx-glassbtn rounded-full px-4 py-2 text-[12px] font-semibold">{tx("Ver ficha", "View")}</span>
            </div>
            <span className="self-start flex rounded-full bg-[#eef4ff] p-1 text-[11px] font-semibold text-[#5a6680]">
              <span className="rounded-full bg-white px-3 py-1 text-[#003da5] shadow-[0_2px_8px_-2px_rgba(0,61,165,0.35)]">{tx("Semanal", "Weekly")}</span>
              <span className="px-3 py-1">{tx("Mensual", "Monthly")}</span>
              <span className="px-3 py-1">{tx("Anual", "Yearly")}</span>
            </span>
            <div className="flex gap-1.5">
              {[["#eaf7f1", "#137a52", tx("Realizado", "Done")], ["#fbf7ef", "#9a6a12", tx("Pendiente", "Pending")], ["#fdf0f1", "#b8131f", tx("Urgente", "Urgent")]].map(([b, c, l]) => (
                <span key={l} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ background: b, color: c }}>{l}</span>
              ))}
            </div>
          </>
        }
        showcase={
          <div className="grid sm:grid-cols-[1.15fr_1fr] gap-3">
            {/* Listing card */}
            <div className="rounded-[18px] bg-white border border-[#e3e8f2] overflow-hidden shadow-[0_18px_40px_-26px_rgba(13,27,62,0.45)]">
              <div className="relative h-32 bg-[linear-gradient(150deg,#c9d8f5,#8fb0f2_55%,#5a86d8)]">
                <svg viewBox="0 0 120 60" className="absolute inset-x-0 bottom-0 w-full h-24 text-white/70" fill="currentColor">
                  <path d="M10 60V34l18-12 18 12v26zM52 60V22l26-16 26 16v38z" />
                  <path d="M60 30h8v8h-8zM78 30h8v8h-8zM60 44h8v8h-8zM78 44h8v8h-8zM22 40h7v7h-7z" fill="#5a86d8" />
                </svg>
                <span className="absolute left-3 top-3 rounded-full bg-[#dc1c2e] px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(220,28,46,0.8)]">{tx("En venta", "For sale")}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#003da5]">96% match</span>
              </div>
              <div className="px-3.5 py-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[17px] font-extrabold text-[#0d1b3e]" style={{ fontFamily: "var(--font-archivo)" }}>UF 8.650</span>
                  <span className="text-[10px] font-semibold text-[#003da5]">{tx("Providencia", "Providencia")}</span>
                </div>
                <span className="mt-0.5 block text-[12px] text-[#5a6680]">{tx("3 dorm. · 2 baños · 98 m²", "3 bed · 2 bath · 98 m²")}</span>
                <div className="mt-2.5 flex items-center gap-2 border-t border-[#eef1f6] pt-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#003da5] text-white grid place-items-center text-[9px] font-bold">MR</span>
                  <span className="text-[11px] font-semibold text-[#0d1b3e]">Marta R.</span>
                  <span className="ml-auto text-[10px] text-[#5a6680]">{tx("Agente", "Agent")}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {/* KPI with sparkline */}
              <div className="rx-blue rounded-[18px] px-4 py-3.5">
                <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-white/70">{tx("Facturación vs meta", "Revenue vs goal")}</span>
                <div className="mt-1 flex items-end justify-between">
                  <span className="text-[26px] font-extrabold leading-none" style={{ fontFamily: "var(--font-archivo)" }}>72%</span>
                  <svg viewBox="0 0 90 30" className="w-28 h-9" fill="none">
                    <path className="rw-draw" pathLength={100} d={spark} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {/* Team leaderboard */}
              <div className="rounded-[18px] bg-white border border-[#e3e8f2] px-4 py-3">
                <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-[#5a6680]">{tx("Ranking de la oficina", "Office ranking")}</span>
                <div className="mt-2 flex items-center">
                  {[["MR", "#003da5"], ["LM", "#dc1c2e"], ["AS", "#002c78"], ["CG", "#5a86d8"]].map(([n, c], i) => (
                    <span key={n} className="w-8 h-8 -ml-2 first:ml-0 rounded-full border-2 border-white grid place-items-center text-[10px] font-bold text-white" style={{ background: c, zIndex: 4 - i }}>{n}</span>
                  ))}
                  <span className="ml-3 rounded-full bg-[#eaf7f1] px-2 py-0.5 text-[10px] font-bold text-[#137a52]">▲ 1</span>
                  <span className="ml-auto text-[18px] font-extrabold text-[#0d1b3e]" style={{ fontFamily: "var(--font-archivo)" }}>18</span>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

/* ---------------------------------------------------------------- Smile Fast */
export function SmileBrand() {
  const tx = useTx();
  const t: Theme = { bg: "#f5f8f7", surface: "#ffffff", ink: "#181818", sub: "#8a8f8d", line: "#ebeeed", radius: 999 };
  const steps = [tx("Datos", "Details"), tx("Foto", "Photo"), tx("Análisis", "Analysis"), tx("Resultado", "Result")];
  return (
    <div className="mt-10">
      <Header
        light
        accent="#181818"
        ink="#181818"
        sub="#6e7472"
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
        palette={[
          { n: tx("Tinta", "Ink"), hex: "#181818", big: true },
          { n: tx("Salvia", "Sage"), hex: "#9AA3A0" },
          { n: tx("Retrato", "Portrait"), hex: "#9CB4CC" },
          { n: tx("Campo", "Field"), hex: "#F5F8F7" },
          { n: tx("Lienzo", "Canvas"), hex: "#FFFFFF" },
        ]}
        display={{ fontWeight: 700, color: "#181818" }}
        displayLabel={tx("Títulos en negrita con la palabra clave en gris salvia", "Bold headings with the key word in sage gray")}
        sample={
          <span className="block text-[21px] font-bold leading-tight tracking-[-0.025em]">
            {tx("Comienza tu ", "Start your ")}<span className="text-[#9aa3a0]">{tx("transformación", "transformation")}</span>
          </span>
        }
        ui={
          <>
            <div className="flex items-start">
              {steps.map((l, i) => (
                <span key={l} className="flex-1 flex flex-col items-center gap-1.5 relative">
                  {i > 0 && <span className="absolute right-1/2 top-[13px] w-full h-px bg-[#dfe3e2] -z-0" />}
                  <span className={`relative grid place-items-center w-7 h-7 rounded-full border text-[11px] ${i === 0 ? "border-[#181818] bg-white text-[#181818] shadow-[0_0_0_3px_rgba(24,24,24,0.08)]" : "border-[#dfe3e2] bg-white text-[#8a8f8d]"}`}>{i + 1}</span>
                  <span className={`text-[10px] ${i === 0 ? "font-semibold text-[#181818]" : "text-[#8a8f8d]"}`}>{l}</span>
                </span>
              ))}
            </div>
            <span className="rounded-full bg-[#f5f8f7] border border-[#ebeeed] px-4 py-2.5 text-[12px] text-[#181818]">María González<span className="bb-caret inline-block align-middle ml-0.5 w-px h-3.5 bg-[#181818]" /></span>
            <span className="flex items-center gap-2 text-[12px] text-[#4a4f4d]">
              <span className="grid place-items-center w-5 h-5 rounded-full bg-[#181818] text-white">
                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {tx("Soy mayor de edad.", "I'm over 18.")}
            </span>
            <span className="bb-press rounded-full bg-[#181818] py-2.5 text-center text-[12px] font-semibold text-white">{tx("Continuar", "Continue")}</span>
          </>
        }
        showcase={
          <div className="grid sm:grid-cols-[1fr_1.2fr] gap-3">
            {/* Widget header + upload */}
            <div className="rounded-[22px] bg-white border border-[#ebeeed] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/smilefast/logo.png" alt="Smile Fast" className="h-[22px] w-auto brightness-0" />
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-[#9aa3a0]"><span className="w-1.5 h-1.5 rounded-full bg-[#c4cac8]" />ONLINE</span>
              </div>
              <div className="mt-3 h-[92px] rounded-[18px] border border-dashed border-[#c9cfcd] bg-[#f5f8f7] grid place-items-center">
                <span className="flex flex-col items-center gap-1.5 text-[11px] text-[#6e7472]">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#181818]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
                  {tx("Sube una foto sonriendo", "Upload a smiling photo")}
                </span>
              </div>
            </div>
            {/* VITA shade guide */}
            <div className="rounded-[22px] bg-white border border-[#ebeeed] px-4 py-3.5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#9aa3a0]">{tx("TONO VITA", "VITA SHADE")}</span>
                <span className="text-[11px] font-semibold text-[#181818]">A1</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {[["B1", "#f7f3ea"], ["A1", "#f3eddd"], ["B2", "#efe6cf"], ["A2", "#ebdfc2"], ["A3", "#e5d6b1"], ["A3.5", "#ddcb9f"]].map(([n, c], i) => (
                  <span key={n} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className={`w-full h-14 rounded-b-[14px] rounded-t-[6px] border ${i === 1 ? "border-[#181818] shadow-[0_0_0_2px_rgba(24,24,24,0.12)]" : "border-[#ebeeed]"}`} style={{ background: c }} />
                    <span className={`font-mono text-[9px] ${i === 1 ? "font-semibold text-[#181818]" : "text-[#9aa3a0]"}`}>{n}</span>
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
