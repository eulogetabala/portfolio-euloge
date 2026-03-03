import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".reveal-text", {
        y: 80,
        opacity: 0,
        rotateX: -20,
        stagger: 0.1,
        duration: 1.5,
      })
      .from(".reveal-subtext", {
        y: 30,
        opacity: 0,
        duration: 1,
      }, "-=1")
      .from(".reveal-stats", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      }, "-=0.8")
      .from(".reveal-hud", {
        opacity: 0,
        scale: 0.95,
        duration: 2,
      }, "-=1.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Système de particules
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configuration des particules
    const particleCount = 80;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Couleurs de base des particules (sans opacité)
    const colorBases = [
      { r: 255, g: 93, b: 0 }, // Primary orange
      { r: 255, g: 138, b: 77 }, // Light orange
      { r: 255, g: 93, b: 0 }, // Faded orange
      { r: 255, g: 200, b: 150 }, // Very light orange
    ];

    // Initialisation des particules
    for (let i = 0; i < particleCount; i++) {
      const colorBase = colorBases[Math.floor(Math.random() * colorBases.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, 1)`,
      });
    }

    // Fonction d'animation
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mise à jour et dessin des particules
      particles.forEach((particle, i) => {
        // Mise à jour de la position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Garder les particules dans le canvas
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dessiner la particule avec glow
        const colorParts = particle.color.match(/\d+/g);
        if (colorParts && colorParts.length >= 3) {
          const r = colorParts[0];
          const g = colorParts[1];
          const b = colorParts[2];
          const fillColor = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
          
          ctx.shadowBlur = 15;
          ctx.shadowColor = fillColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Dessiner les connexions entre particules proches
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 93, 0, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen min-h-[800px] w-full bg-[#0a0a0a] overflow-hidden flex items-end pb-8 md:pb-12 px-12 md:px-24">
      
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Background Image Overlay - Atmospheric & Dark */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/thp.jpg" 
          alt="Atmosphère" 
          className="w-full h-full object-cover object-top opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Top Right Decorative Dots */}
      <div className="absolute top-12 right-12 md:right-24 flex gap-4 reveal-hud">
        <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
        <div className="w-2.5 h-2.5 rotate-45 bg-primary shadow-[0_0_15px_rgba(255,93,0,0.8)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
      </div>

      <div className="w-full relative z-10 flex flex-col lg:flex-row justify-between items-end gap-12">
        
        {/* Bottom Left: Massive Typography */}
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="reveal-text text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85]">
              Je suis <br />
              <span className="text-white flex items-center gap-10"><span>Euloge</span><span>TABALA</span></span>
            </h1>
            <p className="reveal-subtext text-white/50 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed top-40 pt-8 md:pt-12">
              Software, Cloud & DevOps Engineer résidant au <span className="text-white font-bold">CONGO</span>, spécialisé dans la création de <span className="text-white">solutions logiciels sur mesure</span>.
            </p>
          </div>

          <div className="reveal-subtext flex items-center gap-8 pt-4">
            <button 
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-500 hover:scale-105 active:scale-95"
            >
              Explorer mes réalisations
            </button>
            <div className="flex gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <p className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">Expertise & Innovation</p>
            </div>
          </div>
        </div>

        {/* Right Side: PIP Video/Image Card - Positionné plus bas */}
        <div className="relative reveal-hud hidden lg:block self-end" style={{ marginBottom: '-80px', transform: 'translateY(40px)' }}>
          <div className="relative group">
            {/* Glow behind PIP */}
            <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] hud-glow pointer-events-none" />
            
            {/* The PIP Card - Thick borders, very rounded */}
            <div className="relative w-[500px] aspect-video bg-black border-[12px] border-white rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] transform rotate-[-2deg] hover:rotate-0 transition-all duration-700">
              <img 
                src="/assets/images/thp.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover object-center opacity-100 group-hover:opacity-100 transition-all duration-1000"
                style={{ objectPosition: 'center top' }}
              />

              {/* HUD Tags */}
              <div className="absolute bottom-6 left-8 flex gap-3">
                 <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-[9px] text-white font-bold uppercase tracking-[0.2em]">Expertise Digitale</p>
                 </div>
              </div>
            </div>

            {/* Floating metadata around PIP */}
            <div className="absolute -top-12 -left-12 p-6 glass border border-white/10 rounded-[2rem] animate-float z-20">
               <p className="text-[9px] text-primary font-bold uppercase tracking-[0.3em] mb-2">SYSTEM_CORE</p>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-primary/20 rounded-full overflow-hidden"><div className="w-full h-full bg-primary animate-pulse" style={{ animationDelay: `${i*100}ms` }} /></div>)}
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
