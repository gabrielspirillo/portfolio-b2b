"use client";

import { rich } from "@/lib/rich";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowIWork() {
  const { t } = useLanguage();
  const steps = [1, 2, 3, 4].map((n) => ({ n, title: t(`process_${n}_title`), desc: t(`process_${n}_desc`) }));

  return (
    <section id="process" className="relative w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow={t("process_eyebrow")} title={t("process_title")} />

        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* connecting hairline (desktop) */}
          <span aria-hidden="true" className="hidden lg:block absolute left-8 right-8 top-[3.4rem] h-px bg-gradient-to-r from-ember-500/0 via-ember-500/40 to-ember-500/0" />
          {steps.map((s, i) => (
            <li key={s.n} className={`reveal ${i === 3 ? "glass-ember" : "glass"} rounded-[28px] p-6 md:p-7 flex flex-col`}>
              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-4xl font-bold tracking-[-0.05em] ${i === 3 ? "text-white" : "text-ember-gradient"}`}>{String(s.n).padStart(2, "0")}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${i === 3 ? "bg-white" : "bg-ember-500 shadow-[0_0_12px_rgba(255,90,31,0.8)]"}`} />
              </div>
              <h3 className="relative z-10 mt-8 text-xl font-semibold tracking-[-0.025em] text-white">{s.title}</h3>
              <p className={`relative z-10 mt-2 text-sm leading-relaxed ${i === 3 ? "text-white/85" : "text-white/55"}`}>
                {rich(s.desc, i === 3 ? "font-semibold text-white underline decoration-white/40 underline-offset-4" : "font-semibold text-white")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
