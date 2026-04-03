#!/usr/bin/env node

/**
 * Script pour insérer les données statiques dans MongoDB
 * Usage: npm run seed (depuis le dossier backend)
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");

// Importer les modèles
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// Données statiques
const staticPersonalInfo = {
  nom_complet: "Mr MAKOSSO",
  profession: "Développeur Full Stack & Étudiant en Génie Logiciel",
  localisation: "Libreville, Gabon",
  description_courte:
    "Passionné par le développement web et la création de solutions numériques innovantes. Spécialisé en React, Node.js et technologies modernes.",
  email_contact: "mb.daniel241@gmail.com",
  github_url: "https://github.com/DanielMBD",
  linkedin_url: "https://www.linkedin.com/in/daniel-makosso",
  facebook_url: "https://www.facebook.com/daniel.devfullstak",
  photo_profil: "/5.jpg",
};

const staticProjects = [
  {
    titre: "Portfolio professionnel",
    description:
      "Portfolio professionnel, présente les projets, les technologies etc",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    image_url: "/cpe_pf.png",
    demo_url: "https://web-profile-pro-08.vercel.app/",
    statut: "actif",
  },
  {
    titre: "Application de gestion des tâches",
    description:
      'Application de gestion de tâches inspirée de Trello, conçue avec React, TailwindCSS. Elle permet d\'ajouter, modifier, supprimer et organiser les tâches dans trois colonnes ("À faire", "En cours", "Terminé"). La recherche par mots-clés, le dark mode et la sauvegarde automatique via localStorage assurent une expérience utilisateur complète et professionnelle.',
    technologies: ["React", "TypeScript", "Node.js", "TailwindCSS"],
    image_url: "/cpe_my_tf.png",
    demo_url: "https://my-tf.vercel.app/",
    statut: "actif",
  },
  {
    titre: "Application de gestion de modules",
    description:
      "Application web interactive développée avec React, TailwindCSS et Chart.js, permettant aux utilisateurs de suivre la progression de leurs modules de formation. Elle offre un tableau de bord moderne avec cartes de modules, gestion de progression en temps réel, visualisation par graphique circulaire et persistance via localStorage. L'interface est responsive, intuitive et propose un mode sombre.",
    technologies: ["React", "TypeScript", "Node.js", "TailwindCSS"],
    image_url: "/cpe_my_md.png",
    demo_url: "https://my-md.vercel.app/",
    statut: "actif",
  },
];

const staticSkills = {
  Frontend: [
    { nom: "HTML5", niveau: 70, categorie: "Frontend", icone: "Code" },
    { nom: "CSS3", niveau: 70, categorie: "Frontend", icone: "Palette" },
    { nom: "JavaScript", niveau: 65, categorie: "Frontend", icone: "Code" },
    { nom: "TypeScript", niveau: 65, categorie: "Frontend", icone: "Code" },
    { nom: "React", niveau: 60, categorie: "Frontend", icone: "Code" },
    { nom: "Next.js", niveau: 55, categorie: "Frontend", icone: "Code" },
    { nom: "TailwindCSS", niveau: 70, categorie: "Frontend", icone: "Palette" },
  ],
  Backend: [
    { nom: "Node.js", niveau: 60, categorie: "Backend", icone: "Database" },
    { nom: "Express.js", niveau: 60, categorie: "Backend", icone: "Database" },
    { nom: "MySQL", niveau: 75, categorie: "Backend", icone: "Database" },
    { nom: "PostgreSQL", niveau: 50, categorie: "Backend", icone: "Database" },
    { nom: "PHP", niveau: 60, categorie: "Backend", icone: "Code" },
    { nom: "API REST", niveau: 48, categorie: "Backend", icone: "Database" },
  ],
  "Outils & Technologies": [
    {
      nom: "Git/GitHub",
      niveau: 60,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "VS Code",
      niveau: 100,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Adobe XD",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Figma",
      niveau: 60,
      categorie: "Outils & Technologies",
      icone: "Palette",
    },
    {
      nom: "Postman",
      niveau: 70,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Vercel",
      niveau: 55,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "PhpStorm",
      niveau: 70,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "WebStorm",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "intelliJ",
      niveau: 80,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "PyCharm",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
  ],
  "Langages Programmations": [
    { nom: "C", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "C++", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "C#", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "Python", niveau: 65, categorie: "Langages", icone: "Code" },
    { nom: "Java", niveau: 60, categorie: "Langages", icone: "Code" },
  ],
};

async function seedDatabase() {
  try {
    console.log("🔌 Connexion à MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB\n");

    // 1. Insérer/Mettre à jour les informations personnelles
    console.log("📝 Insertion des informations personnelles...");
    await PersonalInfo.findOneAndUpdate({}, staticPersonalInfo, {
      upsert: true,
      new: true,
    });
    console.log("✅ Informations personnelles insérées\n");

    // 2. Insérer les projets (sans dupliquer)
    console.log("🚀 Insertion des projets...");
    for (const project of staticProjects) {
      await Project.findOneAndUpdate({ titre: project.titre }, project, {
        upsert: true,
        new: true,
      });
      console.log(`  ✅ ${project.titre}`);
    }
    console.log("✅ Tous les projets insérés\n");

    // 3. Insérer les compétences (sans dupliquer)
    console.log("💪 Insertion des compétences...");
    let totalSkills = 0;
    for (const [categorie, skills] of Object.entries(staticSkills)) {
      console.log(`  📂 Catégorie: ${categorie}`);
      for (const skill of skills) {
        await Skill.findOneAndUpdate(
          { nom: skill.nom, categorie: skill.categorie },
          skill,
          { upsert: true, new: true },
        );
        totalSkills++;
        console.log(`    ✅ ${skill.nom} (${skill.niveau}%)`);
      }
    }
    console.log(`✅ ${totalSkills} compétences insérées\n`);

    // Résumé
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();

    console.log("=".repeat(60));
    console.log("📊 RÉSUMÉ");
    console.log("=".repeat(60));
    console.log(`✅ Informations personnelles: OK`);
    console.log(`✅ Projets en base: ${projectCount}`);
    console.log(`✅ Compétences en base: ${skillCount}`);
    console.log("\n🎉 Base de données initialisée avec succès!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
}

// Exécuter le script
seedDatabase();
