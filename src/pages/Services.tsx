import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Cloud, Smartphone, Brain, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Développement Web",
    description: "Création d'applications web modernes et performantes avec les dernières technologies.",
    features: [
      "Applications React & Next.js",
      "Architecture scalable",
      "Performance optimisée",
      "SEO & Accessibilité"
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Smartphone,
    title: "Développement Mobile",
    description: "Applications mobiles natives et cross-platform pour iOS et Android.",
    features: [
      "React Native",
      "Applications natives",
      "UI/UX optimisée",
      "Performance native"
    ],
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Server,
    title: "Backend & API",
    description: "Architecture backend robuste avec APIs REST et GraphQL sécurisées.",
    features: [
      "Node.js & Express",
      "Bases de données",
      "APIs REST/GraphQL",
      "Sécurité & Authentification"
    ],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description: "Déploiement, infrastructure cloud et automatisation des processus.",
    features: [
      "Docker & Containers",
      "CI/CD Pipelines",
      "Cloud (Azure/GCP)",
      "Monitoring & Scaling"
    ],
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Brain,
    title: "Consulting & Formation",
    description: "Accompagnement technique, formation et coaching pour vos équipes.",
    features: [
      "Architecture technique",
      "Formation équipes",
      "Code Review",
      "Best Practices"
    ],
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    icon: Zap,
    title: "Optimisation Performance",
    description: "Amélioration des performances et optimisation de l'expérience utilisateur.",
    features: [
      "Audit performance",
      "Optimisation code",
      "Caching stratégies",
      "Monitoring avancé"
    ],
    color: "from-indigo-500/20 to-violet-500/20"
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".service-card", { opacity: 1, visibility: "visible" });
      
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(".service-card", { opacity: 1, visibility: "visible" });
        },
      });

      gsap.from(".services-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
        badge="Services"
        number="02"
        title="Mes Services"
        titleAccent="& Expertise."
        subtitle="Des solutions sur mesure pour transformer vos idées en réalité digitale."
      />

      <section ref={sectionRef} className="py-24 px-6 relative bg-[#050505] overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] opacity-30" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Services Grid - Design Compact en 3 colonnes */}
          <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              
              return (
                <div
                  key={service.title}
                  className="service-card group relative rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(255,93,0,0.2)] overflow-hidden p-6"
                >
                  {/* Gradient Background animé */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                  
                  {/* Numéro du service */}
                  <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Header compact avec Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500 relative z-10">
                        <IconComponent className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 rounded-xl blur-lg transition-all duration-500" />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors flex-1">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description compacte */}
                  <p className="text-white/60 text-sm leading-relaxed mb-5 relative z-10">
                    {service.description}
                  </p>

                  {/* Features en grille compacte */}
                  <div className="grid grid-cols-2 gap-2 relative z-10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/50 text-xs group/feature">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/feature:bg-primary transition-colors flex-shrink-0" />
                        <span className="group-hover/feature:text-white transition-colors truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accents décoratifs */}
                  <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-br-lg" />
                </div>
              );
            })}
          </div>

          {/* CTA Section - Design Compact */}
          <div className="mt-20 pt-12 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-[0.9]">
                  Prêt à démarrer <span className="text-primary italic font-medium">votre projet ?</span>
                </h2>
                <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
                  Discutons de vos besoins et créons ensemble une solution sur mesure.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,93,0,0.5)] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Me contacter
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button
                  onClick={() => navigate("/realisations")}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-primary/50 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  Voir mes réalisations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
