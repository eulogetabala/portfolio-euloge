import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Système de particules pour le hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration du canvas
    const resizeCanvas = () => {
      if (heroRef.current) {
        canvas.width = heroRef.current.offsetWidth;
        canvas.height = heroRef.current.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configuration des particules
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

    // Couleurs de base des particules
    const colorBases = [
      { r: 255, g: 93, b: 0 }, // Primary orange
      { r: 255, g: 138, b: 77 }, // Light orange
      { r: 255, g: 200, b: 150 }, // Very light orange
    ];

    // Initialisation des particules
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

    // Fonction d'animation
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mise à jour et dessin des particules
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dessiner la particule avec glow
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

      // Dessiner les connexions entre particules proches
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Title Animation
      gsap.from(".about-title div span", {
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

      // Photo + Text Section Animations
      const photoTextSection = imageRef.current?.closest("section");
      if (photoTextSection) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: photoTextSection,
            start: "top 80%",
          },
        });

        // Image reveal
        tl.from(imageRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        // Description fade in
        .from(".about-hero-content p", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        // Stats animation
        .from(".stat-card", {
          y: 40,
          opacity: 0,
          scale: 0.9,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.4");
      }

      // Image Parallax on scroll
      gsap.to(".about-img", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Experience Cards Animation
      // S'assurer que tous les éléments sont visibles initialement
      gsap.set(".timeline-item", { opacity: 1, visibility: "visible" });
      
      gsap.from(".timeline-item", {
        y: 50,
        opacity: 0.3,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(".timeline-item", { opacity: 1, visibility: "visible" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section - Design moderne et compact */}
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
                    Qui suis-je
                  </p>
                </div>
                <div className="text-6xl md:text-8xl font-black text-white/10 leading-none">
                  01
                </div>
              </div>
            </div>

            {/* Center - Titre principal avec design moderne */}
            <div className="flex-1 about-title">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                <div className="overflow-hidden mb-2">
                  <span className="inline-block">À propos</span>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block text-primary italic font-medium">de moi.</span>
                </div>
              </h1>
            </div>

            {/* Right - Sous-titre et ligne décorative */}
            <div className="flex-shrink-0 lg:w-80">
              <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent mb-6" />
              <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
                Développeur passionné, architecte de solutions digitales innovantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Photo + Texte - Fond différent */}
      <section className="py-32 px-6 md:px-12 relative bg-[#050505] overflow-hidden">
        {/* Background subtil */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start lg:items-end">
            
            {/* Left - Image Side */}
            <div ref={imageRef} className="relative group w-full lg:w-auto lg:flex-shrink-0">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] max-w-md mx-auto lg:mx-0">
                {/* Glow effect */}
                <div className="absolute -inset-6 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-700 opacity-60" />
                
                {/* Image container */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm group-hover:border-primary/40 transition-all duration-500">
                  <img
                    src="/assets/images/th2.jpeg"
                    alt="Euloge Tabala"
                    className="about-img w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 group-hover:bg-black/80 transition-all duration-500">
                      <p className="text-white font-bold text-lg mb-1">Euloge Tabala</p>
                      <p className="text-primary text-sm font-semibold tracking-wider">Fullstack Senior Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/40 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Right - Content Side */}
            <div className="flex-1 space-y-8 lg:pb-8">
              {/* Description */}
              <div className="about-hero-content space-y-5 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
                <p>
                  Développeur web et mobile <span className="text-white font-bold">full-stack</span> avec plus de <span className="text-primary font-bold">5 ans d'expérience</span> dans la conception et le déploiement d'applications modernes. 
                  Spécialisé dans l'écosystème <span className="text-white">JavaScript (React, Next.js, Node.js, React Native)</span>.
                </p>
                <p>
                  Expert en solutions performantes et centrées utilisateur, je maîtrise également la coordination d'équipes techniques et les pratiques de déploiement <span className="text-white font-bold">(Docker, CI/CD, Cloud)</span>. 
                  Mon parcours allie expertise technique et vision stratégique de projet.
                </p>
              </div>

              {/* Bouton Télécharger CV */}
              <div className="pt-2">
                <a
                  href="/assets/pdf/Cv_euloge_tabala.pdf"
                  download="Cv_euloge_tabala.pdf"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,93,0,0.5)] transition-all duration-300 group"
                >
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Télécharger mon CV</span>
                </a>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid grid grid-cols-2 gap-4 pt-6">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="stat-card p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <p className="text-3xl md:text-4xl font-black text-gradient leading-none">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-white/40 font-bold uppercase tracking-[0.2em] mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Experience - Design Moderne */}
      <section ref={sectionRef} className="py-32 px-6 relative bg-[#0a0a0a] overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] opacity-30" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-2 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
                <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">Parcours</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              <div className="text-6xl md:text-8xl font-black text-white/5 leading-none">02</div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
              Expérience <span className="text-white/15 italic font-medium">Professionnelle.</span>
            </h2>
          </div>
          
          {/* Experience Cards - Design Moderne en Grille */}
          <div className="grid md:grid-cols-2 gap-6">
            {experience.map((item, i) => (
              <div 
                key={i} 
                className="timeline-item group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                style={{ opacity: 1, visibility: "visible" }}
              >
                {/* Gradient accent au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                
                {/* Numéro de l'expérience */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Contenu */}
                <div className="relative z-10">
                  {/* Année */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,93,0,0.6)]" />
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">{item.year}</span>
                  </div>

                  {/* Poste */}
                  <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.role}
                  </h3>

                  {/* Entreprise */}
                  <p className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-6">
                    {item.company}
                  </p>

                  {/* Ligne décorative */}
                  <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-bl-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
