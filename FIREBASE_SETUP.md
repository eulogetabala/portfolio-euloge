# Configuration Firebase pour le Blog

## Étapes pour configurer Firebase

### 1. Créer un projet Firebase

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Ajouter un projet"
3. Entrez un nom de projet (ex: "euloge-tabala-blog")
4. Suivez les étapes de configuration
5. Activez Google Analytics (optionnel)

### 2. Activer Firestore Database

1. Dans votre projet Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez le mode "Production" ou "Test" (pour commencer, "Test" est plus simple)
4. Choisissez une région (ex: "europe-west")
5. Cliquez sur "Activer"

### 3. Configurer les règles de sécurité Firestore

**⚠️ IMPORTANT :** Vous devez configurer ces règles pour que le blog fonctionne correctement.

Dans l'onglet "Règles" de Firestore, configurez les règles suivantes :

**Règles complètes (recommandées) :**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{postId} {
      // Lecture publique uniquement pour les articles publiés
      // Permet à la page blog publique de lire les articles publiés
      allow read: if resource.data.published == true;
      
      // Lecture complète pour les utilisateurs authentifiés (dashboard)
      // Permet au dashboard de lire tous les articles (publiés et brouillons)
      allow read: if request.auth != null;
      
      // Écriture uniquement pour les utilisateurs authentifiés
      // Permet au dashboard de créer, modifier et supprimer des articles
      allow write: if request.auth != null;
    }
  }
}
```

**Explication des règles :**
- `allow read: if resource.data.published == true` : Les visiteurs non authentifiés peuvent lire uniquement les articles publiés
- `allow read: if request.auth != null` : Les utilisateurs authentifiés (admin) peuvent lire tous les articles
- `allow write: if request.auth != null` : Seuls les utilisateurs authentifiés peuvent créer, modifier ou supprimer des articles

**Pour appliquer les règles :**
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `euloge-portfolio`
3. Allez dans **Firestore Database** → **Règles**
4. Copiez-collez les règles ci-dessus
5. Cliquez sur **Publier**

### 4. Récupérer les clés de configuration

1. Dans Firebase Console, allez dans "Paramètres du projet" (icône ⚙️)
2. Allez dans l'onglet "Vos applications"
3. Cliquez sur l'icône Web (</>)
4. Enregistrez votre application avec un nom (ex: "Portfolio Blog")
5. **Copiez les clés de configuration** qui apparaissent

Vous obtiendrez quelque chose comme :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. Configurer les variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-projet
VITE_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Important :** Remplacez les valeurs par celles de votre projet Firebase.

### 6. Installer Firebase

Si Firebase n'est pas encore installé, exécutez :

```bash
npm install firebase
```

### 7. Redémarrer le serveur

```bash
npm run dev
```

## Structure de la base de données

Les articles seront stockés dans la collection `blogPosts` avec cette structure :

```typescript
{
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML
  author: string;
  published: boolean;
  publishedAt: Timestamp;
  updatedAt?: Timestamp;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  views?: number;
}
```

## Utilisation

### Page Blog publique
- URL : `/blog`
- Affiche tous les articles publiés (`published: true`)

### Page Article
- URL : `/blog/:slug`
- Affiche un article spécifique par son slug

### Dashboard Admin
- URL : `/blog-dashboard`
- Permet de créer, modifier et supprimer des articles
- Affiche tous les articles (publiés et brouillons)

## Fonctionnalités

✅ Créer des articles
✅ Modifier des articles
✅ Supprimer des articles
✅ Publier/Dépublier des articles
✅ Gérer les tags et catégories
✅ Upload d'images locales (Firebase Storage)
✅ Ajouter des images par URL
✅ Contenu HTML

## Configuration Storage (pour les images)

Pour uploader des images depuis votre ordinateur, vous devez activer Firebase Storage :

1. Allez dans **Storage** dans Firebase Console
2. Cliquez sur **Commencer**
3. Configurez les règles de sécurité (voir `CONFIGURATION_STORAGE.md`)
4. Les images peuvent maintenant être uploadées depuis le dashboard

## Sécurité (à améliorer)

Pour l'instant, le dashboard est accessible à tous. Pour sécuriser :

1. Activer Firebase Authentication
2. Ajouter une vérification d'authentification dans `BlogDashboard.tsx`
3. Mettre à jour les règles Firestore pour exiger l'authentification

## Notes

- Le contenu des articles est en HTML
- Les slugs sont générés automatiquement à partir du titre
- Les dates sont gérées automatiquement par Firestore
- Les articles non publiés ne sont pas visibles sur la page publique
