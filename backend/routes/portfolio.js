const express = require("express");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

const router = express.Router();

// GET /api/portfolio/info - Récupérer les informations personnelles
router.get("/info", async (req, res) => {
  try {
    const info = await PersonalInfo.getOrCreate();
    res.json(info);
  } catch (error) {
    console.error("Erreur récupération info personnelles:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des informations" });
  }
});

// GET /api/portfolio/projects - Récupérer tous les projets actifs
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.getActive();
    res.json(projects);
  } catch (error) {
    console.error("Erreur récupération projets:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des projets" });
  }
});

// GET /api/portfolio/skills - Récupérer toutes les compétences
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.getByCategory();
    res.json(skills);
  } catch (error) {
    console.error("Erreur récupération compétences:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des compétences" });
  }
});

module.exports = router;
