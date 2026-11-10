"use client";

import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";

const ROW_1 = ["React", "Next.js", "Astro", "Tailwind CSS", "Node.js", "TypeScript", "React Native", "Swift", "Kotlin", "Shopify", "Liquid"];
const ROW_2 = ["n8n", "OpenAI", "Whisper", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", "Socket.io", "GoHighLevel", "Alpine.js"];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="glass shrink-0 mr-3 rounded-full px-5 py-2.5 text-sm font-medium text-white/80">
            <span className="relative z-10">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="relative w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex flex-col items-center text-center">
          <Eyebrow>{t("stack_eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-[2rem] leading-[1.05] md:text-5xl font-semibold tracking-[-0.035em] text-white max-w-2xl">{t("stack_title")}</h2>
          <p className="mt-5 text-base md:text-lg text-white/55 max-w-xl">{rich(t("stack_desc"))}</p>
        </div>

        <div className="reveal mt-12 flex flex-col gap-3">
          <Marquee items={ROW_1} />
          <Marquee items={ROW_2} reverse />
        </div>

        <div className="reveal mt-12 flex justify-center">
          <Button href="#contact" variant="glass">{t("nav_cta")}</Button>
        </div>
      </div>
    </section>
  );
}
