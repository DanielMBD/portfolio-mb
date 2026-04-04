const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
skillSchema.index({ userId: 1, categorie: 1, niveau: -1 });

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
