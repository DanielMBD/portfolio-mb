const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    nom_complet: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    description_courte: {
      type: String,
      required: true,
    },
    photo_profil: {
      type: String,
      default: null,
    },
    email_contact: {
      type: String,
      required: true,
    },
    github_url: {
      type: String,
      default: null,
    },
    linkedin_url: {
      type: String,
      default: null,
    },
    facebook_url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Index pour améliorer les performances
personalInfoSchema.index({ userId: 1 });

// Méthode statique pour obtenir ou créer les informations personnelles d'un utilisateur
personalInfoSchema.statics.getOrCreateForUser = async function (userId) {
  let info = await this.findOne({ userId });
  if (!info) {
    const User = mongoose.model("User");
    const user = await User.findById(userId);

    info = await this.create({
      userId,
      nom_complet: user.nom,
      profession: "Développeur",
      localisation: "Non spécifié",
      description_courte: "Passionné par le développement web",
      email_contact: user.email,
    });
  }
  return info;
};

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
