"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // Sync GSAP with Lenis on every frame
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Optimization for GSAP/ScrollTrigger
    ScrollTrigger.config({ 
      limitCallbacks: true,
      ignoreMobileResize: true 
    });
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.0, 
        smoothWheel: true, 
        syncTouch: false,
        autoRaf: true
      }}
    >
      {children}
    </ReactLenis>
  );
}
