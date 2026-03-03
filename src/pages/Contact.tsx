import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Linkedin, Facebook, MessageSquare, Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { sendEmail } from "@/utils/emailService";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-info-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".contact-form", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: "", email: "", message: "" });
        
        // Réinitialiser le message après 5 secondes
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <PageHero
        badge="Contact"
        number="04"
        title="Contactez-moi"
        titleAccent="& Collaborons."
        subtitle="Parlons de votre prochain projet et transformons vos idées en réalité digitale."
      />

      <section ref={sectionRef} className="py-32 px-6 relative bg-[#050505] overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] opacity-30" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left - Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                  Restons en <span className="text-primary italic font-medium">contact.</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                  Que vous ayez un projet en tête ou simplement une question, n'hésitez pas à me contacter. 
                  Je serai ravi d'échanger avec vous.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a 
                  href="mailto:contact@eulogetabala.cg" 
                  className="contact-info-card group flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500 flex-shrink-0">
                    <Mail className="text-white group-hover:text-primary transition-colors" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      contact@eulogetabala.cg
                    </p>
                  </div>
                </a>

                <a 
                  href="tel:+242065298498" 
                  className="contact-info-card group flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500 flex-shrink-0">
                    <Phone className="text-white group-hover:text-primary transition-colors" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Téléphone</p>
                    <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      +242 06 529 84 98
                    </p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/242065298498" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card group flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500 flex-shrink-0">
                    <MessageSquare className="text-white group-hover:text-primary transition-colors" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">WhatsApp Business</p>
                    <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      +242 06 529 84 98
                    </p>
                  </div>
                </a>

                <div className="contact-info-card group flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white/60" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Localisation</p>
                    <p className="text-lg font-bold text-white/80">
                      Kintélé, Brazzaville
                    </p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-6">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Suivez-moi</p>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: "https://www.linkedin.com/in/euloge-tabala-mabandza-84072a310/", label: "LinkedIn" },
                    { icon: Facebook, href: "https://www.facebook.com/euloge.tabala", label: "Facebook" },
                    { icon: MessageSquare, href: "https://wa.me/242065298498", label: "WhatsApp" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-500 group"
                      aria-label={social.label}
                    >
                      <social.icon className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Formulaire de contact */}
            <div className="contact-form">
              <div className="p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl">
                <h3 className="text-2xl font-black text-white mb-6">
                  Envoyez-moi un <span className="text-primary">message</span>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Votre nom *"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Votre email *"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Parlez-moi de votre projet... *"
                      rows={8}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {/* Message de statut */}
                  {submitStatus.type && (
                    <div className={`flex items-center gap-3 p-4 rounded-xl ${
                      submitStatus.type === 'success' 
                        ? 'bg-primary/10 border border-primary/30 text-primary' 
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}>
                      {submitStatus.type === 'success' ? (
                        <CheckCircle size={20} />
                      ) : (
                        <AlertCircle size={20} />
                      )}
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,93,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                    {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
