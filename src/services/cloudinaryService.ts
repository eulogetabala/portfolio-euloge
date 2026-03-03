// Service pour gérer l'upload d'images avec Cloudinary

/**
 * Upload une image vers Cloudinary
 * @param file - Le fichier image à uploader
 * @returns L'URL de téléchargement de l'image
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    // Vérifier que les variables d'environnement sont configurées
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        'Cloudinary n\'est pas configuré. Vérifiez vos variables d\'environnement VITE_CLOUDINARY_CLOUD_NAME et VITE_CLOUDINARY_UPLOAD_PRESET'
      );
    }

    // Créer un FormData pour l'upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'blog-images'); // Organiser les images dans un dossier

    // Upload vers Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Erreur lors de l'upload: ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Retourner l'URL sécurisée de l'image
    return data.secure_url;
  } catch (error: any) {
    console.error('Erreur lors de l\'upload vers Cloudinary:', error);
    throw new Error(error.message || 'Erreur lors de l\'upload de l\'image vers Cloudinary');
  }
};

/**
 * Optimise une URL Cloudinary pour l'affichage
 * @param imageUrl - L'URL de l'image Cloudinary
 * @param width - Largeur maximale (optionnel)
 * @param height - Hauteur maximale (optionnel)
 * @param quality - Qualité (optionnel, par défaut 'auto')
 * @returns L'URL optimisée
 */
export const optimizeCloudinaryImage = (
  imageUrl: string,
  width?: number,
  height?: number,
  quality: string = 'auto'
): string => {
  // Si ce n'est pas une URL Cloudinary, retourner l'URL telle quelle
  if (!imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  // Extraire les parties de l'URL Cloudinary
  const urlParts = imageUrl.split('/upload/');
  if (urlParts.length !== 2) {
    return imageUrl;
  }

  // Construire les transformations
  const transformations: string[] = [];
  
  if (width) {
    transformations.push(`w_${width}`);
  }
  
  if (height) {
    transformations.push(`h_${height}`);
  }
  
  if (quality) {
    transformations.push(`q_${quality}`);
  }
  
  // Ajouter le format auto et la compression
  transformations.push('f_auto', 'c_limit');

  // Reconstruire l'URL avec les transformations
  const transformString = transformations.join(',');
  return `${urlParts[0]}/upload/${transformString}/${urlParts[1]}`;
};

/**
 * Valide qu'un fichier est une image
 * @param file - Le fichier à valider
 * @returns true si c'est une image valide
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Vérifier le type MIME
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Format d\'image non supporté. Utilisez JPG, PNG, GIF ou WEBP.',
    };
  }
  
  // Vérifier la taille (max 10MB pour Cloudinary gratuit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'L\'image est trop grande. Taille maximale : 10MB.',
    };
  }
  
  return { valid: true };
};
