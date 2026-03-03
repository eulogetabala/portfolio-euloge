# Configuration Firebase Storage pour les images

## Activation de Firebase Storage

### Étape 1 : Activer Storage dans Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet **euloge-portfolio**
3. Dans le menu de gauche, cliquez sur **Storage**
4. Cliquez sur **Commencer** (ou **Get started**)

### Étape 2 : Configurer Storage

1. Choisissez le mode de sécurité :
   - **Mode test** : Pour commencer rapidement (moins sécurisé)
   - **Mode production** : Recommandé (plus sécurisé)

2. Choisissez une région (ex: `europe-west`)

3. Cliquez sur **Terminé**

## Configuration des règles de sécurité Storage

### Étape 1 : Accéder aux règles Storage

1. Dans **Storage**, cliquez sur l'onglet **Règles**

### Étape 2 : Copier les règles

Copiez-collez **exactement** ce code dans l'éditeur de règles :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Dossier pour les images du blog
    match /blog-images/{allPaths=**} {
      // Lecture publique pour toutes les images du blog
      allow read: if true;
      
      // Écriture uniquement pour les utilisateurs authentifiés
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Étape 3 : Publier les règles

1. Cliquez sur **Publier**
2. Attendez la confirmation

## Explication des règles

### `allow read: if true`
- Permet à **tout le monde** de lire les images
- Nécessaire pour afficher les images sur le site public

### `allow write: if request.auth != null`
- Permet uniquement aux **utilisateurs authentifiés** d'uploader des images
- Seuls les admins connectés peuvent uploader

### `request.resource.size < 5 * 1024 * 1024`
- Limite la taille des fichiers à **5MB maximum**
- Empêche l'upload de fichiers trop volumineux

### `request.resource.contentType.matches('image/.*')`
- Autorise uniquement les fichiers de type **image**
- Empêche l'upload de fichiers non-images

## Utilisation dans le dashboard

### Upload d'image locale

1. Dans le dashboard, créez ou modifiez un article
2. Dans le champ **Image à la une**, vous avez deux options :
   - **Upload local** : Cliquez sur la zone de drop ou sélectionnez un fichier
   - **URL** : Entrez directement une URL d'image

3. Si vous uploadez une image locale :
   - L'image sera uploadée sur Firebase Storage
   - L'URL sera automatiquement générée
   - L'image sera visible dans l'aperçu

### Formats supportés

- **JPG/JPEG**
- **PNG**
- **GIF**
- **WEBP**

### Taille maximale

- **5MB** par image

## Structure de stockage

Les images sont stockées dans Firebase Storage avec cette structure :

```
blog-images/
  ├── [timestamp]-[random].jpg  (images sans article)
  └── [postId]/
      └── [timestamp]-[random].jpg  (images associées à un article)
```

## Dépannage

### Erreur "Missing or insufficient permissions"

1. Vérifiez que vous êtes **connecté** dans le dashboard
2. Vérifiez que les règles Storage sont bien **publiées**
3. Vérifiez que Firebase Storage est **activé**

### Erreur "File too large"

- Réduisez la taille de l'image (max 5MB)
- Utilisez un outil de compression d'image

### Erreur "Invalid file type"

- Assurez-vous que le fichier est bien une image
- Utilisez les formats supportés (JPG, PNG, GIF, WEBP)

### L'image ne s'affiche pas

1. Vérifiez que l'URL est correcte
2. Vérifiez les règles de lecture Storage
3. Vérifiez la console du navigateur pour les erreurs

## Sécurité

⚠️ **Important** : 
- Les règles Storage permettent la lecture publique des images
- C'est normal car les images doivent être accessibles sur le site public
- Seuls les utilisateurs authentifiés peuvent uploader des images
- La taille et le type de fichier sont limités par les règles

## Optimisation

Pour de meilleures performances :
- Compressez vos images avant l'upload
- Utilisez le format WEBP pour de meilleures performances
- Utilisez des images de taille raisonnable (max 2MB recommandé)
