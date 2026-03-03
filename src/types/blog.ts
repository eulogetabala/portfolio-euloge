// Types pour les articles de blog

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorEmail?: string;
  publishedAt: Date | any; // Firestore Timestamp
  updatedAt?: Date | any;
  published: boolean;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  views?: number;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  featuredImage?: string;
  tags?: string[];
  category?: string;
}
