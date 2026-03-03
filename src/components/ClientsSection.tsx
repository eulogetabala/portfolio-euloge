import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  "/assets/images/logo1.png",
  "/assets/images/logo2.png",
  "/assets/images/logo3.png",
  "/assets/images/logo4.png",
  "/assets/images/logo5.png",
  "/assets/images/logo6.jpeg",
  "/assets/images/brand-logo7.png",
  "/assets/images/logo8.jpeg",
  "/assets/images/logo9.png",
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [current, setCurrent] = useState(0);

  // Autoplay manuel
  useEffect(() => {
    if (!api) return;

    let autoplayInterval: NodeJS.Timeout;

    const startAutoplay = () => {
      if (!isHovered) {
        autoplayInterval = setInterval(() => {
          api.scrollNext();
        }, 3000);
      }
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [api, isHovered]);

  // Suivre la position actuelle du carousel
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // S'assurer que les logos sont visibles dès le début
      gsap.set(".partner-logo", { opacity: 1, visibility: "visible" });
      
      // Animation d'entrée pour la section
      gsap.from(".section-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animation pour les logos du carousel - animation légère
      const logoElements = gsap.utils.toArray<HTMLElement>(".partner-logo");
      if (logoElements.length > 0) {
        gsap.from(".partner-logo", {
          opacity: 0.3,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".carousel-container",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            // Forcer la visibilité après l'animation
            gsap.set(".partner-logo", { opacity: 1, visibility: "visible" });
          },
        });
      }

      // Animation parallaxe pour les éléments de fond
      gsap.to(".parallax-bg-1", {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-bg-2", {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-black relative overflow-hidden">
      {/* Background gradients animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg-1 absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-40 animate-pulse-slow" />
        <div className="parallax-bg-2 absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] opacity-30" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-20" />
      </div>

      {/* Grille de points subtile */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', 
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header amélioré */}
        <div className="section-header mb-20 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,93,0,0.6)]" />
            <p className="text-primary font-bold text-[11px] uppercase tracking-[0.4em]">
              Réseau de Partenaires
            </p>
            <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            Collaboration{" "}
            <span className="text-white/15 italic font-medium block md:inline">
              & Synergie.
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Des partenariats stratégiques avec des leaders de l'industrie pour créer des solutions d'exception.
          </p>
        </div>
        
        {/* Carousel moderne pour afficher tous les logos */}
        <div 
          className="carousel-container relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {logos.map((logo, i) => (
                <CarouselItem 
                  key={i} 
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div 
                    className="partner-logo group relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl transition-all duration-700 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(255,93,0,0.2)] overflow-hidden"
                    style={{ opacity: 1 }}
                  >
                    {/* Glow effect au hover */}
                    <div className="logo-glow absolute inset-0 bg-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
                    
                    {/* Bordure animée */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-700" />
                    
                    {/* Contenu du logo */}
                    <div className="relative h-full w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Effet de scan au hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity duration-700" 
                             style={{ transform: "translateY(-100%)" }}
                        />
                        
                        <img
                          src={logo}
                          alt={`Partenaire ${i + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          style={{ 
                            opacity: 0.7,
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '90%',
                            maxHeight: '70%',
                            display: 'block',
                            margin: 'auto'
                          }}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.error(`Erreur de chargement du logo ${i + 1}:`, logo);
                            target.style.opacity = '0.2';
                            target.style.filter = 'grayscale(100%)';
                            target.alt = `Logo ${i + 1} non disponible`;
                          }}
                          onLoad={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '0.7';
                          }}
                        />
                      </div>
                    </div>

                    {/* Accents décoratifs */}
                    <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tl-lg" />
                    <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-br-lg" />
                    
                    {/* Indicateur de position */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="h-1 w-10 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Boutons de navigation */}
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 h-12 w-12 border-primary/30 bg-black/80 hover:bg-black hover:border-primary/60 text-primary" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 h-12 w-12 border-primary/30 bg-black/80 hover:bg-black hover:border-primary/60 text-primary" />
          </Carousel>

          {/* Indicateurs de pagination personnalisés */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {logos.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === i 
                    ? "bg-primary w-8 shadow-[0_0_12px_rgba(255,93,0,0.6)]" 
                    : "bg-white/20 hover:bg-primary/40"
                }`}
                aria-label={`Aller au logo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer décoratif */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,93,0,0.6)]" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
              Partenariats Stratégiques
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
              Innovation Continue
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
              Excellence Technique
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
