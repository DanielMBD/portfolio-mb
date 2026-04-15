const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");

// Routes publiques
// GET - Récupérer toutes les expériences actives
router.get("/", async (req, res) => {
  try {
    let userId = req.query.userId;

    // Si pas d'userId, utiliser l'utilisateur par défaut
    if (!userId) {
      const defaultUser = await User.findOne().sort({ createdAt: 1 });
      if (defaultUser) {
        userId = defaultUser._id;
      }
    }

    const filter = { statut: "actif", userId };
    const experiences = await Experience.find(filter)
      .sort({ ordre: 1, startDate: -1 })
      .select("-__v");
    res.json(experiences);
  } catch (error) {
    console.error("Erreur lors de la récupération des expériences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Routes admin (protégées)
// GET - Récupérer toutes les expériences de l'utilisateur connecté (admin)
router.get("/admin/all", authenticateToken, async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.user.id })
      .sort({ ordre: 1, startDate: -1 })
      .select("-__v");
    res.json(experiences);
  } catch (error) {
    console.error("Erreur lors de la récupération des expériences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST - Créer une nouvelle expérience
router.post("/admin", authenticateToken, async (req, res) => {
  try {
    // Ajouter userId à l'expérience
    const experienceData = { ...req.body, userId: req.user.id };
    const experience = new Experience(experienceData);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error("Erreur lors de la création de l'expérience:", error);
    res.status(400).json({ error: error.message });
  }
});

// PUT - Mettre à jour une expérience
router.put("/admin/:id", authenticateToken, async (req, res) => {
  try {
    // Vérifier que l'expérience appartient à l'utilisateur
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!experience) {
      return res.status(404).json({ error: "Expérience non trouvée" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'expérience:", error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Supprimer une expérience
router.delete("/admin/:id", authenticateToken, async (req, res) => {
  try {
    // Vérifier que l'expérience appartient à l'utilisateur
    const experience = await Experience.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!experience) {
      return res.status(404).json({ error: "Expérience non trouvée" });
    }

    res.json({ message: "Expérience supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'expérience:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
