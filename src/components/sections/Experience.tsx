import { Briefcase, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    id: 1,
    company: "CompanyViene",
    position: "Développeur Full Stack",
    period: "2024 - Présent",
    website: "https://companyviene.com",
    description:
      "Développement d'applications web modernes et solutions digitales pour les clients.",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"],
    current: true,
  },
  {
    id: 2,
    company: "DevGroup Africa",
    position: "Développeur Web",
    period: "2023 - Présent",
    website: "https://devgroup.ga",
    description:
      "Participation au développement de projets web innovants et accompagnement technique.",
    technologies: ["JavaScript", "PHP", "MySQL", "TailwindCSS"],
    current: true,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Parcours
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Expérience{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Professionnelle
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel et les entreprises avec lesquelles je
            collabore
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="group border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in bg-card/50 backdrop-blur"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icône */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="text-primary" size={24} />
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 space-y-4">
                      {/* En-tête */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-lg text-muted-foreground mt-1">
                            {exp.position}
                          </p>
                        </div>

                        {/* Badge statut */}
                        {exp.current && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            En cours
                          </span>
                        )}
                      </div>

                      {/* Période */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span className="text-sm">{exp.period}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Lien site web */}
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        Visiter le site
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
