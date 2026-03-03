# Débogage de l'upload d'images

## Problème : "Upload en cours" bloqué

Si l'upload reste bloqué sur "Upload en cours", suivez ces étapes de diagnostic :

## 1. Vérifier la console du navigateur

Ouvrez la console (F12) et regardez les messages d'erreur. Vous devriez voir :
- `Début de l'upload de l'image: [nom] [taille]`
- `Utilisateur authentifié: [email]`
- `Chemin de stockage: blog-images/...`
- `Upload en cours...`

Si vous voyez une erreur, notez le code d'erreur et le message.

## 2. Vérifier Firebase Storage

### Storage est-il activé ?

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `euloge-portfolio`
3. Dans le menu de gauche, vérifiez si **Storage** apparaît
4. Si ce n'est pas le cas, cliquez sur **Storage** → **Commencer**

### Les règles Storage sont-elles configurées ?

1. Dans **Storage**, allez dans l'onglet **Règles**
2. Vérifiez que les règles sont :
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. Si les règles sont différentes, copiez-collez celles-ci et cliquez sur **Publier**

## 3. Vérifier l'authentification

### Êtes-vous connecté ?

1. Dans le dashboard, vérifiez que vous êtes bien connecté
2. Le bouton "Déconnexion" doit être visible
3. Si vous n'êtes pas connecté, connectez-vous avec :
   - Nom d'utilisateur : `admin`
   - Mot de passe : `Helloime22@`

### Le compte admin existe-t-il ?

1. Allez dans **Authentication** → **Users**
2. Vérifiez que `admin@eulogetabala.cg` existe
3. Si ce n'est pas le cas, créez-le (voir `CREATION_COMPTE_ADMIN.md`)

## 4. Erreurs courantes et solutions

### Erreur : "storage/unauthorized"

**Cause** : Vous n'êtes pas autorisé à uploader.

**Solution** :
1. Vérifiez que vous êtes connecté
2. Vérifiez les règles Storage (voir étape 2)
3. Vérifiez que le compte admin existe

### Erreur : "storage/unknown" ou "Firebase Storage n'est pas initialisé"

**Cause** : Firebase Storage n'est pas activé ou mal configuré.

**Solution** :
1. Activez Firebase Storage (voir étape 2)
2. Vérifiez que `storageBucket` est correct dans votre `.env` :
   ```
   VITE_FIREBASE_STORAGE_BUCKET=euloge-portfolio.firebasestorage.app
   ```
3. Redémarrez le serveur de développement

### Erreur : "Vous devez être connecté pour uploader des images"

**Cause** : Vous n'êtes pas authentifié.

**Solution** :
1. Connectez-vous au dashboard
2. Vérifiez que le bouton "Déconnexion" est visible
3. Si vous êtes redirigé vers `/login`, connectez-vous

### L'upload reste bloqué sans erreur

**Causes possibles** :
1. Firebase Storage n'est pas activé
2. Problème de réseau
3. Les règles Storage bloquent l'upload

**Solution** :
1. Vérifiez la console pour les erreurs
2. Vérifiez que Storage est activé
3. Vérifiez les règles Storage
4. Essayez avec une image plus petite (< 1MB)
5. Vérifiez votre connexion internet

## 5. Test rapide

Pour tester rapidement :

1. **Ouvrez la console** (F12)
2. **Sélectionnez une image** dans le dashboard
3. **Regardez les messages** dans la console
4. **Notez l'erreur** si elle apparaît
5. **Consultez cette liste** pour trouver la solution

## 6. Solution de contournement temporaire

Si l'upload ne fonctionne toujours pas, vous pouvez utiliser une URL d'image :

1. Uploadez votre image sur un service externe (Imgur, Cloudinary, etc.)
2. Copiez l'URL de l'image
3. Collez l'URL dans le champ "URL alternative" du formulaire
4. L'image sera utilisée directement depuis cette URL

## 7. Vérification finale

Une fois que tout est configuré :

1. ✅ Firebase Storage est activé
2. ✅ Les règles Storage sont configurées et publiées
3. ✅ Vous êtes connecté au dashboard
4. ✅ Le compte admin existe dans Firebase Authentication
5. ✅ La console ne montre pas d'erreurs

L'upload devrait maintenant fonctionner !
