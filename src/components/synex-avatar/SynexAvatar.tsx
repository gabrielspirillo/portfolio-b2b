"use client";
import "./syn.css";
import { useEffect, useId, useRef, useState } from "react";
import { SynexFace, type Expression } from "./face";
import { watchGaze } from "./gaze";
import { THINK_LIMBS } from "./limbs";

/* ============================================================
   SYN // el cuerpo
   ------------------------------------------------------------
   Una esfera de porcelana tibia con luz arriba-izquierda y un
   filo de rebote molten (el naranja de SYNEX entrando por el
   borde inferior derecho, como si la app lo iluminara).

   El cuerpo está SOLO: nada de apéndices permanentes. Las manos
   aparecen únicamente cuando hace un gesto (saludar, festejar) y
   se van con él — un muñeco con pelotitas flotando siempre al
   costado se lee como error de render, no como personaje.

   Todo es SVG + CSS. Cero dependencias, cero canvas y ningún
   requestAnimationFrame permanente: en JS solo corre el parpadeo
   (un timeout) y, si se pide, la mirada (un rAF por movimiento).
   ============================================================ */

export type Mood =
  | "idle"
  | "happy"
  | "wink"
  | "curious"
  | "working"
  | "thinking"
  | "crunching"
  | "zen"
  | "scan"
  | "alert"
  | "error"
  | "sleep"
  | "celebrate"
  | "peek";

/** Gestos: entran, se hacen ver y se van. Nunca quedan puestos. */
export type Gesture = "hop" | "robot" | "rocket" | "pour";

type Skin = { hi: string; mid: string; low: string; rim: string };

const SKINS: Record<string, Skin> = {
  porcelain: { hi: "#fffefc", mid: "#efe2d9", low: "#a2918a", rim: "#ff6a1f" },
  ember: { hi: "#fff4e7", mid: "#ffc08d", low: "#c9600f", rim: "#ffd7a8" },
  flame: { hi: "#fff1e6", mid: "#ff9d63", low: "#c42110", rim: "#ffd0a0" },
  amber: { hi: "#fff9ec", mid: "#ffd398", low: "#c98a1e", rim: "#ffe6bd" },
  rose: { hi: "#fff2f0", mid: "#ffcbc4", low: "#b8564f", rim: "#ff8f8f" },
  ash: { hi: "#efe9e4", mid: "#c2b8b1", low: "#6a625c", rim: "#8d837c" },
  steel: { hi: "#f4f7fa", mid: "#c3ccd6", low: "#5f6b78", rim: "#9fb4c8" },
};

type MoodSpec = {
  face: Expression;
  skin: keyof typeof SKINS;
  dot?: "good" | "flame" | "amber";
  blush?: number;
};

/** El diccionario emocional: humor → cara + piel + señal. */
export const MOODS: Record<Mood, MoodSpec> = {
  idle: { face: "neutral", skin: "porcelain" },
  happy: { face: "happy", skin: "porcelain", dot: "good", blush: 0.5 },
  wink: { face: "wink", skin: "porcelain", dot: "good", blush: 0.4 },
  curious: { face: "curious", skin: "porcelain" },
  working: { face: "focus", skin: "ember", dot: "amber" },
  thinking: { face: "three", skin: "amber", dot: "amber" },
  crunching: { face: "bubbles", skin: "amber", dot: "amber" },
  zen: { face: "zen", skin: "porcelain" },
  scan: { face: "scan", skin: "ember", dot: "amber" },
  alert: { face: "wide", skin: "amber", dot: "amber" },
  error: { face: "flat", skin: "rose", dot: "flame", blush: 0.55 },
  sleep: { face: "sleepy", skin: "ash" },
  celebrate: { face: "money", skin: "flame", dot: "good", blush: 0.7 },
  peek: { face: "peek", skin: "porcelain" },
};

/** Lo que tarda en retraerse la última extremidad (ver `.syn-limbs[data-out]`). */
const LIMB_OUT_MS = 420;
/** Punta de las extremidades: la piel del cuerpo entibiada hacia el acento. */
const LIMB_TIP = "#ff9a3c";
function mix(a: string, b: string, t: number) {
  const ch = (h: string, i: number) => parseInt(h.slice(i, i + 2), 16);
  return (
    "#" +
    [1, 3, 5]
      .map((i) => Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

const DOT: Record<string, string> = { good: "#6fd07a", flame: "#ff3d14", amber: "#ff9a3c" };

/** Los disfraces mandan sobre el humor mientras duran. */
const COSTUME: Partial<Record<Gesture, { skin: keyof typeof SKINS; face: Expression; blush?: number }>> = {
  robot: { skin: "steel", face: "focus" },
  pour: { skin: "porcelain", face: "wide" },
  rocket: { skin: "porcelain", face: "wide" },
};

export function SynexAvatar({
  size = 64,
  mood = "idle",
  expression,
  gesture = null,
  look = "still",
  status,
  bob = true,
  glow = true,
  shadow = false,
  talking = false,
  className = "",
  style,
}: {
  size?: number;
  mood?: Mood;
  /** Pisa la cara del humor (para estados puntuales). */
  expression?: Expression;
  /** Gesto en curso: manos, giros y disfraces. Se apaga solo desde afuera. */
  gesture?: Gesture | null;
  /** `cursor` = los ojos siguen al mouse; en touch mira solo cada tanto. */
  look?: "still" | "cursor" | "wander";
  status?: "good" | "flame" | "amber" | null;
  bob?: boolean;
  glow?: boolean;
  shadow?: boolean;
  talking?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const spec = MOODS[mood] ?? MOODS.idle;
  const dress = gesture ? COSTUME[gesture] : undefined;
  const skin = SKINS[dress?.skin ?? spec.skin];
  const face = expression ?? dress?.face ?? spec.face;
  const blush = dress?.blush ?? spec.blush;
  const dot = status === undefined ? spec.dot : status;
  const hands = mood === "celebrate";

  /* ── extremidades de "pensando" ──
     Brotan con el humor y se retraen al irse. Para que la salida se vea hay
     que mantenerlas montadas un rato más: `leaving` se prende en el mismo
     render en que el humor cambia (patrón de estado derivado de React), no en
     un efecto, porque un efecto llegaría un frame tarde y el desmontaje se
     vería como un corte seco. Un gesto (hop, robot, cohete) las guarda. */
  const limbsWanted = mood === "thinking" && !gesture;
  const [limbsWere, setLimbsWere] = useState(limbsWanted);
  const [leaving, setLeaving] = useState(false);
  if (limbsWere !== limbsWanted) {
    setLimbsWere(limbsWanted);
    setLeaving(!limbsWanted);
  }
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setLeaving(false), LIMB_OUT_MS);
    return () => clearTimeout(t);
  }, [leaving]);
  const limbs = limbsWanted || leaving;
  const ref = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  // El seed sale del id de React: constante por instancia y distinto entre
  // instancias, así el parpadeo de dos bichos nunca cae en el mismo frame.
  const seed = uid.split("").reduce((n, c) => n + c.charCodeAt(0), 0);

  /* ── la mirada la maneja un motor compartido: un listener y un rAF para
     todos los avatares de la página, escribiendo el transform en el DOM ── */
  useEffect(() => {
    // El yin-yang es el cuerpo entero, no un par de ojos: si lo mueve la
    // mirada queda descentrado dentro de la cabeza. Y hay que BORRAR el
    // desplazamiento que quedó pegado de antes: si no, gira excéntrico.
    if (face === "zen") {
      eyesRef.current?.setAttribute("transform", "translate(0 0)");
      return;
    }
    if (look === "still") return;
    const root = ref.current;
    const eyes = eyesRef.current;
    if (!root || !eyes) return;
    return watchGaze(root, eyes);
  }, [look, face]);

  const r = 42;

  return (
    <div
      ref={ref}
      className={`syn-root ${talking ? "syn-talking" : ""} ${className}`}
      style={{ width: size, height: size, ["--syn-rim" as string]: skin.rim, ...style }}
      data-mood={mood}
      data-gesture={gesture ?? undefined}
    >
      {shadow ? <span aria-hidden className="syn-shadow" /> : null}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`syn-body ${bob ? "syn-bob" : ""}`}
        style={{ overflow: "visible" }}
        role="img"
        aria-label={`SYN · ${mood}`}
      >
        <defs>
          <radialGradient id={`s${uid}`} cx="33%" cy="22%" r="86%">
            <stop offset="0%" stopColor={skin.hi} />
            <stop offset="42%" stopColor={skin.mid} />
            <stop offset="100%" stopColor={skin.low} />
          </radialGradient>
          <linearGradient id={`r${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor={skin.rim} stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`b${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff5a2a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff5a2a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`g${uid}`} cx="50%" cy="76%" r="62%">
            <stop offset="0%" stopColor={skin.low} stopOpacity="0.45" />
            <stop offset="100%" stopColor={skin.low} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`c${uid}`}>
            <circle cx={50} cy={50} r={42} />
          </clipPath>
          <linearGradient id={`l${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {/* blanca, no naranja: sobre la piel ember un haz naranja no se ve */}
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#eaf7ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`p${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfe9ff" />
            <stop offset="55%" stopColor="#63c6f5" />
            <stop offset="100%" stopColor="#2f9bd8" />
          </linearGradient>
          <linearGradient id={`f${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffd9a0" />
            <stop offset="45%" stopColor="#ff6a1f" />
            <stop offset="100%" stopColor="#ff3d14" stopOpacity="0" />
          </linearGradient>
          {limbs ? (
            <>
              {THINK_LIMBS.map((l, i) => (
                <linearGradient
                  key={i}
                  id={`t${i}${uid}`}
                  gradientUnits="userSpaceOnUse"
                  x1={l.root.x}
                  y1={l.root.y}
                  x2={l.tip.x}
                  y2={l.tip.y}
                >
                  <stop offset="0" stopColor={skin.low} />
                  <stop offset="0.2" stopColor={skin.mid} />
                  <stop offset="0.78" stopColor={skin.mid} />
                  <stop offset="1" stopColor={mix(skin.mid, LIMB_TIP, 0.55)} />
                </linearGradient>
              ))}
              {/* la misma luz que la esfera: arriba-izquierda clara, abajo-derecha en sombra */}
              <linearGradient id={`ts${uid}`} gradientUnits="userSpaceOnUse" x1={-40} y1={-30} x2={150} y2={170}>
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id={`tr${uid}`} gradientUnits="userSpaceOnUse" x1={-40} y1={-30} x2={150} y2={170}>
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor={skin.rim} stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id={`tu${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#000000" stopOpacity="0.5" />
                <stop offset="1" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </>
          ) : null}
        </defs>

        {/* ── nave: aletas y llama, detrás del cuerpo ── */}
        {gesture === "rocket" ? (
          <g>
            <path className="syn-flame" d="M41 80 L50 126 L59 80 Z" fill={`url(#f${uid})`} />
            <path d="M20 70 L0 100 L30 86 Z" fill="#c42110" />
            <path d="M80 70 L100 100 L70 86 Z" fill="#c42110" />
            <path d="M50 -10 L33 20 L67 20 Z" fill="#ff3d14" />
          </g>
        ) : null}

        {/* ── volcado de datos: el cuerpo es el recipiente ──
            El chorro va DETRÁS de la cabeza a propósito: así se lee que
            los datos entran, y no que le pasan por delante. */}
        {gesture === "pour" ? (
          <g>
            <rect className="syn-stream" x={44} y={-10} width={12} height={34} rx={6} fill={`url(#p${uid})`} />
            <ellipse className="syn-drop" cx={50} cy={6} rx={5} ry={6.5} fill="#8fdcff" />
            <ellipse className="syn-drop" style={{ animationDelay: ".34s" }} cx={50} cy={6} rx={3.6} ry={5} fill="#bfe9ff" />
            <g className="syn-funnel">
              <path d="M13 -50 L87 -50 L58 -6 L42 -6 Z" fill={`url(#p${uid})`} />
              <ellipse cx={50} cy={-50} rx={37} ry={8} fill="#bfe9ff" />
              <ellipse cx={50} cy={-50} rx={29} ry={5.4} fill="#1f7fb8" opacity={0.75} />
              <path d="M13 -50 L87 -50 L58 -6 L42 -6 Z" fill="#ffffff" opacity={0.12} />
            </g>
          </g>
        ) : null}

        {/* ── manos: solo mientras hay gesto ── */}
        {hands ? (
          <>
            <ellipse className="syn-hand syn-hand-l" cx={10} cy={74} rx={10} ry={8} fill={`url(#s${uid})`} />
            <ellipse className="syn-hand syn-hand-r" cx={92} cy={58} rx={11} ry={8.5} fill={`url(#s${uid})`} />
          </>
        ) : null}

        {/* ── robot: antena y orejeras ── */}
        {gesture === "robot" ? (
          <g>
            <line x1={50} y1={12} x2={50} y2={-2} stroke="#8d9aa8" strokeWidth={3} strokeLinecap="round" />
            <circle className="syn-antenna" cx={50} cy={-6} r={5.5} fill="#ff3d14" />
            <rect x={-4} y={42} width={12} height={20} rx={4} fill="#8d9aa8" />
            <rect x={92} y={42} width={12} height={20} rx={4} fill="#8d9aa8" />
          </g>
        ) : null}

        {/* ── extremidades de "pensando": detrás de la cabeza, que tapa las raíces ── */}
        {limbs ? (
          <g className="syn-limbs" data-out={limbsWanted ? undefined : ""}>
            {THINK_LIMBS.map((l, i) => (
              <g
                key={i}
                className="syn-limb"
                style={{ transformOrigin: `${l.root.x}px ${l.root.y}px`, ["--i" as string]: i }}
              >
                <g className={`syn-limb-${l.role}`} style={{ transformOrigin: `${l.root.x}px ${l.root.y}px`, ["--i" as string]: i }}>
                  <path d={l.d} fill={`url(#t${i}${uid})`} />
                  <path d={l.d} fill={`url(#ts${uid})`} />
                  <path d={l.d} fill="none" stroke={`url(#tr${uid})`} strokeWidth={0.9} />
                  <path d={l.shine} fill="#ffffff" opacity={l.role === "back" ? 0.26 : 0.4} />
                  {/* el par de atrás un poco más oscuro, y cálido: negro lo agrisaba */}
                  {l.role === "back" ? <path d={l.d} fill="#4a2414" opacity={0.16} /> : null}
                </g>
              </g>
            ))}
            {/* la sombra que la cabeza tira sobre las raíces */}
            <ellipse cx={50} cy={84} rx={32} ry={10} fill={`url(#tu${uid})`} />
          </g>
        ) : null}

        <circle cx={50} cy={50} r={r} fill={`url(#s${uid})`} />
        {/* oclusión inferior: sin esto la esfera lee como disco */}
        <circle cx={50} cy={50} r={r} fill={`url(#g${uid})`} />
        <circle cx={50} cy={50} r={r - 0.6} fill="none" stroke={`url(#r${uid})`} strokeWidth={1.6} />

        {blush ? (
          <g opacity={blush}>
            <ellipse cx={24} cy={66} rx={13} ry={8.5} fill={`url(#b${uid})`} />
            <ellipse cx={76} cy={66} rx={13} ry={8.5} fill={`url(#b${uid})`} />
          </g>
        ) : null}

        {/* ── robot: visor sobre la cara ── */}
        {gesture === "robot" ? (
          <rect x={16} y={38} width={68} height={28} rx={12} fill="#141a20" stroke="#9fb4c8" strokeWidth={1.4} />
        ) : null}

        {/* leyendo: la línea del escáner recorre el cuerpo, recortada por él */}
        {mood === "scan" ? (
          <g clipPath={`url(#c${uid})`}>
            <rect className="syn-scanline" x={6} y={44} width={88} height={13} fill={`url(#l${uid})`} />
            <rect className="syn-scanline" x={6} y={49.4} width={88} height={1.6} fill="#ffffff" opacity={0.95} />
          </g>
        ) : null}

        <SynexFace
          expression={face}
          skin={skin.hi}
          seed={seed}
          gazeRef={eyesRef}
          color={gesture === "robot" ? "#7fe3ff" : "#150e0b"}
        />

        {/* pensando: tres puntitos que aparecen de a uno, como una burbuja.
            Van a la izquierda: a la derecha está el brazo que se levanta, y
            del lado izquierdo el dock tiene toda la pantalla (a la derecha
            solo 14-18px, donde el tercer globito ya se había cortado). */}
        {mood === "thinking" ? (
          <g fill="#ffd398">
            <circle className="syn-thought" cx={22} cy={16} r={4} />
            <circle className="syn-thought" style={{ animationDelay: "0.42s" }} cx={14} cy={6} r={5} />
            <circle className="syn-thought" style={{ animationDelay: "0.84s" }} cx={8} cy={-4} r={6} />
          </g>
        ) : null}

        {/* pensando no lleva punto: los globitos ya son la señal, y ocupan su lugar */}
        {dot && mood !== "thinking" ? (
          <g className="syn-dot">
            <circle cx={22} cy={13} r={11} fill={DOT[dot]} opacity={0.2} />
            <circle cx={22} cy={13} r={7} fill={DOT[dot]} stroke="rgba(0,0,0,.25)" strokeWidth={0.8} />
          </g>
        ) : null}

        {mood === "sleep" ? (
          <g fill="#fff" opacity={0.95} fontFamily="var(--font-mono), monospace" fontWeight={700}>
            <text className="syn-z" x={82} y={22} fontSize={20}>
              z
            </text>
            <text className="syn-z" x={98} y={8} fontSize={14} style={{ animationDelay: ".9s" }}>
              z
            </text>
          </g>
        ) : null}
      </svg>
      {glow ? <span aria-hidden className="syn-glow" /> : null}
    </div>
  );
}
