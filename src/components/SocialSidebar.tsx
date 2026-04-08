"use client";

import Link from "next/link";
import { useAudio } from "@/lib/audio";

export function SocialSidebar() {
  const { playEarcon } = useAudio();

  const links = [
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      ),
      href: "https://www.linkedin.com/in/gabrielpirillo/", 
      label: "LinkedIn" 
    },
    { 
      icon: (
        // Instagram Icon
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      ),
      href: "https://www.instagram.com/salvatto_ofc", 
      label: "Instagram" 
    }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-center mix-blend-difference">
      <div className="w-[1px] h-24 bg-white/20" />
      
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-accent transition-colors duration-300 hover:scale-110"
          aria-label={link.label}
          onClick={playEarcon}
        >
          {link.icon}
        </Link>
      ))}

      <div className="w-[1px] h-24 bg-white/20" />
    </div>
  );
}
