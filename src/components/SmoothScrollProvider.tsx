"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Optimization for GSAP/ScrollTrigger
    ScrollTrigger.config({ 
      limitCallbacks: true,
      ignoreMobileResize: true 
    });

    // Device detection: Disable on touch or tiny screens for native performance
    // standard for touch devices is to avoid virtual scroll
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;

    if (isTouch || isMobile) {
      console.log("SmoothScroll: Touch/Mobile detected. Delegating to native scroll.");
      return;
    }

    // Initialize Lenis Instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Optimized RequestAnimationFrame loop
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    
    rafRef.current = requestAnimationFrame(raf);

    // Cleanup logic to prevent memory leaks and zombie loops
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      console.log("SmoothScroll: Cleanup completed.");
    };
  }, []);

  return <>{children}</>;
}
