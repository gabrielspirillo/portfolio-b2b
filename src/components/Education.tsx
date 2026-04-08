"use client";

import { useLanguage } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";

export function Education() {
  const { playEarcon } = useAudio();

  const studies = [
    {
      institution: "Universidad Nacional de Tres de Febrero",
      title: t("edu_relaciones"),
      logo: "https://i.ibb.co/4gw0Cdc6/Captura-de-pantalla-2026-04-07-a-la-s-15-24-04.png",
      skills: []
    },
    {
      institution: "Henry",
      title: "Full Stack Developer, Computer Software Engineering",
      logo: "https://i.ibb.co/8kZrp6m/Captura-de-pantalla-2026-04-07-a-la-s-14-11-58.png",
      skills: ["HTML", "CSS", "JavaScript avanzado", "Git", "Estructura de Datos", "Algoritmos", "DOM", "Bootstrap", "AJAX", "Webpack", "React", "Redux", "Hooks", "Socket.io", "Node.js", "APIs", "Web Server", "Rest", "SQL", "Mongo", "Postgres", "ORM", "Security", "Docker", "Deployment", "AWS"]
    },
    {
      institution: "JetBrains Academy",
      title: "Python Developer and Data Science",
      logo: "https://i.ibb.co/mVKkcntK/Captura-de-pantalla-2026-04-07-a-la-s-14-14-46.png",
      skills: []
    },
    {
      institution: "International CyberSecurity Institute (DefensityOne)",
      title: "Network Security Specialist, Systems",
      desc: "This certification provides a holistic view of modern network security.",
      logo: "https://i.ibb.co/4gVTV3JN/Captura-de-pantalla-2026-04-07-a-la-s-14-54-34.png",
      skills: ["Network Security", "Types of Attacks", "Firewalls", "Intrusion-Detection Systems", "VPNs and Encryption", "Virus Attacks", "Physical Security", "Security Policies", "Security Standards", "Attackers Techniques"]
    },
    {
      institution: "IBM",
      title: "Data Science with Python",
      logo: "https://i.ibb.co/6cSSdsTv/Captura-de-pantalla-2026-04-07-a-la-s-14-58-34.png",
      skills: []
    }
  ];

  return (
    <section id="education" className="py-32 outline-none relative z-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="mb-12">
          <h2 className="text-xs font-mono tracking-[0.2em] text-silver-200 uppercase mb-4 border-b border-carbon-700 pb-4 inline-block">
            Background
          </h2>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-silver-100 mt-2">
            {t("edu_eyebrow")}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {studies.map((item, index) => (
            <article 
              key={index} 
              className="group flex flex-col md:flex-row gap-6 items-start bg-carbon-900 border border-carbon-700 p-8 hover:bg-carbon-800 transition-colors"
              onMouseEnter={playEarcon}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 border border-carbon-700 bg-carbon-800 flex items-center justify-center p-2 rounded-2xl">
                <img 
                  src={item.logo} 
                  alt={item.institution} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-semibold text-silver-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-silver-200/80 font-mono text-xs uppercase tracking-widest mb-4">
                  {item.institution}
                </p>
                
                {item.desc && (
                  <p className="text-sm font-light text-silver-200 mb-4 max-w-2xl leading-relaxed">
                    {item.desc}
                  </p>
                )}

                {item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {item.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] uppercase font-mono tracking-wider border border-carbon-700 text-silver-200 px-2 py-1 bg-carbon-800/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
