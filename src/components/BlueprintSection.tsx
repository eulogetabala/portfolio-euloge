import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BlueprintSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-blueprint", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-[#050505] px-6 relative overflow-hidden">
      {/* Background technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,93,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,93,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Content Area - Left (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="reveal-blueprint space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
                   <p className="text-primary font-bold text-[9px] uppercase tracking-[0.3em]">Module // Expertise & Qualité</p>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                Expertise <br />
                <span className="text-white/20 italic font-medium">& Innovation.</span>
              </h2>
              
              <p className="text-white/40 text-lg leading-relaxed max-w-xl font-medium border-l-2 border-primary/20 pl-8 py-2">
                Je suis <span className="text-white font-bold">Euloge Tabala</span>, expert en solutions numériques innovantes à l'intersection de la technologie et de la créativité. Spécialiste en <span className="text-white">IA et automatisation</span>, je transforme des idées complexes en applications performantes.
              </p>
            </div>

            {/* Data Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 reveal-blueprint">
              {[
                { label: "EXPÉRIENCE", value: "+5 ANS", detail: "Software Engineer" },
                { label: "PROJETS", value: "+30", detail: "Réalisations" },
                { label: "STRATÉGIE", value: "Agile", detail: "Scrum/Product" },
                { label: "SAVOIR", value: "Expert", detail: "Formation" }
              ].map((node, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-primary/30 transition-all group">
                  <p className="text-[8px] text-white/30 font-bold tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">{node.label}</p>
                  <p className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">{node.value}</p>
                  <p className="text-[8px] text-white/20 font-medium">{node.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Immersive Visual Area - Right (Span 5) */}
          <div className="lg:col-span-5 relative min-h-[400px] reveal-blueprint">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-3xl hud-glow pointer-events-none" />
            
            {/* The "Command Center" Card */}
            <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-black overflow-hidden shadow-2xl group">
              <img 
                src="/assets/images/thp-2.jpeg" 
                alt="Expertise Vision" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Technical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
              
              {/* Notched Corners - Visual effect */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/60 rounded-tl-[2rem]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/60 rounded-br-[2rem]" />
              
              {/* Pulse & Intense Scanline */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none animate-scan opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,93,0,0.1),transparent_70%)]" />
              
              {/* On-Image Status Text */}
              {/* <div className="absolute top-12 left-12 space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,93,0,0.8)]" />
                  <p className="text-[11px] text-primary font-bold uppercase tracking-[0.4em]">Live_Stream: 01</p>
                </div>
                <div className="space-y-1.5 opacity-60">
                  <div className="h-0.5 w-16 bg-white/40" />
                  <div className="h-0.5 w-12 bg-white/20" />
                  <div className="h-0.5 w-8 bg-white/10" />
                </div>
              </div> */}

              {/* Data Stream Overlay - Small PIP */}
              <div className="absolute top-12 right-12 w-32 glass-dark border border-white/10 rounded-xl p-3 animate-float hidden md:block">
                 <p className="text-[7px] text-primary font-bold uppercase tracking-[0.2em] mb-1">DATA_FLOW</p>
                 <div className="space-y-1">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary/40 w-1/2 animate-pulse" />
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary/20 w-3/4 animate-pulse delay-75" />
                    </div>
                 </div>
              </div>

              {/* Central Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center opacity-30">
                <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,93,0,1)]" />
                <div className="absolute w-20 h-px bg-white/30" />
                <div className="absolute h-20 w-px bg-white/30" />
              </div>

              <div className="absolute bottom-12 right-12 text-right">
                <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase mb-1">Architecture Système</p>
                <div className="h-px w-32 bg-gradient-to-l from-primary to-transparent ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintSection;
