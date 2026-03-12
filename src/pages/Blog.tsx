import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getPublishedPosts } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Début du chargement des articles...");
        
        const data = await getPublishedPosts();
        console.log("✅ Articles récupérés:", data.length);
        setPosts(data);
      } catch (err: any) {
        console.error("❌ Erreur lors du chargement des articles:", err);
        let errorMessage = "Impossible de charger les articles.";
        
        if (err.code === 'permission-denied') {
          errorMessage = "Accès refusé. Vérifiez les règles de sécurité Firestore.";
        } else if (err.code === 'failed-precondition') {
          errorMessage = "Index Firestore manquant. Création de l'index requise.";
        } else if (err.message?.includes('domain')) {
          errorMessage = "Domaine non autorisé dans la console Firebase.";
        } else if (err.message) {
          errorMessage = `Erreur: ${err.message}`;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(".blog-card", { opacity: 1, visibility: "visible" });

      gsap.from(".blog-card", {
        opacity: 0.3,
        y: 60,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(".blog-card", { opacity: 1, visibility: "visible" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  const formatDate = (date: Date) => {
    try {
      return format(date, "d MMMM yyyy", { locale: fr });
    } catch {
      return format(new Date(), "d MMMM yyyy", { locale: fr });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      <PageHero
        badge="Blog"
        number="05"
        title="Mon Blog"
        titleAccent="& Articles."
        subtitle="Découvrez mes réflexions, tutoriels et actualités sur le développement web et les technologies."
      />

      <section ref={sectionRef} className="py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg animate-pulse">Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-500/5 rounded-2xl border border-red-500/20 p-8">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">Aucun article pour le moment.</p>
            </div>
          ) : (
            <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card group cursor-pointer"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 group-hover:border-primary/30 transition-all duration-500 shadow-2xl mb-6">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">📝</span>
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 rounded-md text-[9px] font-bold text-primary tracking-widest border border-primary/20 backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6 h-16 line-clamp-3 font-medium">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/30 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold text-white/20 tracking-widest border-r border-white/10 pr-3 last:border-0 last:pr-0"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button className="group/btn flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all">
                      Lire l'article
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
