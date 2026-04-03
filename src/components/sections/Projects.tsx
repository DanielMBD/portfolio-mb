import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/usePortfolio";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement des projets...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des projets:", error);
  }

  const transformedProjects = projects.map((project) => ({
    id: project._id!,
    title: project.titre,
    description: project.description,
    longDescription: project.description, // Could be enhanced with a separate field
    image:
      project.image_url ||
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    technologies: project.technologies,
    githubUrl: project.github_url,
    liveUrl: project.demo_url,
    featured: true, // You could add a featured field to the backend
  }));

  const featuredProjects = transformedProjects.slice(0, 6); // Afficher 6 projets

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projets{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Récents
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une sélection de mes réalisations qui démontrent mes compétences
            techniques et ma créativité
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <Card
                    className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in bg-card/50 backdrop-blur h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image avec overlay */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

                      {/* Boutons d'action */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contenu */}
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bouton Voir tous les projets */}
        {transformedProjects.length > 6 && (
          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="group">
                Voir tous les projets
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </Link>
          </div>
        )}

        {transformedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun projet disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
