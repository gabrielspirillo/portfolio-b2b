"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // Sync GSAP with Lenis
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Optimization for GSAP/ScrollTrigger
    ScrollTrigger.config({ 
      limitCallbacks: true,
      ignoreMobileResize: true 
    });
    
    // Smooth scroll physics
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
