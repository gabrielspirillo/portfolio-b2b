"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const root = document.documentElement;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Touch / small screens / reduced motion: native scroll (smooth only for anchors)
    if (isTouch || window.innerWidth < 1024 || reduceMotion) {
      if (!reduceMotion) root.style.scrollBehavior = "smooth";
      return () => {
        root.style.scrollBehavior = "";
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Single RAF loop: Lenis runs on GSAP's ticker so ScrollTrigger and scroll stay in the same frame
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors (#services, #contact...) scroll through Lenis instead of jumping
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href")!;
      const target = hash.length > 1 ? document.querySelector(hash) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
