# Configuration du Template EmailJS - Résolution erreur 422

## Problème : Erreur 422 "The recipients address is empty"

Cette erreur signifie que le template EmailJS n'a pas le destinataire correctement configuré.

## Solution : Configurer le template dans EmailJS

### Étapes détaillées :

1. **Aller sur https://www.emailjs.com/**
2. **Se connecter à votre compte**
3. **Aller dans "Email Templates"**
4. **Ouvrir ou créer le template `template_5ximqlw`**

### Configuration du template :

#### Dans la section "Content" :

**Sujet (Subject) :**
```
Nouveau message de contact - {{from_name}}
```

**Corps du message (Content) :**
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

#### ⚠️ IMPORTANT - Section "Settings" ou "Settings" :

**Champ "To Email" (Destinataire) :**
- Mettez : `{{to_email}}` 
- OU directement : `contact@eulogetabala.cg`
- **Ce champ NE DOIT PAS être vide !**

**Champ "To Name" (Nom du destinataire) :**
- Mettez : `{{to_name}}` 
- OU : `Euloge Tabala`

**Champ "From Name" (Nom de l'expéditeur) :**
- Mettez : `{{from_name}}`

**Champ "Reply To" (Répondre à) :**
- Mettez : `{{reply_to}}` 
- OU : `{{from_email}}`

### Variables utilisées dans le code :

Le code envoie ces paramètres :
- `to_name`: "Euloge Tabala"
- `to_email`: "contact@eulogetabala.cg"
- `from_name`: Nom de la personne qui remplit le formulaire
- `from_email`: Email de la personne qui remplit le formulaire
- `message`: Message du formulaire
- `reply_to`: Email de la personne (pour répondre)

### Vérification :

1. Sauvegardez le template
2. Vérifiez que le champ "To Email" n'est pas vide
3. Testez à nouveau le formulaire sur votre site

### Si l'erreur persiste :

1. Vérifiez dans la console du navigateur les logs :
   - `Envoi EmailJS avec:` - montre les paramètres envoyés
   - `Erreur EmailJS complète:` - montre l'erreur détaillée

2. Vérifiez dans le dashboard EmailJS :
   - Que le service `service_ay3qjul` est bien actif
   - Que le template `template_5ximqlw` est bien sauvegardé
   - Que toutes les variables sont bien définies

3. Testez avec un template simple :
   - Créez un nouveau template de test
   - Mettez juste `contact@eulogetabala.cg` dans "To Email"
   - Testez avec ce nouveau template
