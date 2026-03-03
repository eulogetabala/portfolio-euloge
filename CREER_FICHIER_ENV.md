# Configuration du fichier .env

## Créer le fichier .env

Créez un fichier nommé `.env` à la racine du projet avec le contenu suivant :

```env
# Configuration EmailJS
# Service ID (déjà configuré)
VITE_EMAILJS_SERVICE_ID=service_ay3qjul

# Template ID (à récupérer dans EmailJS > Email Templates)
VITE_EMAILJS_TEMPLATE_ID=votre_template_id_ici

# Public Key (à récupérer dans EmailJS > Account > General)
VITE_EMAILJS_PUBLIC_KEY=votre_public_key_ici
```

## Étapes pour compléter la configuration

### 1. Récupérer le Template ID
- Aller sur https://www.emailjs.com/
- Aller dans "Email Templates"
- Si vous n'avez pas encore de template, créez-en un avec ce contenu :

**Sujet :**
```
Nouveau message de contact - {{from_name}}
```

**Corps du message :**
```
Bonjour,

Vous avez reçu un nouveau message depuis votre site web.

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Répondre à: {{reply_to}}
```

- **Notez le Template ID** (ex: `template_xxxxx`)
- Remplacez `votre_template_id_ici` dans le fichier `.env`

### 2. Récupérer la Public Key
- Dans EmailJS, aller dans "Account" > "General"
- **Notez votre Public Key** (ex: `xxxxxxxxxxxxx`)
- Remplacez `votre_public_key_ici` dans le fichier `.env`

### 3. Redémarrer le serveur
```bash
npm run dev
```

### 4. Tester le formulaire
- Remplir le formulaire de contact sur votre site
- Vérifier que l'email arrive bien dans votre boîte Gmail
- Les emails seront envoyés à `contact@eulogetabala.cg` (défini dans le template)

## Exemple de fichier .env complet

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_ay3qjul
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyDWcy1u_x2Xjn60EZDtE1N_wYIovA1EmQU
VITE_FIREBASE_AUTH_DOMAIN=euloge-portfolio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=euloge-portfolio
VITE_FIREBASE_STORAGE_BUCKET=euloge-portfolio.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=482534216674
VITE_FIREBASE_APP_ID=1:482534216674:web:46772cf8cf2ba8dba71fbb
VITE_FIREBASE_MEASUREMENT_ID=G-CGDPGJJDLT

# Cloudinary Configuration (pour l'upload d'images)
# Voir CONFIGURATION_CLOUDINARY.md pour les instructions
VITE_CLOUDINARY_CLOUD_NAME=votre-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=votre-upload-preset
```

**Note** : Pour Cloudinary, suivez les instructions dans `CONFIGURATION_CLOUDINARY.md` pour obtenir vos clés.
