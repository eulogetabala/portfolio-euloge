// Service pour gérer les articles de blog avec Firebase Firestore

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { BlogPost, BlogPostFormData } from '@/types/blog';

const BLOG_COLLECTION = 'blogPosts';

// Convertir Firestore Timestamp en Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
};

// Récupérer tous les articles (publiés uniquement pour le public)
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  try {
    // Essayer d'abord avec la requête optimale (nécessite un index composite)
    try {
      const q = query(
        collection(db, BLOG_COLLECTION),
        where('published', '==', true),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: convertTimestamp(data.publishedAt),
          updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
        } as BlogPost;
      });
    } catch (indexError: any) {
      // Si l'index n'existe pas, récupérer tous les articles et filtrer/trier côté client
      if (indexError.code === 'failed-precondition' || indexError.message?.includes('index')) {
        console.warn('Index Firestore manquant, utilisation du fallback:', indexError);
        const q = query(collection(db, BLOG_COLLECTION));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              publishedAt: convertTimestamp(data.publishedAt),
              updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
            } as BlogPost;
          })
          .filter((post) => post.published === true)
          .sort((a, b) => {
            const dateA = a.publishedAt instanceof Date ? a.publishedAt.getTime() : 0;
            const dateB = b.publishedAt instanceof Date ? b.publishedAt.getTime() : 0;
            return dateB - dateA;
          });
        return posts;
      }
      throw indexError;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw error;
  }
};

// Récupérer tous les articles (pour le dashboard admin)
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    // Essayer d'abord avec orderBy (nécessite un index)
    try {
      const q = query(collection(db, BLOG_COLLECTION), orderBy('publishedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: convertTimestamp(data.publishedAt),
          updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
        } as BlogPost;
      });
    } catch (indexError: any) {
      // Si l'index n'existe pas, récupérer tous les articles et trier côté client
      if (indexError.code === 'failed-precondition' || indexError.message?.includes('index')) {
        console.warn('Index Firestore manquant, utilisation du fallback:', indexError);
        const q = query(collection(db, BLOG_COLLECTION));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              publishedAt: convertTimestamp(data.publishedAt),
              updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
            } as BlogPost;
          })
          .sort((a, b) => {
            const dateA = a.publishedAt instanceof Date ? a.publishedAt.getTime() : 0;
            const dateB = b.publishedAt instanceof Date ? b.publishedAt.getTime() : 0;
            return dateB - dateA;
          });
        return posts;
      }
      throw indexError;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les articles:', error);
    throw error;
  }
};

// Récupérer un article par son ID
export const getPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    throw error;
  }
};

// Récupérer un article par son slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(collection(db, BLOG_COLLECTION), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      // Vérifier que les données essentielles existent
      if (!data.title || !data.content) {
        console.warn('Article trouvé mais données incomplètes:', doc.id);
      }
      
      return {
        id: doc.id,
        ...data,
        publishedAt: convertTimestamp(data.publishedAt),
        updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
      } as BlogPost;
    }
    return null;
  } catch (error: any) {
    console.error('Erreur lors de la récupération de l\'article par slug:', error);
    // Afficher plus de détails sur l'erreur
    if (error.code) {
      console.error('Code d\'erreur Firestore:', error.code);
    }
    if (error.message) {
      console.error('Message d\'erreur:', error.message);
    }
    throw error;
  }
};

// Créer un nouvel article
export const createPost = async (postData: BlogPostFormData): Promise<string> => {
  try {
    const newPost = {
      ...postData,
      publishedAt: Timestamp.now(),
      views: 0,
    };
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), newPost);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    throw error;
  }
};

// Mettre à jour un article
export const updatePost = async (id: string, postData: Partial<BlogPostFormData>): Promise<void> => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    throw error;
  }
};

// Supprimer un article
export const deletePost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    throw error;
  }
};

// Générer un slug à partir d'un titre
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
    .replace(/(^-|-$)/g, ''); // Supprimer les tirets en début et fin
};
