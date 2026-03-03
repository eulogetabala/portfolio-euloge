# Guide de Configuration du Template EmailJS

## Où configurer le destinataire (To Email)

Dans EmailJS, il y a **deux sections principales** pour configurer un template :

### 1. Section "Content" (Contenu) - C'est là que vous avez mis votre message ✅

Cette section contient :
- **Subject** (Sujet) : `Nouveau message de contact - {{from_name}}`
- **Content** (Corps) : Votre message avec les variables

### 2. Section "Settings" ou "Email Settings" - C'est là qu'il faut configurer le destinataire ⚠️

Cette section contient les champs essentiels :
- **To Email** (Destinataire) : `{{to_email}}` ou `contact@eulogetabala.cg`
- **To Name** (Nom du destinataire) : `{{to_name}}` ou `Euloge Tabala`
- **From Name** (Nom de l'expéditeur) : `{{from_name}}`
- **Reply To** (Répondre à) : `{{reply_to}}` ou `{{from_email}}`

## Comment trouver ces champs

1. **Dans l'éditeur de template EmailJS**, cherchez :
   - Un onglet "Content" (où vous avez mis votre message)
   - Un onglet "Settings" ou "Email Settings" (c'est là qu'il faut aller)
   - Ou des champs en haut de la page avant le contenu

2. **Les champs peuvent être :**
   - En haut de la page d'édition du template
   - Dans un onglet séparé "Settings"
   - Dans une section "Email Settings"
   - Parfois dans "Advanced Settings" mais généralement pas

3. **Ce que vous voyez actuellement** (Auto-Reply, reCAPTCHA, Analytics) :
   - Ce sont des **options avancées**
   - Ce n'est **PAS** là qu'on configure le destinataire
   - Il faut remonter ou chercher les champs de base

## Configuration requise

### Dans la section "Content" (déjà fait ✅) :
- Subject : `Nouveau message de contact - {{from_name}}`
- Content : Votre message avec les variables

### Dans la section "Settings" ou "Email Settings" (à configurer ⚠️) :

**Champ "To Email" :**
```
{{to_email}}
```
OU directement :
```
contact@eulogetabala.cg
```

**Champ "To Name" (optionnel) :**
```
{{to_name}}
```

**Champ "From Name" (optionnel) :**
```
{{from_name}}
```

**Champ "Reply To" (optionnel) :**
```
{{reply_to}}
```

## Si vous ne trouvez pas ces champs

1. **Essayez de créer un nouveau template** pour voir où sont les champs
2. **Cherchez dans la documentation EmailJS** : https://www.emailjs.com/docs/
3. **Contactez le support EmailJS** si les champs ne sont pas visibles

## Alternative : Utiliser le format dans le contenu

Si vous ne trouvez pas les champs "To Email" dans les paramètres, certains templates EmailJS permettent de mettre le destinataire directement dans le contenu. Essayez d'ajouter en haut du contenu :

```
To: {{to_email}}
Subject: Nouveau message de contact - {{from_name}}

Bonjour {{to_name}},

Vous avez reçu un nouveau message depuis votre site web.

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Répondre à: {{reply_to}}
```

Mais la meilleure solution reste de trouver et configurer le champ "To Email" dans les paramètres du template.
