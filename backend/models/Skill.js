const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    niveau: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    categorie: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Outils", "Autres"],
    },
    icone: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Index pour améliorer les performances
skillSchema.index({ categorie: 1, niveau: -1 });

// Méthode statique pour obtenir les compétences groupées par catégorie
skillSchema.statics.getByCategory = async function () {
  const skills = await this.find().sort({ categorie: 1, niveau: -1 });

  // Grouper par catégorie
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.categorie]) {
      acc[skill.categorie] = [];
    }
    acc[skill.categorie].push(skill);
    return acc;
  }, {});

  return skillsByCategory;
};

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
