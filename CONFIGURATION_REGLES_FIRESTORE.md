# Configuration des règles Firestore - URGENT ⚠️

## Problème actuel

Vous voyez l'erreur : `Missing or insufficient permissions` car les règles Firestore ne sont pas correctement configurées.

## Solution rapide

### Étape 1 : Accéder aux règles Firestore

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet **euloge-portfolio**
3. Dans le menu de gauche, cliquez sur **Firestore Database**
4. Cliquez sur l'onglet **Règles**

### Étape 2 : Copier les règles

Copiez-collez **exactement** ce code dans l'éditeur de règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{postId} {
      // Lecture publique uniquement pour les articles publiés
      allow read: if resource.data.published == true;
      
      // Lecture complète pour les utilisateurs authentifiés (dashboard)
      allow read: if request.auth != null;
      
      // Écriture uniquement pour les utilisateurs authentifiés
      allow write: if request.auth != null;
    }
  }
}
```

### Étape 3 : Publier les règles

1. Cliquez sur le bouton **Publier** en haut à droite
2. Attendez la confirmation "Règles publiées avec succès"
3. Rechargez votre application

## Vérification

Après avoir publié les règles :

1. **Page blog publique** (`/blog`) : Devrait afficher les articles publiés
2. **Dashboard** (`/blog-dashboard`) : Devrait afficher tous les articles (après connexion)

## Explication des règles

### `allow read: if resource.data.published == true`
- Permet aux **visiteurs non authentifiés** de lire uniquement les articles publiés
- Utilisé pour la page blog publique

### `allow read: if request.auth != null`
- Permet aux **utilisateurs authentifiés** (admin) de lire **tous** les articles
- Utilisé pour le dashboard admin
- Nécessite d'être connecté avec Firebase Auth

### `allow write: if request.auth != null`
- Permet aux **utilisateurs authentifiés** de créer, modifier et supprimer des articles
- Utilisé pour le dashboard admin

## Ordre des règles

⚠️ **Important** : L'ordre des règles est important. Firestore évalue les règles dans l'ordre et s'arrête à la première correspondance.

Dans notre cas :
1. D'abord, on vérifie si l'article est publié (pour les visiteurs)
2. Ensuite, on vérifie si l'utilisateur est authentifié (pour le dashboard)
3. Enfin, on vérifie l'authentification pour l'écriture

## Dépannage

### Si vous voyez toujours "Missing or insufficient permissions"

1. **Vérifiez que vous êtes connecté** dans le dashboard
2. **Vérifiez que les règles sont bien publiées** (statut "Publié" dans Firebase Console)
3. **Attendez quelques secondes** après la publication (les règles peuvent prendre quelques instants à se propager)
4. **Vérifiez la syntaxe** des règles (pas d'erreurs de syntaxe dans l'éditeur)
5. **Vérifiez que Firebase Authentication est activé** et que vous avez créé le compte admin

### Si les articles ne s'affichent pas dans le dashboard

1. Assurez-vous d'être connecté avec le compte admin
2. Vérifiez que le compte admin existe dans Firebase Authentication
3. Vérifiez les logs de la console pour d'autres erreurs

## Mode test (temporaire - NON RECOMMANDÉ)

Si vous voulez tester rapidement sans authentification (⚠️ **DANGEREUX en production**), vous pouvez utiliser :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{postId} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **ATTENTION** : Ces règles permettent à **n'importe qui** de lire et modifier vos articles. Utilisez uniquement pour tester, puis remplacez par les règles sécurisées ci-dessus.
