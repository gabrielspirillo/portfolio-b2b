"use client";

import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Education() {
  const { t } = useLanguage();

  const studies = [
    {
      institution: "Universidad Nacional de Tres de Febrero",
      title: t("edu_relaciones"),
      logo: "https://i.ibb.co/4gw0Cdc6/Captura-de-pantalla-2026-04-07-a-la-s-15-24-04.png",
      skills: [],
    },
    {
      institution: "Henry",
      title: "Full Stack Developer, Computer Software Engineering",
      logo: "https://i.ibb.co/8kZrp6m/Captura-de-pantalla-2026-04-07-a-la-s-14-11-58.png",
      skills: ["JavaScript", "React", "Redux", "Node.js", "REST APIs", "SQL", "PostgreSQL", "MongoDB", "Socket.io", "Docker", "AWS", "Git"],
    },
    {
      institution: "JetBrains Academy",
      title: "Python Developer and Data Science",
      logo: "https://i.ibb.co/mVKkcntK/Captura-de-pantalla-2026-04-07-a-la-s-14-14-46.png",
      skills: [],
    },
    {
      institution: "International CyberSecurity Institute (DefensityOne)",
      title: "Network Security Specialist, Systems",
      logo: "https://i.ibb.co/4gVTV3JN/Captura-de-pantalla-2026-04-07-a-la-s-14-54-34.png",
      skills: ["Network Security", "Firewalls", "IDS", "VPNs & Encryption", "Security Policies"],
    },
    {
      institution: "IBM",
      title: "Data Science with Python",
      logo: "https://i.ibb.co/6cSSdsTv/Captura-de-pantalla-2026-04-07-a-la-s-14-58-34.png",
      skills: [],
    },
  ];

  return (
    <section id="education" className="relative w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow={t("edu_label")} title={t("edu_eyebrow")} />

        <div className="flex flex-col gap-3">
          {studies.map((item) => (
            <article key={item.title} className="reveal glass rounded-[24px] p-5 md:p-6 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="relative z-10 w-14 h-14 shrink-0 rounded-2xl bg-white flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={item.logo} alt={item.institution} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-0.5 text-sm text-white/45">{item.institution}</p>
              </div>
              {item.skills.length > 0 && (
                <div className="relative z-10 flex flex-wrap gap-1.5 sm:max-w-[45%] sm:justify-end">
                  {item.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
