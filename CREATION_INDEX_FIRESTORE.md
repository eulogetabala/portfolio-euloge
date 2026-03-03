# Création des index Firestore pour le blog

Firestore nécessite des index pour certaines requêtes. Si vous voyez des erreurs concernant des index manquants, suivez ces étapes.

## Erreur courante

Si vous voyez une erreur comme :
```
The query requires an index. You can create it here: [lien]
```

Ou :
```
failed-precondition: The query requires an index
```

## Solution automatique (recommandée)

1. **Copiez le lien** fourni dans l'erreur de la console
2. **Ouvrez le lien** dans votre navigateur
3. **Cliquez sur "Créer l'index"** dans la console Firebase
4. **Attendez** que l'index soit créé (quelques minutes)

## Solution manuelle

### Index 1 : Articles publiés triés par date

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `euloge-portfolio`
3. Allez dans **Firestore Database** → **Indexes**
4. Cliquez sur **Créer un index**
5. Configurez l'index :
   - **Collection ID** : `blogPosts`
   - **Champs à indexer** :
     - `published` : Ascendant
     - `publishedAt` : Descendant
   - **Mode de requête** : Collection
6. Cliquez sur **Créer**

### Index 2 : Tous les articles triés par date

1. Dans **Indexes**, cliquez sur **Créer un index**
2. Configurez l'index :
   - **Collection ID** : `blogPosts`
   - **Champs à indexer** :
     - `publishedAt` : Descendant
   - **Mode de requête** : Collection
3. Cliquez sur **Créer**

### Index 3 : Recherche par slug (optionnel mais recommandé)

1. Dans **Indexes**, cliquez sur **Créer un index**
2. Configurez l'index :
   - **Collection ID** : `blogPosts`
   - **Champs à indexer** :
     - `slug` : Ascendant
   - **Mode de requête** : Collection
3. Cliquez sur **Créer**

## Vérification

Une fois les index créés :
1. Attendez quelques minutes que l'index soit prêt (statut "En construction" → "Activé")
2. Rechargez votre application
3. Les erreurs devraient disparaître

## Fallback automatique

Le code inclut un système de fallback qui fonctionne même sans index :
- Les articles sont récupérés sans tri
- Le tri est effectué côté client (JavaScript)
- Cela fonctionne mais peut être plus lent avec beaucoup d'articles

Pour de meilleures performances, créez les index recommandés ci-dessus.
