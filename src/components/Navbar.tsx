import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Facebook, MessageSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Accueil", href: "/", isHash: false },
  { label: "Qui suis-je", href: "/about", isHash: false },
  { label: "Services", href: "/services", isHash: false },
  { label: "Réalisations", href: "/realisations", isHash: false },
  { label: "Blog", href: "/blog", isHash: false },
  { label: "Contact", href: "/contact", isHash: false },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string, isHash: boolean) => {
    setMobileOpen(false);
    if (isHash) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4 bg-black/40 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="font-heading text-2xl font-bold tracking-tight text-white">
          Euloge<span className="text-primary">.</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = !link.isHash && location.pathname === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleClick(link.href, link.isHash)}
                className={`text-[11px] font-semibold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-white/50 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* Réseaux sociaux */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/euloge-tabala-mabandza-84072a310/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="text-white/40 group-hover:text-primary transition-colors" size={16} />
            </a>
            <a
              href="https://www.facebook.com/euloge.tabala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="text-white/40 group-hover:text-primary transition-colors" size={16} />
            </a>
            <a
              href="https://wa.me/242065298498"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
              aria-label="WhatsApp"
            >
              <MessageSquare className="text-white/40 group-hover:text-primary transition-colors" size={16} />
            </a>
          </div>
          
          <button 
            onClick={() => navigate("/contact")}
            className="hidden sm:block px-6 py-2.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,93,0,0.3)] transition-all duration-300"
          >
            Me contacter
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10"
          >
            <div className="px-6 py-12 flex flex-col items-center gap-8">
              {navLinks.map((link) => {
                const isActive = !link.isHash && location.pathname === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleClick(link.href, link.isHash)}
                    className={`text-2xl font-heading font-bold transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-white/40 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              {/* Réseaux sociaux mobile */}
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/euloge-tabala-mabandza-84072a310/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                </a>
                <a
                  href="https://www.facebook.com/euloge.tabala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                </a>
                <a
                  href="https://wa.me/242065298498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
