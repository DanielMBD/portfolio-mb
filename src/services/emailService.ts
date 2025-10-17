import emailjs from '@emailjs/browser';

export interface ContactFormData {
  nom: string;
  email: string;
  message: string;
}

export class EmailService {
  // 🔧 Identifiants EmailJS
  private static SERVICE_ID = "service_mfgput1";
  private static TEMPLATE_ID = "template_fac7o9q";
  private static PUBLIC_KEY = "MxAIYqcp2mly3QCpx";

  static async sendContactEmail(data: ContactFormData) {
    const params = {
      nom: data.nom,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await emailjs.send(
          this.SERVICE_ID,
          this.TEMPLATE_ID,
          params,
          this.PUBLIC_KEY
      );
      console.log("✅ Email envoyé :", response);
      return response;
    } catch (error: any) {
      console.error("❌ Erreur EmailJS :", error);
      throw new Error("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
    }
  }

  // Optionnel : fallback local (debug)
  static async sendContactEmailFallback(data: ContactFormData) {
    console.log("🧩 Simulation d'envoi :", data);
    return Promise.resolve();
  }
}
