const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    logo: {
      type: String,
    },
    statut: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif",
    },
    ordre: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index pour trier par userId et ordre
experienceSchema.index({ userId: 1, ordre: 1, startDate: -1 });

module.exports = mongoose.model("Experience", experienceSchema);
