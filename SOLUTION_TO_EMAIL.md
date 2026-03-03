# Solution : Configurer le champ "To Email" dans EmailJS

## Problème actuel

Vous avez configuré le **contenu** du template, mais le champ **"To Email"** (destinataire) n'est pas configuré. C'est pour cela que vous avez l'erreur "The recipients address is empty".

## Solution : Trouver et configurer le champ "To Email"

### Dans l'éditeur de template EmailJS :

1. **Remontez en haut de la page** d'édition du template
2. **Cherchez une section avec des champs comme :**
   - "To Email" ou "Recipient Email" ou "Email To"
   - "To Name" ou "Recipient Name"
   - "From Name"
   - "Reply To"
   - "Subject"

3. **Ces champs sont généralement :**
   - En haut de la page, avant le contenu
   - Dans un onglet "Settings" ou "Email Settings"
   - Parfois dans une section "Template Settings"

### Configuration requise :

**Champ "To Email" :**
```
{{to_email}}
```
OU directement :
```
contact@eulogetabala.cg
```

**Champ "Subject" (si vous pouvez le modifier) :**
```
Nouveau message de contact - {{from_name}}
```
(Actuellement vous avez "Message du portfolio" - vous pouvez le changer)

**Champ "To Name" (optionnel) :**
```
{{to_name}}
```

## Si vous ne trouvez PAS ces champs :

### Option 1 : Créer un nouveau template
1. Créez un nouveau template dans EmailJS
2. Vous verrez où sont les champs "To Email", "Subject", etc.
3. Configurez-le avec les mêmes variables
4. Notez le nouveau Template ID
5. Mettez à jour votre fichier `.env`

### Option 2 : Vérifier la documentation EmailJS
- Allez sur https://www.emailjs.com/docs/
- Cherchez "template configuration" ou "to email field"

### Option 3 : Contacter le support EmailJS
- Si les champs ne sont pas visibles, contactez le support EmailJS

## Vérification

Une fois le champ "To Email" configuré :
1. Sauvegardez le template
2. Testez le formulaire sur votre site
3. L'erreur "recipients address is empty" devrait disparaître

## Template actuel (contenu) ✅

Votre contenu est correct :
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

Il manque juste la configuration du champ "To Email" dans les paramètres du template.
