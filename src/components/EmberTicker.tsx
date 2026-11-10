"use client";

import { useLanguage } from "@/lib/i18n";
import { Liquid } from "@/components/ui/Liquid";

// High-contrast ember band between sections: the five services on a loop
export function EmberTicker() {
  const { t } = useLanguage();
  const items = [1, 2, 3, 4, 5].map((n) => t(`serv_${n}_title`));

  return (
    <div aria-hidden="true" className="relative w-full py-10 md:py-14 overflow-hidden">
      <div className="glass-ember w-[110%] -ml-[5%] -rotate-2 rounded-none overflow-hidden py-5 md:py-7">
        <Liquid sheen={false} />
        <div className="relative z-10 ticker-track flex w-max">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center shrink-0 pr-10 md:pr-14 text-2xl md:text-4xl font-bold tracking-[-0.04em] text-white whitespace-nowrap">
              <span className="text-white/60 mr-10 md:mr-14 font-semibold">{"//"}</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
