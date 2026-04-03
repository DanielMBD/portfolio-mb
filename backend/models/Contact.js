const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
      default: null,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index pour améliorer les performances
contactSchema.index({ createdAt: -1 });
contactSchema.index({ is_read: 1 });

// Méthode statique pour obtenir le nombre de messages non lus
contactSchema.statics.getUnreadCount = function () {
  return this.countDocuments({ is_read: false });
};

// Méthode statique pour obtenir tous les messages avec pagination
contactSchema.statics.getAllPaginated = function (limit = 50, skip = 0) {
  return this.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};

// Méthode pour marquer comme lu
contactSchema.methods.markAsRead = async function () {
  this.is_read = true;
  return await this.save();
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
