/* ============================================================
   SYN // las extremidades de "pensando"
   ------------------------------------------------------------
   Seis extremidades lisas, del mismo material que la esfera: nacen
   desde abajo del cuerpo (la cabeza tapa la raíz), afinan con una S
   suave y terminan en una punta redondeada. Nada de ventosas ni de
   espirales: son parte del bicho, no un pulpo pegado.

   Aparecen SOLO en el humor "thinking": un brazo se levanta junto a la
   cabeza, como quien se rasca pensando, y las otras cinco sostienen.

   La geometría se calcula una sola vez, al cargar el módulo: el render
   solo copia strings. Mismo sistema de coordenadas que la cara (caja
   100×100, cabeza en 50,50 con radio 42).
   ============================================================ */

export type LimbRole = "raised" | "arm" | "foot" | "back";

type Spec = {
  role: LimbRole;
  /** dónde nace, en grados sobre el círculo (0 = derecha, 90 = abajo) */
  deg: number;
  rr: number;
  /** hacia dónde sale, en grados */
  ang: number;
  len: number;
  w0: number;
  wEnd: number;
  bulb?: number;
  k0: number;
  k1: number;
  p: number;
};

export type Limb = {
  role: LimbRole;
  d: string;
  shine: string;
  root: { x: number; y: number };
  tip: { x: number; y: number };
};

const f = (n: number) => n.toFixed(2);

/** Curva de curvatura creciente, con grosor que afina hasta una punta redonda. */
function build(s: Spec): Limb {
  const steps = 90;
  const bulb = s.bulb ?? 1.6;
  let th = (s.ang * Math.PI) / 180;
  let x = 50 + Math.cos((s.deg * Math.PI) / 180) * s.rr;
  let y = 50 + Math.sin((s.deg * Math.PI) / 180) * s.rr;
  const pts: { x: number; y: number; th: number; w: number }[] = [];
  const ds = s.len / steps;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // afina, y en el último 10% se engorda apenas: punta de mitón, no de aguja
    const w = s.wEnd + (s.w0 - s.wEnd) * Math.pow(1 - t, 1.5) + bulb * Math.exp(-Math.pow((1 - t) / 0.09, 2));
    pts.push({ x, y, th, w });
    th += (s.k0 + s.k1 * Math.pow(t, s.p)) * ds;
    x += Math.cos(th) * ds;
    y += Math.sin(th) * ds;
  }
  const off = (q: (typeof pts)[number], d: number) => `${f(q.x - Math.sin(q.th) * d)} ${f(q.y + Math.cos(q.th) * d)}`;
  const outline = (scale: number, shift: (q: (typeof pts)[number]) => number) => {
    const a = pts.map((q) => off(q, shift(q) + (q.w * scale) / 2));
    const b = pts.map((q) => off(q, shift(q) - (q.w * scale) / 2)).reverse();
    const r = f((pts[pts.length - 1].w * scale) / 2);
    return `M${a.join(" L")} A${r} ${r} 0 0 0 ${b[0]} L${b.join(" L")} Z`;
  };
  // el brillo va del lado que mira a la luz (arriba a la izquierda)
  const toLight = (q: (typeof pts)[number]) => (Math.sin(q.th) * 0.7 - Math.cos(q.th) * 0.7 > 0 ? 1 : -1);
  const tip = pts[pts.length - 1];
  return {
    role: s.role,
    d: outline(1, () => 0),
    shine: outline(0.3, (q) => toLight(q) * q.w * 0.18),
    root: { x: +f(pts[0].x), y: +f(pts[0].y) },
    tip: { x: +f(tip.x), y: +f(tip.y) },
  };
}

const mirror = (s: Spec): Spec => ({ ...s, deg: 180 - s.deg, ang: 180 - s.ang, k0: -s.k0, k1: -s.k1 });

const back: Spec = { role: "back", deg: 138, rr: 30, ang: 128, len: 38, w0: 17, wEnd: 8, k0: -0.006, k1: 0.06, p: 1.8 };
const arm: Spec = { role: "arm", deg: 162, rr: 32, ang: 138, len: 30, w0: 18, wEnd: 8.5, k0: -0.012, k1: 0.07, p: 1.8 };
const foot: Spec = { role: "foot", deg: 118, rr: 30, ang: 104, len: 30, w0: 20, wEnd: 10, bulb: 2, k0: 0, k1: 0.07, p: 2.2 };
const raised: Spec = { role: "raised", deg: 12, rr: 34, ang: 6, len: 42, w0: 18, wEnd: 8.5, k0: -0.05, k1: -0.045, p: 1.4 };

/** En orden de pintado: el par de atrás primero, así queda tapado donde se cruzan. */
export const THINK_LIMBS: Limb[] = [back, mirror(back), arm, foot, mirror(foot), raised].map(build);
