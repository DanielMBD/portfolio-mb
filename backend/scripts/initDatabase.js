const mongoose = require("mongoose");
require("dotenv").config();

// Importer les modèles
const User = require("../models/User");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Contact = require("../models/Contact");

// Configuration de la connexion
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio_makosso";

async function initDatabase() {
  try {
    console.log("🔄 Connexion à MongoDB...");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB");

    // Supprimer les données existantes (optionnel - commentez si vous voulez garder les données)
    console.log("🗑️  Nettoyage des collections...");
    await User.deleteMany({});
    await PersonalInfo.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Contact.deleteMany({});
    console.log("✅ Collections nettoyées");

    // 1. Créer l'utilisateur admin
    console.log("👤 Création de l'utilisateur admin...");
    const adminEmail = process.env.ADMIN_EMAIL || "admin@makosso-portfolio.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminSecure123!";

    const admin = await User.create({
      email: adminEmail,
      password: adminPassword,
      nom: "Mr MAKOSSO",
      role: "admin",
    });
    console.log(`✅ Utilisateur admin créé: ${admin.email}`);

    // 2. Créer les informations personnelles
    console.log("📝 Création des informations personnelles...");
    const personalInfo = await PersonalInfo.create({
      nom_complet: "Mr MAKOSSO",
      profession: "Étudiant en Génie Logiciel",
      localisation: "Libreville, Gabon",
      description_courte:
        "Passionné par le développement web et les nouvelles technologies. Spécialisé en développement Full Stack avec React, Node.js et MongoDB.",
      email_contact: "contact@makosso-portfolio.com",
      github_url: "https://github.com/makosso",
      linkedin_url: "https://linkedin.com/in/makosso",
      facebook_url: null,
    });
    console.log("✅ Informations personnelles créées");

    // 3. Créer des projets de démonstration
    console.log("📁 Création des projets...");
    const projects = [
      {
        titre: "Système de Candidatures aux Concours",
        description:
          "Plateforme web complète permettant aux candidats de s'inscrire aux concours gabonais en ligne. Gestion des dossiers, paiements en ligne et suivi des candidatures.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        github_url: "https://github.com/makosso/concours-app",
        demo_url: "https://concours-demo.com",
        statut: "actif",
      },
      {
        titre: "Application de Gestion RH",
        description:
          "Solution de gestion des ressources humaines avec gestion des employés, congés, paies et évaluations de performance.",
        technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
        github_url: "https://github.com/makosso/rh-app",
        demo_url: null,
        statut: "actif",
      },
      {
        titre: "Plateforme de Gestion Scolaire",
        description:
          "Système complet de gestion d'établissement scolaire incluant notes, absences, emplois du temps et communication parents-professeurs.",
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Socket.io",
        ],
        github_url: "https://github.com/makosso/school-app",
        demo_url: "https://school-demo.com",
        statut: "actif",
      },
    ];

    for (const projectData of projects) {
      await Project.create(projectData);
    }
    console.log(`✅ ${projects.length} projets créés`);

    // 4. Créer des compétences
    console.log("🎯 Création des compétences...");
    const skills = [
      // Frontend
      { nom: "HTML/CSS", niveau: 90, categorie: "Frontend", icone: "Code" },
      {
        nom: "JavaScript",
        niveau: 85,
        categorie: "Frontend",
        icone: "FileCode",
      },
      {
        nom: "TypeScript",
        niveau: 80,
        categorie: "Frontend",
        icone: "FileCode",
      },
      { nom: "React", niveau: 85, categorie: "Frontend", icone: "Atom" },
      { nom: "Vue.js", niveau: 75, categorie: "Frontend", icone: "Layers" },
      {
        nom: "Tailwind CSS",
        niveau: 90,
        categorie: "Frontend",
        icone: "Palette",
      },

      // Backend
      { nom: "Node.js", niveau: 85, categorie: "Backend", icone: "Server" },
      { nom: "Express", niveau: 85, categorie: "Backend", icone: "Zap" },
      { nom: "MongoDB", niveau: 80, categorie: "Backend", icone: "Database" },
      { nom: "MySQL", niveau: 75, categorie: "Backend", icone: "Database" },
      { nom: "PHP/Laravel", niveau: 70, categorie: "Backend", icone: "Code" },

      // Outils
      {
        nom: "Git/GitHub",
        niveau: 85,
        categorie: "Outils",
        icone: "GitBranch",
      },
      { nom: "VS Code", niveau: 90, categorie: "Outils", icone: "Code2" },
      { nom: "Docker", niveau: 65, categorie: "Outils", icone: "Box" },
      { nom: "Postman", niveau: 80, categorie: "Outils", icone: "Send" },
    ];

    for (const skillData of skills) {
      await Skill.create(skillData);
    }
    console.log(`✅ ${skills.length} compétences créées`);

    // 5. Créer un message de contact de test
    console.log("📧 Création d'un message de test...");
    await Contact.create({
      nom: "Utilisateur Test",
      email: "test@example.com",
      message:
        "Ceci est un message de test pour vérifier le système de contact.",
      ip_address: "127.0.0.1",
      is_read: false,
    });
    console.log("✅ Message de test créé");

    console.log("\n🎉 Base de données initialisée avec succès !");
    console.log("\n📊 Résumé:");
    console.log(`   - Utilisateur admin: ${adminEmail}`);
    console.log(`   - Mot de passe: ${adminPassword}`);
    console.log(`   - Projets: ${projects.length}`);
    console.log(`   - Compétences: ${skills.length}`);
    console.log(`   - Messages: 1`);
    console.log("\n⚠️  N'oubliez pas de changer le mot de passe admin !");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Connexion MongoDB fermée");
    process.exit(0);
  }
}

// Exécuter l'initialisation
initDatabase();
