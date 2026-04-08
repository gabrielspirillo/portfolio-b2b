"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Optimization for GSAP/ScrollTrigger
    ScrollTrigger.config({ 
      limitCallbacks: true,
      ignoreMobileResize: true 
    });
    
    // Ticker and Lag Smoothing
    gsap.ticker.lagSmoothing(0);

    // Drive Lenis from GSAP Ticker for frame-perfect alignment
    const updateLenis = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    return () => {
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        lerp: 0.05, 
        duration: 1.5, 
        smoothWheel: true, 
        wheelMultiplier: 1.1,
        syncTouch: false,
        autoRaf: false // We drive it manually from GSAP ticker
      }}
    >
      {children}
    </ReactLenis>
  );
}
