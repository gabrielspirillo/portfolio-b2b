"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTx } from "@/lib/i18n";

/* FUTURA motions in the app's own "Aurora" look: soft aurora canvas,
   white liquid-glass panels, brand greens, Inter. */

const v = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;
const INK = "text-[#161a19]";
const SUB = "text-[#6a706e]";

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 px-5 pt-4 pb-4 flex flex-col">
      <span className={`text-[9px] font-semibold tracking-[0.2em] uppercase ${SUB}`}>{label}</span>
      <div className="relative flex-1">{children}</div>
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

// Agenda that fills itself: a freed slot is offered and recovered
export function MAgenda() {
  const tx = useTx();
  const rows = [
    { t: "15:00", n: "Carla H." },
    { t: "15:30", n: "Manuel L." },
    { t: "16:00", n: null },
  ];
  return (
    <Frame label={tx("Agenda · hoy", "Schedule · today")}>
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5">
        {rows.map((r) => (
          <div key={r.t} className="flex items-center gap-3">
            <span className={`w-9 text-[10px] font-semibold tabular-nums ${SUB}`}>{r.t}</span>
            {r.n ? (
              <span className={`fl-panel flex-1 h-6 rounded-[10px] px-2.5 flex items-center text-[10px] font-medium ${INK}`}>{r.n}</span>
            ) : (
              <span className="relative flex-1 h-6 rounded-[10px] border border-dashed border-[#91d7bd]">
                <span className="fu-fill fl-primary absolute inset-0 rounded-[10px] px-2.5 flex items-center justify-between text-[10px] font-semibold text-white">
                  Olivia F.
                  <span className="text-[9px] text-white/85">{tx("hueco recuperado", "slot recovered")}</span>
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Voice agent: answers the call and books it
export function MVoice() {
  const tx = useTx();
  const bars = [8, 14, 22, 30, 18, 26, 12, 20, 28, 16, 10, 24, 14, 8];
  return (
    <Frame label={tx("Agente de llamadas", "Call agent")}>
      <div className="absolute inset-0 flex items-center gap-5">
        <div className="fl-panel flex items-center gap-[3px] h-14 px-3 rounded-[14px]">
          {bars.map((h, i) => (
            <span key={i} className="fu-wave w-[3px] rounded-full bg-[#479183]" style={{ height: h, ...v(i) }} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {[tx("Llamada atendida", "Call answered"), tx("Paciente identificado", "Patient identified")].map((l, i) => (
            <span key={l} className={`fu-step flex items-center gap-1.5 text-[10px] ${INK}`} style={v(i)}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a0a6a4]" />{l}
            </span>
          ))}
          <span className="fu-step flex items-center gap-1.5 text-[10px] font-semibold text-[#37766a]" style={v(2)}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#479183]" />{tx("Cita agendada", "Appointment booked")}
          </span>
        </div>
      </div>
    </Frame>
  );
}

// WhatsApp agent: conversation that ends in a confirmed booking
export function MWhatsApp() {
  const tx = useTx();
  return (
    <Frame label={tx("Agente de WhatsApp", "WhatsApp agent")}>
      <div className="absolute inset-0 pt-1 flex flex-col justify-center gap-1">
        <span className={`fu-msg fl-panel self-start max-w-[70%] rounded-xl rounded-bl-sm px-2.5 py-1 text-[10px] ${INK}`} style={v(0)}>
          {tx("¿Tenés turno para el jueves?", "Any slot on Thursday?")}
        </span>
        <span className={`fu-msg self-end max-w-[70%] rounded-xl rounded-br-sm bg-[#ddf3ea] px-2.5 py-1 text-[10px] ${INK}`} style={v(1)}>
          {tx("Sí: 15:00 o 19:00 con Raquel.", "Yes: 3:00 or 7:00 pm with Raquel.")}
        </span>
        <span className="fu-msg fl-primary self-end inline-flex items-center gap-1 rounded-xl rounded-br-sm px-2.5 py-1 text-[10px] font-semibold text-white" style={v(2)}>
          <Ck />{tx("Reservada jueves 15:00", "Booked Thursday 3:00 pm")}
        </span>
      </div>
    </Frame>
  );
}

// Clinical record with AI case summary
export function MRecord() {
  const tx = useTx();
  const lines = [
    [tx("Medicación", "Medication"), tx("Sin medicación", "None")],
    [tx("A tener en cuenta", "Note"), tx("Alergias, antecedentes", "Allergies, history")],
    [tx("Última sesión", "Last session"), tx("30 oct", "Oct 30")],
  ];
  return (
    <Frame label={tx("Resumen del caso · IA", "Case summary · AI")}>
      <div className="absolute inset-0 pt-1 flex flex-col justify-center gap-1">
        {lines.map(([k, val], i) => (
          <div key={k} className="fu-line fl-panel flex items-center gap-2 rounded-[10px] px-2.5 py-1 text-[10px]" style={v(i)}>
            <span className={`font-semibold ${INK}`}>{k}:</span>
            <span className={SUB}>{val}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Internal messaging: a message becomes a task in one click
export function MTasks() {
  const tx = useTx();
  return (
    <Frame label={tx("Mensajes → Tareas", "Messages → Tasks")}>
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        <span className={`fu-chat fl-panel rounded-xl rounded-bl-sm px-3 py-2 text-[10px] max-w-[44%] ${INK}`}>
          {tx("Llamar a Saúl para mover la cita", "Call Saúl to move his appointment")}
        </span>
        <svg viewBox="0 0 24 24" className="fu-arrow w-4 h-4 text-[#479183] shrink-0" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className={`fu-task fl-panel flex items-center gap-2 rounded-[12px] px-3 py-2 text-[10px] font-medium ${INK}`}>
          <span className="fu-box grid place-items-center w-3.5 h-3.5 rounded-[4px] border border-[#c9d1ce]">
            <svg viewBox="0 0 12 12" className="fu-tick w-2.5 h-2.5" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          {tx("Tarea · hoy", "Task · today")}
        </span>
      </div>
    </Frame>
  );
}

// Smart dashboard: occupancy ring fills, key KPIs come in
export function MDashboard() {
  const tx = useTx();
  const kpis = [
    { l: tx("Citas por IA", "AI bookings"), val: "72", d: "▲", up: true },
    { l: tx("Faltas", "No-shows"), val: tx("7,8%", "7.8%"), d: "▼", up: false },
  ];
  return (
    <Frame label={tx("Panel del mes", "This month")}>
      <div className="absolute inset-0 flex items-center gap-5">
        <div className="fl-hero relative w-[78px] h-[78px] shrink-0 rounded-[20px] grid place-items-center">
          <svg viewBox="0 0 64 64" className="w-[62px] h-[62px] -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
            <circle className="fu-ring" cx="32" cy="32" r="26" fill="none" stroke="#91d7bd" strokeWidth="6" strokeLinecap="round" pathLength={100} />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-[14px] font-semibold text-white">68%</span>
            <span className="mt-1 text-[6.5px] font-semibold tracking-[0.14em] text-white/60">{tx("OCUPACIÓN", "OCCUPANCY")}</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {kpis.map((k, i) => (
            <div key={k.l} className="fu-row fl-panel flex items-baseline justify-between rounded-[12px] px-3 py-1.5" style={v(i + 1)}>
              <span className={`text-[10px] ${SUB}`}>{k.l}</span>
              <span className={`text-[14px] font-semibold tabular-nums ${INK}`}>
                {k.val} <span className={`text-[9px] ${k.up ? "text-[#10b981]" : "text-[#a0a6a4]"}`}>{k.d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
