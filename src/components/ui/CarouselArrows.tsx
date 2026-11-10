"use client";

import { RefObject } from "react";
import { useAudio } from "@/lib/audio";

export function CarouselArrows({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const { playEarcon } = useAudio();

  const scroll = (dir: 1 | -1) => {
    playEarcon();
    const el = target.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 16), behavior: "smooth" });
  };

  return (
    <div className="flex gap-2 shrink-0">
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          aria-label={dir === -1 ? "Previous" : "Next"}
          className="glass glass-hover w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-5 h-5">
            <path d={dir === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}
