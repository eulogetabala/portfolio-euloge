import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
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
  {
    title: "Polyglotte",
    desc: "Site web professionnel pour service de traduction et d'interprétariat avec présentation des services multilingues.",
    image: "/assets/images/port6.png",
    tags: ["REACT", "NODE.JS", "RESPONSIVE"],
    category: "Services"
  },
  {
    title: "HUB Distribution",
    desc: "Plateforme e-commerce moderne pour la distribution de produits alimentaires avec gestion de commandes et livraison.",
    image: "/assets/images/port7.png",
    tags: ["REACT", "NEXT.JS", "STRIPE", "PAYMENT"],
    category: "E-commerce"
  },
  {
    title: "GRAMAT Engineering",
    desc: "Site web professionnel pour entreprise d'ingénierie et de construction avec présentation des services et réalisations.",
    image: "/assets/images/port8.png",
    tags: ["REACT", "NODE.JS", "RESPONSIVE"],
    category: "Construction"
  },
  {
    title: "Smartvision",
    desc: "Site web pour agence de communication 360° avec présentation des services digitaux et portfolio.",
    image: "/assets/images/smar.png",
    tags: ["REACT", "GSAP", "ANIMATIONS"],
    category: "Communication"
  },
  {
    title: "Docsenglish",
    desc: "Plateforme de coaching en langue anglaise avec programmes personnalisés et suivi des progrès.",
    image: "/assets/images/port10.png",
    tags: ["REACT", "NODE.JS", "EDUCATION"],
    category: "Education"
  },
  {
    title: "Mayombe",
    desc: "Application mobile de livraison et e-commerce pour connecter commerçants et clients avec système de commandes en temps réel.",
    image: "/assets/images/mayombe_2.jpg",
    tags: ["REACT NATIVE", "MOBILE", "FIREBASE"],
    category: "Mobile App"
  },
];

const Realisations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".project-card", { opacity: 1, visibility: "visible" });
      
      gsap.from(".project-card", {
        opacity: 0.3,
        y: 60,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(".project-card", { opacity: 1, visibility: "visible" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <PageHero
        badge="Portfolio"
        number="03"
        title="Mes Réalisations"
        titleAccent="& Projets."
        subtitle="Une sélection de projets réalisés avec excellence, alliant performance technique et design moderne."
      />

      <section ref={sectionRef} id="realisations" className="py-32 px-6 bg-[#050505] overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Grille de projets */}
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {allProjects.map((project, i) => (
              <div key={project.title} className="project-card group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 group-hover:border-primary/50 transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_40px_rgba(255,93,0,0.2)]">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg text-[9px] font-bold text-primary tracking-widest border border-primary/30">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Accents décoratifs */}
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-bl-lg" />
                </div>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 font-medium">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 tracking-widest group-hover:border-primary/30 group-hover:text-primary/60 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Realisations;
