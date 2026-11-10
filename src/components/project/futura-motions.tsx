"use client";

import { Frame, Mono } from "@/components/project/motions";

/* Futura motions: same dashboard language as the SYNEX cases. */

// Agenda that fills itself: a freed slot is offered and recovered
export function AgendaFill({ tone = "dark" }: { tone?: "dark" | "ember" }) {
  const ember = tone === "ember";
  const all = [
    { t: "15:00", n: "Carla H." },
    { t: "15:30", n: "Manuel L." },
    { t: "16:00", n: null },
    { t: "16:30", n: "Lina D." },
  ];
  const rows = ember ? all : all.slice(0, 3);
  return (
    <div className="absolute inset-0 px-5 pt-4 pb-4 flex flex-col">
      <Mono className={ember ? "text-white/80" : "text-white/40"}>Agenda · hoy</Mono>
      <div className={`${ember ? "mt-3" : "mt-2"} flex-1 flex flex-col justify-center gap-1.5`}>
        {rows.map((r) => (
          <div key={r.t} className="flex items-center gap-3">
            <span className={`w-9 text-[10px] font-semibold tabular-nums ${ember ? "text-white/75" : "text-white/40"}`}>{r.t}</span>
            {r.n ? (
              <span className={`flex-1 h-6 rounded-md px-2.5 flex items-center text-[10px] ${ember ? "bg-black/20 text-white/85" : "bg-white/[0.06] text-white/60"}`}>{r.n}</span>
            ) : (
              <span className={`relative flex-1 h-6 rounded-md border border-dashed ${ember ? "border-white/50" : "border-white/20"}`}>
                <span className={`fu-fill absolute inset-0 rounded-md px-2.5 flex items-center justify-between text-[10px] font-semibold ${ember ? "bg-white text-ember-600" : "bg-ember-500 text-white"}`}>
                  Olivia F.
                  <span className={`text-[9px] ${ember ? "text-ember-500" : "text-white/85"}`}>hueco recuperado</span>
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export function MAgenda() {
  return <AgendaFill />;
}

// Voice agent: answers the call and books it
export function MVoice() {
  const bars = [8, 14, 22, 30, 18, 26, 12, 20, 28, 16, 10, 24, 14, 8];
  return (
    <Frame label="Agente de llamadas">
      <div className="absolute inset-0 flex items-center gap-5">
        <div className="flex items-center gap-[3px] h-10">
          {bars.map((h, i) => (
            <span key={i} className="fu-wave w-[3px] rounded-full bg-ember-500" style={{ height: h, ["--i" as string]: i }} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="fu-step flex items-center gap-1.5 text-[10px] text-white/70" style={{ ["--i" as string]: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />Llamada atendida
          </span>
          <span className="fu-step flex items-center gap-1.5 text-[10px] text-white/70" style={{ ["--i" as string]: 1 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />Paciente identificado
          </span>
          <span className="fu-step flex items-center gap-1.5 text-[10px] font-semibold text-ember-400" style={{ ["--i" as string]: 2 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />Cita agendada
          </span>
        </div>
      </div>
    </Frame>
  );
}

// WhatsApp agent: conversation that ends in a confirmed booking
export function MWhatsApp() {
  return (
    <Frame label="Agente de WhatsApp">
      <div className="absolute inset-0 pt-1 flex flex-col justify-center gap-1">
        <span className="fu-msg self-start max-w-[70%] rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-1 text-[10px] text-white/75" style={{ ["--i" as string]: 0 }}>
          ¿Tenés turno para el jueves?
        </span>
        <span className="fu-msg self-end max-w-[70%] rounded-xl rounded-br-sm bg-white/[0.12] px-2.5 py-1 text-[10px] text-white/85" style={{ ["--i" as string]: 1 }}>
          Sí: 15:00 o 19:00 con Raquel.
        </span>
        <span className="fu-msg self-end rounded-xl rounded-br-sm bg-ember-500 px-2.5 py-1 text-[10px] font-semibold text-white" style={{ ["--i" as string]: 2 }}>
          ✓ Reservada jueves 15:00
        </span>
      </div>
    </Frame>
  );
}

// Clinical record with AI case summary
export function MRecord() {
  const lines = [
    ["Medicación", "Sin medicación"],
    ["A tener en cuenta", "Alergias, antecedentes"],
    ["Última sesión", "30 oct"],
  ];
  return (
    <Frame label="Resumen del caso · IA">
      <div className="absolute inset-0 pt-1 flex flex-col justify-center gap-1">
        {lines.map(([k, v], i) => (
          <div key={k} className="fu-line flex items-center gap-2 rounded-md bg-white/[0.05] border border-white/[0.06] px-2.5 py-1 text-[10px]" style={{ ["--i" as string]: i }}>
            <span className="font-semibold text-white/85">{k}:</span>
            <span className="text-white/50">{v}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Internal messaging: a message becomes a task in one click
export function MTasks() {
  return (
    <Frame label="Mensajes → Tareas">
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        <span className="fu-chat rounded-xl rounded-bl-sm bg-white/[0.07] px-3 py-2 text-[10px] text-white/75 max-w-[44%]">
          Llamar a Saúl para mover la cita
        </span>
        <svg viewBox="0 0 24 24" className="fu-arrow w-4 h-4 text-ember-500 shrink-0" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="fu-task flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-[10px] text-white/80">
          <span className="fu-box grid place-items-center w-3.5 h-3.5 rounded-[4px] border border-white/30">
            <svg viewBox="0 0 12 12" className="fu-tick w-2.5 h-2.5" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          Tarea · hoy
        </span>
      </div>
    </Frame>
  );
}

// Smart dashboard: what needs attention, ranked
export function MDashboard() {
  const items = [
    ["20", "sin confirmar"],
    ["19", "esperan respuesta"],
    ["4", "huecos ofrecidos"],
  ];
  return (
    <Frame label="Requiere atención">
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5">
        {items.map(([n, l], i) => (
          <div key={l} className="fu-row flex items-center gap-3" style={{ ["--i" as string]: i }}>
            <span className={`w-8 text-[15px] font-semibold tabular-nums ${i === 0 ? "text-ember-400" : "text-white"}`}>{n}</span>
            <span className="text-[10px] text-white/55">{l}</span>
            <span className="ml-auto h-px w-10 bg-white/10" />
          </div>
        ))}
      </div>
    </Frame>
  );
}
