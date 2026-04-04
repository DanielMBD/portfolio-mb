const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
projectSchema.index({ userId: 1, statut: 1, createdAt: -1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
