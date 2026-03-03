import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SectionSeparator = () => {
  const separatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(separatorRef.current, {
        opacity: 0,
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: separatorRef.current,
          start: "top 90%",
        },
      });
    }, separatorRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={separatorRef} className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default SectionSeparator;
