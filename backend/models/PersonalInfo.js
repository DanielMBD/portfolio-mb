const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
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

// Méthode statique pour obtenir ou créer les informations personnelles
personalInfoSchema.statics.getOrCreate = async function () {
  let info = await this.findOne();
  if (!info) {
    info = await this.create({
      nom_complet: "Mr MAKOSSO",
      profession: "Étudiant en Génie Logiciel",
      localisation: "Libreville, Gabon",
      description_courte:
        "Passionné par le développement web et les nouvelles technologies",
      email_contact: "contact@makosso-portfolio.com",
    });
  }
  return info;
};

// Méthode statique pour mettre à jour les informations
personalInfoSchema.statics.updateInfo = async function (data) {
  let info = await this.findOne();
  if (info) {
    Object.assign(info, data);
    return await info.save();
  } else {
    return await this.create(data);
  }
};

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
