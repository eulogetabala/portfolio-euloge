import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Jean-Claude M.",
    role: "Directeur Technique, AMC",
    content: "Euloge a transformé notre vision en réalité. Son expertise technique et sa capacité à comprendre nos besoins métier ont été déterminantes pour le succès de notre projet. Un professionnel de haut niveau.",
    rating: 5,
  },
  {
    name: "Marie K.",
    role: "CEO, ALOMBASSI Finance",
    content: "Travail exceptionnel ! Euloge a développé notre plateforme financière avec une attention particulière aux détails et une compréhension approfondie de notre secteur. Résultats au-delà de nos attentes.",
    rating: 5,
  },
  {
    name: "Pierre D.",
    role: "Chef de Projet, MPservices",
    content: "Collaboration remarquable. Euloge combine expertise technique, réactivité et professionnalisme. Il a su livrer un produit de qualité dans les délais impartis. Je recommande sans hésitation.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    role: "Responsable IT, Ministère du Budget",
    content: "Un développeur exceptionnel qui a su s'adapter aux contraintes du secteur public. Son approche méthodique et sa maîtrise des technologies modernes ont permis de moderniser efficacement nos systèmes.",
    rating: 5,
  },
  {
    name: "David T.",
    role: "CTO, BMS",
    content: "Euloge est un partenaire de confiance. Sa capacité à architecturer des solutions scalables et performantes a considérablement amélioré notre infrastructure. Un expert que nous recommandons vivement.",
    rating: 5,
  },
  {
    name: "Claire R.",
    role: "Directrice Innovation, Staroil",
    content: "Excellente collaboration ! Euloge a su comprendre nos enjeux techniques complexes et proposer des solutions innovantes. Son professionnalisme et sa disponibilité font de lui un partenaire idéal.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
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
        }, 5000);
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
      gsap.set(".testimonial-card", { opacity: 1, visibility: "visible" });
      
      gsap.from(".testimonial-card", {
        opacity: 0.3,
        y: 60,
        scale: 0.95,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-container",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(".testimonial-card", { opacity: 1, visibility: "visible" });
        },
      });

      gsap.from(".section-testimonial-header", {
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
    <section ref={sectionRef} id="testimonials" className="py-32 md:py-40 bg-black relative overflow-hidden">
      {/* Background gradients animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="section-testimonial-header mb-20 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,93,0,0.6)]" />
            <p className="text-primary font-bold text-[11px] uppercase tracking-[0.4em]">
              Témoignages Clients
            </p>
            <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            Ce qu'ils <span className="text-white/15 italic font-medium">disent.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Découvrez les retours de nos clients sur leur expérience de collaboration.
          </p>
        </div>

        {/* Carousel de témoignages */}
        <div 
          className="testimonials-container relative"
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
              {testimonials.map((testimonial, i) => (
                <CarouselItem 
                  key={i} 
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="testimonial-card group relative h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl transition-all duration-700 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(255,93,0,0.2)]">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-12 h-12 text-primary" size={48} />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <div
                          key={starIndex}
                          className="w-4 h-4 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors"
                          style={{
                            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 font-medium relative z-10">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                        <span className="text-primary font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{testimonial.name}</p>
                        <p className="text-white/40 text-xs font-medium">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Accents décoratifs */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tl-lg" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-br-lg" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Boutons de navigation */}
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 h-12 w-12 border-primary/30 bg-black/80 hover:bg-black hover:border-primary/60 text-primary" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 h-12 w-12 border-primary/30 bg-black/80 hover:bg-black hover:border-primary/60 text-primary" />
          </Carousel>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === i 
                    ? "bg-primary w-8 shadow-[0_0_12px_rgba(255,93,0,0.6)]" 
                    : "bg-white/20 hover:bg-primary/40"
                }`}
                aria-label={`Aller au témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
