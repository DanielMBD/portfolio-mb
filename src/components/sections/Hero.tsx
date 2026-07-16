import { useState, useEffect } from "react";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { usePersonalInfo } from "@/hooks/usePortfolio";
import { resolveMediaUrl } from "@/services/api";
import { useTheme } from "@/components/ThemeProvider";

const Hero = () => {
  const { data: personalInfo } = usePersonalInfo();
  const { theme } = useTheme();
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Effet pour déterminer le thème réel et réagir aux changements
  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setActualTheme(systemTheme);
      } else {
        setActualTheme(theme);
      }
    };

    updateTheme();

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Choisir l'image selon le thème
  const getProfileImage = () => {
    const isDarkMode = actualTheme === 'dark';
    
    if (personalInfo?.photo_profil) {
      return resolveMediaUrl(personalInfo.photo_profil, isDarkMode ? "/10.jpg" : "/5.jpg");
    }
    
    // Images par défaut selon le thème
    return isDarkMode ? "/10.jpg" : "/5.jpg";
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient pt-24"
    >
      <div className="absolute inset-x-0 top-0 h-24 border-b border-white/50 bg-background/25 backdrop-blur-3xl dark:border-white/5" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-6">
                <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-normal md:text-6xl lg:text-7xl">
                  {personalInfo?.nom_complet || "MAKOSSO Daniel"}
                </h1>

                <h2 className="max-w-3xl border-l-4 border-secondary pl-5 text-lg font-bold leading-8 text-foreground md:text-2xl">
                  {personalInfo?.profession || "Étudiant en Génie Logiciel"}
                </h2>

                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  {personalInfo?.description_courte ||
                    "Passionné par le développement web et la création de solutions numériques innovantes"}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 backdrop-blur">
                    <MapPin className="h-4 w-4 text-secondary" />
                    {personalInfo?.localisation || "Libreville, Gabon"}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-2 font-semibold text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Disponible pour missions web
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="btn-gradient inline-flex items-center gap-2"
                >
                  <Mail size={20} />
                  Me contacter
                  <ArrowUpRight size={18} />
                </button>

                <a
                  href="/CvDanielMakosso.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/85 px-6 py-3 font-semibold shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-card"
                >
                  <Download size={20} />
                  Télécharger CV
                </a>
              </div>

              <div className="grid max-w-2xl grid-cols-3 gap-3 pt-4">
                {[
                  ["2", "stages"],
                  ["3", "projets"],
                  ["10+", "outils"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/70 bg-card/60 p-4 shadow-card backdrop-blur dark:border-white/10"
                  >
                    <p className="text-2xl font-black text-foreground">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {personalInfo?.github_url && (
                  <a
                    href={personalInfo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-border bg-card/85 p-3 shadow-card transition-all hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-card"
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
                    className="rounded-2xl border border-border bg-card/85 p-3 shadow-card transition-all hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-card"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                <span className="pro-pill">React</span>
                <span className="pro-pill">Node.js</span>
                <span className="pro-pill">TailwindCSS</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[410px]">
                <div className="relative">
                  <div className="absolute -inset-5 rounded-[2.4rem] border border-white/60 bg-card/40 backdrop-blur dark:border-white/10" />
                  <div className="relative overflow-hidden rounded-[2.2rem] border border-white/70 bg-card p-2 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.85)] dark:border-white/10">
                    <div className="aspect-[5/6] overflow-hidden rounded-[1.7rem] bg-muted">
                      <img
                        src={getProfileImage()}
                        alt={`${personalInfo?.nom_complet || "MAKOSSO Daniel"} - Photo de profil`}
                        className="h-full w-full scale-[1.03] object-cover object-[50%_24%] saturate-[0.96] contrast-[1.03]"
                        onError={(event) => {
                          event.currentTarget.src = actualTheme === 'dark' ? "/10.jpg" : "/5.jpg";
                        }}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-2 rounded-[1.7rem] ring-1 ring-inset ring-white/30 dark:ring-white/10" />
                  </div>
                  <div className="relative mx-auto mt-5 w-[88%] overflow-hidden rounded-3xl border border-white/70 bg-background/90 text-center shadow-card backdrop-blur dark:border-white/10">
                    <div className="border-b border-border/70 px-4 py-3">
                      <p className="font-mono text-xs font-bold uppercase text-secondary">
                        Full Stack Developer
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Interfaces web propres et performantes
                      </p>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border/70 text-left">
                      <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Focus
                        </p>
                        <p className="text-sm font-bold">Web apps</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Base
                        </p>
                        <p className="text-sm font-bold">Libreville</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">Défiler</span>
              <ArrowDown size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
