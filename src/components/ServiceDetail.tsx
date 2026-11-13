"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLanguage, useTx } from "@/lib/i18n";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { Button } from "@/components/ui/Button";

/* Opening a skill card: an animated scene per skill, then the story unfolds
   in sequence. Scenes are pure CSS (transform / opacity / stroke) on loop. */

const WHATSAPP = "https://wa.link/bdi66k";
const TOOLS = [
  ["React", "Next.js", "Astro", "Node.js", "TypeScript", "PostgreSQL"],
  ["React Native", "Swift", "Kotlin", "Expo", "Supabase"],
  ["n8n", "Python", "OpenAI", "WhatsApp API", "Twilio"],
  ["Figma", "Design systems", "Branding", "Motion"],
  ["Ableton Live", "Web Audio API", "Mastering", "Sound design"],
];

type V = CSSProperties & Record<`--${string}`, string | number>;
const css = (o: Record<string, string | number>) => o as V;

/* Scales a fixed-size scene to its stage */
function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
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
      <div className="relative shrink-0" style={{ width: w, height: h, transform: `scale(${s ?? 1})`, visibility: s === null ? "hidden" : "visible" }}>
        {children}
      </div>
    </div>
  );
}

/* Element that appears at `at`% of the 8 s loop and stays until the loop ends */
function K({ at, from = "translateY(8px)", className = "", style, children }: { at: number; from?: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`sd-k sd-in${at} ${className}`} style={{ ...style, ...css({ "--from": from }) }}>
      {children}
    </div>
  );
}

function Ck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`w-3 h-3 shrink-0 ${className}`} fill="none">
      <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 ${className}`}>{children}</span>;
}
function Cursor({ className = "", label }: { className?: string; label?: string }) {
  return (
    <div className={`absolute left-0 top-0 ${className}`}>
      <svg viewBox="0 0 16 16" className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
        <path d="M2 1.5l11 6.2-4.7 1.2-2.2 4.5z" fill="#fff" stroke="#0a0a0a" strokeWidth="0.8" strokeLinejoin="round" />
      </svg>
      {label && <span className="absolute left-4 top-4 rounded-full bg-ember-500 px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">{label}</span>}
    </div>
  );
}
function Ring({ at, label, value }: { at: number; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative w-11 h-11">
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <circle className={`sd-ring sd-r${at}`} cx="22" cy="22" r="18" fill="none" stroke="#FF5A1F" strokeWidth="4" strokeLinecap="round" pathLength={100} />
        </svg>
        <K at={at + 16} from="scale(0.8)" className="absolute inset-0 grid place-items-center text-[12px] font-bold text-white">{value}</K>
      </span>
      <span className="text-[12px] text-white/60">{label}</span>
    </div>
  );
}

/* ---------------- 1. Web: the site builds itself, ships and scores ---------------- */
function SceneWeb() {
  const tx = useTx();
  return (
    <Fit w={560} h={320}>
      <div className="absolute left-4 top-6 w-[344px] h-[272px] rounded-xl border border-white/10 bg-[#111113] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="h-[22px] flex items-center gap-1.5 px-3 border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-white/20" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="mx-auto rounded-md bg-white/[0.05] px-8 py-[1px] text-[9px] text-white/40">{tx("tumarca.com", "yourbrand.com")}</span>
        </div>
        <K at={4} from="translateY(-6px)" className="absolute left-4 right-4 top-[38px] flex items-center justify-between">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ember-500" /><span className="w-10 h-[5px] rounded-full bg-white/70" /></span>
          <span className="flex gap-2">{[20, 26, 18].map((w) => <span key={w} className="h-[4px] rounded-full bg-white/25" style={{ width: w }} />)}</span>
        </K>
        <K at={10} from="scaleX(0)" className="absolute left-4 top-[70px] h-3 w-[220px] rounded-full bg-white/85 origin-left" />
        <K at={14} from="scaleX(0)" className="absolute left-4 top-[88px] h-3 w-[160px] rounded-full bg-white/85 origin-left" />
        <K at={18} className="absolute left-4 top-[110px] flex flex-col gap-1.5">
          <span className="h-[5px] w-[240px] rounded-full bg-white/20" /><span className="h-[5px] w-[190px] rounded-full bg-white/20" />
        </K>
        <K at={22} from="scale(0.85)" className="absolute left-4 top-[138px] w-[92px] h-6 rounded-full bg-ember-500 grid place-items-center text-[10px] font-semibold text-white">
          {tx("Empezar", "Get started")}
          <span className="sd-ripple absolute inset-0 rounded-full border-2 border-ember-400" />
        </K>
        <div className="absolute left-4 right-4 top-[182px] grid grid-cols-3 gap-2">
          {[28, 32, 36].map((a) => (
            <K key={a} at={a} from="translateY(14px)" className="h-[72px] rounded-lg border border-white/[0.07] bg-white/[0.04] p-2">
              <span className="block w-5 h-5 rounded-md bg-white/10" />
              <span className="mt-2 block h-[4px] w-[70%] rounded-full bg-white/30" />
              <span className="mt-1.5 block h-[4px] w-[50%] rounded-full bg-white/15" />
            </K>
          ))}
        </div>
        <K at={62} from="translateY(10px)" className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]">
          <span className="grid place-items-center w-4 h-4 rounded-full bg-ember-500 text-white"><Ck className="w-2.5 h-2.5" /></span>
          <span className="text-[10px] font-semibold text-[#111]">{tx("Nuevo lead", "New lead")}</span>
        </K>
      </div>
      <Cursor className="sd-cursor-web" />

      <div className="absolute left-[380px] top-8 right-4 flex flex-col gap-4">
        <Mono>{tx("Calidad", "Quality")}</Mono>
        <Ring at={30} label={tx("Rendimiento", "Performance")} value="99" />
        <Ring at={36} label="SEO" value="100" />
        <Ring at={42} label={tx("Accesibilidad", "Accessibility")} value="100" />
        <K at={70} from="scale(0.9)" className="mt-1 self-start inline-flex items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-2.5 py-1 text-[10px] font-semibold text-ember-400">
          <Ck /> {tx("En producción", "Live in production")}
        </K>
      </div>
    </Fit>
  );
}

/* ---------------- 2. Mobile: browse, buy, notified ---------------- */
function SceneMobile() {
  const tx = useTx();
  return (
    <Fit w={560} h={320}>
      <div className="absolute left-[210px] top-[14px] w-[140px] h-[292px] rounded-[28px] border border-white/15 bg-[#0d0d0f] p-[6px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)]">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#141416]">
          <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-12 h-3.5 rounded-full bg-black z-20" />
          <div className="sd-screens absolute inset-0 flex w-[300%]">
            {/* 1 · catalog */}
            <div className="w-1/3 h-full px-2.5 pt-7">
              <span className="block text-[11px] font-semibold text-white">{tx("Hola, Sofi", "Hi, Sofi")}</span>
              <span className="block text-[8px] text-white/40">{tx("Nuevos ingresos", "New arrivals")}</span>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {[0, 1, 2, 3].map((n) => (
                  <span key={n} className={`relative h-[62px] rounded-lg ${n === 0 ? "bg-[linear-gradient(150deg,#ff8a55,#e5410f)]" : "bg-white/[0.07]"}`}>
                    <span className="absolute left-1 bottom-1 rounded-full bg-black/50 px-1 text-[7px] font-semibold text-white">$ {[49, 32, 27, 58][n]}</span>
                  </span>
                ))}
              </div>
              <span className="sd-tap1 absolute left-[28px] top-[78px] w-6 h-6 rounded-full border-2 border-white/80" />
            </div>
            {/* 2 · detail */}
            <div className="w-1/3 h-full px-2.5 pt-7">
              <span className="block h-[104px] rounded-xl bg-[linear-gradient(150deg,#ff8a55,#e5410f)]" />
              <span className="mt-2 block text-[10px] font-semibold text-white">{tx("Zapatilla Ember", "Ember sneaker")}</span>
              <span className="block text-[8px] text-white/45">{tx("Envío gratis · 24 h", "Free shipping · 24 h")}</span>
              <span className="mt-1 block text-[13px] font-bold text-white">$ 49</span>
              <span className="relative mt-2 block h-7 rounded-full bg-ember-500 text-center text-[9px] font-semibold leading-7 text-white">
                {tx("Comprar", "Buy now")}
                <span className="sd-tap2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white/80" />
              </span>
            </div>
            {/* 3 · success */}
            <div className="w-1/3 h-full px-2.5 pt-16 flex flex-col items-center text-center">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-ember-500 text-white shadow-[0_0_30px_rgba(255,90,31,0.55)]"><Ck className="w-6 h-6" /></span>
              <span className="mt-3 text-[11px] font-semibold text-white">{tx("Pago confirmado", "Payment confirmed")}</span>
              <span className="mt-1 text-[8px] text-white/45">{tx("Pedido #1042", "Order #1042")}</span>
            </div>
          </div>
          <K at={72} from="translateY(-24px)" className="absolute left-1.5 right-1.5 top-6 z-10 rounded-xl bg-white/95 px-2 py-1.5">
            <span className="block text-[8px] font-semibold text-[#111]">{tx("Tu pedido está en camino", "Your order is on its way")}</span>
            <span className="block text-[7px] text-[#555]">{tx("Llega mañana", "Arrives tomorrow")}</span>
          </K>
        </div>
      </div>

      <K at={6} from="translateX(-12px)" className="absolute left-[40px] top-[70px] flex flex-col gap-2.5">
        {["App Store", "Google Play"].map((s) => (
          <span key={s} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-white/85">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />{s}
          </span>
        ))}
      </K>
      <K at={14} from="translateX(-12px)" className="absolute left-[40px] top-[170px] w-[130px]">
        <Mono>{tx("Fluidez", "Smoothness")}</Mono>
        <div className="mt-2 flex items-end gap-[3px] h-8">
          {Array.from({ length: 16 }, (_, i) => <span key={i} className="sd-fps w-[5px] rounded-sm bg-white/25" style={css({ height: 24 + ((i * 7) % 5), "--i": i })} />)}
        </div>
        <span className="mt-1 block text-[18px] font-bold text-white">60 fps</span>
      </K>
      <div className="absolute right-[34px] top-[86px] flex flex-col gap-2.5 w-[150px]">
        {[
          [44, tx("Pagos integrados", "Payments built in")],
          [56, tx("Sincronizado con tu CRM", "Synced with your CRM")],
          [80, tx("Notificaciones push", "Push notifications")],
        ].map(([a, l]) => (
          <K key={l as string} at={a as number} from="translateX(12px)" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/80">
            <span className="grid place-items-center w-4 h-4 rounded-full bg-ember-500 text-white"><Ck className="w-2.5 h-2.5" /></span>{l}
          </K>
        ))}
      </div>
    </Fit>
  );
}

/* ---------------- 3. Automation: a message runs the whole pipeline ---------------- */
const NODE_X = [24, 160, 296, 432];
function SceneAuto() {
  const tx = useTx();
  const nodes = [
    { t: "WhatsApp", s: tx("Mensaje entrante", "Incoming message"), d: "M4 12a8 8 0 1 1 3.3 6.5L4 20l1.3-3.6A8 8 0 0 1 4 12z" },
    { t: tx("Agente IA", "AI agent"), s: tx("Califica el lead", "Qualifies the lead"), d: "M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" },
    { t: "CRM", s: tx("Crea el contacto", "Creates the contact"), d: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" },
    { t: tx("Equipo", "Team"), s: tx("Avisa al vendedor", "Pings the rep"), d: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0" },
  ];
  const logs = [
    [22, tx("Mensaje recibido · WhatsApp", "Message received · WhatsApp")],
    [36, tx("Lead calificado por IA · score 87", "Lead qualified by AI · score 87")],
    [50, tx("Contacto creado en el CRM", "Contact created in the CRM")],
    [64, tx("Aviso enviado al vendedor", "Rep notified")],
  ];
  return (
    <Fit w={560} h={320}>
      <K at={2} from="translateY(-6px)" className="absolute left-6 top-5 flex items-center gap-2">
        <span className="sd-live w-2 h-2 rounded-full bg-ember-500" /><Mono className="text-white/55">{tx("Flujo activo · 24/7", "Live workflow · 24/7")}</Mono>
      </K>
      <K at={74} from="scale(0.9)" className="absolute right-6 top-4 rounded-full border border-ember-500/40 bg-ember-500/10 px-3 py-1 text-[11px] font-semibold text-ember-400">
        {tx("−90% trabajo manual", "−90% manual work")}
      </K>
      <svg viewBox="0 0 560 320" className="absolute inset-0 w-full h-full" fill="none">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${NODE_X[i] + 104} 92 C ${NODE_X[i] + 120} 92, ${NODE_X[i + 1] - 16} 92, ${NODE_X[i + 1]} 92`} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
      </svg>
      {[0, 1, 2].map((i) => (
        <span key={i} className="sd-packet absolute left-0 top-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-ember-400 shadow-[0_0_10px_3px_rgba(255,90,31,0.7)]" style={css({ offsetPath: `path('M${NODE_X[i] + 104} 92 L ${NODE_X[i + 1]} 92')`, "--i": i })} />
      ))}
      {nodes.map((n, i) => (
        <K key={n.t} at={4 + i * 4} from="translateY(10px)" className="absolute top-[60px] w-[104px] h-[64px] rounded-2xl border border-white/10 bg-[#121214] px-3 py-2.5" style={{ left: NODE_X[i] }}>
          <span className={`sd-k sd-in${20 + i * 14} absolute inset-0 rounded-2xl border border-ember-500/70 shadow-[0_0_24px_-4px_rgba(255,90,31,0.6)]`} style={css({ "--from": "scale(1.04)" })} />
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d={n.d} /></svg>
            <span className="text-[11px] font-semibold text-white">{n.t}</span>
          </span>
          <span className="mt-1.5 block text-[9px] leading-tight text-white/45">{n.s}</span>
        </K>
      ))}
      <K at={16} from="translateY(10px)" className="absolute left-6 right-6 top-[150px] bottom-5 rounded-2xl border border-white/[0.07] bg-black/40 px-4 py-3 font-mono">
        <Mono>{tx("Registro", "Log")}</Mono>
        <div className="mt-2 flex flex-col gap-1.5">
          {logs.map(([a, l], i) => (
            <K key={l as string} at={a as number} from="translateX(-8px)" className={`flex items-center gap-2 text-[11px] ${i === 3 ? "text-ember-400" : "text-white/70"}`}>
              <span className="text-white/30">{`09:41:${String(2 + i * 3).padStart(2, "0")}`}</span>
              <span>›</span>
              {l}
              {i === 3 && <Ck />}
            </K>
          ))}
        </div>
      </K>
    </Fit>
  );
}

/* ---------------- 4. Design: an interface comes together on the canvas ---------------- */
function SceneDesign() {
  const tx = useTx();
  return (
    <Fit w={560} h={320}>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:16px_16px]" />
      <K at={4} from="translateX(-10px)" className="absolute left-6 top-8 flex flex-col gap-2.5">
        <Mono>{tx("Paleta", "Palette")}</Mono>
        {["#FF5A1F", "#1B1B1D", "#8A8A8F", "#F4F4F5"].map((c, i) => (
          <span key={c} className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-lg border border-white/15 ${i === 0 ? "sd-pick" : ""}`} style={{ background: c }} />
            <span className="text-[9px] font-mono text-white/45">{c}</span>
          </span>
        ))}
      </K>

      <K at={2} from="scale(0.96)" className="absolute left-[200px] top-[14px]">
        <Mono className="block mb-1.5">{tx("Inicio · móvil", "Home · mobile")}</Mono>
        <div className="relative w-[160px] h-[272px] rounded-[22px] border border-white/15 bg-[#0f0f11] overflow-hidden">
          <K at={12} from="translateX(-30px)" className="absolute left-3 right-3 top-4 flex items-center justify-between">
            <span className="w-14 h-2 rounded-full bg-white/70" /><span className="w-4 h-4 rounded-full bg-white/15" />
          </K>
          <K at={22} from="scale(0.9)" className="absolute left-3 right-3 top-10 h-[96px] rounded-xl bg-[linear-gradient(150deg,#ff8a55,#e5410f)]" />
          <K at={32} from="translateY(8px)" className="absolute left-3 top-[148px] flex flex-col gap-1.5">
            <span className="h-2.5 w-[110px] rounded-full bg-white/85" /><span className="h-2.5 w-[80px] rounded-full bg-white/85" />
            <span className="mt-1 h-1.5 w-[120px] rounded-full bg-white/20" /><span className="h-1.5 w-[96px] rounded-full bg-white/20" />
          </K>
          <span className="sd-guide absolute left-0 right-0 top-[230px] border-t border-dashed border-ember-400" />
          <span className="sd-guide absolute top-0 bottom-0 left-1/2 border-l border-dashed border-ember-400" />
        </div>
      </K>
      {/* The CTA is dragged in and snaps into place */}
      <div className="sd-drag absolute left-0 top-0">
        <span className="block w-[134px] h-8 rounded-full bg-ember-500 text-center text-[11px] font-semibold leading-8 text-white shadow-[0_10px_24px_-8px_rgba(255,90,31,0.7)]">{tx("Reservar", "Book now")}</span>
        <Cursor className="!left-[104px] !top-[18px]" label="Gabriel" />
      </div>

      <K at={40} from="translateX(10px)" className="absolute left-[400px] top-8 flex flex-col">
        <Mono>{tx("Tipografía", "Type")}</Mono>
        <span className="mt-1 text-[52px] font-semibold leading-none tracking-[-0.04em] text-white">Aa</span>
        <span className="text-[10px] text-white/45">Inter · 600</span>
        <span className="mt-4"><Mono>{tx("Espaciado", "Spacing")}</Mono></span>
        <span className="mt-1.5 flex items-end gap-1.5">
          {[8, 16, 24].map((n) => (
            <span key={n} className="flex flex-col items-center gap-1">
              <span className="rounded-sm bg-ember-500/70" style={{ width: n, height: n }} />
              <span className="text-[8px] text-white/40">{n}</span>
            </span>
          ))}
        </span>
      </K>
      <K at={72} from="scale(0.9)" className="absolute left-[400px] bottom-6 inline-flex items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-2.5 py-1 text-[10px] font-semibold text-ember-400">
        <Ck /> {tx("Listo para programar", "Ready to build")}
      </K>
    </Fit>
  );
}

/* ---------------- 5. Sound: raw take → mixed and mastered ---------------- */
const WAVE = Array.from({ length: 72 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1)));
function SceneSound() {
  const tx = useTx();
  return (
    <Fit w={560} h={320}>
      <div className="absolute left-6 right-6 top-6 h-[96px] rounded-2xl border border-white/[0.07] bg-black/40 overflow-hidden">
        <span className="absolute left-3 top-2"><Mono>{tx("Pista · voz + beat", "Track · vocal + beat")}</Mono></span>
        <div className="sd-before absolute inset-x-3 top-6 bottom-2 flex items-center gap-[2px]">
          {WAVE.map((h, i) => <span key={i} className="flex-1 rounded-full bg-white/25" style={{ height: `${h * 40}%` }} />)}
        </div>
        <div className="sd-after absolute inset-x-3 top-6 bottom-2 flex items-center gap-[2px]">
          {WAVE.map((h, i) => <span key={i} className="flex-1 rounded-full bg-gradient-to-b from-ember-400 to-ember-600" style={{ height: `${55 + h * 35}%` }} />)}
        </div>
        <span className="sd-playhead absolute top-5 bottom-1 left-3 w-px bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>

      <div className="absolute left-6 top-[136px] flex gap-2">
        {[
          [14, "EQ"],
          [24, tx("Compresor", "Compressor")],
          [34, tx("Limitador", "Limiter")],
        ].map(([a, l]) => (
          <span key={l as string} className="relative flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/75">
            <span className="relative w-2 h-2 rounded-full bg-white/20">
              <K at={a as number} from="scale(0)" className="absolute inset-0 rounded-full bg-ember-500 shadow-[0_0_8px_rgba(255,90,31,0.9)]" />
            </span>
            {l}
          </span>
        ))}
      </div>

      <div className="absolute left-6 top-[186px] w-[290px] h-[110px] rounded-2xl border border-white/[0.07] bg-black/40 px-3 pt-2">
        <Mono>{tx("Espectro", "Spectrum")}</Mono>
        <div className="absolute left-3 right-3 bottom-3 top-7 flex items-end gap-[3px]">
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              className="sd-eq flex-1 rounded-t-sm origin-bottom bg-gradient-to-t from-ember-600 to-ember-400"
              style={css({ height: `${30 + 65 * Math.exp(-((i - 7) ** 2) / 60) + 10 * Math.sin(i)}%`, "--dur": `${0.7 + ((i * 37) % 9) / 10}s`, "--i": i })}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-6 top-[136px] w-[200px] h-[160px] rounded-2xl border border-white/[0.07] bg-black/40 px-4 pt-3">
        <Mono>{tx("Loudness", "Loudness")}</Mono>
        <div className="absolute left-4 bottom-4 top-9 flex gap-2">
          {[0, 1].map((c) => (
            <span key={c} className="relative w-3 h-full rounded-full bg-white/[0.06] overflow-hidden">
              <span className="sd-meter absolute inset-x-0 bottom-0 h-[78%] rounded-full bg-gradient-to-t from-ember-600 via-ember-500 to-ember-300 origin-bottom" style={css({ "--i": c })} />
            </span>
          ))}
          <span className="absolute -left-1 -right-1 top-[22%] border-t border-dashed border-white/40" />
        </div>
        <div className="absolute left-[64px] top-10 flex flex-col">
          <K at={44} from="translateY(6px)" className="text-[24px] font-bold leading-none tracking-[-0.03em] text-white">−14 LUFS</K>
          <K at={50} from="translateY(6px)" className="mt-1 text-[10px] text-white/45">{tx("Objetivo streaming", "Streaming target")}</K>
          <K at={66} from="scale(0.9)" className="mt-4 self-start inline-flex items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-2.5 py-1 text-[10px] font-semibold text-ember-400">
            <Ck /> {tx("Master listo", "Master ready")}
          </K>
        </div>
      </div>
    </Fit>
  );
}

const SCENES = [SceneWeb, SceneMobile, SceneAuto, SceneDesign, SceneSound];

/* Words rise in one after another; **bold** stays bold */
function Reveal({ text, base = 0 }: { text: string; base?: number }) {
  let n = 0;
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((seg, si) => {
        const bold = seg.startsWith("**");
        const words = (bold ? seg.slice(2, -2) : seg).split(/(\s+)/);
        return words.map((w, wi) =>
          /^\s+$/.test(w) || !w ? (
            w
          ) : (
            <span key={`${si}-${wi}`} className={`sd-word ${bold ? "font-semibold text-white" : ""}`} style={css({ "--d": base + Math.min(n++, 60) * 18 })}>
              {w}
            </span>
          ),
        );
      })}
    </>
  );
}

export function ServiceDetail({ i, title, eyebrow }: { i: number; title: string; eyebrow: string }) {
  const { language } = useLanguage();
  const tx = useTx();
  const c = SERVICE_CONTENT[language === "en" ? "en" : "es"][i];
  const Scene = SCENES[i];
  return (
    <div className="sd">
      <div className="sd-up relative mt-10 md:mt-0 aspect-[16/9] md:aspect-[16/8.4] rounded-[22px] overflow-hidden border border-white/10 bg-[radial-gradient(120%_120%_at_50%_110%,#2a0f06_0%,#0e0a09_50%,#070606_100%)]" style={css({ "--d": 80 })}>
        <Scene />
      </div>

      <div className="mt-8">
        <span className="sd-up inline-block text-[13px] font-medium text-white/50" style={css({ "--d": 220 })}>
          <span className="text-ember-500 font-semibold">{"//"}</span> {eyebrow}
        </span>
        <h3 className="sd-up mt-2 pr-12 text-3xl md:text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-white" style={css({ "--d": 300 })}>{title}</h3>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/65">
          <Reveal text={c.intro} base={420} />
        </p>
      </div>

      <div className="mt-10">
        <span className="sd-up block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40" style={css({ "--d": 700 })}>{tx("Soluciones clave", "Key solutions")}</span>
        <ul className="mt-4 flex flex-col">
          {c.items.map(([t, d], k) => (
            <li key={t} className="sd-up group/item relative grid grid-cols-[52px_1fr] md:grid-cols-[64px_1fr] gap-x-4 py-5" style={css({ "--d": 800 + k * 140 })}>
              <span className="sd-line absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-ember-500/70 via-white/15 to-transparent" style={css({ "--d": 820 + k * 140 })} />
              <span className="text-[28px] md:text-[34px] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,122,69,0.75)]">{String(k + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[17px] md:text-lg font-semibold tracking-[-0.01em] text-white">{t}</span>
                <span className="mt-1.5 block text-[14px] md:text-[15px] leading-relaxed text-white/55">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sd-up glass-ember mt-6 rounded-[22px] px-6 py-6 md:px-7" style={css({ "--d": 1260 })}>
        <span className="relative z-10 block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/75">{tx("Mi enfoque", "My approach")}</span>
        <p className="relative z-10 mt-2.5 text-[15px] md:text-base leading-relaxed text-white">{c.approach}</p>
      </div>

      <div className="sd-up mt-8 flex flex-wrap items-center justify-between gap-5" style={css({ "--d": 1400 })}>
        <div className="flex flex-wrap gap-1.5">
          {TOOLS[i].map((tool) => (
            <span key={tool} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/60">{tool}</span>
          ))}
        </div>
        <Button href={WHATSAPP} target="_blank" rel="noopener noreferrer">{tx("Hablemos de tu proyecto", "Let's talk about your project")}</Button>
      </div>
    </div>
  );
}
