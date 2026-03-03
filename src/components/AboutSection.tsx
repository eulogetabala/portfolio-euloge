import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "+5", label: "Années d'Expérience" },
  { value: "+30", label: "Projets Terminés" },
  { value: "Fullstack", label: "Expertise JS" },
  { value: "Cloud", label: "DevOps Ready" },
];

const experience = [
  { year: "2021 - Présent", role: "Développeur FullStack Senior", company: "Smartvision Congo" },
  { year: "2025 - Présent", role: "Développeur FullStack Senior (Remote)", company: "Haffiri Freight / New-York" },
  { year: "2024", role: "Chef de Projet Web - Zone Afrique", company: "Ekomedia Paris" },
  { year: "2021 - 2023", role: "Consultant Développeur Web & Mobile", company: "Consulting Digital Services" },
  { year: "2019 - 2020", role: "Chef de projet IT", company: "AITEC Corporation" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(".about-title div span", {
        y: 100,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
      });

      // Stats Animation
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
        },
      });

      // Image Parallax & reveal
      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });

      gsap.to(".about-img", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dynamic Glow Blob */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] opacity-40 animate-pulse-slow pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left - Image Side */}
          <div ref={imageRef} className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-700" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 glass-dark">
              <img
                src="/assets/images/euloge.png"
                alt="Euloge Tabala"
                className="about-img absolute inset-0 w-full h-[120%] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 glass border-white/10 rounded-xl">
                <p className="text-white font-heading font-bold text-xl mb-1">Euloge Tabala</p>
                <p className="text-primary font-body text-sm font-semibold tracking-wider">Développeur Fullstack Senior</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-primary/50 rounded-br-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          </div>

          {/* Right - Content Side */}
          <div className="space-y-12">
            <div className="about-title">
              <p className="text-primary font-body text-xs tracking-[0.4em] uppercase font-bold mb-4">L'art de l'architecture</p>
              <h2 className="text-5xl sm:text-7xl font-heading font-bold tracking-tighter leading-[0.9] text-white">
                <div className="overflow-hidden">
                  <span className="inline-block">Façonner l'avenir</span>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block text-white/40 italic">code après code.</span>
                </div>
              </h2>
            </div>

            <div className="space-y-6 text-white/70 font-body text-lg leading-relaxed max-w-xl">
              <p>
                Développeur web et mobile <span className="text-white font-bold">full-stack</span> avec plus de <span className="text-primary font-bold">5 ans d’expérience</span> dans la conception et le déploiement d’applications modernes. 
                Spécialisé dans l’écosystème <span className="text-white">JavaScript (React, Next.js, Node.js, React Native)</span>.
              </p>
              <p>
                Expert en solutions performantes et centrées utilisateur, je maîtrise également la coordination d’équipes techniques et les pratiques de déploiement <span className="text-white font-bold">(Docker, CI/CD, Cloud)</span>. 
                Mon parcours allie expertise technique et vision stratégique de projet.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stat-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
                >
                  <p className="text-4xl font-heading font-bold text-gradient leading-none">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-white/40 font-bold uppercase tracking-[0.2em] mt-3">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="pt-8 space-y-6">
              <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.2em]">Parcours Professionnel</p>
              <div className="relative pl-6 space-y-8">
                <div className="timeline-line" />
                {experience.map((item, i) => (
                  <div key={i} className="relative group/exp">
                    <div className="timeline-dot absolute -left-[24.5px] top-1 group-hover/exp:scale-125 transition-transform" />
                    <div>
                      <span className="text-primary font-bold text-xs mb-1 block">{item.year}</span>
                      <h4 className="text-white font-bold text-sm tracking-wide">{item.role}</h4>
                      <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{item.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
