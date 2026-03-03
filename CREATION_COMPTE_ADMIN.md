# Création du compte administrateur Firebase

Pour que l'authentification fonctionne, vous devez créer un utilisateur administrateur dans Firebase Authentication.

## Étapes pour créer le compte admin

### 1. Accéder à Firebase Console
1. Allez sur [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Sélectionnez votre projet `euloge-portfolio`

### 2. Activer Firebase Authentication
1. Dans le menu de gauche, cliquez sur **Authentication**
2. Si ce n'est pas déjà fait, cliquez sur **Commencer** pour activer Authentication
3. Cliquez sur l'onglet **Sign-in method**

### 3. Activer Email/Password
1. Dans la liste des fournisseurs, trouvez **Email/Password**
2. Cliquez dessus
3. Activez **Email/Password** (première option)
4. Cliquez sur **Enregistrer**

### 4. Créer l'utilisateur admin
1. Allez dans l'onglet **Users**
2. Cliquez sur **Add user** (ou **Ajouter un utilisateur**)
3. Entrez les informations suivantes :
   - **Email** : `admin@eulogetabala.cg`
   - **Password** : `Helloime22@`
4. Cliquez sur **Add user** (ou **Ajouter un utilisateur**)

### 5. Vérifier la création
Vous devriez voir l'utilisateur `admin@eulogetabala.cg` dans la liste des utilisateurs.

## Utilisation

Maintenant, vous pouvez vous connecter au dashboard avec :
- **Nom d'utilisateur** : `admin` (ou `admin@eulogetabala.cg`)
- **Mot de passe** : `Helloime22@`

L'application convertira automatiquement "admin" en "admin@eulogetabala.cg" pour Firebase Auth.

## Sécurité

⚠️ **Important** : 
- Ne partagez jamais ces identifiants
- Changez le mot de passe régulièrement
- Utilisez un mot de passe fort et unique
- Activez l'authentification à deux facteurs si possible dans Firebase

## Dépannage

Si vous avez des problèmes de connexion :
1. Vérifiez que Firebase Authentication est bien activé
2. Vérifiez que Email/Password est activé comme méthode de connexion
3. Vérifiez que l'utilisateur existe dans la liste des utilisateurs
4. Vérifiez que le mot de passe est correct
5. Consultez la console du navigateur pour les erreurs
