import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { sendEmail } from "@/utils/emailService";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content > *", {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
        },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-grid",
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
    <section ref={sectionRef} id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Glow decoration */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <p className="text-primary font-body text-xs tracking-[0.4em] uppercase font-bold mb-4">Contact</p>
          <h2 className="text-5xl sm:text-7xl font-heading font-bold tracking-tighter text-white">
            Parlons de votre <span className="text-white/30">prochain succès</span>
          </h2>
        </div>

        <div className="contact-grid grid lg:grid-cols-2 gap-20">
          
          <div className="contact-content space-y-12">
            <h3 className="text-3xl font-heading font-bold text-white leading-tight">
              Collaborons ensemble pour <br />
              <span className="text-primary">bâtir l'exceptionnel.</span>
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                  <Mail className="text-white group-hover:text-primary transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-heading font-bold text-white">contact@eulogetabala.cg</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                  <Phone className="text-white group-hover:text-primary transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Téléphone</p>
                  <a href="tel:+242065298498" className="text-xl font-heading font-bold text-white hover:text-primary transition-colors">
                    +242 06 529 84 98
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom *"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Votre email *"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <textarea
              placeholder="Dites-moi tout sur votre projet... *"
              rows={6}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={isSubmitting}
            />
            
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
              className="group w-full py-6 bg-primary text-white font-heading font-bold text-sm tracking-[0.2em] uppercase rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,93,0,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
