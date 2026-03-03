// Configuration EmailJS
// Pour utiliser ce service, vous devez :
// 1. Créer un compte sur https://www.emailjs.com/
// 2. Créer un service email (Gmail, Outlook, etc.)
// 3. Créer un template email avec les variables : {{from_name}}, {{from_email}}, {{message}}, {{to_email}}, {{reply_to}}
// 4. Créer un fichier .env à la racine avec vos clés API

import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Vérifier si les clés sont configurées
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS non configuré. Utilisation du fallback mailto.');
      throw new Error('EMAILJS_NOT_CONFIGURED');
    }

    // Initialiser EmailJS avec la clé publique
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Préparer les paramètres du template
    // Note: Le champ "To Email" doit être configuré dans les paramètres du template EmailJS
    const templateParams = {
      to_name: 'Euloge Tabala',
      to_email: 'contact@eulogetabala.cg', // Cette variable doit être utilisée dans le champ "To Email" du template
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      reply_to: data.email,
    };

    console.log('Envoi EmailJS avec:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      params: templateParams,
    });

    // Envoyer l'email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Réponse EmailJS:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      };
    } else {
      throw new Error(`Erreur ${response.status}: ${response.text}`);
    }
  } catch (error: any) {
    console.error('Erreur EmailJS complète:', error);
    console.error('Détails de l\'erreur:', {
      status: error.status,
      text: error.text,
      message: error.message,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
    });
    
    // Fallback : utiliser mailto si EmailJS n'est pas configuré
    if (error.message === 'EMAILJS_NOT_CONFIGURED' || !EMAILJS_PUBLIC_KEY) {
      const subject = encodeURIComponent(`Message de ${data.name}`);
      const body = encodeURIComponent(`Nom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:contact@eulogetabala.cg?subject=${subject}&body=${body}`;
      
      return {
        success: true,
        message: 'Ouverture de votre client email... (EmailJS non configuré)',
      };
    }

    // Afficher l'erreur détaillée pour le débogage
    let errorMessage = error.text || error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.';
    
    // Gestion spécifique des erreurs EmailJS
    if (error.status === 422) {
      errorMessage = 'Erreur 422 : Les paramètres ne correspondent pas au template. Vérifiez que le template EmailJS utilise bien les variables {{to_email}}, {{from_name}}, {{from_email}}, {{message}}, {{reply_to}} et que le champ "To Email" est configuré dans le template.';
    } else if (errorMessage.includes('getaddrinfo ENOTFOUND') || errorMessage.includes('ENOTFOUND')) {
      errorMessage = 'Erreur SMTP : Le serveur email n\'est pas trouvé. Vérifiez la configuration du service email dans EmailJS. Utilisez Gmail ou Outlook au lieu d\'un SMTP personnalisé.';
    } else if (errorMessage.includes('recipients address is empty') || errorMessage.includes('recipient')) {
      errorMessage = 'Le destinataire est vide. Dans le template EmailJS, configurez le champ "To Email" avec {{to_email}} ou contact@eulogetabala.cg';
    }
    
    return {
      success: false,
      message: `Erreur: ${errorMessage}. Vérifiez la console pour plus de détails.`,
    };
  }
};
