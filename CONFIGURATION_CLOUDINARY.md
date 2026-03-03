# Configuration Cloudinary pour l'upload d'images

## Étape 1 : Créer un compte Cloudinary

1. Allez sur **https://cloudinary.com/**
2. Cliquez sur **"Sign Up for Free"** ou **"S'inscrire gratuitement"**
3. Remplissez le formulaire d'inscription
4. Vérifiez votre email et activez votre compte

## Étape 2 : Récupérer vos clés Cloudinary

Une fois connecté à votre dashboard Cloudinary :

### Cloud Name

1. Dans le dashboard, vous verrez votre **Cloud Name** en haut à droite
2. C'est quelque chose comme : `dxxxxx` ou `your-cloud-name`
3. **Copiez cette valeur**

### Upload Preset

1. Dans le menu de gauche, allez dans **Settings** (⚙️)
2. Cliquez sur **Upload** dans le sous-menu
3. Descendez jusqu'à **"Upload presets"**
4. Si vous n'avez pas de preset, créez-en un :
   - Cliquez sur **"Add upload preset"**
   - Donnez-lui un nom (ex: `blog-upload`)
   - Choisissez **"Unsigned"** comme mode (pour l'upload depuis le navigateur)
   - Cliquez sur **"Save"**
5. **Copiez le nom du preset** (ex: `blog-upload`)

## Étape 3 : Configurer les variables d'environnement

1. Ouvrez votre fichier `.env` à la racine du projet
2. Ajoutez ces deux lignes :

```env
VITE_CLOUDINARY_CLOUD_NAME=votre-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=votre-upload-preset
```

**Exemple :**
```env
VITE_CLOUDINARY_CLOUD_NAME=dxxxxx
VITE_CLOUDINARY_UPLOAD_PRESET=blog-upload
```

⚠️ **Important** : 
- Remplacez `votre-cloud-name` par votre Cloud Name réel
- Remplacez `votre-upload-preset` par le nom de votre Upload Preset
- Ne mettez **PAS** d'espaces autour du `=`

## Étape 4 : Redémarrer le serveur

Après avoir ajouté les variables d'environnement :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez-le
npm run dev
```

## Étape 5 : Tester l'upload

1. Allez sur `/blog-dashboard`
2. Créez ou modifiez un article
3. Cliquez sur la zone d'upload d'image
4. Sélectionnez une image
5. L'image devrait s'uploader automatiquement vers Cloudinary

## Vérification

Si tout fonctionne :
- ✅ L'image s'affiche dans l'aperçu
- ✅ L'URL de l'image commence par `https://res.cloudinary.com/`
- ✅ L'image est visible dans votre dashboard Cloudinary → **Media Library**

## Dépannage

### Erreur : "Cloudinary n'est pas configuré"

1. Vérifiez que les variables sont bien dans le fichier `.env`
2. Vérifiez qu'elles commencent par `VITE_`
3. Vérifiez qu'il n'y a pas d'espaces autour du `=`
4. **Redémarrez le serveur** après avoir modifié `.env`

### Erreur : "Invalid upload preset"

1. Vérifiez que le nom du preset est correct
2. Vérifiez que le preset est en mode **"Unsigned"**
3. Vérifiez que le preset existe dans votre dashboard Cloudinary

### L'upload reste bloqué

1. Vérifiez votre connexion internet
2. Vérifiez la console du navigateur pour les erreurs
3. Vérifiez que votre compte Cloudinary est actif
4. Vérifiez les limites de votre plan gratuit (25GB de stockage)

## Avantages de Cloudinary

✅ **Gratuit** jusqu'à 25GB de stockage et 25GB de bande passante/mois
✅ **Optimisation automatique** des images
✅ **CDN global** pour des images rapides partout
✅ **Transformations** d'images à la volée (redimensionnement, etc.)
✅ **Upload direct** depuis le navigateur (pas besoin de serveur)

## Limites du plan gratuit

- **Stockage** : 25GB
- **Bande passante** : 25GB/mois
- **Transformations** : Illimitées
- **Uploads** : Illimités

Pour un blog personnel, c'est largement suffisant !

## Sécurité

⚠️ **Important** : 
- Ne partagez **jamais** votre fichier `.env`
- Ne commitez **jamais** le fichier `.env` sur Git (il est déjà dans `.gitignore`)
- Utilisez un preset **"Unsigned"** uniquement pour l'upload depuis le navigateur
- Pour plus de sécurité, vous pouvez créer un preset signé et utiliser une API backend

## Support

Si vous avez des problèmes :
- Documentation Cloudinary : https://cloudinary.com/documentation
- Support Cloudinary : https://support.cloudinary.com/
