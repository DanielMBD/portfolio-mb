const mongoose = require("mongoose");
require("dotenv").config();

// Configuration de la connexion MongoDB
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio_makosso";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connexion MongoDB établie avec succès");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB:", error.message);
    process.exit(1);
  }
};

// Gestion des événements de connexion
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB déconnecté");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Erreur MongoDB:", err);
});

module.exports = connectDB;
