const express = require("express");
const router = express.Router();
const User = require("../models/User");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");

/**
 * Routes publiques pour accéder au portfolio d'un utilisateur
 * Accessible via sous-domaine ou slug
 */

// Middleware pour charger l'utilisateur depuis le sous-domaine ou le slug
const loadUser = async (req, res, next) => {
  try {
    let user;

    // Si on a déjà l'utilisateur depuis le middleware subdomain
    if (req.portfolioUser) {
      user = req.portfolioUser;
    }
    // Sinon, chercher par slug dans l'URL
    else if (req.params.username) {
      user = await User.findBySlug(req.params.username);
    }

    if (!user) {
      return res.status(404).json({ error: "Portfolio non trouvé" });
    }

    req.portfolioUser = user;
    next();
  } catch (error) {
    console.error("Erreur chargement utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET - Informations personnelles
router.get("/info", loadUser, async (req, res) => {
  try {
    const info = await PersonalInfo.findOne({ userId: req.portfolioUser._id });
    if (!info) {
      return res.status(404).json({ error: "Informations non trouvées" });
    }
    res.json(info);
  } catch (error) {
    console.error("Erreur récupération infos:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Projets
router.get("/projects", loadUser, async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.portfolioUser._id,
      statut: "actif",
    }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Erreur récupération projets:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Projet par ID
router.get("/projects/:id", loadUser, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.portfolioUser._id,
    });

    if (!project) {
      return res.status(404).json({ error: "Projet non trouvé" });
    }

    res.json(project);
  } catch (error) {
    console.error("Erreur récupération projet:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Compétences
router.get("/skills", loadUser, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.portfolioUser._id }).sort({
      categorie: 1,
      niveau: -1,
    });

    // Grouper par catégorie
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.categorie]) {
        acc[skill.categorie] = [];
      }
      acc[skill.categorie].push(skill);
      return acc;
    }, {});

    res.json(skillsByCategory);
  } catch (error) {
    console.error("Erreur récupération compétences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Expériences
router.get("/experience", loadUser, async (req, res) => {
  try {
    const experiences = await Experience.find({
      userId: req.portfolioUser._id,
      statut: "actif",
    }).sort({ ordre: 1, startDate: -1 });
    res.json(experiences);
  } catch (error) {
    console.error("Erreur récupération expériences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET - Informations utilisateur (publiques)
router.get("/user", loadUser, async (req, res) => {
  try {
    res.json({
      nom: req.portfolioUser.nom,
      slug: req.portfolioUser.slug,
      subdomain: req.portfolioUser.subdomain,
      customDomain: req.portfolioUser.customDomain,
    });
  } catch (error) {
    console.error("Erreur récupération user:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
