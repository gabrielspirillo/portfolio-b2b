"use client";

import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/SectionHeader";

export function AboutSection() {
  const { t } = useLanguage();

  const points = [1, 2, 3, 4].map((n) => ({ title: t(`about_l${n}_title`), desc: t(`about_l${n}_desc`) }));

  return (
    <section id="about-me" className="relative w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="reveal lg:col-span-5">
          <div className="glass rounded-[32px] p-2">
            <div
              className="relative z-10 w-full aspect-[4/5] rounded-[26px] overflow-hidden bg-carbon-800"
              dangerouslySetInnerHTML={{
                __html: `<video src="https://res.cloudinary.com/dcnik6ovx/video/upload/f_auto,q_auto/v1775594991/IMG_6870_kwqpia.mp4" autoplay loop muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0"></video>`,
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow>{t("about_eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-[2rem] leading-[1.05] md:text-5xl font-semibold tracking-[-0.035em] text-white max-w-xl">
              {t("about_title")}
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/65 max-w-2xl">{rich(t("about_intro"))}</p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <div key={p.title} className="reveal glass rounded-2xl p-5">
                <h3 className="relative z-10 text-[15px] font-semibold text-white tracking-tight">
                  <span className="text-ember-500 mr-1.5">{"//"}</span>
                  {p.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55">{rich(p.desc)}</p>
              </div>
            ))}
          </div>

          <div className="reveal glass-ember mt-10 rounded-[24px] px-6 py-6 md:px-8 md:py-7 overflow-hidden">
            <p className="relative z-10 text-xl md:text-2xl font-semibold tracking-[-0.025em] leading-snug text-white [text-wrap:balance]">
              {t("about_conclusion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
