
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailService, ContactFormData } from '@/services/emailService';
import { staticPersonalInfo } from '@/services/staticData';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.message) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Utilise la méthode de fallback pour le moment
      // Remplacez par EmailService.sendContactEmail(formData) quand EmailJS sera configuré
      await EmailService.sendContactEmailFallback(formData);
      
      toast({
        title: 'Message envoyé !',
        description: 'Votre message a été envoyé avec succès. Je vous répondrai bientôt.',
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors de l\'envoi du message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Contactez-moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une idée de projet ? Une question ? N'hésitez pas à me contacter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">{staticPersonalInfo.email_contact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-success/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Téléphone</h3>
                    <p className="text-muted-foreground">+241 74604327</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Localisation</h3>
                    <p className="text-muted-foreground">{staticPersonalInfo.localisation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              {staticPersonalInfo.github_url && (
                <a 
                  href={staticPersonalInfo.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-card border border-border/50 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Github className="w-6 h-6 text-foreground" />
                </a>
              )}
              {staticPersonalInfo.linkedin_url && (
                <a 
                  href={staticPersonalInfo.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-card border border-border/50 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-foreground" />
                </a>
              )}
              {staticPersonalInfo.facebook_url && (
                <a 
                  href={staticPersonalInfo.facebook_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-card border border-border/50 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-foreground" />
                </a>
              )}
            </div>
          </div>

          {/* Formulaire de contact */}
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Votre message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="border-border/50 focus:border-primary resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
