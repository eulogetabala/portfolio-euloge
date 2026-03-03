import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, LogOut, Upload, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  generateSlug,
} from "@/services/blogService";
import { uploadImageToCloudinary, validateImageFile } from "@/services/cloudinaryService";
import { BlogPost, BlogPostFormData } from "@/types/blog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BlogDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Euloge Tabala",
    published: false,
    featuredImage: "",
    tags: [],
    category: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (error: any) {
      console.error("Erreur lors du chargement des articles:", error);
      // Afficher plus de détails sur l'erreur
      if (error.code) {
        console.error("Code d'erreur Firestore:", error.code);
      }
      if (error.message) {
        console.error("Message d'erreur:", error.message);
      }
      // Si c'est une erreur d'index, afficher un message plus utile
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        alert("Erreur: Index Firestore manquant. Consultez la console pour le lien de création d'index.");
      } else {
        alert("Erreur lors du chargement des articles. Consultez la console pour plus de détails.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Euloge Tabala",
      published: false,
      featuredImage: "",
      tags: [],
      category: "",
    });
    setImageFile(null);
    setImagePreview("");
    setShowForm(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      published: post.published,
      featuredImage: post.featuredImage || "",
      tags: post.tags || [],
      category: post.category || "",
    });
    setImageFile(null);
    setImagePreview(post.featuredImage || "");
    setShowForm(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deletePost(id);
      await fetchPosts();
      alert("Article supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Valider le fichier
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setImageFile(file);

    // Créer un aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadBlogImage(imageFile, editingPost?.id);
      setFormData({ ...formData, featuredImage: imageUrl });
      setImageFile(null);
      alert("Image uploadée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error);
      alert("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Réinitialiser l'état d'upload au cas où
    setUploadingImage(false);

    try {
      // Si une nouvelle image a été sélectionnée, l'uploader vers Cloudinary
      if (imageFile) {
        console.log('Image sélectionnée, début de l\'upload vers Cloudinary...');
        setUploadingImage(true);
        
        // Ajouter un timeout pour éviter un blocage infini
        const uploadTimeout = setTimeout(() => {
          setUploadingImage(false);
          alert('L\'upload prend trop de temps. Vérifiez votre connexion et que Cloudinary est configuré.');
        }, 60000); // 60 secondes

        try {
          const imageUrl = await uploadImageToCloudinary(imageFile);
          clearTimeout(uploadTimeout);
          console.log('Image uploadée avec succès:', imageUrl);
          formData.featuredImage = imageUrl;
          setImageFile(null);
          setUploadingImage(false);
        } catch (uploadError: any) {
          clearTimeout(uploadTimeout);
          console.error('Erreur lors de l\'upload:', uploadError);
          setUploadingImage(false);
          
          let errorMessage = 'Erreur lors de l\'upload de l\'image.\n\n';
          
          if (uploadError.message?.includes('n\'est pas configuré')) {
            errorMessage += '❌ Cloudinary n\'est pas configuré.\n\n';
            errorMessage += '📋 Étapes à suivre :\n';
            errorMessage += '1. Créez un compte sur https://cloudinary.com/\n';
            errorMessage += '2. Récupérez votre Cloud Name et Upload Preset\n';
            errorMessage += '3. Ajoutez-les dans votre fichier .env\n';
            errorMessage += '4. Voir CONFIGURATION_CLOUDINARY.md pour les détails\n';
          } else {
            errorMessage += `Erreur: ${uploadError.message || 'Erreur inconnue'}\n`;
            errorMessage += '→ Consultez la console pour plus de détails\n';
          }
          
          errorMessage += '\n💡 Astuce: Vous pouvez utiliser une URL d\'image à la place en attendant.';
          
          alert(errorMessage);
          return; // Arrêter ici si l'upload échoue
        }
      }

      console.log('Sauvegarde de l\'article...');
      if (editingPost?.id) {
        await updatePost(editingPost.id, formData);
        alert("Article mis à jour avec succès");
      } else {
        await createPost(formData);
        alert("Article créé avec succès");
      }
      setShowForm(false);
      setImageFile(null);
      setImagePreview("");
      setUploadingImage(false);
      await fetchPosts();
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error);
      setUploadingImage(false);
      alert(`Erreur lors de la sauvegarde: ${error.message || 'Erreur inconnue'}\n\nConsultez la console pour plus de détails.`);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const formatDate = (date: Date) => {
    try {
      return format(date, "d MMM yyyy", { locale: fr });
    } catch {
      return format(new Date(), "d MMM yyyy", { locale: fr });
    }
  };

  const handleLogout = async () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        alert("Erreur lors de la déconnexion");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Dashboard <span className="text-primary italic font-medium">Blog</span>
              </h1>
              <p className="text-white/50 text-lg">Gérez vos articles de blog</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleNewPost}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,93,0,0.3)] transition-all"
              >
                <Plus size={20} />
                Nouvel article
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-all border border-white/10"
                title="Déconnexion"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Formulaire */}
          {showForm && (
            <div className="mb-12 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingPost ? "Modifier l'article" : "Nouvel article"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm font-bold mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Titre de l'article"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-bold mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="titre-de-l-article"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">
                    Extrait *
                  </label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Court résumé de l'article"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">
                    Contenu (HTML) *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none font-mono text-sm"
                    placeholder="<p>Contenu de l'article en HTML...</p>"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm font-bold mb-2">
                      Image à la une
                    </label>
                    
                    {/* Aperçu de l'image */}
                    {imagePreview && (
                      <div className="mb-4 relative">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-48 object-cover rounded-xl border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setImageFile(null);
                            setFormData({ ...formData, featuredImage: "" });
                          }}
                          className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
                        >
                          <X size={18} className="text-white" />
                        </button>
                      </div>
                    )}

                    {/* Input file - Cloudinary */}
                    <div className="space-y-3">
                      {/* Zone d'upload Cloudinary */}
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-10 h-10 mb-3 text-white/40" />
                          <p className="mb-2 text-sm text-white/60">
                            <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                          </p>
                          <p className="text-xs text-white/40">PNG, JPG, GIF ou WEBP (MAX. 10MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>

                      {/* URL - Option alternative */}
                      <div className="text-center text-white/40 text-xs mb-2">ou</div>
                      
                      <div>
                        <label className="block text-white/60 text-sm font-bold mb-2">
                          URL de l'image (alternative)
                        </label>
                        <input
                          type="url"
                          value={formData.featuredImage && !imagePreview ? formData.featuredImage : ""}
                          onChange={(e) => {
                            setFormData({ ...formData, featuredImage: e.target.value });
                            if (e.target.value) {
                              setImagePreview(e.target.value);
                            }
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="https://... (URL alternative)"
                        />
                        <p className="mt-2 text-xs text-white/40">
                          💡 Vous pouvez aussi utiliser une URL d'image externe
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-bold mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Développement, Design, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-bold mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Ajouter un tag (Entrée)"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-6 py-4 bg-primary/20 text-primary font-bold rounded-xl hover:bg-primary/30 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium text-white/60 border border-white/10 flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-white/40 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <span className="text-white/60 text-sm font-medium">Publier l'article</span>
                  </label>
                </div>

                {/* Message d'upload en cours */}
                {uploadingImage && (
                  <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <div>
                        <p className="text-primary font-bold text-sm">Upload en cours...</p>
                        <p className="text-primary/60 text-xs">Ne fermez pas cette page</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadingImage(false);
                        setImageFile(null);
                        setImagePreview("");
                        alert("Upload annulé. Vous pouvez réessayer ou utiliser une URL d'image.");
                      }}
                      className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-lg hover:bg-primary/30 transition-colors text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,93,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {editingPost ? "Mettre à jour" : "Créer l'article"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setImageFile(null);
                      setImagePreview("");
                      setUploadingImage(false);
                    }}
                    disabled={uploadingImage}
                    className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Liste des articles */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/50 text-lg">Chargement des articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-white/20" />
              </div>
              <p className="text-white/50 text-lg mb-2">Aucun article pour le moment</p>
              <p className="text-white/30 text-sm">Créez votre premier article en cliquant sur "Nouvel article"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(255,93,0,0.1)]"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-white/[0.02]">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage.includes('cloudinary.com') 
                          ? post.featuredImage.replace('/upload/', '/upload/w_600,h_400,c_fill,f_auto,q_auto/')
                          : post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    {/* Badge statut */}
                    <div className="absolute top-3 right-3">
                      {post.published ? (
                        <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-md text-white text-xs font-bold rounded-full border border-primary/50 shadow-lg">
                          Publié
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white/60 text-xs font-bold rounded-full border border-white/20">
                          Brouillon
                        </span>
                      )}
                    </div>
                    {/* Catégorie */}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-primary text-xs font-bold rounded-lg border border-primary/30">
                          {post.category}
                        </span>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Métadonnées */}
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-4 pb-4 border-b border-white/10">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/5 text-white/40 text-[10px] font-medium rounded border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-white/30 text-[10px] font-medium">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-lg transition-all text-sm font-medium group/btn"
                        title="Voir l'article"
                      >
                        <Eye size={16} />
                        <span>Voir</span>
                      </button>
                      <button
                        onClick={() => handleEditPost(post)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-lg transition-all text-sm font-medium"
                        title="Modifier"
                      >
                        <Edit size={16} />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => post.id && handleDeletePost(post.id)}
                        className="p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDashboard;
