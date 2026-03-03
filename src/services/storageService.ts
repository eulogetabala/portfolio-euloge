// Service pour gérer l'upload d'images avec Firebase Storage

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth } from '@/config/firebase';

const BLOG_IMAGES_FOLDER = 'blog-images';

/**
 * Upload une image pour un article de blog
 * @param file - Le fichier image à uploader
 * @param postId - L'ID de l'article (optionnel, pour organiser les images)
 * @returns L'URL de téléchargement de l'image
 */
export const uploadBlogImage = async (
  file: File,
  postId?: string
): Promise<string> => {
  try {
    console.log('Début de l\'upload de l\'image:', file.name, file.size);
    
    // Vérifier que storage est initialisé
    if (!storage) {
      const error = new Error('Firebase Storage n\'est pas initialisé. Vérifiez votre configuration.');
      (error as any).code = 'storage/not-initialized';
      throw error;
    }
    
    // Vérifier que l'utilisateur est authentifié
    if (!auth.currentUser) {
      const error = new Error('Vous devez être connecté pour uploader des images.');
      (error as any).code = 'auth/not-authenticated';
      throw error;
    }
    
    console.log('Utilisateur authentifié:', auth.currentUser.email);
    
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;
    
    // Créer le chemin de stockage
    const storagePath = postId
      ? `${BLOG_IMAGES_FOLDER}/${postId}/${fileName}`
      : `${BLOG_IMAGES_FOLDER}/${fileName}`;
    
    console.log('Chemin de stockage:', storagePath);
    
    const storageRef = ref(storage, storagePath);
    
    // Upload le fichier avec timeout
    console.log('Upload en cours...');
    
    // Créer une promesse avec timeout
    const uploadPromise = uploadBytes(storageRef, file);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout: L\'upload prend trop de temps. Vérifiez votre connexion et que Firebase Storage est activé.'));
      }, 25000); // 25 secondes
    });
    
    await Promise.race([uploadPromise, timeoutPromise]);
    console.log('Upload terminé, récupération de l\'URL...');
    
    // Récupérer l'URL de téléchargement
    const downloadURL = await getDownloadURL(storageRef);
    console.log('URL récupérée:', downloadURL);
    
    return downloadURL;
  } catch (error: any) {
    console.error('Erreur complète lors de l\'upload de l\'image:', error);
    console.error('Code d\'erreur:', error.code);
    console.error('Message d\'erreur:', error.message);
    
    // Détecter les erreurs CORS
    if (error.message?.includes('CORS') || error.message?.includes('preflight') || error.code === 'storage/unknown') {
      const newError = new Error('Erreur CORS : Firebase Storage n\'est probablement pas activé. Allez dans Firebase Console → Storage → Commencer pour activer Storage.');
      (newError as any).code = 'storage/cors-error';
      throw newError;
    }
    
    // Messages d'erreur plus spécifiques
    if (error.code === 'storage/unauthorized') {
      const newError = new Error('Vous n\'êtes pas autorisé à uploader des images. Vérifiez que vous êtes connecté et que les règles Storage sont configurées.');
      (newError as any).code = 'storage/unauthorized';
      throw newError;
    } else if (error.code === 'storage/canceled') {
      throw new Error('L\'upload a été annulé.');
    } else if (error.message?.includes('not initialized') || error.code === 'storage/not-initialized') {
      const newError = new Error('Firebase Storage n\'est pas initialisé. Vérifiez votre configuration Firebase.');
      (newError as any).code = 'storage/not-initialized';
      throw newError;
    } else if (error.code === 'auth/not-authenticated') {
      throw error;
    }
    
    const newError = new Error(error.message || 'Erreur lors de l\'upload de l\'image');
    (newError as any).code = error.code || 'storage/unknown';
    throw newError;
  }
};

/**
 * Supprime une image de Firebase Storage
 * @param imageUrl - L'URL de l'image à supprimer
 */
export const deleteBlogImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extraire le chemin de stockage depuis l'URL
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split('/o/')[1]?.split('?')[0] || '');
    
    if (!path) {
      console.warn('Impossible d\'extraire le chemin depuis l\'URL:', imageUrl);
      return;
    }
    
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    // Ne pas lancer d'erreur si l'image n'existe pas
    if ((error as any).code !== 'storage/object-not-found') {
      throw error;
    }
  }
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
  
  // Vérifier la taille (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'L\'image est trop grande. Taille maximale : 5MB.',
    };
  }
  
  return { valid: true };
};
