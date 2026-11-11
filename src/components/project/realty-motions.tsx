"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useTx } from "@/lib/i18n";

/* Realty Workspace motions, in REMAX's look: blue #003DA5, red #DC1C2E, white app panels. */

const v = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;
export const REMAX_STAGE = "bg-[radial-gradient(120%_120%_at_15%_0%,#1a5fe0_0%,#003DA5_45%,#00266f_100%)]";

/* Renders a fixed-size design scaled to fit its container */
export function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setS(Math.min(el.clientWidth / w, el.clientHeight / h));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative shrink-0 origin-center" style={{ width: w, height: h, transform: `scale(${s ?? 1})`, visibility: s === null ? "hidden" : "visible" }}>
        {children}
      </div>
    </div>
  );
}

function Ck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`w-2.5 h-2.5 shrink-0 ${className}`} fill="none">
      <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AV = { b: "bg-[#003DA5] text-white", r: "bg-[#DC1C2E] text-white", g: "bg-[#D5DBE7] text-[#33415C]", y: "bg-[#F5B83D] text-[#4A3300]" };
function Av({ t, c = "b", s = 22 }: { t: string; c?: keyof typeof AV; s?: number }) {
  return (
    <span className={`grid place-items-center shrink-0 rounded-full font-bold ${AV[c]}`} style={{ width: s, height: s, fontSize: s * 0.36 }}>
      {t}
    </span>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`absolute rounded-[14px] bg-white text-[#0F1B3D] shadow-[0_18px_40px_-12px_rgba(0,20,70,0.55)] ${className}`}>{children}</div>;
}

function Toast({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`absolute rounded-[10px] bg-[#0F1B3D] px-3 py-2 text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] ${className}`}>{children}</div>;
}

function RemaxMark({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/realty/remax-white.svg" alt="REMAX" className={`w-auto ${className}`} />;
}

/* ---------------- Cover: the office dashboard ---------------- */
export function RealtyDashboard() {
  const tx = useTx();
  const nav = [
    { l: "Dashboard", on: true },
    { l: tx("Calendario", "Calendar") },
    { l: tx("Casilla", "Inbox"), n: 5 },
    { h: tx("INDICADORES", "METRICS") },
    { l: tx("Tablero de dirección", "Management board") },
    { h: "CRM" },
    { l: tx("Contactos & Tareas", "Contacts & Tasks") },
    { l: tx("Pipeline Negocios", "Deals pipeline") },
    { l: tx("Propiedades", "Properties") },
    { l: "Tinder Inmobiliario" },
  ];
  return (
    <div className={`absolute inset-0 ${REMAX_STAGE}`}>
      <Fit w={640} h={400}>
        {/* App window */}
        <div className="absolute left-[22px] right-[22px] top-[22px] bottom-[-14px] rounded-[14px] overflow-hidden bg-[#F4F6FB] text-[#0F1B3D] shadow-[0_30px_60px_-18px_rgba(0,10,40,0.7)]">
          <div className="h-[26px] flex items-center gap-1.5 px-3 bg-white border-b border-[#E6EAF2]">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" />
            <span className="mx-auto rounded-md bg-[#F1F3F8] px-10 py-[2px] text-[8px] text-[#6B7690]">Realty · REMAX Exclusive</span>
          </div>
          <div className="absolute top-[26px] inset-x-0 bottom-0 flex">
            {/* Sidebar */}
            <aside className="w-[142px] shrink-0 bg-[#003DA5] px-2.5 pt-3">
              <div className="px-1.5 pt-0.5 leading-none">
                <RemaxMark className="h-[14px]" />
                <span className="block mt-1.5 text-[7px] text-white/60">Exclusive · {tx("Franquicia", "Franchise")}</span>
              </div>
              <div className="mt-3 flex flex-col gap-[3px]">
                {nav.map((n, i) =>
                  n.h ? (
                    <span key={i} className="mt-1.5 px-1.5 text-[6.5px] font-bold tracking-[0.14em] text-white/45">{n.h}</span>
                  ) : (
                    <span key={i} className={`flex items-center gap-1.5 rounded-md px-1.5 py-[3px] text-[8px] ${n.on ? "bg-white/15 text-white font-semibold" : "text-white/75"}`}>
                      <span className="w-[7px] h-[7px] rounded-[2px] border border-current opacity-70" />
                      {n.l}
                      {n.n && <span className="ml-auto rounded-full bg-[#DC1C2E] px-1 text-[6.5px] font-bold text-white">{n.n}</span>}
                    </span>
                  ),
                )}
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 px-4 pt-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold">Dashboard</span>
                <span className="ml-3 flex-1 rounded-md border border-[#E6EAF2] bg-white px-2 py-[3px] text-[7px] text-[#98A2B8]">{tx("Buscar contactos, propiedades, tareas…", "Search contacts, properties, tasks…")}</span>
                <span className="relative grid place-items-center w-5 h-5 rounded-full bg-white border border-[#E6EAF2]">
                  <span className="w-2 h-2 rounded-[2px] border border-[#6B7690]" />
                  <span className="absolute -top-1 -right-1 rounded-full bg-[#DC1C2E] px-[3px] text-[6px] font-bold text-white">3</span>
                </span>
                <Av t="MR" c="r" s={18} />
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <span className="block text-[14px] font-bold tracking-[-0.02em] text-[#0F1B3D]">{tx("¡Buenos días, Marta!", "Good morning, Marta!")}</span>
                  <span className="block mt-0.5 text-[7.5px] text-[#6B7690]">{tx("Tenés 3 actividades y 2 reportes de leads para hoy", "You have 3 activities and 2 lead reports today")}</span>
                </div>
                <span className="rounded-full bg-[#E8EEFB] px-2 py-[2px] text-[7px] font-semibold text-[#003DA5]">{tx("Lunes 26 de octubre", "Monday, October 26")}</span>
              </div>

              <div className="mt-2.5 flex gap-1.5">
                <span className="rounded-md bg-[#003DA5] px-2 py-1 text-[7px] font-semibold text-white">{tx("+ Agregar acción", "+ Add action")}</span>
                {[tx("Redactar contrato", "Draft contract"), tx("Enlace de pago", "Payment link"), tx("Nuevo contacto", "New contact")].map((c) => (
                  <span key={c} className="rounded-md border border-[#E6EAF2] bg-white px-2 py-1 text-[7px] font-medium text-[#33415C]">{c}</span>
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-[1fr_1.15fr_0.85fr] gap-2">
                {/* Ranking podium */}
                <div className="rounded-[10px] bg-white border border-[#E6EAF2] p-2.5">
                  <span className="flex items-center justify-between text-[6.5px] font-bold tracking-[0.12em] text-[#6B7690]">
                    {tx("RANKING DE LA OFICINA", "OFFICE RANKING")}
                    <span className="rounded-full bg-[#E8EEFB] px-1.5 py-[1px] tracking-normal text-[#003DA5]">{tx("Semanal", "Weekly")}</span>
                  </span>
                  <div className="mt-2 h-[58px] flex items-end justify-center gap-1.5">
                    {[
                      { t: "LM", h: 30, n: 2, c: "g" as const },
                      { t: "MR", h: 44, n: 1, c: "y" as const, top: true },
                      { t: "AS", h: 22, n: 3, c: "g" as const },
                    ].map((p) => (
                      <span key={p.t} className="flex flex-col items-center gap-1">
                        <Av t={p.t} c={p.c} s={14} />
                        <span
                          className={`w-[30px] rounded-t-[4px] grid place-items-start justify-center pt-0.5 text-[8px] font-bold ${p.top ? "bg-[#003DA5] text-white" : "bg-[#E3E9F6] text-[#33415C]"}`}
                          style={{ height: p.h }}
                        >
                          {p.n}
                        </span>
                      </span>
                    ))}
                  </div>
                  <span className="mt-1.5 flex items-center justify-between rounded-md bg-[#F4F6FB] px-1.5 py-1 text-[6.5px] font-semibold text-[#33415C]">
                    {tx("Vas 1.º en captaciones", "You're 1st in listings")}
                    <span className="text-[#16A34A]">▲ 1</span>
                  </span>
                </div>

                {/* Agenda */}
                <div className="rounded-[10px] bg-white border border-[#E6EAF2] p-2.5">
                  <span className="flex items-center justify-between text-[6.5px] font-bold tracking-[0.12em] text-[#6B7690]">
                    {tx("AGENDA DE HOY", "TODAY'S AGENDA")}
                    <span className="rounded-full bg-[#E8EEFB] px-1.5 tracking-normal text-[#003DA5]">3</span>
                  </span>
                  <div className="mt-1.5 flex flex-col">
                    {[
                      { h: "10:30", t: tx("Visita · Ponzano 41", "Viewing · Ponzano 41"), s: "Laura Gómez", tag: tx("Visita", "Viewing"), c: "bg-[#E8EEFB] text-[#003DA5]" },
                      { h: "12:00", t: tx("Firma de encargo", "Listing signing"), s: "Pza. de Olavide 7", tag: tx("Encargo", "Listing"), c: "bg-[#E7F6EC] text-[#15803D]" },
                      { h: "17:00", t: tx("Café con Carmen", "Coffee with Carmen"), s: tx("Embajadora A+", "A+ ambassador"), tag: tx("Café", "Coffee"), c: "bg-[#FDECEE] text-[#DC1C2E]" },
                    ].map((r) => (
                      <span key={r.h} className="flex items-center gap-2 border-b border-[#EEF1F6] last:border-0 py-[5px]">
                        <span className="w-6 text-[7px] font-semibold text-[#0F1B3D] tabular-nums">{r.h}</span>
                        <span className="flex-1 leading-tight">
                          <span className="block text-[7.5px] font-semibold">{r.t}</span>
                          <span className="block text-[6.5px] text-[#6B7690]">{r.s}</span>
                        </span>
                        <span className={`rounded-full px-1.5 py-[1px] text-[6px] font-semibold ${r.c}`}>{r.tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active contacts */}
                <div className="rounded-[10px] bg-white border border-[#E6EAF2] p-2.5 flex flex-col">
                  <span className="text-[6.5px] font-bold tracking-[0.12em] text-[#6B7690]">{tx("CONTACTOS ACTIVOS", "ACTIVE CONTACTS")}</span>
                  <span className="mt-1 text-[20px] font-bold leading-none tracking-[-0.03em]">248</span>
                  <span className="mt-1 text-[6.5px] font-semibold text-[#16A34A]">▲ {tx("12 este mes", "12 this month")}</span>
                  <svg viewBox="0 0 100 34" className="mt-auto w-full h-[34px]" fill="none">
                    <path className="rw-draw" pathLength={100} d="M0 28 L14 25 L26 27 L40 19 L54 21 L68 13 L82 15 L100 5" stroke="#003DA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Live notifications */}
        <div className="rw-s rw-s2 absolute right-[8px] top-[46px] w-[176px] rounded-[10px] bg-white px-2.5 py-2 flex items-center gap-2 shadow-[0_14px_30px_-8px_rgba(0,10,40,0.55)]">
          <span className="grid place-items-center w-5 h-5 rounded-full bg-[#E7F6EC] text-[#16A34A]"><Ck /></span>
          <span className="leading-tight">
            <span className="block text-[8px] font-semibold text-[#0F1B3D]">{tx("Contrato listo para legal", "Contract ready for Legal")}</span>
            <span className="block text-[7px] text-[#6B7690]">{tx("Redactado en 40 s", "Drafted in 40 s")}</span>
          </span>
        </div>
        <div className="rw-s rw-s3 absolute left-[8px] bottom-[22px] w-[186px] rounded-[10px] bg-white px-2.5 py-2 flex items-center gap-2 shadow-[0_14px_30px_-8px_rgba(0,10,40,0.55)]">
          <span className="grid place-items-center w-5 h-5 rounded-full bg-[#25D366] text-white text-[8px] font-bold">W</span>
          <span className="leading-tight">
            <span className="block text-[8px] font-semibold text-[#0F1B3D]">{tx("Nuevo lead por WhatsApp", "New lead via WhatsApp")}</span>
            <span className="block text-[7px] text-[#6B7690]">{tx("Asignado a Marta · de guardia", "Assigned to Marta · on duty")}</span>
          </span>
        </div>
        <div className="rw-s rw-s4 absolute right-[8px] bottom-[34px] w-[190px] rounded-[10px] bg-white px-2.5 py-2 flex items-center gap-2 shadow-[0_14px_30px_-8px_rgba(0,10,40,0.55)]">
          <span className="grid place-items-center w-5 h-5 rounded-full bg-[#E8EEFB] text-[#003DA5]"><Ck /></span>
          <span className="leading-tight">
            <span className="block text-[8px] font-semibold text-[#0F1B3D]">{tx("Visita agendada", "Viewing booked")}</span>
            <span className="block text-[7px] text-[#6B7690]">{tx("Sincronizada con Google Calendar", "Synced with Google Calendar")}</span>
          </span>
        </div>
      </Fit>
    </div>
  );
}

/* ---------------- Feature motions (340 × 212) ---------------- */
const W = 340;
const H = 212;

// The CRM, operated from Claude / ChatGPT / Gemini
export function MAI() {
  const tx = useTx();
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#EEF1F6]">
          <span className="flex rounded-md bg-[#F1F3F8] p-[2px] text-[8px] font-semibold text-[#6B7690]">
            <span className="rounded-[5px] bg-white px-2 py-[2px] text-[#0F1B3D] shadow-sm">Claude</span>
            <span className="px-2 py-[2px]">ChatGPT</span>
            <span className="px-2 py-[2px]">Gemini</span>
          </span>
          <span className="flex items-center gap-1 text-[7.5px] text-[#6B7690]"><span className="rw-live w-1.5 h-1.5 rounded-full bg-[#16A34A]" />{tx("Realty conectado", "Realty connected")}</span>
        </div>
        <div className="px-3 pt-2 flex flex-col gap-1.5">
          <span className="rw-s rw-s1 self-end max-w-[78%] rounded-[10px] rounded-br-[3px] bg-[#003DA5] px-2.5 py-1.5 text-[8.5px] font-medium text-white">
            {tx("Creá el ACM de Ponzano 41 con tres comparables", "Build the CMA for Ponzano 41 with three comps")}
          </span>
          <span className="rw-s rw-s2 self-start inline-flex items-center gap-1 rounded-full border border-[#E6EAF2] px-2 py-[2px] text-[7.5px] text-[#33415C]">
            {tx("Realty · Crear ACM", "Realty · Create CMA")} <Ck className="text-[#16A34A]" />
          </span>
          <span className="rw-s rw-s3 self-start max-w-[86%] rounded-[10px] rounded-bl-[3px] bg-[#F1F3F8] px-2.5 py-1.5 text-[8.5px] leading-snug text-[#0F1B3D]">
            {tx("Listo: 412.000 € con 3 comparables. El PDF ya está en la ficha.", "Done: €412,000 with 3 comps. The PDF is on the listing.")}
          </span>
          <span className="rw-s rw-s4 flex items-center gap-2 rounded-[10px] border border-[#E6EAF2] px-2 py-1.5">
            <span className="grid place-items-center w-6 h-6 rounded-md bg-[#DC1C2E] text-[6.5px] font-bold text-white">PDF</span>
            <span className="flex-1 leading-tight">
              <span className="block text-[8.5px] font-semibold">{tx("ACM · Ponzano 41", "CMA · Ponzano 41")}</span>
              <span className="block text-[7px] text-[#6B7690]">{tx("3 comparables · lista para enviar", "3 comps · ready to send")}</span>
            </span>
            <span className="rounded-md bg-[#003DA5] px-2 py-1 text-[7.5px] font-semibold text-white">{tx("Abrir", "Open")}</span>
          </span>
        </div>
      </Panel>
    </Fit>
  );
}

// Buyer <-> property matching
export function MMatch() {
  const tx = useTx();
  const rows = [
    { n: tx("Ático en Lavapiés", "Lavapiés penthouse"), s: tx("2 hab · 74 m²", "2 bed · 74 m²"), p: 71 },
    { n: tx("Piso en Arapiles", "Arapiles flat"), s: tx("3 hab · 92 m²", "3 bed · 92 m²"), p: 88, sent: true },
    { n: tx("Piso en Chamberí", "Chamberí flat"), s: tx("3 hab · 98 m²", "3 bed · 98 m²"), p: 96, sent: true },
  ];
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Av t="LG" c="r" s={20} />
          <span className="leading-tight">
            <span className="block text-[9px] font-semibold">Laura G.</span>
            <span className="block text-[7.5px] text-[#6B7690]">{tx("3 hab · Chamberí · hasta 420.000 €", "3 bed · Chamberí · up to €420,000")}</span>
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {rows.map((r, i) => (
            <div key={r.p} className={`rw-s rw-s${i + 1} flex items-center gap-2 rounded-[9px] border px-2 py-1 ${r.p === 96 ? "border-[#003DA5]/40 bg-[#F3F6FD]" : "border-[#EEF1F6]"}`}>
              <span className="w-7 h-6 rounded-[5px] bg-[linear-gradient(135deg,#c9d6ee,#8fa6d4)]" />
              <span className="flex-1 leading-tight">
                <span className="block text-[8.5px] font-semibold">{r.n}</span>
                <span className="block text-[7px] text-[#6B7690]">{r.s}</span>
              </span>
              <span className={`text-[10px] font-bold tabular-nums ${r.p === 96 ? "text-[#003DA5]" : "text-[#33415C]"}`}>{r.p}%</span>
              {r.sent ? (
                <span className="rw-s rw-s4 inline-flex items-center gap-0.5 rounded-full bg-[#003DA5] px-1.5 py-[2px] text-[6.5px] font-bold text-white"><Ck />{tx("ENVIADA", "SENT")}</span>
              ) : (
                <span className="rounded-full bg-[#F1F3F8] px-1.5 py-[2px] text-[6.5px] font-bold text-[#98A2B8]">{tx("DESCARTAR", "SKIP")}</span>
              )}
            </div>
          ))}
        </div>
      </Panel>
      <Toast className="rw-s rw-s5 left-1/2 -translate-x-1/2 bottom-[4px] whitespace-nowrap text-[8px] font-semibold">
        {tx("2 propiedades enviadas a Laura por WhatsApp", "2 properties sent to Laura on WhatsApp")}
      </Toast>
    </Fit>
  );
}

// Lead lands on the on-duty agent
export function MLeads() {
  const tx = useTx();
  const team = [
    { t: "LM", n: "Luis M.", s: tx("Mañana", "Morning"), c: "g" as const },
    { t: "MR", n: "Marta R.", s: tx("De guardia ahora", "On duty now"), c: "b" as const, on: true },
    { t: "AS", n: "Ana S.", s: tx("Tarde", "Afternoon"), c: "g" as const },
  ];
  return (
    <Fit w={W} h={H}>
      <Panel className="left-[12px] right-[12px] top-[44px] bottom-[10px] px-3 pt-2.5">
        <span className="flex items-center justify-between text-[8.5px] font-semibold">
          {tx("Guardia de hoy", "Today's duty")}
          <span className="text-[7.5px] font-medium text-[#6B7690]">Leads <b className="text-[#0F1B3D]">4</b></span>
        </span>
        <div className="mt-1.5 flex flex-col gap-1">
          {team.map((m) => (
            <span key={m.t} className={`relative flex items-center gap-2 rounded-[8px] px-1.5 py-[3px] ${m.on ? "border border-[#003DA5]/50 bg-[#F3F6FD]" : ""}`}>
              <Av t={m.t} c={m.c} s={16} />
              <span className="leading-tight">
                <span className="block text-[8px] font-semibold">{m.n}</span>
                <span className={`block text-[6.5px] ${m.on ? "text-[#003DA5] font-semibold" : "text-[#6B7690]"}`}>{m.s}</span>
              </span>
              {m.on && <span className="rw-s rw-s2 ml-auto rounded-full bg-[#DC1C2E] px-1.5 text-[7px] font-bold text-white">+1</span>}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1">
          {["WhatsApp", tx("Correo", "Email"), tx("En su CRM", "In her CRM")].map((c, i) => (
            <span key={c} className={`rw-s rw-s${i + 3} inline-flex items-center gap-0.5 rounded-full bg-[#E7F6EC] px-1.5 py-[2px] text-[7px] font-semibold text-[#15803D]`}>
              {c} <Ck />
            </span>
          ))}
        </div>
      </Panel>
      <div className="rw-drop absolute left-[22px] right-[22px] top-[8px] rounded-[10px] bg-white px-2.5 py-1.5 flex items-center gap-2 shadow-[0_14px_30px_-8px_rgba(0,10,40,0.55)]">
        <span className="grid place-items-center w-5 h-5 rounded-md bg-[#003DA5] text-[6px] font-bold text-white">WEB</span>
        <span className="flex-1 leading-tight">
          <span className="block text-[7px] text-[#6B7690]">{tx("Nuevo lead · web de la oficina", "New lead · office website")}</span>
          <span className="block text-[8.5px] font-semibold">{tx("“Quiero visitar el piso de Ponzano 41”", "“I'd like to see the Ponzano 41 flat”")}</span>
        </span>
        <span className="text-[6.5px] text-[#98A2B8]">{tx("ahora", "now")}</span>
      </div>
    </Fit>
  );
}

// Office leaderboard: the agent climbs a position
function RankRow({ cls, t, n, k, c, me }: { cls: string; t: string; n: string; k: number; c: keyof typeof AV; me?: boolean }) {
  const tx = useTx();
  return (
    <div className={`${cls} absolute inset-x-0 h-[34px] flex items-center gap-2 rounded-[9px] px-2 ${me ? "border border-[#003DA5]/50 bg-[#F3F6FD]" : ""}`}>
      <Av t={t} c={c} s={20} />
      <span className="w-[62px] leading-tight">
        <span className="block text-[8.5px] font-semibold">{n}</span>
        <span className="block text-[6.5px] text-[#6B7690]">{tx("Captaciones", "Listings")}</span>
      </span>
      <span className="relative flex-1 h-[4px] rounded-full bg-[#EEF1F6]">
        <span className="absolute inset-y-0 left-0 rounded-full bg-[#003DA5]" style={{ width: `${(k / 18) * 100}%` }} />
      </span>
      {me && <span className="rw-s rw-s3 rounded-full bg-[#16A34A] px-1 text-[6.5px] font-bold text-white">▲1</span>}
      <span className="w-5 text-right text-[11px] font-bold tabular-nums">{k}</span>
    </div>
  );
}
export function MRanking() {
  const tx = useTx();
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-semibold">{tx("Ranking de la oficina", "Office ranking")}</span>
          <span className="flex rounded-md bg-[#F1F3F8] p-[2px] text-[7.5px] font-semibold text-[#6B7690]">
            <span className="rounded-[5px] bg-white px-1.5 py-[1px] text-[#0F1B3D] shadow-sm">{tx("Semanal", "Weekly")}</span>
            <span className="px-1.5 py-[1px]">{tx("Mensual", "Monthly")}</span>
          </span>
        </div>
        <div className="mt-2.5 flex gap-1.5">
          <div className="flex flex-col gap-[6px] pt-0 text-[9px] font-semibold text-[#98A2B8]">
            {[1, 2, 3].map((p) => <span key={p} className="h-[34px] flex items-center">{p}</span>)}
          </div>
          <div className="relative flex-1 h-[114px]">
            <RankRow cls="top-0" t="MR" n="Marta R." k={18} c="y" />
            <RankRow cls="rw-down top-[40px]" t="LM" n="Luis M." k={15} c="g" />
            <RankRow cls="rw-up top-[80px]" t={tx("TÚ", "YOU")} n="Ana S." k={16} c="b" me />
          </div>
        </div>
      </Panel>
    </Fit>
  );
}

// Fortnightly management report to the owner
export function MReport() {
  const tx = useTx();
  const ch = [
    { l: "REMAX", n: tx("1.240", "1,240"), w: 100, tag: true },
    { l: tx("Portales", "Portals"), n: "860", w: 69 },
    { l: tx("Redes", "Social"), n: "512", w: 41 },
  ];
  return (
    <Fit w={W} h={H}>
      <Panel className="left-[24px] right-[24px] top-[10px] bottom-[-8px] overflow-hidden px-3.5 pt-3">
        <div className="absolute inset-x-0 top-0 h-[3px] flex"><span className="flex-[3] bg-[#003DA5]" /><span className="flex-1 bg-[#DC1C2E]" /></div>
        <span className="block text-[7px] font-bold tracking-[0.12em] text-[#003DA5]">{tx("INFORME DE GESTIÓN · N.º 4", "MANAGEMENT REPORT · NO. 4")}</span>
        <span className="mt-1 block text-[11px] font-bold">Ponzano 41, 3.º B</span>
        <span className="block text-[7.5px] text-[#6B7690]">{tx("Quincena del 1 al 15 de octubre", "Fortnight Oct 1 – 15")}</span>
        <div className="mt-2.5 flex flex-col gap-2">
          {ch.map((c, i) => (
            <div key={c.l} className="flex items-center gap-2">
              <span className={`w-[46px] rounded-md px-1.5 py-[2px] text-[7px] font-semibold ${c.tag ? "bg-[#E8EEFB] text-[#003DA5]" : "bg-[#F1F3F8] text-[#6B7690]"}`}>{c.l}</span>
              <span className="relative flex-1 h-[5px] rounded-full bg-[#EEF1F6]">
                <span className="rw-grow absolute inset-y-0 left-0 rounded-full origin-left bg-[#003DA5]" style={{ width: `${c.w}%`, ...v(i) }} />
              </span>
              <span className="w-7 text-right text-[9px] font-bold tabular-nums">{c.n}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Toast className="rw-s rw-s4 left-[40px] right-[40px] bottom-[14px]">
        <span className="flex items-center gap-1 text-[8.5px] font-semibold"><Ck className="text-[#4ADE80]" />{tx("Enviado a Carmen, la propietaria", "Sent to Carmen, the owner")}</span>
        <span className="block mt-0.5 text-[7px] text-white/60">{tx("PDF por correo · próximo informe en 15 días", "PDF by email · next report in 15 days")}</span>
      </Toast>
    </Fit>
  );
}

function Hl({ children }: { children: ReactNode }) {
  return <b className="rounded-[3px] bg-[#E8EEFB] px-[2px] font-semibold text-[#003DA5]">{children}</b>;
}

// Contract drafted from the request data
export function MContract() {
  const tx = useTx();
  const f = [
    [tx("Vendedor", "Seller"), "Carmen López"],
    [tx("Comprador", "Buyer"), "Laura Gómez"],
    [tx("Propiedad", "Property"), "Ponzano 41, 3.º B"],
    [tx("Precio", "Price"), tx("412.000 €", "€412,000")],
  ];
  const lines: ReactNode[] = tx("es", "en") === "es"
    ? [<>Comparecen, de una parte, <Hl>Carmen López</Hl>,</>, <>en calidad de vendedora, y de otra,</>, <><Hl>Laura Gómez</Hl>, en calidad de compradora,</>, <>respecto del inmueble en <Hl>Ponzano 41, 3.º B</Hl>,</>, <>por un precio de <Hl>412.000 €</Hl>.</>]
    : [<>Appearing, on one side, <Hl>Carmen López</Hl>,</>, <>as seller, and on the other,</>, <><Hl>Laura Gómez</Hl>, as buyer,</>, <>regarding the property at <Hl>Ponzano 41, 3.º B</Hl>,</>, <>for a price of <Hl>€412,000</Hl>.</>];
  return (
    <Fit w={W} h={H}>
      <Panel className="left-[10px] top-[14px] bottom-[14px] w-[104px] px-2 py-2">
        <span className="block text-[6.5px] font-bold tracking-[0.1em] text-[#003DA5]">{tx("SOLICITUD · COMPRAVENTA", "REQUEST · SALE")}</span>
        <div className="mt-1.5 flex flex-col gap-1">
          {f.map(([k, val], i) => (
            <span key={k} className={`rounded-[6px] px-1.5 py-[3px] leading-tight ${i === 2 ? "border border-[#003DA5] bg-white" : "bg-[#F4F6FB]"}`}>
              <span className="block text-[6px] text-[#6B7690]">{k}</span>
              <span className="block text-[7.5px] font-semibold">{val}</span>
            </span>
          ))}
        </div>
      </Panel>
      <Panel className="left-[122px] right-[10px] top-[14px] bottom-[14px] px-2.5 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[8.5px] font-bold">{tx("Contrato de compraventa", "Purchase agreement")}</span>
          <span className="relative h-[13px] w-[64px]">
            <span className="rw-early absolute inset-0 grid place-items-center rounded-full bg-[#FDF3E2] text-[6.5px] font-semibold text-[#B45309]">{tx("Redactando…", "Drafting…")}</span>
            <span className="rw-s rw-s5 absolute inset-0 grid place-items-center rounded-full bg-[#E7F6EC] text-[6.5px] font-semibold text-[#15803D]">{tx("Listo ✓", "Ready ✓")}</span>
          </span>
        </div>
        <div className="mt-1.5 flex flex-col gap-[2px] font-serif text-[7.5px] leading-[1.35] text-[#33415C]">
          {lines.map((l, i) => (
            <span key={i} className="rw-wipe whitespace-nowrap" style={v(i)}>{l}</span>
          ))}
        </div>
        <div className="mt-1.5 flex gap-2 text-[6px] font-bold tracking-[0.14em] text-[#98A2B8]">
          <span>{tx("PRIMERO", "FIRST")}</span><span>{tx("SEGUNDO", "SECOND")}</span><span>{tx("TERCERO", "THIRD")}</span>
        </div>
        <div className="absolute left-2.5 right-2.5 bottom-2 flex items-center gap-2">
          <span className="relative flex-1 h-[4px] rounded-full bg-[#EEF1F6]">
            <span className="rw-prog absolute inset-0 rounded-full origin-left bg-[#003DA5]" />
          </span>
          <span className="text-[6.5px] font-semibold text-[#6B7690]">{tx("9 de 9 cláusulas", "9 of 9 clauses")}</span>
        </div>
      </Panel>
    </Fit>
  );
}

// Digital signature
export function MSign() {
  const tx = useTx();
  return (
    <Fit w={W} h={H}>
      <Panel className="left-[30px] right-[30px] top-[12px] bottom-[-10px] px-3.5 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">{tx("Hoja de visita", "Viewing sheet")}</span>
          <span className="rw-s rw-s4 rounded-full bg-[#E7F6EC] px-2 py-[2px] text-[7px] font-semibold text-[#15803D]">{tx("Firmado", "Signed")}</span>
        </div>
        <span className="mt-0.5 block text-[7.5px] text-[#6B7690]">Ponzano 41, 3.º B · Laura G.</span>
        <div className="mt-2 flex flex-col gap-1">
          {[90, 74, 82].map((w) => <span key={w} className="h-[4px] rounded-full bg-[#EEF1F6]" style={{ width: `${w}%` }} />)}
        </div>
        <div className="relative mt-2.5 h-[66px] rounded-[9px] border border-dashed border-[#003DA5]/40 bg-[#F7F9FD]">
          <svg viewBox="0 0 200 60" className="absolute inset-0 w-full h-full" fill="none">
            <path className="rw-sign" pathLength={100} d="M22 40 C 30 12, 40 12, 44 34 S 56 52, 64 30 S 78 10, 84 32 S 96 50, 104 28 S 120 14, 126 34 S 140 44, 150 26 S 168 22, 180 30" stroke="#003DA5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute left-2 bottom-1 text-[6.5px] text-[#98A2B8]">{tx("Firma del cliente", "Client signature")}</span>
        </div>
      </Panel>
      <Toast className="rw-s rw-s4 left-1/2 -translate-x-1/2 bottom-[14px] whitespace-nowrap">
        <span className="flex items-center gap-1 text-[8.5px] font-semibold"><Ck className="text-[#4ADE80]" />{tx("Firmado digitalmente", "Digitally signed")}</span>
        <span className="block mt-0.5 text-[7px] text-white/60">{tx("23 oct 2026 · 10:42", "Oct 23, 2026 · 10:42")}</span>
      </Toast>
    </Fit>
  );
}

// Recruitment funnel
export function MRecruit() {
  const tx = useTx();
  const st = [
    { l: "Leads", n: 126, w: 100 },
    { l: tx("Entrevista", "Interview"), n: 58, w: 80 },
    { l: tx("Aprobados", "Approved"), n: 21, w: 62 },
    { l: tx("Contratados", "Hired"), n: 9, w: 46, hire: true },
  ];
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] px-4 pt-3">
        <span className="block text-[9.5px] font-semibold">{tx("Reclutamiento · campaña de octubre", "Recruiting · October campaign")}</span>
        <div className="mt-2.5 flex flex-col items-center gap-1.5">
          {st.map((s, i) => (
            <span
              key={s.l}
              className={`rw-grow-c flex items-center justify-between rounded-[7px] px-2.5 py-[5px] text-[8px] font-semibold ${s.hire ? "bg-[#DC1C2E] text-white" : "bg-[#E8EEFB] text-[#003DA5]"}`}
              style={{ width: `${s.w}%`, ...v(i) }}
            >
              {s.l}
              <span className="text-[9.5px] font-bold tabular-nums">{s.n}</span>
            </span>
          ))}
        </div>
        <span className="rw-s rw-s5 mt-2.5 flex items-center justify-center gap-1 text-[7.5px] font-semibold text-[#003DA5]">
          ✦ {tx("Seguimiento con IA enviado a 12 candidatos", "AI follow-up sent to 12 candidates")}
        </span>
      </Panel>
    </Fit>
  );
}

// Management: revenue vs goal, live
export function MDirection() {
  const tx = useTx();
  const k = [
    [tx("Facturación", "Revenue"), tx("284.300 €", "€284,300")],
    [tx("Captaciones", "Listings"), "148"],
    [tx("Promesas", "Signed deals"), "61"],
  ];
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] p-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {k.map(([l, n], i) => (
            <span key={l} className={`rw-s rw-s${i + 1} rounded-[8px] bg-[#F4F6FB] px-2 py-1.5 leading-tight`}>
              <span className="block text-[7px] text-[#6B7690]">{l}</span>
              <span className="block mt-0.5 text-[11px] font-bold tabular-nums">{n}</span>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <div className="w-[86px] shrink-0 flex flex-col items-center rounded-[8px] bg-[#F4F6FB] py-2">
            <span className="relative w-[58px] h-[58px]">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E3E9F6" strokeWidth="7" />
                <circle className="rw-ring" cx="32" cy="32" r="26" fill="none" stroke="#DC1C2E" strokeWidth="7" strokeLinecap="round" pathLength={100} />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[12px] font-bold">72%</span>
            </span>
            <span className="mt-1 text-[6.5px] text-[#6B7690]">{tx("de la meta anual", "of yearly goal")}</span>
          </div>
          <div className="relative flex-1 rounded-[8px] bg-[#F4F6FB]">
            <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
              <line x1="0" y1="30" x2="160" y2="30" stroke="#DC1C2E" strokeWidth="1" strokeDasharray="4 3" />
              <path className="rw-draw" pathLength={100} d="M6 78 C 24 74, 30 66, 46 64 S 70 56, 82 48 S 104 44, 116 32 S 140 18, 154 12" stroke="#003DA5" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="absolute left-2 top-1 text-[7px] font-semibold text-[#DC1C2E]">{tx("Meta", "Goal")}</span>
          </div>
        </div>
      </Panel>
    </Fit>
  );
}

// 100 days to success (Buffini): daily relational plan
export function MDays() {
  const tx = useTx();
  const todo = [tx("2 notas personales", "2 personal notes"), tx("10 llamadas a tu base", "10 calls to your base"), tx("1 visita con detalle", "1 visit with a gift")];
  return (
    <Fit w={W} h={H}>
      <Panel className="inset-[12px] px-3 pt-2.5">
        <div className="flex items-center justify-between">
          <span className="leading-tight">
            <span className="block text-[7px] text-[#6B7690]">{tx("100 días para el éxito", "100 days to success")}</span>
            <span className="block text-[12px] font-bold">{tx("Día 37", "Day 37")} <span className="text-[8px] font-medium text-[#98A2B8]">/ 100</span></span>
          </span>
          <span className="rounded-full bg-[#E8EEFB] px-2 py-[2px] text-[8px] font-bold text-[#003DA5]">37%</span>
        </div>
        <div className="mt-1.5 grid grid-cols-[repeat(25,1fr)] gap-[2px]">
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className={`aspect-square rounded-[2px] ${i < 36 ? "rw-cell bg-[#003DA5]" : i === 36 ? "border border-[#DC1C2E] bg-[#FDECEE]" : "bg-[#EEF1F6]"}`} style={i < 36 ? v(i) : undefined} />
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {todo.map((t, i) => (
            <span key={t} className="flex items-center gap-2 rounded-[7px] bg-[#F4F6FB] px-2 py-[3px] text-[8px] font-medium">
              <span className="relative grid place-items-center w-3 h-3 rounded-[3px] border border-[#C3CBDA] bg-white">
                <span className={`rw-s rw-s${i + 3} absolute inset-[-1px] grid place-items-center rounded-[3px] bg-[#003DA5] text-white`}><Ck className="w-2 h-2" /></span>
              </span>
              {t}
            </span>
          ))}
        </div>
      </Panel>
    </Fit>
  );
}
