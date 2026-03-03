# Portfolio Euloge Tabala

Portfolio professionnel de Euloge Tabala - Développeur Full Stack & Designer

## 🌐 Site Web

**URL** : https://eulogetabala.cg

## 🚀 Technologies

- **React** - Bibliothèque JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **GSAP** - Animations avancées
- **React Router** - Navigation
- **Firebase** - Backend (Firestore, Authentication)
- **Cloudinary** - Gestion d'images
- **EmailJS** - Envoi d'emails

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/eulogetabala.git

# Aller dans le dossier
cd eulogetabala

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# EmailJS
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key

# Firebase
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=votre_measurement_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=votre_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=votre_upload_preset
```

Consultez les guides de configuration pour plus de détails :
- `FIREBASE_SETUP.md` - Configuration Firebase
- `CONFIGURATION_CLOUDINARY.md` - Configuration Cloudinary
- `EMAILJS_SETUP.md` - Configuration EmailJS

## 📝 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint

# Tests
npm run test
```

## 📁 Structure du projet

```
src/
├── components/     # Composants React réutilisables
├── pages/         # Pages de l'application
├── services/      # Services (Firebase, Cloudinary, etc.)
├── contexts/      # Contextes React (Auth, etc.)
├── types/         # Types TypeScript
├── utils/         # Utilitaires
└── config/        # Configurations (Firebase, etc.)
```

## 🎨 Fonctionnalités

- ✅ Portfolio moderne avec animations GSAP
- ✅ Blog intégré avec Firebase Firestore
- ✅ Dashboard admin pour gérer les articles
- ✅ Upload d'images avec Cloudinary
- ✅ Formulaire de contact avec EmailJS
- ✅ Design responsive et moderne
- ✅ Authentification Firebase

## 📄 Pages

- `/` - Page d'accueil
- `/about` - À propos
- `/services` - Services
- `/realisations` - Réalisations
- `/blog` - Blog
- `/blog/:slug` - Article de blog
- `/contact` - Contact
- `/blog-dashboard` - Dashboard admin (protégé)

## 🔐 Accès Admin

- **URL** : `/blog-dashboard`
- **Identifiants** : Voir `CREATION_COMPTE_ADMIN.md`

## 🚀 Déploiement

Consultez `GUIDE_DEPLOIEMENT.md` pour les instructions complètes de déploiement.

### Déploiement rapide avec Vercel

1. Poussez votre code sur GitHub
2. Importez le projet sur Vercel
3. Configurez les variables d'environnement
4. Connectez votre domaine `eulogetabala.cg`

## 📚 Documentation

- `GUIDE_DEPLOIEMENT.md` - Guide de déploiement
- `FIREBASE_SETUP.md` - Configuration Firebase
- `CONFIGURATION_CLOUDINARY.md` - Configuration Cloudinary
- `EMAILJS_SETUP.md` - Configuration EmailJS
- `CREATION_COMPTE_ADMIN.md` - Création du compte admin

## 📧 Contact

- **Email** : contact@eulogetabala.cg
- **WhatsApp** : +242 06 52 98 498
- **Site** : https://eulogetabala.cg

## 📄 Licence

Tous droits réservés © 2024 Euloge Tabala
