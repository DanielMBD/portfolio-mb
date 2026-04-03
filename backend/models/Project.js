const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    image_url: {
      type: String,
      default: null,
    },
    github_url: {
      type: String,
      default: null,
    },
    demo_url: {
      type: String,
      default: null,
    },
    statut: {
      type: String,
      enum: ["actif", "inactif", "en_cours"],
      default: "actif",
    },
  },
  {
    timestamps: true,
  },
);

// Index pour améliorer les performances
projectSchema.index({ statut: 1, createdAt: -1 });

// Méthode statique pour obtenir tous les projets actifs
projectSchema.statics.getActive = function () {
  return this.find({ statut: "actif" }).sort({ createdAt: -1 });
};

// Méthode statique pour obtenir tous les projets (incluant inactifs)
projectSchema.statics.getAll = function (includeInactive = false) {
  const query = includeInactive ? {} : { statut: "actif" };
  return this.find(query).sort({ createdAt: -1 });
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
