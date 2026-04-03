import {
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSkills } from "@/hooks/usePortfolio";

const iconMap: Record<string, any> = {
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Settings,
};

const Skills = () => {
  const { data: skillsData = {}, isLoading, error } = useSkills();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement des compétences...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des compétences:", error);
  }

  // Transform data for display
  const skillCategories = Object.entries(skillsData).map(
    ([categoryName, skills]) => {
      // Try to get appropriate icon based on category name
      let IconComponent = Code; // default
      if (categoryName.toLowerCase().includes("frontend")) IconComponent = Code;
      else if (categoryName.toLowerCase().includes("backend"))
        IconComponent = Database;
      else if (categoryName.toLowerCase().includes("design"))
        IconComponent = Palette;
      else if (categoryName.toLowerCase().includes("mobile"))
        IconComponent = Smartphone;
      else if (
        categoryName.toLowerCase().includes("cloud") ||
        categoryName.toLowerCase().includes("devops")
      )
        IconComponent = Globe;
      else if (
        categoryName.toLowerCase().includes("outils") ||
        categoryName.toLowerCase().includes("tools")
      )
        IconComponent = Settings;

      return {
        name: categoryName,
        icon: IconComponent,
        color: "text-primary", // Use theme color
        skills: skills.map((skill) => ({
          name: skill.nom,
          level: skill.niveau,
        })),
      };
    },
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Compétences{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Techniques
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions
            performantes
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.name}
              className="group border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in bg-card/50 backdrop-blur"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-6">
                {/* En-tête de catégorie */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>

                {/* Liste des compétences */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 md:p-12">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                En constante évolution
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Apprentissage{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Continu
                </span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Passionné par l'innovation technologique, je reste à l'affût des
                dernières tendances et meilleures pratiques pour offrir des
                solutions modernes et performantes.
              </p>
            </div>

            {/* Élément décoratif */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
