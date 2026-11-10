"use client";

import { ComponentType, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  TILE_W, TILE_H,
  SynTile, RangosTile, PsyDosisTile, ExpedienteTile, NocheTile, RecorridoTile,
  MedallasTile, TicketTile, CountdownTile,
} from "@/components/SynexElements";

gsap.registerPlugin(ScrollTrigger);

// Six pieces land in the grid (with their value proposition); three only ride the ribbon
const MAIN: { key: string; C: ComponentType }[] = [
  { key: "syn", C: SynTile },
  { key: "rangos", C: RangosTile },
  { key: "psydosis", C: PsyDosisTile },
  { key: "expediente", C: ExpedienteTile },
  { key: "noche", C: NocheTile },
  { key: "recorrido", C: RecorridoTile },
];
const RIBBON: { key: string; C: ComponentType; main: number }[] = [
  { key: "countdown", C: CountdownTile, main: -1 },
  { key: "expediente", C: ExpedienteTile, main: 3 },
  { key: "rangos", C: RangosTile, main: 1 },
  { key: "medallas", C: MedallasTile, main: -1 },
  { key: "syn", C: SynTile, main: 0 },
  { key: "psydosis", C: PsyDosisTile, main: 2 },
  { key: "ticket", C: TicketTile, main: -1 },
  { key: "noche", C: NocheTile, main: 4 },
  { key: "recorrido", C: RecorridoTile, main: 5 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const DEG = 180 / Math.PI;

const noop = () => () => {};
const motionOk = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Stats({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`flex gap-3 ${className}`}>
      <div className="glass-ember rounded-[22px] px-5 py-4 min-w-[140px]">
        <span className="relative z-10 block text-[2.2rem] font-bold tracking-[-0.05em] leading-none text-white">2/3</span>
        <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/90">{t("synex_stat_1")}</span>
      </div>
      <div className="glass rounded-[22px] px-5 py-4 min-w-[140px]">
        <span className="relative z-10 block text-[2.2rem] font-bold tracking-[-0.05em] leading-none text-white">100%</span>
        <span className="relative z-10 mt-2 block text-[13px] text-white/55">{t("synex_stat_2")}</span>
      </div>
    </div>
  );
}

function Caption({ k, compact = false }: { k: string; compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <>
      <span className={`block font-semibold tracking-tight text-white ${compact ? "text-[13px]" : "text-[15px]"}`}>
        <span className="text-ember-500 mr-1.5">{"//"}</span>
        {t(`synex_v_${k}_title`)}
      </span>
      {!compact && <span className="mt-1 block text-[13px] leading-snug text-white/55">{rich(t(`synex_v_${k}_desc`))}</span>}
    </>
  );
}

function Outro({ mobileDetails }: { mobileDetails: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="px-5">
      <div className="max-w-6xl mx-auto">
        {mobileDetails && (
          <div className="reveal md:hidden mt-8 flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed text-white/60">{rich(t("synex_desc"))}</p>
            <Stats />
            <ul className="flex flex-col gap-4">
              {MAIN.map(({ key }) => (
                <li key={key}><Caption k={key} /></li>
              ))}
            </ul>
          </div>
        )}
        <div className="reveal mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
            <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
            {rich(t("synex_result"))}
          </p>
          <Button href="https://synex-music.com" target="_blank" rel="noopener noreferrer" className="self-start md:self-auto shrink-0">
            {t("synex_cta")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Static version (reduced motion only) */
function SynexStatic() {
  const { t } = useLanguage();
  return (
    <div className="px-5">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{t("synex_eyebrow")}</Eyebrow>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/synex-logo.png" alt="SYNEX" className="mt-6 h-4 w-auto" />
        <h2 className="mt-5 text-[2rem] md:text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-white">{t("synex_title")}</h2>
        <p className="mt-4 text-base text-white/60 max-w-xl">{rich(t("synex_desc"))}</p>
        <Stats className="mt-6" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MAIN.map(({ key, C }) => (
            <div key={key}>
              <div style={{ aspectRatio: `${TILE_W}/${TILE_H}` }}><C /></div>
              <div className="mt-3"><Caption k={key} /></div>
            </div>
          ))}
        </div>
      </div>
      <Outro mobileDetails={false} />
    </div>
  );
}

/* Pinned scroll story (all devices):
   1. split headline slides in and apart
   2. a continuous 3D ribbon of SYNEX pieces sweeps through, following the curve
   3. six pieces peel off and land in a grid with their value proposition */
function SynexStory() {
  const { t } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const slotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const kicker = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let W = 0, H = 0, rs = 1, gap = 0.13, headAtLand = 0;
    let slots: { x: number; y: number; s: number }[] = [];
    const LAND0 = 0.4, LAND1 = 0.8, RIB0 = 0.05, RIB1 = 0.6;

    // Ribbon curve: enters bottom-left, swells toward the viewer, exits top-right
    const pos = (u: number) => ({
      x: (u - 0.5) * 1.7 * W,
      y: (0.5 - u) * 0.55 * H + Math.sin(u * Math.PI * 1.6) * 0.12 * H,
      z: Math.sin(clamp01(u) * Math.PI) * 420 - 260,
    });

    const measure = () => {
      const r = stage.getBoundingClientRect();
      W = r.width;
      H = r.height;
      rs = Math.min(1, W / 560);
      const cx = r.left + W / 2, cy = r.top + H / 2;
      slots = slotsRef.current.map((el) => {
        const b = el!.getBoundingClientRect();
        return { x: b.left + b.width / 2 - cx, y: b.top + b.height / 2 - cy, s: b.width / TILE_W };
      });
      // spacing so consecutive pieces touch along the curve (continuous band)
      let len = 0;
      for (let i = 0; i < 40; i++) {
        const a = pos(i / 40), b = pos((i + 1) / 40);
        len += Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
      }
      gap = (TILE_W * rs * 1.04) / len;
      headAtLand = ((LAND0 - RIB0) / (RIB1 - RIB0)) * (1 + (RIBBON.length - 1) * gap);
    };

    const render = (p: number) => {
      const enter = ease(p / 0.1);
      const spread = ease((p - 0.18) / 0.22);
      const fade = 1 - ease((p - 0.3) / 0.12);
      if (line1.current) {
        line1.current.style.transform = `translate3d(${(1 - enter) * -50 - spread * 30}vw,0,0)`;
        line1.current.style.opacity = String(fade);
      }
      if (line2.current) {
        line2.current.style.transform = `translate3d(${(1 - enter) * 50 + spread * 30}vw,0,0)`;
        line2.current.style.opacity = String(fade);
      }
      if (kicker.current) kicker.current.style.opacity = String(enter * (1 - ease((p - 0.16) / 0.08)));

      const land = ease((p - LAND0) / (LAND1 - LAND0));
      const head = ((p - RIB0) / (RIB1 - RIB0)) * (1 + (RIBBON.length - 1) * gap);

      RIBBON.forEach((item, i) => {
        const el = cardsRef.current[i];
        if (!el) return;
        const isMain = item.main >= 0 && slots[item.main];
        const u = isMain ? Math.min(Math.min(head, headAtLand) - i * gap, 0.92) : head - i * gap;
        const a = pos(u), b = pos(u + 0.01);
        const rz = Math.atan2(b.y - a.y, b.x - a.x) * DEG;
        const ry = -Math.atan2(b.z - a.z, Math.hypot(b.x - a.x, b.y - a.y)) * DEG;
        const rx = (u - 0.5) * 70;
        let alpha = clamp01(u / 0.05) * clamp01((1 - u) / 0.05);

        if (isMain) {
          const s = slots[item.main];
          alpha = Math.max(alpha * (1 - land), land);
          el.style.transform =
            land >= 0.999
              ? `translate3d(${s.x}px,${s.y}px,0) scale(${s.s})`
              : `translate3d(${lerp(a.x, s.x, land)}px,${lerp(a.y, s.y, land)}px,${lerp(a.z, 0, land)}px) rotateZ(${lerp(rz, 0, land)}deg) rotateY(${lerp(ry, 0, land)}deg) rotateX(${lerp(rx, 0, land)}deg) scale(${lerp(rs, s.s, land)})`;
        } else {
          alpha *= 1 - land;
          el.style.transform = `translate3d(${a.x}px,${a.y}px,${a.z}px) rotateZ(${rz}deg) rotateY(${ry}deg) rotateX(${rx}deg) scale(${rs})`;
        }
        el.style.opacity = String(alpha);
        el.style.visibility = alpha < 0.01 ? "hidden" : "visible";
      });

      const fin = ease((p - 0.64) / 0.18);
      stage.style.setProperty("--cap", String(ease((p - 0.74) / 0.14)));
      if (finalRef.current) {
        finalRef.current.style.opacity = String(fin);
        finalRef.current.style.transform = `translate3d(0,${(1 - fin) * 24}px,0)`;
      }
    };

    // light smoothing of the scroll progress
    let target = 0, current = 0, ticking = false;
    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        ticking = false;
        gsap.ticker.remove(tick);
      }
      render(current);
    };

    measure();
    render(0);
    const st = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: "+=280%",
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        target = self.progress;
        if (!ticking) {
          ticking = true;
          gsap.ticker.add(tick);
        }
      },
      onRefresh: () => {
        measure();
        render(current);
      },
    });
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  return (
    <>
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* 1. split headline */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 md:px-[6vw] pointer-events-none">
          <div ref={line1} className="text-[12vw] md:text-[9vw] leading-[0.9] font-bold tracking-[-0.055em] text-white">
            {t("synex_split_1")}
          </div>
          <div ref={kicker} className="my-5 self-center text-[12px] md:text-[13px] text-white/60 text-center">
            {t("synex_kicker")}
          </div>
          <div ref={line2} className="self-end text-[12vw] md:text-[9vw] leading-[0.9] font-bold tracking-[-0.055em] text-ember-gradient">
            {t("synex_split_2")}
          </div>
        </div>

        {/* 3. final layout: slots define where pieces land */}
        <div className="absolute inset-0 flex flex-col pt-24 md:pt-28 pb-6 px-5">
          <div ref={finalRef} className="max-w-6xl w-full mx-auto flex items-end justify-between gap-8" style={{ opacity: 0 }}>
            <div>
              <Eyebrow>{t("synex_eyebrow")}</Eyebrow>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/synex-logo.png" alt="SYNEX" className="mt-5 h-3.5 md:h-4 w-auto" />
              <h2 className="mt-4 text-[1.7rem] md:text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.035em] text-white max-w-lg">{t("synex_title")}</h2>
              <p className="hidden md:block mt-3 text-[15px] leading-relaxed text-white/60 max-w-lg">{rich(t("synex_desc"))}</p>
            </div>
            <Stats className="hidden md:flex" />
          </div>
          <div className="synex-grid mt-6 md:mt-7 mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5">
            {MAIN.map(({ key }, i) => (
              <div key={key}>
                <div ref={(el) => { slotsRef.current[i] = el; }} className="w-full" style={{ aspectRatio: `${TILE_W}/${TILE_H}` }} />
                <div className="mt-2 md:mt-3" style={{ opacity: "var(--cap, 0)" }}>
                  <span className="md:hidden"><Caption k={key} compact /></span>
                  <span className="hidden md:block"><Caption k={key} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ribbon pieces, centred and transformed every frame */}
        <div className="absolute inset-0 [perspective:1500px] pointer-events-none">
          <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
            {RIBBON.map(({ key, C }, i) => (
              <div
                key={`${key}-${i}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="absolute will-change-transform"
                style={{
                  width: TILE_W, height: TILE_H, left: -TILE_W / 2, top: -TILE_H / 2,
                  opacity: 0, visibility: "hidden", backfaceVisibility: "hidden",
                }}
              >
                <C />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outro mobileDetails />
    </>
  );
}

export function SynexShowcase() {
  const story = useSyncExternalStore(noop, motionOk, () => true);
  return (
    <section id="synex" className="relative w-full py-24 md:py-32">
      {story ? <SynexStory /> : <SynexStatic />}
    </section>
  );
}
