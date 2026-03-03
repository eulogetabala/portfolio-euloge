# Installation de Firebase

## Installation manuelle

Si l'installation automatique a échoué, installez Firebase manuellement :

```bash
npm install firebase
```

## Vérification

Après l'installation, vérifiez que Firebase est bien installé :

```bash
npm list firebase
```

Vous devriez voir quelque chose comme : `firebase@10.x.x`

## Configuration

Une fois Firebase installé :

1. Suivez les instructions dans `FIREBASE_SETUP.md`
2. Configurez vos clés Firebase dans le fichier `.env`
3. Redémarrez le serveur : `npm run dev`

## Test

Pour tester que tout fonctionne :

1. Allez sur `/blog-dashboard`
2. Créez un article de test
3. Vérifiez qu'il apparaît sur `/blog`
