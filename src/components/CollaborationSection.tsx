"use client";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";

export function CollaborationSection() {
  const { t } = useLanguage();

  return (
    <section id="collaboration" className="relative w-full py-24 md:py-32 px-5">
      <div className="reveal glass max-w-6xl mx-auto rounded-[36px] p-3 md:p-4">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[28px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src="https://res.cloudinary.com/dcnik6ovx/image/upload/f_auto,q_auto/v1775600764/IMG_6420_2_vcauh7.jpg"
              alt="Gabriel Salvador Pirillo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="px-3 pb-6 lg:px-6 lg:pb-0 flex flex-col items-start">
            <Eyebrow>{t("collab_eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-[2rem] leading-[1.05] md:text-5xl font-semibold tracking-[-0.035em] text-white">{t("collab_title")}</h2>
            <div className="mt-6 flex flex-col gap-4 text-base md:text-lg leading-relaxed text-white/60">
              {t("collab_desc")
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
            </div>
            <Button className="mt-10" href="https://wa.link/bdi66k" target="_blank" rel="noopener noreferrer">
              {t("collab_btn")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
