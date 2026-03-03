# Guide de déploiement sur eulogetabala.cg

## Options de déploiement recommandées

### Option 1 : Vercel (Recommandé) ⭐

**Avantages :**
- ✅ Gratuit
- ✅ Déploiement automatique depuis GitHub
- ✅ SSL automatique
- ✅ CDN global
- ✅ Support des domaines personnalisés
- ✅ Parfait pour React Router

### Option 2 : Netlify

**Avantages :**
- ✅ Gratuit
- ✅ Déploiement automatique
- ✅ SSL automatique
- ✅ Support des domaines personnalisés

---

## Déploiement avec Vercel (Recommandé)

### Étape 1 : Préparer le projet

1. **Vérifier que tout fonctionne en local :**
   ```bash
   npm run build
   npm run preview
   ```
   Vérifiez que le build fonctionne sans erreur.

2. **Créer un fichier `vercel.json`** (si nécessaire pour React Router) :
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### Étape 2 : Pousser le code sur GitHub

1. **Initialiser Git** (si pas déjà fait) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Créer un repository sur GitHub** :
   - Allez sur https://github.com/new
   - Créez un nouveau repository (ex: `portfolio-euloge`)

3. **Pousser le code :**
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/portfolio-euloge.git
   git branch -M main
   git push -u origin main
   ```

### Étape 3 : Déployer sur Vercel

1. **Créer un compte Vercel :**
   - Allez sur https://vercel.com/
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub

2. **Importer le projet :**
   - Cliquez sur "Add New" → "Project"
   - Sélectionnez votre repository GitHub
   - Vercel détectera automatiquement Vite

3. **Configurer les variables d'environnement :**
   - Dans les paramètres du projet, allez dans "Environment Variables"
   - Ajoutez toutes vos variables `.env` :
     ```
     VITE_EMAILJS_SERVICE_ID=service_ay3qjul
     VITE_EMAILJS_TEMPLATE_ID=template_5ximqlw
     VITE_EMAILJS_PUBLIC_KEY=ElVIWfk4-F82Y3h2A
     VITE_FIREBASE_API_KEY=AIzaSyDWcy1u_x2Xjn60EZDtE1N_wYIovA1EmQU
     VITE_FIREBASE_AUTH_DOMAIN=euloge-portfolio.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=euloge-portfolio
     VITE_FIREBASE_STORAGE_BUCKET=euloge-portfolio.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=482534216674
     VITE_FIREBASE_APP_ID=1:482534216674:web:46772cf8cf2ba8dba71fbb
     VITE_FIREBASE_MEASUREMENT_ID=G-CGDPGJJDLT
     VITE_CLOUDINARY_CLOUD_NAME=drje68m3u
     VITE_CLOUDINARY_UPLOAD_PRESET=blog-upload
     ```

4. **Configurer le build :**
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

5. **Déployer :**
   - Cliquez sur "Deploy"
   - Attendez la fin du déploiement
   - Votre site sera disponible sur `votre-projet.vercel.app`

### Étape 4 : Connecter votre domaine eulogetabala.cg

1. **Dans Vercel, allez dans les paramètres du projet :**
   - Cliquez sur "Settings" → "Domains"

2. **Ajouter votre domaine :**
   - Entrez `eulogetabala.cg`
   - Cliquez sur "Add"
   - Vercel vous donnera des instructions pour configurer les DNS

3. **Configurer les DNS :**
   - Allez dans votre panneau de gestion DNS (chez votre registrar)
   - Ajoutez un enregistrement **CNAME** :
     - **Type** : CNAME
     - **Nom** : `@` ou `www` (selon ce que Vercel indique)
     - **Valeur** : `cname.vercel-dns.com` (ou ce que Vercel vous donne)
   - Ou un enregistrement **A** :
     - **Type** : A
     - **Nom** : `@`
     - **Valeur** : L'adresse IP que Vercel vous donne

4. **Attendre la propagation DNS :**
   - Cela peut prendre de quelques minutes à 48h
   - Vercel vérifiera automatiquement et activera le SSL

5. **Vérifier :**
   - Une fois les DNS propagés, votre site sera accessible sur `https://eulogetabala.cg`

---

## Déploiement avec Netlify (Alternative)

### Étape 1 : Créer un compte Netlify

1. Allez sur https://www.netlify.com/
2. Créez un compte (gratuit)
3. Connectez-vous avec GitHub

### Étape 2 : Déployer

1. **Nouveau site depuis Git :**
   - Cliquez sur "Add new site" → "Import an existing project"
   - Sélectionnez votre repository GitHub

2. **Configurer le build :**
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Base directory** : (laisser vide)

3. **Variables d'environnement :**
   - Allez dans "Site settings" → "Environment variables"
   - Ajoutez toutes vos variables (même liste que pour Vercel)

4. **Fichier `_redirects` pour React Router :**
   - Créez un fichier `public/_redirects` avec :
     ```
     /*    /index.html   200
     ```

5. **Déployer :**
   - Cliquez sur "Deploy site"
   - Votre site sera sur `votre-projet.netlify.app`

### Étape 3 : Connecter le domaine

1. **Dans Netlify :**
   - Allez dans "Domain settings"
   - Cliquez sur "Add custom domain"
   - Entrez `eulogetabala.cg`

2. **Configurer les DNS :**
   - Netlify vous donnera des instructions DNS
   - Ajoutez les enregistrements demandés dans votre panneau DNS

---

## Configuration DNS recommandée

Pour `eulogetabala.cg`, vous aurez besoin de :

### Option A : CNAME (Recommandé)
```
Type: CNAME
Nom: @
Valeur: cname.vercel-dns.com (ou ce que votre plateforme indique)
```

### Option B : A Record
```
Type: A
Nom: @
Valeur: [IP fournie par Vercel/Netlify]
```

### Pour www
```
Type: CNAME
Nom: www
Valeur: eulogetabala.cg
```

---

## Vérifications avant déploiement

### ✅ Checklist

- [ ] Le build fonctionne : `npm run build`
- [ ] Toutes les variables d'environnement sont configurées
- [ ] Le fichier `.env` n'est pas commité (déjà dans `.gitignore`)
- [ ] Firebase est configuré et fonctionne
- [ ] Cloudinary est configuré
- [ ] EmailJS est configuré
- [ ] Toutes les pages fonctionnent en local
- [ ] Les images s'affichent correctement
- [ ] Le formulaire de contact fonctionne

---

## Après le déploiement

### 1. Tester toutes les fonctionnalités

- [ ] Page d'accueil
- [ ] Page About
- [ ] Page Services
- [ ] Page Réalisations
- [ ] Page Blog (liste)
- [ ] Page Blog (article individuel)
- [ ] Page Contact
- [ ] Formulaire de contact
- [ ] Dashboard blog (connexion)
- [ ] Upload d'images

### 2. Vérifier les variables d'environnement

Assurez-vous que toutes les variables sont bien configurées dans votre plateforme de déploiement.

### 3. Configurer Firebase pour la production

- Vérifiez que les règles Firestore autorisent votre domaine
- Vérifiez que Firebase Auth autorise votre domaine dans les paramètres

### 4. Tester le SSL

Votre site devrait être accessible en HTTPS automatiquement.

---

## Dépannage

### Le site ne se charge pas

1. Vérifiez les logs de déploiement
2. Vérifiez que le build fonctionne en local
3. Vérifiez les variables d'environnement

### Les routes ne fonctionnent pas (404)

1. Vérifiez que le fichier `vercel.json` ou `_redirects` est présent
2. Vérifiez la configuration de redirection

### Les variables d'environnement ne fonctionnent pas

1. Vérifiez qu'elles commencent par `VITE_`
2. Redéployez après avoir ajouté les variables
3. Vérifiez qu'elles sont bien dans "Environment Variables"

### Le domaine ne fonctionne pas

1. Vérifiez la configuration DNS (peut prendre jusqu'à 48h)
2. Utilisez un outil comme https://dnschecker.org/ pour vérifier
3. Vérifiez que les enregistrements DNS sont corrects

---

## Support

- **Vercel Docs** : https://vercel.com/docs
- **Netlify Docs** : https://docs.netlify.com/
- **Vite Deploy Guide** : https://vitejs.dev/guide/static-deploy.html
