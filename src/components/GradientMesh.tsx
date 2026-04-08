"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very slow pulsating ambient glow
      gsap.to(".orb-1", {
        x: "20vw",
        y: "-10vh",
        scale: 1.2,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".orb-2", {
        x: "-20vw",
        y: "15vh",
        scale: 1.5,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".orb-3", {
        x: "10vw",
        y: "20vh",
        scale: 1.1,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, meshRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={meshRef} 
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none mix-blend-screen opacity-40"
      aria-hidden="true"
    >
      {/* Warm accent glow (n8n orange / warmth) */}
      <div className="orb-1 absolute top-[20%] left-[60%] w-[40vw] h-[40vw] bg-[#ea580c] rounded-full blur-[120px] opacity-20" />
      
      {/* Deep blue/accent glow */}
      <div className="orb-2 absolute top-[60%] left-[20%] w-[50vw] h-[50vw] bg-[#3b82f6] rounded-full blur-[150px] opacity-20" />
      
      {/* Subtle purple tone */}
      <div className="orb-3 absolute top-[40%] left-[40%] w-[35vw] h-[35vw] bg-[#8b5cf6] rounded-full blur-[100px] opacity-15" />
    </div>
  );
}
