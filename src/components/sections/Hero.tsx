import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  Code2,
} from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";
import { usePersonalInfo } from "@/hooks/usePortfolio";

const Hero = () => {
  const { data: personalInfo } = usePersonalInfo();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background moderne minimaliste */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Grille subtile en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Accent géométrique */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Contenu principal - 7 colonnes */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in">
              {/* Badge de statut */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Disponible pour des projets
              </div>

              {/* Titre principal */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-foreground">
                    {personalInfo?.nom_complet || "MAKOSSO Daniel"}
                  </span>
                  <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    {personalInfo?.profession || "Développeur Full Stack"}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  {personalInfo?.description_courte ||
                    "Passionné par le développement web et la création de solutions numériques innovantes."}
                </p>

                {/* Localisation */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>
                    {personalInfo?.localisation || "Libreville, Gabon"}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={20} />
                    Me contacter
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <a
                  href="/CvDanielMakosso.pdf"
                  download
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border rounded-lg font-medium hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  <Download size={20} />
                  Télécharger CV
                </a>
              </div>

              {/* Liens sociaux */}
              <div className="flex items-center gap-4 pt-4">
                {personalInfo?.github_url && (
                  <a
                    href={personalInfo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
                {personalInfo?.linkedin_url && (
                  <a
                    href={personalInfo.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Photo de profil - 5 colonnes */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Cadre principal */}
                <div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]">
                  {/* Bordure animée */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:p-[3px] transition-all">
                    <div className="w-full h-full rounded-2xl bg-background" />
                  </div>

                  {/* Image */}
                  <div className="absolute inset-2 rounded-2xl overflow-hidden">
                    <img
                      src={personalInfo?.photo_profil || "/5.jpg"}
                      alt={`${personalInfo?.nom_complet || "MAKOSSO Daniel"} - Photo de profil`}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Badge flottant */}
                  <div className="absolute -bottom-4 -right-4 bg-card border-2 border-primary rounded-2xl p-4 shadow-xl">
                    <Code2 className="text-primary" size={32} />
                  </div>
                </div>

                {/* Élément décoratif */}
                <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-primary/10 rounded-2xl blur-2xl" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <ArrowDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
