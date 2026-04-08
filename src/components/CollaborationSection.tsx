"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function CollaborationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { playEarcon } = useAudio();

  // Cambia esto con tu número real
  const whatsappNumber = "+5491100000000"; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image fade-in from Left
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Text fade-in from Right
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="collaboration" 
      ref={containerRef}
      className="py-32 relative z-10 border-t border-carbon-800/50 bg-[#000]"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <div ref={imageRef} className="relative group w-full aspect-[4/5] lg:aspect-square">
              <img 
                src="https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775600764/IMG_6420_2_vcauh7.jpg" 
                alt="Gabriel Pirillo Workspace" 
                className="w-full h-full object-cover rounded-2xl opacity-90 transition-all duration-500 group-hover:opacity-100 border border-carbon-800"
              />
          </div>

          {/* Right Column - Text & Button */}
          <div ref={contentRef} className="flex flex-col items-start gap-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
              {t("collab_title")}
            </h2>
            
            <p className="text-silver-200/80 font-light leading-relaxed tracking-tight md:text-lg flex flex-col gap-4">
              {t("collab_desc").split('\n').filter((line: string) => line.trim() !== '').map((line: string, i: number) => (
                <span key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </p>

            <Button 
              href="https://w.app/e9lg2x"
              target="_blank"
              rel="noopener noreferrer"
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5 flex-shrink-0"
                 >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              }
            >
              {t("collab_btn")}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
