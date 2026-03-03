import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Smartphone, Globe, Layers, Zap, Search, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    desc: "Expertise en React et Next.js pour des applications web modernes, performantes et scalables.",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    desc: "Conception d'applications multiplateformes (iOS/Android) avec React Native centrées utilisateur.",
  },
  {
    icon: Layers,
    title: "Architecture API",
    desc: "Développement d'APIs REST robustes avec Node.js, Express.js et gestion d'état complexe.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Conteneurisation Docker, pipelines CI/CD et déploiement sur VPS/Cloud (Azure, GCP).",
  },
  {
    icon: Search,
    title: "Bases de Données",
    desc: "Conception de schémas et optimisation de requêtes (MongoDB, MySQL, SQL Server).",
  },
  {
    icon: Zap,
    title: "Formation & Conseil",
    desc: "Accompagnement technique, formation aux bonnes pratiques et gestion de projet Agile.",
  },
];

const ImpactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 px-6 bg-[#080808] relative overflow-hidden">
      {/* Depth blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[150px] -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <p className="text-primary font-body text-xs tracking-[0.4em] uppercase font-bold mb-4">Mes services</p>
          <h2 className="text-5xl sm:text-7xl font-heading font-bold tracking-tighter text-white">
            Solutions <span className="text-white/30 italic">digitales</span>
          </h2>
        </div>

        <div className="services-container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-item group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all duration-500 hover:bg-white/[0.04]"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500">
                <service.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-white/40 font-body leading-relaxed group-hover:text-white/60 transition-colors">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
