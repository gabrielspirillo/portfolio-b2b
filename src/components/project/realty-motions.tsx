"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTx } from "@/lib/i18n";
import { Frame, Mono } from "@/components/project/motions";

/* Realty Workspace motions: same dashboard language (black / ember / gray). */

const v = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`w-2.5 h-2.5 shrink-0 ${className}`} fill="none">
      <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* One request crosses every area on its own: Agent -> Legal -> Admin -> Owner */
export function RealtyFlow({ big = false }: { big?: boolean }) {
  const tx = useTx();
  const nodes = [
    { k: "AG", n: tx("Agente", "Agent"), s: tx("Pide el contrato", "Requests contract") },
    { k: "§", n: "Legal", s: tx("Contrato firmado", "Contract signed") },
    { k: "€", n: tx("Administración", "Admin"), s: tx("Comisión liquidada", "Commission paid") },
    { k: "⌂", n: tx("Propietario", "Owner"), s: tx("Informe enviado", "Report sent") },
  ];
  const w = big ? "w-20 md:w-24" : "w-[4.25rem] sm:w-20";
  return (
    <div className={`absolute inset-0 flex flex-col ${big ? "px-6 md:px-9 pt-6 pb-6" : "px-4 sm:px-5 pt-4 pb-4"}`}>
      <div className="flex items-center justify-between">
        <Mono className="text-white/45">{tx("Una solicitud, todas las áreas", "One request, every area")}</Mono>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-white/70">
          <span className="rw-live w-1.5 h-1.5 rounded-full bg-ember-500" />
          {tx("Automático", "Automatic")}
        </span>
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="relative w-full flex items-start justify-between">
          {/* Track between first and last node centres */}
          <div className={`absolute top-[18px] h-[2px] rounded-full bg-white/[0.08] ${big ? "left-10 right-10 md:left-12 md:right-12" : "left-[2.125rem] right-[2.125rem] sm:left-10 sm:right-10"}`}>
            <span className="rw-fill absolute inset-0 rounded-full bg-ember-500/70 origin-left" />
            <span className="rw-run absolute inset-0">
              <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-ember-400 shadow-[0_0_14px_3px_rgba(255,90,31,0.75)]" />
            </span>
          </div>
          {nodes.map((n, i) => (
            <div key={n.n} className={`relative ${w} flex flex-col items-center text-center`}>
              <span className="relative grid place-items-center w-9 h-9 rounded-full border border-white/15 bg-[#151111]">
                <span className={`rw-on rw-on${i} absolute inset-0 rounded-full bg-ember-500`} />
                <span className="relative text-[11px] font-bold text-white">{n.k}</span>
              </span>
              <span className={`mt-2 font-semibold text-white leading-tight ${big ? "text-[12px]" : "text-[10px] sm:text-[11px]"}`}>{n.n}</span>
              <span className={`rw-on rw-on${i} mt-1 leading-tight text-ember-400 ${big ? "text-[11px]" : "text-[9px] sm:text-[10px]"}`}>{n.s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ["0", tx("Hojas de cálculo", "Spreadsheets")],
          ["0", tx("Correos sueltos", "Loose emails")],
          ["4/4", tx("Áreas avisadas", "Areas notified")],
        ].map(([n, l]) => (
          <div key={l} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5">
            <span className="block text-[14px] font-semibold leading-none text-white tabular-nums">{n}</span>
            <span className="mt-1 block text-[9px] leading-tight text-white/45">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// The CRM operated by talking to Claude / ChatGPT / Gemini (MCP)
export function MAI() {
  const tx = useTx();
  return (
    <Frame label={tx("CRM · desde tu IA (MCP)", "CRM · from your AI (MCP)")}>
      <div className="absolute inset-0 pt-1 flex flex-col justify-center gap-1">
        <span className="rw-s rw-s1 self-end max-w-[78%] rounded-xl rounded-br-sm bg-white/[0.12] px-2.5 py-1 text-[10px] text-white/85">
          {tx("Creá el ACM de Ponzano 41 con 3 comparables", "Build the CMA for Ponzano 41 with 3 comps")}
        </span>
        <span className="rw-s rw-s2 self-start inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-0.5 text-[9px] font-semibold text-white/55">
          <span className="rw-live w-1.5 h-1.5 rounded-full bg-ember-500" />
          {tx("Realty · Crear ACM", "Realty · Create CMA")}
        </span>
        <span className="rw-s rw-s3 self-start max-w-[82%] inline-flex items-center gap-1.5 rounded-xl rounded-bl-sm bg-ember-500 px-2.5 py-1 text-[10px] font-semibold text-white">
          <Check />
          {tx("412.000 € · el PDF ya está en la ficha", "€412,000 · the PDF is on the listing")}
        </span>
      </div>
    </Frame>
  );
}

// Buyer <-> property matching, approved with a gesture
export function MMatch() {
  const tx = useTx();
  const rows = [
    { n: tx("Ático en Lavapiés", "Lavapiés penthouse"), p: 71 },
    { n: tx("Piso en Arapiles", "Arapiles flat"), p: 88 },
    { n: tx("Piso en Chamberí", "Chamberí flat"), p: 96, top: true },
  ];
  return (
    <Frame label={tx("Laura G. · 3 hab · hasta 420.000 €", "Laura G. · 3 bed · up to €420,000")}>
      <div className="absolute inset-0 flex flex-col justify-center gap-2">
        {rows.map((r, i) => (
          <div key={r.p} className="flex items-center gap-2.5">
            <span className={`w-[5.5rem] shrink-0 truncate text-[10px] ${r.top ? "font-semibold text-white" : "text-white/55"}`}>{r.n}</span>
            <span className="relative flex-1 h-1.5 rounded-full bg-white/[0.07]">
              <span className={`rw-grow absolute inset-y-0 left-0 rounded-full origin-left ${r.top ? "bg-ember-500" : "bg-white/25"}`} style={{ width: `${r.p}%`, ...v(i) }} />
            </span>
            <span className={`w-7 text-right text-[10px] font-semibold tabular-nums ${r.top ? "text-ember-400" : "text-white/50"}`}>{r.p}%</span>
          </div>
        ))}
        <span className="rw-s rw-s4 self-end inline-flex items-center gap-1 rounded-full bg-ember-500/15 border border-ember-500/30 px-2 py-0.5 text-[9px] font-semibold text-ember-400">
          <Check />
          {tx("Enviada por WhatsApp", "Sent via WhatsApp")}
        </span>
      </div>
    </Frame>
  );
}

// A new lead lands on the on-duty agent in seconds
export function MLeadRoute() {
  const tx = useTx();
  return (
    <Frame label={tx("Lead → agente de guardia", "Lead → on-duty agent")}>
      <div className="absolute inset-0 flex items-center gap-2.5">
        <div className="rw-s rw-s1 w-[42%] rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-1.5">
          <span className="block text-[9px] font-semibold text-white/45">{tx("Nuevo lead · web", "New lead · website")}</span>
          <span className="mt-0.5 block text-[10px] leading-snug text-white/80">{tx("Quiero visitar Ponzano 41", "I'd like to visit Ponzano 41")}</span>
        </div>
        <svg viewBox="0 0 24 24" className="rw-s rw-s2 w-4 h-4 text-ember-500 shrink-0" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="flex-1 flex flex-col gap-1">
          <span className="rw-s rw-s2 flex items-center gap-2">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-ember-500 text-[9px] font-bold text-white">MR</span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold text-white">Marta R.</span>
              <span className="block text-[9px] text-ember-400">{tx("De guardia ahora", "On duty now")}</span>
            </span>
          </span>
          <div className="flex flex-wrap gap-1">
            {["WhatsApp", tx("Correo", "Email"), "CRM"].map((c, i) => (
              <span key={c} className={`rw-s rw-s${i + 3} inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-white/70`}>
                <Check className="text-ember-400" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Contract drafted from the request data, ready for Legal
export function MContract() {
  const tx = useTx();
  const lines = [92, 78, 86, 64, 88, 52];
  return (
    <Frame label={tx("Solicitud · compraventa", "Request · purchase deed")}>
      <div className="absolute inset-0 flex items-center gap-4">
        <div className="w-[46%] h-[86px] rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 flex flex-col gap-[5px]">
          <span className="text-[8px] font-semibold tracking-[0.12em] text-white/50">{tx("CONTRATO", "CONTRACT")}</span>
          {lines.map((w, i) => (
            <span key={i} className="rw-type h-[3px] rounded-full bg-white/25 origin-left" style={{ width: `${w}%`, ...v(i) }} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <span className="rw-s rw-s2 text-[10px] text-white/55">{tx("Partes · propiedad · precio", "Parties · property · price")}</span>
          <span className="rw-s rw-s4 self-start rounded-md bg-white/[0.07] px-2 py-0.5 text-[10px] font-semibold text-white tabular-nums">{tx("9 de 9 cláusulas", "9 of 9 clauses")}</span>
          <span className="rw-s rw-s5 self-start inline-flex items-center gap-1 rounded-md bg-ember-500 px-2 py-0.5 text-[10px] font-semibold text-white">
            <Check />
            {tx("Listo para legal", "Ready for Legal")}
          </span>
        </div>
      </div>
    </Frame>
  );
}

// Fortnightly report to the owner: reach per channel, visits, offers
export function MOwnerReport() {
  const tx = useTx();
  const ch = [
    { l: tx("Portales", "Portals"), n: tx("1.240", "1,240"), w: 100 },
    { l: tx("Redes", "Social"), n: "860", w: 69 },
    { l: "REMAX", n: "512", w: 41 },
  ];
  return (
    <Frame label={tx("Informe al propietario · quincena", "Owner report · fortnight")}>
      <div className="absolute inset-0 flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          {ch.map((c, i) => (
            <div key={c.l} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-[9px] text-white/50">{c.l}</span>
              <span className="relative flex-1 h-1.5 rounded-full bg-white/[0.07]">
                <span className={`rw-grow absolute inset-y-0 left-0 rounded-full origin-left ${i === 0 ? "bg-ember-500" : "bg-white/25"}`} style={{ width: `${c.w}%`, ...v(i) }} />
              </span>
              <span className="w-8 text-right text-[9px] font-semibold text-white/70 tabular-nums">{c.n}</span>
            </div>
          ))}
        </div>
        <div className="w-[34%] flex flex-col gap-1.5">
          <div className="rw-s rw-s2 flex gap-3">
            <span><span className="block text-[15px] font-semibold leading-none text-white">6</span><span className="text-[8px] text-white/45">{tx("visitas", "visits")}</span></span>
            <span><span className="block text-[15px] font-semibold leading-none text-white">2</span><span className="text-[8px] text-white/45">{tx("ofertas", "offers")}</span></span>
          </div>
          <span className="rw-s rw-s4 self-start inline-flex items-center gap-1 rounded-md bg-ember-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            <Check />
            {tx("PDF enviado", "PDF sent")}
          </span>
        </div>
      </div>
    </Frame>
  );
}

// Recruitment funnel with the real cost per hire
export function MRecruit() {
  const tx = useTx();
  const st = [
    { l: "Leads", n: 126 },
    { l: tx("Entrevista", "Interview"), n: 58 },
    { l: tx("Aprobados", "Approved"), n: 21 },
    { l: tx("Contratados", "Hired"), n: 9 },
  ];
  return (
    <Frame label={tx("Reclutamiento · campaña", "Recruiting · campaign")}>
      <div className="absolute inset-0 flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          {st.map((s, i) => (
            <div key={s.l} className="flex items-center gap-2">
              <span className="w-[4.25rem] shrink-0 text-[9px] text-white/50">{s.l}</span>
              <span className="relative flex-1 h-2 rounded-[3px]">
                <span className={`rw-grow absolute inset-y-0 left-0 rounded-[3px] origin-left ${i === 3 ? "bg-ember-500" : "bg-white/20"}`} style={{ width: `${Math.max(8, (s.n / 126) * 100)}%`, ...v(i) }} />
              </span>
              <span className="w-6 text-right text-[9px] font-semibold text-white/70 tabular-nums">{s.n}</span>
            </div>
          ))}
        </div>
        <div className="rw-s rw-s4 w-[30%] rounded-lg border border-ember-500/30 bg-ember-500/10 px-2 py-1.5">
          <span className="block text-[8px] leading-tight text-white/55">{tx("Costo por contratado", "Cost per hire")}</span>
          <span className="mt-1 block text-[15px] font-semibold leading-none text-white tabular-nums">{tx("196 €", "€196")}</span>
        </div>
      </div>
    </Frame>
  );
}

// Management dashboard: revenue vs annual goal + key KPIs
export function MDirection() {
  const tx = useTx();
  const kpis = [
    { l: tx("Facturación", "Revenue"), n: tx("284.300 €", "€284,300") },
    { l: tx("Captaciones", "Listings"), n: "148" },
    { l: tx("Promesas", "Signed deals"), n: "61" },
  ];
  return (
    <Frame label={tx("Dirección · en vivo", "Management · live")}>
      <div className="absolute inset-0 flex items-center gap-5">
        <div className="relative w-[72px] h-[72px] shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <circle className="rw-ring" cx="32" cy="32" r="26" fill="none" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="round" pathLength={100} />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-[15px] font-semibold text-white">72%</span>
            <span className="mt-1 text-[7px] font-semibold tracking-[0.14em] text-white/45">{tx("META", "GOAL")}</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {kpis.map((k, i) => (
            <div key={k.l} className="fu-row flex items-baseline justify-between border-b border-white/[0.07] pb-1" style={v(i + 1)}>
              <span className="text-[10px] text-white/55">{k.l}</span>
              <span className="text-[12px] font-semibold text-white tabular-nums">{k.n}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Office leaderboard: the agent climbs a position
function RankRow({ cls, ini, name, n, me }: { cls: string; ini: string; name: string; n: number; me?: boolean }) {
  return (
    <div className={`${cls} absolute inset-x-0 h-[24px] flex items-center gap-2 rounded-md px-2 ${me ? "bg-ember-500/15 border border-ember-500/30" : "bg-white/[0.04] border border-white/[0.05]"}`}>
      <span className={`grid place-items-center w-4 h-4 rounded-full text-[7px] font-bold ${me ? "bg-ember-500 text-white" : "bg-white/15 text-white/80"}`}>{ini}</span>
      <span className={`flex-1 text-[10px] ${me ? "font-semibold text-white" : "text-white/65"}`}>{name}</span>
      {me && <span className="rw-s rw-s3 text-[9px] font-semibold text-ember-400">▲ 1</span>}
      <span className="text-[10px] font-semibold text-white/80 tabular-nums">{n}</span>
    </div>
  );
}

export function MRanking() {
  const tx = useTx();
  return (
    <Frame label={tx("Ranking · captaciones de la semana", "Ranking · listings this week")}>
      <div className="absolute inset-0 flex items-center gap-2">
        <div className="flex flex-col gap-[6px] text-[10px] font-semibold text-white/35 tabular-nums">
          {[1, 2, 3].map((p) => <span key={p} className="h-[24px] flex items-center">{p}</span>)}
        </div>
        <div className="relative flex-1 h-[84px]">
          <RankRow cls="top-0" ini="MR" name="Marta R." n={18} />
          <RankRow cls="rw-down top-[30px]" ini="LM" name="Luis M." n={15} />
          <RankRow cls="rw-up top-[60px]" ini={tx("TÚ", "YOU")} name="Ana S." n={16} me />
        </div>
      </div>
    </Frame>
  );
}

/* First-year cost for 21 agents (list prices, setup included) */
export function CostCompare() {
  const tx = useTx();
  const max = 143600;
  const fmt = (n: number) => tx(`${n.toLocaleString("de-DE")} €`, `€${n.toLocaleString("en-US")}`);
  const rows: { l: ReactNode; n: number; me?: boolean }[] = [
    { l: "Salesforce Max", n: 143600 },
    { l: "Salesforce Core", n: 54140 },
    { l: "HubSpot Sales Pro", n: 24150 },
    { l: tx("Desarrollo a medida", "Custom build"), n: 19800 },
    { l: "Pipedrive Premium", n: 14868 },
    { l: "Realty", n: 7912, me: true },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 md:p-5 flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r.n} className="grid grid-cols-[6.5rem_1fr_4.75rem] md:grid-cols-[10rem_1fr_5.5rem] items-center gap-3">
          <span className={`text-[12px] md:text-[13px] truncate ${r.me ? "font-semibold text-white" : "text-white/55"}`}>{r.l}</span>
          <span className="relative h-2.5 rounded-full bg-white/[0.05]">
            <span
              className={`rw-cost absolute inset-y-0 left-0 rounded-full origin-left ${r.me ? "bg-ember-500 shadow-[0_0_14px_rgba(255,90,31,0.6)]" : "bg-white/20"}`}
              style={{ width: `${Math.max(2.5, (r.n / max) * 100)}%`, ...v(i) }}
            />
          </span>
          <span className={`text-right text-[12px] md:text-[13px] font-semibold tabular-nums ${r.me ? "text-ember-400" : "text-white/70"}`}>{fmt(r.n)}</span>
        </div>
      ))}
    </div>
  );
}
