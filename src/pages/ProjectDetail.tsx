import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import { useProject } from "@/hooks/usePortfolio";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du projet...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            Le projet que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="mr-2" size={18} />
            Retour aux projets
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-20">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Retour aux projets
          </Link>
        </div>

        {/* Contenu principal */}
        <div className="max-w-5xl mx-auto">
          {/* Image principale */}
          <div className="relative overflow-hidden rounded-2xl aspect-video mb-8 border border-border/50">
            <img
              src={
                project.image_url ||
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop"
              }
              alt={project.titre}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Titre et actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.titre}
              </h1>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <Github className="mr-2" size={20} />
                    Code source
                  </Button>
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <ExternalLink className="mr-2" size={20} />
                    Voir le projet
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">
                À propos du projet
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Technologies utilisées
              </h3>
              <ul className="space-y-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Statut</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {project.statut === "actif"
                      ? "Projet actif"
                      : "Projet archivé"}
                  </span>
                </div>
                {project.demo_url && (
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      En ligne
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
