
export interface PersonalInfo {
  id?: number;
  nom_complet: string;
  profession: string;
  localisation: string;
  description_courte: string;
  photo_profil?: string;
  email_contact: string;
  github_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
}

export interface Project {
  id?: number;
  titre: string;
  description: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  statut: 'actif' | 'inactif';
}

export interface Skill {
  id?: number;
  nom: string;
  niveau: number;
  categorie: string;
  icone?: string;
}

// Données statiques
export const staticPersonalInfo: PersonalInfo = {
  nom_complet: "Mr MAKOSSO",
  profession: "Développeur Full Stack & Étudiant en Génie Logiciel",
  localisation: "Libreville, Gabon",
  description_courte: "Passionné par le développement web et la création de solutions numériques innovantes. Spécialisé en React, Node.js et technologies modernes.",
  email_contact: "makosso.dev@gmail.com",
  github_url: "https://github.com/makosso-dev",
  linkedin_url: "https://linkedin.com/in/makosso-dev",
  facebook_url: "https://facebook.com/makosso.dev",
  photo_profil: null
};

export const staticProjects: Project[] = [
  {
    id: 1,
    titre: "Système numérique de dépôt et suivi des candidatures aux concours gabonais",
    description: "Plateforme complète permettant aux candidats de déposer leurs candidatures en ligne et de suivre l'état de leur dossier en temps réel. Interface intuitive avec tableau de bord personnalisé.",
    technologies: ["React", "TypeScript", "Node.js", "MySQL", "Express.js", "TailwindCSS"],
    image_url: "/placeholder.svg",
    github_url: "https://github.com/makosso-dev/concours-gabon",
    demo_url: "https://concours-gabon-demo.vercel.app",
    statut: "actif"
  },
  {
    id: 2,
    titre: "Application de gestion des ressources humaines",
    description: "Système complet de gestion RH incluant la gestion des employés, des congés, de la paie et des évaluations de performance. Dashboard analytique avancé.",
    technologies: ["React", "Node.js", "MySQL", "TailwindCSS", "Chart.js"],
    image_url: "/placeholder.svg",
    github_url: "https://github.com/makosso-dev/rh-management",
    demo_url: "https://rh-management-demo.vercel.app",
    statut: "actif"
  },
  {
    id: 3,
    titre: "Application de gestion scolaire",
    description: "Plateforme éducative pour la gestion des élèves, des notes, des emplois du temps et la communication école-famille. Module de génération de bulletins automatisé.",
    technologies: ["React", "Node.js", "PostgreSQL", "Express.js", "Socket.io"],
    image_url: "/placeholder.svg",
    github_url: "https://github.com/makosso-dev/school-management",
    demo_url: "https://school-management-demo.vercel.app",
    statut: "actif"
  },
  {
    id: 4,
    titre: "E-commerce Platform",
    description: "Plateforme e-commerce moderne avec panier d'achat, système de paiement intégré et gestion des commandes. Interface administrateur complète.",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Vercel"],
    image_url: "/placeholder.svg",
    github_url: "https://github.com/makosso-dev/ecommerce-platform",
    demo_url: "https://ecommerce-demo.vercel.app",
    statut: "actif"
  }
];

export const staticSkills: Record<string, Skill[]> = {
  "Frontend": [
    { nom: "HTML5", niveau: 95, icone: "Code" },
    { nom: "CSS3", niveau: 90, icone: "Palette" },
    { nom: "JavaScript", niveau: 92, icone: "Code" },
    { nom: "TypeScript", niveau: 88, icone: "Code" },
    { nom: "React", niveau: 90, icone: "Code" },
    { nom: "Next.js", niveau: 85, icone: "Code" },
    { nom: "TailwindCSS", niveau: 95, icone: "Palette" },
    { nom: "SASS/SCSS", niveau: 80, icone: "Palette" }
  ],
  "Backend": [
    { nom: "Node.js", niveau: 85, icone: "Database" },
    { nom: "Express.js", niveau: 82, icone: "Database" },
    { nom: "MySQL", niveau: 80, icone: "Database" },
    { nom: "PostgreSQL", niveau: 75, icone: "Database" },
    { nom: "Laravel", niveau: 70, icone: "Database" },
    { nom: "PHP", niveau: 75, icone: "Code" },
    { nom: "API REST", niveau: 88, icone: "Database" }
  ],
  "Outils & Technologies": [
    { nom: "Git/GitHub", niveau: 90, icone: "Settings" },
    { nom: "VS Code", niveau: 95, icone: "Settings" },
    { nom: "Docker", niveau: 70, icone: "Settings" },
    { nom: "Figma", niveau: 85, icone: "Palette" },
    { nom: "Postman", niveau: 80, icone: "Settings" },
    { nom: "Vercel", niveau: 85, icone: "Settings" }
  ],
  "Langages": [
    { nom: "C#", niveau: 70, icone: "Code" },
    { nom: "Python", niveau: 65, icone: "Code" },
    { nom: "Java", niveau: 60, icone: "Code" }
  ]
};

// Service pour récupérer les données statiques
export class StaticDataService {
  static async getPersonalInfo(): Promise<PersonalInfo> {
    // Simule un délai d'API
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticPersonalInfo;
  }

  static async getProjects(): Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticProjects.filter(project => project.statut === 'actif');
  }

  static async getSkills(): Promise<Record<string, Skill[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticSkills;
  }
}
