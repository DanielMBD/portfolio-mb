
import emailjs from '@emailjs/browser';

// Configuration EmailJS - à remplacer par vos vraies clés
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export interface ContactFormData {
  nom: string;
  email: string;
  message: string;
}

export class EmailService {
  static async initialize() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  static async sendContactEmail(formData: ContactFormData): Promise<void> {
    try {
      // Initialiser EmailJS si ce n'est pas déjà fait
      if (!emailjs) {
        throw new Error('EmailJS non initialisé');
      }

      const templateParams = {
        from_name: formData.nom,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Mr MAKOSSO',
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status !== 200) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      console.log('Email envoyé avec succès:', response);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      throw new Error('Impossible d\'envoyer le message. Veuillez réessayer plus tard.');
    }
  }

  // Méthode de fallback qui simule l'envoi
  static async sendContactEmailFallback(formData: ContactFormData): Promise<void> {
    console.log('=== SIMULATION D\'ENVOI EMAIL ===');
    console.log('De:', formData.nom, '(' + formData.email + ')');
    console.log('Message:', formData.message);
    console.log('=== FIN SIMULATION ===');
    
    // Simule un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simule parfois une erreur pour tester la gestion d'erreur
    if (Math.random() > 0.9) {
      throw new Error('Erreur simulée de l\'envoi email');
    }
  }
}
