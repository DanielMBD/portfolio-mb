require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");

async function migrateData() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB");

    // Récupérer le premier utilisateur admin (ou créer un utilisateur par défaut)
    let defaultUser = await User.findOne({ role: "admin" });

    if (!defaultUser) {
      console.log(
        "⚠️  Aucun utilisateur admin trouvé. Création d'un utilisateur par défaut...",
      );
      defaultUser = await User.create({
        nom: "Admin",
        email: "admin@example.com",
        mot_de_passe: "changeme123", // À changer après migration
        role: "admin",
        slug: "admin",
        subdomain: "admin",
      });
      console.log("✅ Utilisateur par défaut créé");
    }

    const defaultUserId = defaultUser._id;
    console.log(
      `📌 Utilisation de l'utilisateur: ${defaultUser.email} (${defaultUserId})`,
    );

    // Migrer PersonalInfo
    const personalInfoCount = await PersonalInfo.countDocuments({
      userId: { $exists: false },
    });
    if (personalInfoCount > 0) {
      await PersonalInfo.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: defaultUserId } },
      );
      console.log(`✅ ${personalInfoCount} PersonalInfo migrés`);
    } else {
      console.log("✓ PersonalInfo déjà migrés");
    }

    // Migrer Projects
    const projectsCount = await Project.countDocuments({
      userId: { $exists: false },
    });
    if (projectsCount > 0) {
      await Project.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: defaultUserId } },
      );
      console.log(`✅ ${projectsCount} Projects migrés`);
    } else {
      console.log("✓ Projects déjà migrés");
    }

    // Migrer Skills
    const skillsCount = await Skill.countDocuments({
      userId: { $exists: false },
    });
    if (skillsCount > 0) {
      await Skill.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: defaultUserId } },
      );
      console.log(`✅ ${skillsCount} Skills migrés`);
    } else {
      console.log("✓ Skills déjà migrés");
    }

    // Migrer Experiences
    const experiencesCount = await Experience.countDocuments({
      userId: { $exists: false },
    });
    if (experiencesCount > 0) {
      await Experience.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: defaultUserId } },
      );
      console.log(`✅ ${experiencesCount} Experiences migrés`);
    } else {
      console.log("✓ Experiences déjà migrés");
    }

    console.log("\n🎉 Migration terminée avec succès!");
    console.log(
      "\n⚠️  IMPORTANT: Si vous avez créé un utilisateur par défaut,",
    );
    console.log("   changez le mot de passe via l'interface admin.");
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Connexion MongoDB fermée");
  }
}

// Exécuter la migration
migrateData();
