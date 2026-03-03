import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  badge: string;
  number: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
}

const PageHero = ({ badge, number, title, titleAccent, subtitle }: PageHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Système de particules
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (heroRef.current) {
        canvas.width = heroRef.current.offsetWidth;
        canvas.height = heroRef.current.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 60;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colorBases = [
      { r: 255, g: 93, b: 0 },
      { r: 255, g: 138, b: 77 },
      { r: 255, g: 200, b: 150 },
    ];

    for (let i = 0; i < particleCount; i++) {
      const colorBase = colorBases[Math.floor(Math.random() * colorBases.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        color: `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, 1)`,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        const colorParts = particle.color.match(/\d+/g);
        if (colorParts && colorParts.length >= 3) {
          const r = colorParts[0];
          const g = colorParts[1];
          const b = colorParts[2];
          const fillColor = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
          
          ctx.shadowBlur = 12;
          ctx.shadowColor = fillColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 93, 0, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Animation du titre
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-hero-title div span", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[50vh] flex items-center py-16 md:py-24 px-6 md:px-12 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(255,93,0,0.1) 0%, rgba(10,10,10,0.98) 50%, #0a0a0a 100%)',
      }}
    >
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen", zIndex: 1 }}
      />

      {/* Gradients animés en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[200px] opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[180px] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[250px] opacity-30" />
      </div>

      {/* Bouton retour */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 hover:text-primary hover:border-primary/30 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Retour</span>
        </button>
      </div>
      
      {/* Hero Content - Design asymétrique moderne */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-12 lg:gap-20">
          
          {/* Left - Badge et numéro */}
          <div className="flex-shrink-0">
            <div className="inline-flex flex-col items-start gap-4">
              <div className="px-4 py-2 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
                <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                  {badge}
                </p>
              </div>
              <div className="text-6xl md:text-8xl font-black text-white/10 leading-none">
                {number}
              </div>
            </div>
          </div>

          {/* Center - Titre principal avec design moderne */}
          <div className="flex-1 page-hero-title">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              <div className="overflow-hidden mb-2">
                <span className="inline-block">{title}</span>
              </div>
              {titleAccent && (
                <div className="overflow-hidden">
                  <span className="inline-block text-primary italic font-medium">{titleAccent}</span>
                </div>
              )}
            </h1>
          </div>

          {/* Right - Sous-titre et ligne décorative */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent mb-6" />
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
