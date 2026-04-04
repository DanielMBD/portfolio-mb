const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: "admin",
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    subdomain: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Valider le format du sous-domaine (lettres, chiffres, tirets)
          return !v || /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(v);
        },
        message:
          "Le sous-domaine ne peut contenir que des lettres, chiffres et tirets",
      },
    },
    customDomain: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Hasher le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    // Générer un slug si pas défini
    if (!this.slug) {
      this.slug = this.nom
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    // Générer un sous-domaine par défaut si pas défini
    if (!this.subdomain) {
      this.subdomain = this.slug;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.verifyPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Méthode pour mettre à jour le dernier login
userSchema.methods.updateLastLogin = async function () {
  this.last_login = new Date();
  return await this.save();
};

// Méthode statique pour trouver par email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Méthode statique pour trouver par slug
userSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug: slug.toLowerCase(), isActive: true });
};

// Méthode statique pour trouver par sous-domaine
userSchema.statics.findBySubdomain = function (subdomain) {
  return this.findOne({ subdomain: subdomain.toLowerCase(), isActive: true });
};

// Méthode statique pour trouver par domaine personnalisé
userSchema.statics.findByCustomDomain = function (domain) {
  return this.findOne({ customDomain: domain.toLowerCase(), isActive: true });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
