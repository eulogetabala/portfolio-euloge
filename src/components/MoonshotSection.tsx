import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MoonshotSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".moonshot-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="moonshot-content bg-primary rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(255,93,0,0.25)]">
          {/* Decorative HUD background info */}
          <div className="absolute top-10 left-10 text-white/10 text-[9px] font-mono tracking-[0.5em] hidden md:block">
            LANCEMENT_PROJET // MISSION_Q3_Q4
          </div>
          
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-10">
            Prêt à lancer votre <br />
            <span className="text-black italic font-medium">prochain projet ?</span>
          </h2>
          
          <p className="text-white/80 text-base md:text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            J'accepte actuellement de nouveaux défis pour fin 2026. 
            Discutons de la manière dont nous pouvons bâtir quelque chose d'extraordinaire ensemble.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <a 
              href="https://wa.me/242065298498?text=Bonjour%20Euloge,%20je%20souhaite%20discuter%20de%20mon%20projet." 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-5 bg-white text-primary font-bold text-sm rounded-xl hover:scale-105 transition-transform shadow-2xl inline-block"
            >
              Démarrer une conversation
            </a>
            <a href="mailto:contact@eulogetabala.cg" className="text-white font-bold text-sm hover:opacity-80 transition-opacity underline underline-offset-8 decoration-white/20 tracking-wide">
              contact@eulogetabala.cg
            </a>
          </div>

          {/* HUD Accents */}
          <div className="absolute bottom-10 right-10 w-20 h-[1px] bg-white/20" />
          <div className="absolute bottom-8 right-10 w-[1px] h-20 bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default MoonshotSection;
