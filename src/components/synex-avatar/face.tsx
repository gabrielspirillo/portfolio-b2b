/* ============================================================
   SYN // la cara
   ------------------------------------------------------------
   Un solo rasgo: los ojos. No hay boca, no hay cejas, no hay
   nariz. Todo el estado emocional del bicho se cuenta con dos
   manchas negras que cambian de forma — por eso el catálogo de
   expresiones es largo y cada una está dibujada a mano en
   coordenadas, no "escalada" desde una sola forma base.

   Sistema de coordenadas: caja 100×100, cabeza centrada en
   (50,50) con radio 42. Los ojos viven sobre la línea y≈52
   (apenas debajo del centro: un ojo exactamente centrado lee
   como máscara, no como cara).

   El parpadeo y la mirada NO se resuelven acá: esta pieza es
   pura, recibe `blink` (0..1) y `look` (px) y dibuja. El timing
   vive en SynexAvatar.
   ============================================================ */

export type Expression =
  | "neutral" /* dos cápsulas · el estado base */
  | "wide" /* ojos anchos · atento */
  | "focus" /* ranuras largas · laburando */
  | "happy" /* arcos · sonrisa de ojos */
  | "sleepy" /* arcos invertidos y bajos · dormido */
  | "curious" /* dos puntitos · tímido / curioso */
  | "flat" /* dos guiones · sin comentarios */
  | "angry" /* guiones inclinados hacia adentro */
  | "sad" /* cápsulas chicas inclinadas hacia afuera */
  | "wink" /* uno abierto, uno arqueado */
  | "surprise" /* dos círculos grandes */
  | "three" /* tres ranuras · procesando */
  | "zen" /* yin-yang · esperando sin ansiedad */
  | "bubbles" /* racimo de burbujas · masticando datos */
  | "scan" /* un solo anillo · escaneando */
  | "peek" /* ojos corridos al borde · espiando */
  | "money" /* dos signos $ · se vendió algo */
  | "dizzy" /* dos anillos torcidos · lo zamarrearon */
  | "closed"; /* ojos cerrados */

type Eye =
  | { k: "cap"; x: number; y: number; w: number; h: number; t?: number }
  | { k: "dome"; x: number; y: number; w: number; h: number; down?: boolean }
  | { k: "dot"; x: number; y: number; r: number }
  | { k: "ring"; x: number; y: number; r: number; w: number; t?: number }
  | { k: "yin"; x: number; y: number; r: number }
  | { k: "text"; x: number; y: number; s: number; v: string };

/* Centro de cada ojo en la base. L = izquierdo, R = derecho. */
const L = 35;
const R = 65;
const Y = 52;

export const EXPRESSIONS: Record<Expression, Eye[]> = {
  neutral: [
    { k: "cap", x: L, y: Y, w: 13, h: 26 },
    { k: "cap", x: R, y: Y, w: 13, h: 26 },
  ],
  wide: [
    { k: "cap", x: L, y: Y, w: 17, h: 24 },
    { k: "cap", x: R, y: Y, w: 17, h: 24 },
  ],
  focus: [
    { k: "cap", x: L, y: Y, w: 12, h: 34 },
    { k: "cap", x: R, y: Y, w: 12, h: 34 },
  ],
  happy: [
    { k: "dome", x: L, y: Y - 1, w: 19, h: 14 },
    { k: "dome", x: R, y: Y - 1, w: 19, h: 14 },
  ],
  sleepy: [
    { k: "dome", x: L, y: Y + 4, w: 18, h: 12, down: true },
    { k: "dome", x: R, y: Y + 4, w: 18, h: 12, down: true },
  ],
  curious: [
    { k: "dot", x: L + 2, y: Y, r: 4.6 },
    { k: "dot", x: R - 2, y: Y, r: 4.6 },
  ],
  flat: [
    { k: "cap", x: L, y: Y, w: 17, h: 5.5 },
    { k: "cap", x: R, y: Y, w: 17, h: 5.5 },
  ],
  angry: [
    { k: "cap", x: L, y: Y, w: 18, h: 6, t: 17 },
    { k: "cap", x: R, y: Y, w: 18, h: 6, t: -17 },
  ],
  sad: [
    { k: "cap", x: L, y: Y + 1, w: 14, h: 11, t: -19 },
    { k: "cap", x: R, y: Y + 1, w: 14, h: 11, t: 19 },
  ],
  wink: [
    { k: "cap", x: L, y: Y, w: 13, h: 26 },
    { k: "dome", x: R, y: Y + 3, w: 18, h: 11 },
  ],
  surprise: [
    { k: "dot", x: L - 1, y: Y, r: 11 },
    { k: "dot", x: R + 1, y: Y, r: 11 },
  ],
  three: [
    { k: "cap", x: 32, y: Y, w: 11, h: 24 },
    { k: "cap", x: 50, y: Y, w: 11, h: 33 },
    { k: "cap", x: 68, y: Y, w: 11, h: 24 },
  ],
  zen: [{ k: "yin", x: 50, y: 50, r: 38 }],
  bubbles: [
    { k: "dot", x: 38, y: 58, r: 10 },
    { k: "dot", x: 56, y: 60, r: 8 },
    { k: "dot", x: 58, y: 42, r: 11 },
    { k: "dot", x: 39, y: 40, r: 5.5 },
    { k: "dot", x: 70, y: 52, r: 4 },
  ],
  scan: [{ k: "ring", x: 50, y: 50, r: 15, w: 8 }],
  peek: [
    { k: "cap", x: 60, y: 46, w: 12, h: 24, t: 14 },
    { k: "cap", x: 78, y: 50, w: 12, h: 24, t: 14 },
  ],
  money: [
    { k: "text", x: L, y: Y, s: 30, v: "$" },
    { k: "text", x: R, y: Y, s: 30, v: "$" },
  ],
  dizzy: [
    { k: "ring", x: L, y: Y, r: 8, w: 4.5, t: 20 },
    { k: "ring", x: R, y: Y, r: 8, w: 4.5, t: -20 },
  ],
  closed: [
    { k: "cap", x: L, y: Y + 2, w: 16, h: 4, t: 4 },
    { k: "cap", x: R, y: Y + 2, w: 16, h: 4, t: -4 },
  ],
};

/** Cúpula: esquinas de arriba redondeadas, base recta (o al revés con `down`). */
function domePath(x: number, y: number, w: number, h: number, down?: boolean) {
  const r = w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  return down
    ? `M${x - r} ${t}V${b - r}A${r} ${r} 0 0 0 ${x + r} ${b - r}V${t}Z`
    : `M${x - r} ${b}V${t + r}A${r} ${r} 0 0 1 ${x + r} ${t + r}V${b}Z`;
}

/**
 * Yin-yang. Se dibuja en dos pasos en vez de un solo trazado: primero el
 * disco entero oscuro, encima la mitad clara en forma de S. Así queda
 * explícito qué mitad es cuál — y cada punto va DENTRO de la mitad
 * contraria, que es lo que hace que el símbolo se lea.
 */
function yinLight(x: number, y: number, r: number) {
  const h = r / 2;
  return `M${x} ${y - r}A${h} ${h} 0 0 0 ${x} ${y}A${h} ${h} 0 0 1 ${x} ${y + r}A${r} ${r} 0 0 1 ${x} ${y - r}Z`;
}

/* La inclinación va en un <g> PADRE, no en el propio ojo: el atributo
   `transform` de SVG es un atributo de presentación —la declaración de menor
   prioridad del cascade— y cualquier animación de `.syn-eye` lo pisa. Los
   keyframes de humor fijan transform en 0% y en 100%, así que puesta en el
   ojo la rotación se perdía el ciclo entero y `angry`, `sad` y `closed`
   quedaban derechos. */
function tilt(i: number, t: number | undefined, x: number, y: number, node: React.ReactNode) {
  return t ? (
    <g key={i} transform={`rotate(${t} ${x} ${y})`}>
      {node}
    </g>
  ) : (
    node
  );
}

function eyeNode(e: Eye, i: number, skin: string) {
  // Cada forma sale con `syn-eye` y su índice: las animaciones de humor las
  // mueven de a una, escalonadas. Los ojos son el personaje — lo que hace el
  // cuerpo es acompañarlos.
  const eye = { className: "syn-eye", style: { ["--i" as string]: i } };
  switch (e.k) {
    case "cap":
      return tilt(
        i,
        e.t,
        e.x,
        e.y,
        <rect key={i} {...eye} x={e.x - e.w / 2} y={e.y - e.h / 2} width={e.w} height={e.h} rx={Math.min(e.w, e.h) / 2} />,
      );
    case "dome":
      return <path key={i} {...eye} d={domePath(e.x, e.y, e.w, e.h, e.down)} />;
    case "dot":
      return <circle key={i} {...eye} cx={e.x} cy={e.y} r={e.r} />;
    case "ring":
      return tilt(
        i,
        e.t,
        e.x,
        e.y,
        <circle key={i} {...eye} cx={e.x} cy={e.y} r={e.r} fill="none" stroke="currentColor" strokeWidth={e.w} />,
      );
    case "yin":
      return (
        <g key={i} className="syn-yin" style={{ ["--i" as string]: i }}>
          <circle cx={e.x} cy={e.y} r={e.r} />
          <path d={yinLight(e.x, e.y, e.r)} fill={skin} />
          {/* punto claro en la mitad oscura, punto oscuro en la clara */}
          <circle cx={e.x} cy={e.y - e.r / 2} r={e.r / 6} fill={skin} />
          <circle cx={e.x} cy={e.y + e.r / 2} r={e.r / 6} />
        </g>
      );
    case "text":
      return (
        <text
          key={i}
          {...eye}
          x={e.x}
          y={e.y}
          fontSize={e.s}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-mono), monospace"
        >
          {e.v}
        </text>
      );
  }
}

/**
 * Los ojos, y nada más.
 *
 * Dos grupos anidados y cada uno con su trabajo, para que no se peleen por
 * el mismo `transform`: el de afuera lo mueve el motor de la mirada (JS, por
 * atributo, sin renders) y el de adentro parpadea con una animación CSS de
 * duración distinta en cada instancia — así ningún par de bichos parpadea al
 * mismo tiempo y nadie paga un render por hacerlo.
 */
export function SynexFace({
  expression = "neutral",
  skin = "#fffdfb",
  color = "#150e0b",
  gazeRef,
  seed = 0,
}: {
  expression?: Expression;
  skin?: string;
  color?: string;
  gazeRef?: React.Ref<SVGGElement>;
  /** Desfasa el parpadeo entre instancias. */
  seed?: number;
}) {
  const eyes = EXPRESSIONS[expression] ?? EXPRESSIONS.neutral;
  // El parpadeo no toca formas que ya son "cerradas" ni las que no tienen
  // párpado posible (yin-yang, burbujas): aplastarlas se ve como un glitch.
  const lids = !["zen", "bubbles", "scan", "closed", "flat", "money", "sleepy"].includes(expression);
  return (
    <g ref={gazeRef} fill={color} color={color}>
      <g
        className={lids ? "syn-lids" : undefined}
        style={
          lids
            ? { animationDuration: `${5.4 + (seed % 7) * 0.62}s`, animationDelay: `${((seed * 37) % 41) * 0.11}s` }
            : undefined
        }
      >
        {/* la capa donde vive el efecto del humor, para no pelearse con el
            transform del parpadeo ni con el de la mirada */}
        <g className="syn-eyes">{eyes.map((e, i) => eyeNode(e, i, skin))}</g>
      </g>
    </g>
  );
}
