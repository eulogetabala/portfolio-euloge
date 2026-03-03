import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const data = await getPostBySlug(slug);
        if (!data) {
          console.warn("Article non trouvé pour le slug:", slug);
        }
        setPost(data);
      } catch (error: any) {
        console.error("Erreur lors du chargement de l'article:", error);
        // Afficher plus de détails dans la console pour le débogage
        if (error.code) {
          console.error("Code d'erreur:", error.code);
        }
        if (error.message) {
          console.error("Message:", error.message);
        }
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (date: Date) => {
    try {
      return format(date, "d MMMM yyyy", { locale: fr });
    } catch {
      return format(new Date(), "d MMMM yyyy", { locale: fr });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white/50 text-lg">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-white/50 text-lg mb-4">Article non trouvé</p>
            <button
              onClick={() => navigate("/blog")}
              className="text-primary hover:underline"
            >
              Retour au blog
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      <article className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour */}
          <button
            onClick={() => navigate("/blog")}
            className="mb-12 inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour au blog</span>
          </button>

          {/* Header */}
          <header className="mb-12">
            {post.category && (
              <div className="mb-6">
                <span className="px-4 py-2 bg-primary/20 rounded-full text-xs font-bold text-primary tracking-widest border border-primary/30">
                  {post.category}
                </span>
              </div>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/40 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Par {post.author}</span>
              </div>
            </div>
            {post.featuredImage && (
              <div className="relative w-full max-w-full rounded-xl overflow-hidden mb-12">
                <img
                  src={post.featuredImage.includes('cloudinary.com') 
                    ? post.featuredImage.replace('/upload/', '/upload/w_1200,h_600,c_limit,f_auto,q_auto/')
                    : post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto max-h-[600px] object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            )}
          </header>

          {/* Contenu */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-code:text-primary prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-blockquote:border-primary prose-blockquote:text-white/60
              prose-img:rounded-xl prose-img:my-8 prose-img:max-w-full prose-img:h-auto prose-img:object-contain
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:text-white/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium text-white/60 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
