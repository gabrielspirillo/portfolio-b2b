"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// Real SYNEX app screens. MAIN ones land in the final grid and play as video.
const MAIN = ["expediente", "home", "premios", "protocolo", "recorrido"] as const;
const RIBBON = ["root", "expediente", "checkin", "home", "premios", "invite", "protocolo", "roadmap", "recorrido"];
const ASPECT = 844 / 390;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const noop = () => () => {};
const wowSnapshot = () =>
  window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !document.documentElement.classList.contains("lite");

// Desktop with a fine pointer gets the pinned 3D story; everyone else the light version
function useWowMode() {
  return useSyncExternalStore(noop, wowSnapshot, () => false);
}

function Stats() {
  const { t } = useLanguage();
  return (
    <div className="flex gap-3">
      <div className="glass-ember rounded-[22px] px-5 py-4 min-w-[150px]">
        <span className="relative z-10 block text-[2.4rem] font-bold tracking-[-0.05em] leading-none text-white">2/3</span>
        <span className="relative z-10 mt-2 block text-[13px] font-semibold text-white/90">{t("synex_stat_1")}</span>
      </div>
      <div className="glass rounded-[22px] px-5 py-4 min-w-[150px]">
        <span className="relative z-10 block text-[2.4rem] font-bold tracking-[-0.05em] leading-none text-white">100%</span>
        <span className="relative z-10 mt-2 block text-[13px] text-white/55">{t("synex_stat_2")}</span>
      </div>
    </div>
  );
}

function Intro() {
  const { t } = useLanguage();
  return (
    <div>
      <Eyebrow>{t("synex_eyebrow")}</Eyebrow>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/synex-logo.png" alt="SYNEX" className="mt-6 h-4 md:h-[18px] w-auto" />
      <h2 className="mt-5 text-[2rem] leading-[1.05] md:text-[2.6rem] font-semibold tracking-[-0.035em] text-white max-w-lg">{t("synex_title")}</h2>
      <p className="mt-4 text-[15px] md:text-base leading-relaxed text-white/60 max-w-lg">{rich(t("synex_desc"))}</p>
    </div>
  );
}

function Caption({ k }: { k: string }) {
  const { t } = useLanguage();
  return (
    <>
      <span className="block text-[15px] font-semibold tracking-tight text-white">
        <span className="text-ember-500 mr-1.5">{"//"}</span>
        {t(`synex_v_${k}_title`)}
      </span>
      <span className="mt-1 block text-[13px] leading-relaxed text-white/55">{rich(t(`synex_v_${k}_desc`))}</span>
    </>
  );
}

function Outro() {
  const { t } = useLanguage();
  return (
    <div className="px-5">
      <div className="reveal max-w-6xl mx-auto mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-2xl">
          <span className="text-ember-500 font-semibold mr-2">{"//"}</span>
          {rich(t("synex_result"))}
        </p>
        <Button href="https://synex-music.com" target="_blank" rel="noopener noreferrer" className="self-start md:self-auto shrink-0">
          {t("synex_cta")}
        </Button>
      </div>
    </div>
  );
}

/* ---------- Light version: phones, tablets, low-power, reduced motion ---------- */
function SynexLite() {
  return (
    <>
      <div className="px-5">
        <div className="reveal max-w-6xl mx-auto flex flex-col gap-8">
          <Intro />
          <Stats />
        </div>
      </div>
      <div
        className="hide-scrollbar mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 px-5 pt-4 pb-10"
        style={{ scrollbarWidth: "none" }}
      >
        {MAIN.map((k) => (
          <figure key={k} className="snap-start shrink-0 w-[62vw] sm:w-[240px]">
            <div className="glass-flat rounded-[34px] p-[6px] shadow-[0_30px_60px_-30px_rgba(255,90,31,0.45)]">
              <video
                src={`/synex/${k}.mp4`}
                poster={`/synex/${k}.webp`}
                muted
                loop
                playsInline
                preload="none"
                className="relative z-10 block w-full aspect-[390/844] object-cover rounded-[28px] bg-carbon-800"
              />
            </div>
            <figcaption className="mt-4 px-1"><Caption k={k} /></figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

/* ---------- WOW version: pinned scroll story ----------
   1. split headline slides in, 2. a 3D ribbon of app screens sweeps through,
   3. five screens peel off and land in a grid where they play as video. */
function SynexWow() {
  const { t } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const slotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const kicker = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let W = 0, H = 0, base = 200;
    let slots: { x: number; y: number }[] = [];
    let playing = false;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const cx = r.left + W / 2, cy = r.top + H / 2;
      slots = slotsRef.current.map((s) => {
        const b = s!.getBoundingClientRect();
        base = b.width;
        return { x: b.left + b.width / 2 - cx, y: b.top + b.height / 2 - cy };
      });
      cardsRef.current.forEach((c) => {
        if (!c) return;
        c.style.width = `${base}px`;
        c.style.height = `${base * ASPECT}px`;
        c.style.marginLeft = `${-base / 2}px`;
        c.style.marginTop = `${(-base * ASPECT) / 2}px`;
      });
    };

    const render = (p: number) => {
      // 1. split headline
      const enter = ease(p / 0.1);
      const spread = ease((p - 0.18) / 0.22);
      const fade = 1 - ease((p - 0.3) / 0.12);
      if (line1.current) {
        line1.current.style.transform = `translate3d(${(1 - enter) * -45 - spread * 28}vw,0,0)`;
        line1.current.style.opacity = String(fade);
      }
      if (line2.current) {
        line2.current.style.transform = `translate3d(${(1 - enter) * 45 + spread * 28}vw,0,0)`;
        line2.current.style.opacity = String(fade);
      }
      if (kicker.current) kicker.current.style.opacity = String(enter * (1 - ease((p - 0.16) / 0.08)));

      // 2-3. ribbon -> grid
      const land = ease((p - 0.4) / 0.4);
      const gap = 0.12;
      const head = ((p - 0.05) / 0.55) * (1 + (RIBBON.length - 1) * gap);
      const headAtLand = ((0.4 - 0.05) / 0.55) * (1 + (RIBBON.length - 1) * gap);
      RIBBON.forEach((key, i) => {
        const el = cardsRef.current[i];
        if (!el) return;
        const slot = MAIN.indexOf(key as (typeof MAIN)[number]);
        // screens that will land freeze their spot on the ribbon when landing
        // starts (so they peel off from different places) and never exit
        const u = slot >= 0 ? Math.min(Math.min(head, headAtLand) - i * gap, 0.92) : head - i * gap;
        const x = (u - 0.5) * 1.55 * W;
        const y = (0.5 - u) * 0.78 * H - Math.sin(u * Math.PI * 2) * 0.12 * H;
        const z = Math.sin(clamp01(u) * Math.PI) * 280 - 140;
        const ry = (u - 0.5) * -70;
        const rx = Math.sin(u * Math.PI * 2) * 16;
        const rz = (u - 0.5) * 22;
        let alpha = clamp01(u / 0.07) * clamp01((1 - u) / 0.07);

        if (slot >= 0 && slots[slot]) {
          const s = slots[slot];
          const k = land;
          alpha = Math.max(alpha * (1 - k), k);
          if (k >= 0.999) {
            el.style.transform = `translate3d(${s.x}px,${s.y}px,0)`;
          } else {
            el.style.transform = `translate3d(${lerp(x, s.x, k)}px,${lerp(y, s.y, k)}px,${lerp(z, 0, k)}px) rotateX(${lerp(rx, 0, k)}deg) rotateY(${lerp(ry, 0, k)}deg) rotateZ(${lerp(rz, 0, k)}deg) scale(${lerp(1.08, 1, k)})`;
          }
        } else {
          alpha *= 1 - land;
          el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(1.08)`;
        }
        el.style.opacity = String(alpha);
        el.style.visibility = alpha < 0.01 ? "hidden" : "visible";
      });

      // final copy + captions
      const fin = ease((p - 0.64) / 0.18);
      stage.style.setProperty("--cap", String(ease((p - 0.74) / 0.14)));
      if (finalRef.current) {
        finalRef.current.style.opacity = String(fin);
        finalRef.current.style.transform = `translate3d(0,${(1 - fin) * 24}px,0)`;
      }

      // videos only once landed
      const shouldPlay = land >= 0.999;
      if (shouldPlay !== playing) {
        playing = shouldPlay;
        videosRef.current.forEach((v) => (shouldPlay ? v?.play().catch(() => {}) : v?.pause()));
      }
    };

    // Smooth the scroll progress a little so the motion feels fluid
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
        {/* 1. Split headline */}
        <div className="absolute inset-0 flex flex-col justify-center px-[6vw] pointer-events-none">
          <div ref={line1} className="text-[9vw] leading-[0.9] font-bold tracking-[-0.055em] text-white will-change-transform">
            {t("synex_split_1")}
          </div>
          <div ref={kicker} className="mt-6 mb-4 self-center text-[13px] text-white/60 text-center">
            {t("synex_kicker")}
          </div>
          <div ref={line2} className="self-end text-[9vw] leading-[0.9] font-bold tracking-[-0.055em] text-ember-gradient will-change-transform">
            {t("synex_split_2")}
          </div>
        </div>

        {/* 3. Final layout (slots define where the screens land) */}
        <div className="absolute inset-0 flex flex-col pt-28 pb-8 px-5">
          <div ref={finalRef} className="max-w-6xl w-full mx-auto flex items-end justify-between gap-10" style={{ opacity: 0 }}>
            <Intro />
            <Stats />
          </div>
          <div
            className="mt-8 mx-auto w-full grid grid-cols-5 gap-5"
            style={{ maxWidth: "min(72rem, calc((100svh - 31rem) * 0.462 * 5 + 5rem))" }}
          >
            {MAIN.map((k, i) => (
              <div key={k}>
                <div ref={(el) => { slotsRef.current[i] = el; }} className="w-full aspect-[390/844]" />
                <div className="mt-4" style={{ opacity: "var(--cap, 0)" }}>
                  <Caption k={k} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Ribbon cards (absolute, centred, transformed every frame) */}
        <div className="absolute inset-0 [perspective:1600px] pointer-events-none">
          <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
            {RIBBON.map((k, i) => {
              const main = MAIN.indexOf(k as (typeof MAIN)[number]);
              return (
                <div
                  key={`${k}-${i}`}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="absolute left-0 top-0 rounded-[30px] p-[5px] bg-white/[0.06] border border-white/15 shadow-[0_30px_60px_-30px_rgba(255,90,31,0.55)] will-change-transform"
                  style={{ opacity: 0, visibility: "hidden", backfaceVisibility: "hidden" }}
                >
                  {main >= 0 ? (
                    <video
                      ref={(el) => { videosRef.current[main] = el; }}
                      data-manual
                      src={`/synex/${k}.mp4`}
                      poster={`/synex/${k}.webp`}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="block w-full h-full object-cover rounded-[25px] bg-carbon-800"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/synex/${k}.webp`} alt="" className="block w-full h-full object-cover rounded-[25px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Outro />
    </>
  );
}

export function SynexShowcase() {
  const wow = useWowMode();
  return (
    <section id="synex" className="relative w-full py-24 md:py-32">
      {wow ? <SynexWow /> : <SynexLite />}
      {!wow && <Outro />}
    </section>
  );
}
