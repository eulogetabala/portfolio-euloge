import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AMC",
    desc: "Solution professionnelle développée avec les dernières technologies pour une performance optimale.",
    image: "/assets/images/port1.png",
    tags: ["REACT", "NODE.JS", "MONGODB"],
    category: "Projet Actif"
  },
  {
    title: "ALOMBASSI Finance",
    desc: "Plateforme financière moderne offrant une expérience utilisateur exceptionnelle et des fonctionnalités avancées.",
    image: "/assets/images/port2.png",
    tags: ["NEXT.JS", "TYPESCRIPT", "STRIPE"],
    category: "Finance"
  },
  {
    title: "MPservices",
    desc: "Application de gestion de services avec une interface intuitive et des outils puissants.",
    image: "/assets/images/port3.png",
    tags: ["REACT", "EXPRESS", "POSTGRESQL"],
    category: "Services"
  },
  {
    title: "Ministère du budget",
    desc: "Système de gestion budgétaire sécurisé et performant pour les administrations publiques.",
    image: "/assets/images/port4.png",
    tags: ["REACT", "NODE.JS", "MYSQL"],
    category: "Public"
  },
  {
    title: "BMS",
    desc: "Plateforme de gestion complète avec des fonctionnalités avancées et une architecture scalable.",
    image: "/assets/images/port5.png",
    tags: ["VUE.JS", "LARAVEL", "DOCKER"],
    category: "Gestion"
  },
  {
    title: "staroil",
    desc: "Solution innovante pour le secteur pétrolier avec des outils de suivi et d'analyse en temps réel.",
    image: "/assets/images/cl-trading.png",
    tags: ["REACT", "PYTHON", "REDIS"],
    category: "Énergie"
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-white/40 font-bold text-[11px] uppercase tracking-[0.3em]">Réalisations</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
              Sélection de <span className="text-primary italic font-medium">projets</span>
            </h2>
            <p className="mt-8 text-white/30 text-sm font-medium leading-relaxed max-w-md">
              Une sélection de projets réalisés avec excellence, alliant performance technique et design moderne.
            </p>
          </div>
        </div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <div key={project.title} className="project-card group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 group-hover:border-primary/30 transition-all duration-500 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 rounded-md text-[9px] font-bold text-primary tracking-widest border border-primary/20 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 h-12 font-medium">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-white/20 tracking-widest border-r border-white/10 pr-3 last:border-0 last:pr-0">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir plus */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => navigate("/realisations")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,93,0,0.3)]"
          >
            Voir plus
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
