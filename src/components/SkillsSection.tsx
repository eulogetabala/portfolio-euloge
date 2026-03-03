import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Smartphone, Brain, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: "Web & Mobile",
    description: "Écosystème JavaScript moderne",
    skills: [
      { name: "React / Next.js", level: "95%" },
      { name: "React Native", level: "92%" },
      { name: "TypeScript", level: "90%" },
      { name: "Redux / State Management", level: "94%" },
    ],
  },
  {
    icon: Server,
    title: "Backend & Data",
    description: "Architectures API & Bases de données",
    skills: [
      { name: "Node.js / Express", level: "92%" },
      { name: "MongoDB / MySQL", level: "88%" },
      { name: "SQL Server", level: "85%" },
      { name: "API REST / GraphQL", level: "90%" },
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description: "Déploiement & Infrastructure",
    skills: [
      { name: "Docker / Containers", level: "85%" },
      { name: "CI/CD (GitHub/GitLab)", level: "88%" },
      { name: "Cloud (Azure/GCP)", level: "80%" },
      { name: "VPS / Linux", level: "90%" },
    ],
  },
  {
    icon: Brain,
    title: "Méthodologies",
    description: "Gestion de projet & Design",
    skills: [
      { name: "Agile / Scrum", level: "95%" },
      { name: "Figma (UI/UX)", level: "85%" },
      { name: "Gestion de projet IT", level: "92%" },
      { name: "Formation / Coaching", level: "88%" },
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // S'assurer que les cartes sont visibles dès le début
      gsap.set(".skill-card", { opacity: 1, visibility: "visible" });
      
      // Initialiser les barres à 0 puis les animer
      gsap.set(".skill-bar, .skill-bar-glow", { width: "0%" });
      
      // Animation d'entrée des cartes
      const cardAnimation = gsap.from(".skill-card", {
        opacity: 0.3,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          // Forcer la visibilité après l'animation
          gsap.set(".skill-card", { opacity: 1, visibility: "visible" });
          animateSkillBars();
        },
      });
      
      // Fonction pour animer les barres de progression
      const animateSkillBars = () => {
        const skillBars = document.querySelectorAll<HTMLElement>(".skill-bar");
        skillBars.forEach((bar, index) => {
          const targetWidth = bar.getAttribute("data-width") || "0%";
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1,
          });
        });
        
        const skillBarGlows = document.querySelectorAll<HTMLElement>(".skill-bar-glow");
        skillBarGlows.forEach((bar, index) => {
          const targetWidth = bar.getAttribute("data-width") || "0%";
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1,
          });
        });
      };
      
      // Animation alternative des barres si les cartes sont déjà visibles
      ScrollTrigger.create({
        trigger: ".skills-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          // Si l'animation des cartes n'a pas été déclenchée, animer les barres quand même
          setTimeout(() => {
            if (document.querySelectorAll(".skill-bar[style*='width: 0%']").length > 0) {
              animateSkillBars();
            }
          }, 500);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stack = [
    {
      title: "Développement Fullstack",
      desc: "Expertise JavaScript (React, Node.js). Création d'applications web et mobiles de bout en bout avec une architecture scalable.",
      icon: Code2,
      tags: ["REACT", "NEXT.JS", "REACT NATIVE"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Gestion de Projet & Agile",
      desc: "Coordination d'équipes techniques et pilotage de projets complexes en utilisant les méthodologies Scrum/Agile.",
      icon: Brain,
      tags: ["AGILE", "SCRUM", "JIRA"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Cloud & DevOps",
      desc: "Mise en œuvre de pipelines CI/CD, conteneurisation Docker et déploiement sur infrastructures Cloud et VPS.",
      icon: Cloud,
      tags: ["DOCKER", "CI/CD", "AZURE/GCP"],
      color: "from-purple-500/20 to-indigo-500/20"
    }
  ];

  return (
    <section ref={sectionRef} id="stack" className="py-32 bg-black px-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-left">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-primary/50" />
            <p className="text-primary font-bold text-[11px] uppercase tracking-[0.4em]">Expertise Technique</p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Outils & <br />
            <span className="text-white/20 italic font-medium">Écosystèmes.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl font-medium border-l-2 border-primary/20 pl-8 py-2">
            Une maîtrise approfondie des technologies modernes pour bâtir des solutions robustes, de la conception au déploiement.
          </p>
        </div>

        <div className="skills-grid grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="skill-card group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-700 relative overflow-hidden"
              style={{ opacity: 1, visibility: "visible" }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all duration-700 rounded-tr-[2.5rem]" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all duration-700 rounded-bl-[2.5rem]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                    <category.icon className="text-white group-hover:text-primary transition-colors" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">{category.title}</h3>
                    <p className="text-primary/60 text-[10px] font-bold tracking-[0.2em]">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-white/80 tracking-wide">{skill.name}</span>
                        <span className="text-[10px] font-mono text-primary font-bold">{skill.level}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/40 to-primary skill-bar"
                          style={{ width: skill.level }}
                          data-width={skill.level}
                        />
                        {/* Glow effect on the bar */}
                        <div 
                          className="absolute top-0 left-0 h-full bg-primary blur-[4px] opacity-40 skill-bar-glow"
                          style={{ width: skill.level }}
                          data-width={skill.level}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background ID Tag */}
              <div className="absolute bottom-6 right-8 text-[40px] font-black text-white/[0.02] pointer-events-none uppercase tracking-tighter">
                {category.title.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Tag */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap items-center gap-x-12 gap-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Architecture Scalable</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Sécurité Cloud</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">CI/CD Automatisé</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
