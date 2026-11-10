/* ============================================================
   SYN // la mirada, compartida
   ------------------------------------------------------------
   Antes cada avatar escuchaba `pointermove`, medía su caja y
   guardaba la posición de los ojos en estado de React: con tres
   o cuatro en pantalla (el chat tiene uno por respuesta) eso son
   cientos de renders por segundo y la página se traba.

   Acá hay UN listener y UN rAF para todos. Cada avatar se anota
   con su nodo de ojos y el bucle le escribe el atributo
   `transform` directo en el DOM — React no se entera, y mover
   los ojos deja de costar un render.

   Además la mirada no salta: interpola hacia el objetivo, y si
   hace más de dos segundos que nadie mueve el mouse se pone a
   mirar por ahí sola. Un muñeco con los ojos clavados al frente
   se lee muerto.
   ============================================================ */

type Sub = {
  root: Element;
  eyes: SVGGElement;
  /** posición actual y objetivo, en unidades del viewBox (100×100) */
  x: number;
  y: number;
  tx: number;
  ty: number;
  rect: DOMRect | null;
  visible: boolean;
  /** cuándo le toca elegir un nuevo punto para mirar */
  next: number;
};

const subs = new Set<Sub>();
const pointer = { x: 0, y: 0, at: 0 };
let raf = 0;
let rectsAt = 0;
let io: IntersectionObserver | null = null;

const AMP_X = 7.5;
const AMP_Y = 5.5;

function onMove(e: PointerEvent) {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.at = performance.now();
  wake();
}

function measure(now: number) {
  if (now - rectsAt < 400) return;
  rectsAt = now;
  subs.forEach((s) => {
    if (s.visible) s.rect = s.root.getBoundingClientRect();
  });
}

function frame(now: number) {
  // Si no hay ningún avatar a la vista (o la pestaña está en segundo plano)
  // el bucle se apaga entero: lo vuelve a encender el observer.
  let anyVisible = false;
  subs.forEach((s) => {
    if (s.visible) anyVisible = true;
  });
  if (!anyVisible || document.hidden) {
    raf = 0;
    return;
  }
  raf = requestAnimationFrame(frame);
  measure(now);
  const live = now - pointer.at < 2200;
  subs.forEach((s) => {
    if (!s.visible) return;
    if (live && s.rect) {
      const dx = pointer.x - (s.rect.left + s.rect.width / 2);
      const dy = pointer.y - (s.rect.top + s.rect.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const pull = Math.min(1, d / 260);
      s.tx = (dx / d) * pull * AMP_X;
      s.ty = (dy / d) * pull * AMP_Y;
    } else if (now > s.next) {
      // mirar por ahí: casi siempre cerca del centro, de vez en cuando lejos
      const far = Math.random() < 0.3;
      s.tx = (Math.random() - 0.5) * (far ? 2 : 1) * AMP_X;
      s.ty = (Math.random() - 0.5) * (far ? 1.6 : 0.8) * AMP_Y;
      s.next = now + 1600 + Math.random() * 2800;
    }
    const nx = s.x + (s.tx - s.x) * 0.12;
    const ny = s.y + (s.ty - s.y) * 0.12;
    if (Math.abs(nx - s.x) > 0.002 || Math.abs(ny - s.y) > 0.002) {
      s.x = nx;
      s.y = ny;
      s.eyes.setAttribute("transform", `translate(${nx.toFixed(2)} ${ny.toFixed(2)})`);
    }
  });
}

/** Vuelve a encender el bucle si se había apagado por falta de público. */
function wake() {
  if (!raf && subs.size) raf = requestAnimationFrame(frame);
}

function ensureLoop() {
  if (typeof window === "undefined") return;
  if (io) {
    wake();
    return;
  }
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("visibilitychange", wake);
  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      subs.forEach((s) => {
        if (s.root === entry.target) {
          s.visible = entry.isIntersecting;
          if (entry.isIntersecting) s.rect = entry.boundingClientRect;
        }
      });
    });
    wake();
  });
  subs.forEach((s) => io?.observe(s.root));
  raf = requestAnimationFrame(frame);
}

function stopLoop() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  window.removeEventListener("pointermove", onMove);
  document.removeEventListener("visibilitychange", wake);
  io?.disconnect();
  io = null;
}

/** Anota un avatar para que mire. Devuelve la baja. */
export function watchGaze(root: Element, eyes: SVGGElement): () => void {
  /* Arrancar desde donde YA están los ojos, no desde el centro: cada cambio de
     humor re-suscribe, y un sub que nace en 0,0 escribe un salto al medio de la
     cara en el primer frame. */
  const m = /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(eyes.getAttribute("transform") ?? "");
  const x0 = m ? parseFloat(m[1]) : 0;
  const y0 = m ? parseFloat(m[2]) : 0;
  const sub: Sub = {
    root,
    eyes,
    x: x0,
    y: y0,
    // el objetivo también arranca donde está: sin rect todavía, el branch de
    // "mirar por ahí" dispararía un punto al azar en el primer frame
    tx: x0,
    ty: y0,
    rect: root.getBoundingClientRect(),
    visible: true,
    next: performance.now() + 1600,
  };
  subs.add(sub);
  ensureLoop();
  io?.observe(root);
  return () => {
    io?.unobserve(root);
    subs.delete(sub);
    if (subs.size === 0) stopLoop();
  };
}
