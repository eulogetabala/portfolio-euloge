# Configuration EmailJS

## Étapes pour configurer l'envoi d'emails

### 1. Créer un compte EmailJS
- Aller sur https://www.emailjs.com/
- Créer un compte gratuit (100 emails/mois gratuits)

### 2. Créer un service email
- Dans le dashboard EmailJS, aller dans "Email Services"
- Cliquer sur "Add New Service"
- **IMPORTANT** : Choisir un service standard (Gmail, Outlook, Yahoo, etc.) - **NE PAS utiliser "Custom SMTP"**
- Si vous utilisez Gmail :
  - Autoriser l'accès à votre compte Gmail
  - Utiliser le compte `contact@eulogetabala.cg` si c'est un Gmail, sinon utiliser un Gmail personnel et rediriger vers `contact@eulogetabala.cg`
- Suivre les instructions pour connecter votre compte email
- **Notez le Service ID** (ex: `service_xxxxx`)

**⚠️ Erreur "getaddrinfo ENOTFOUND mail.eulogetabala.cg" ?**
- Cela signifie que vous avez configuré un SMTP personnalisé qui n'existe pas
- **Solution** : Supprimez le service actuel et créez-en un nouveau avec Gmail ou Outlook
- Si vous avez vraiment un serveur SMTP, configurez-le correctement dans EmailJS avec les bons paramètres

### 3. Créer un template email
- Aller dans "Email Templates"
- Cliquer sur "Create New Template"
- **IMPORTANT - Configuration du destinataire :**
  - Dans le champ **"To Email"**, mettre : `{{to_email}}` ou directement `contact@eulogetabala.cg`
  - Dans le champ **"To Name"**, mettre : `{{to_name}}` ou `Euloge Tabala`
  - Dans le champ **"From Name"**, mettre : `{{from_name}}`
  - Dans le champ **"Reply To"**, mettre : `{{reply_to}}` ou `{{from_email}}`

- **Sujet :**
```
Nouveau message de contact - {{from_name}}
```

- **Corps du message :**
```
Bonjour {{to_name}},

Vous avez reçu un nouveau message depuis votre site web.

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Répondre à: {{reply_to}}
```

- **Notez le Template ID** (ex: `template_xxxxx`)

**⚠️ IMPORTANT :** Assurez-vous que le champ "To Email" dans les paramètres du template contient bien `{{to_email}}` ou `contact@eulogetabala.cg`, sinon vous aurez l'erreur "The recipients address is empty"

### 4. Récupérer votre clé publique
- Aller dans "Account" > "General"
- **Notez votre Public Key** (ex: `xxxxxxxxxxxxx`)

### 5. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du projet :

```env
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
```

**Important** : Remplacer `votre_service_id`, `votre_template_id`, et `votre_public_key` par les valeurs réelles notées précédemment.

### 6. Redémarrer le serveur de développement
```bash
npm run dev
```

### 7. Tester le formulaire
- Remplir le formulaire de contact
- Vérifier la console du navigateur pour les logs
- Vérifier votre boîte email `contact@eulogetabala.cg`

## Dépannage

### Le formulaire ne fonctionne pas
1. Vérifier que le fichier `.env` existe et contient les bonnes valeurs
2. Vérifier la console du navigateur pour les erreurs
3. Vérifier que les IDs sont corrects dans le dashboard EmailJS
4. Vérifier que le service email est bien connecté et actif

### Les emails n'arrivent pas
1. Vérifier le dossier spam/courrier indésirable
2. Vérifier que le service email est bien connecté dans EmailJS
3. Vérifier les logs dans le dashboard EmailJS
4. Tester avec un autre email de destination

### Erreur "getaddrinfo ENOTFOUND mail.eulogetabala.cg" (sur le site EmailJS)
**Cette erreur apparaît dans le dashboard EmailJS et signifie que le service email est configuré avec un SMTP personnalisé qui n'existe pas ou n'est pas accessible.**

**Solution immédiate :**

1. **Aller sur https://www.emailjs.com/ et vous connecter**

2. **Aller dans "Email Services"** (menu de gauche)

3. **Trouver le service qui utilise `mail.eulogetabala.cg`** et :
   - Soit le **supprimer** (bouton Delete)
   - Soit le **modifier** (bouton Edit)

4. **Créer un nouveau service email :**
   - Cliquer sur **"Add New Service"**
   - **Choisir "Gmail"** (ou "Outlook" si vous préférez)
   - **NE PAS choisir "Custom SMTP"** ou "Other"
   - Suivre les instructions pour connecter votre compte Gmail/Outlook
   - Si vous n'avez pas de Gmail, créez-en un gratuitement ou utilisez Outlook

5. **Noter le nouveau Service ID** (ex: `service_xxxxx`)

6. **Mettre à jour votre fichier `.env`** avec le nouveau Service ID :
   ```env
   VITE_EMAILJS_SERVICE_ID=le_nouveau_service_id
   VITE_EMAILJS_TEMPLATE_ID=votre_template_id
   VITE_EMAILJS_PUBLIC_KEY=votre_public_key
   ```

7. **Redémarrer votre serveur de développement**

**Note importante :** 
- Si vous utilisez Gmail, les emails seront envoyés depuis votre compte Gmail
- Dans le template email, vous pouvez définir `to_email: contact@eulogetabala.cg` pour que les emails arrivent bien à cette adresse
- Les emails arriveront dans la boîte `contact@eulogetabala.cg` même s'ils sont envoyés depuis un Gmail

### Erreur "EmailJS non configuré"
- Vérifier que le fichier `.env` existe
- Vérifier que les variables commencent par `VITE_`
- Redémarrer le serveur après modification du `.env`
