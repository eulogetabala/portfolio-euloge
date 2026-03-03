const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5 bg-black">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <p className="font-heading font-black text-2xl tracking-tighter text-white">
          EULOGE<span className="text-primary">.</span>
        </p>
        <p className="text-xs text-white/20 font-body uppercase tracking-[0.2em]">
          © 2026 Euloge Tabala. Elite Engineering.
        </p>
      </div>

      <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
        <a href="/" className="hover:text-primary transition-colors">Accueil</a>
        <a href="/about" className="hover:text-primary transition-colors">Qui suis-je</a>
        <a href="/services" className="hover:text-primary transition-colors">Services</a>
        <a href="/realisations" className="hover:text-primary transition-colors">Réalisations</a>
        <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
        <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
      </div>

      <p className="text-[10px] text-white/20 font-body uppercase tracking-[0.2em]">
        Guidé par <span className="text-white">l'excellence</span>
      </p>
    </div>
  </footer>
);

export default Footer;
