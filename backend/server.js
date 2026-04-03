const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Importer la connexion MongoDB
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const portfolioRoutes = require("./routes/portfolio");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Middleware de sécurité
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
});
app.use(limiter);

// Middleware de parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (uploads)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Route de test
app.get("/api/health", (_req, res) => {
  res.json({
    message: "Backend portfolio Mr MAKOSSO - Service actif",
    database: "MongoDB",
    status: "OK",
  });
});

// Gestion des erreurs 404
app.use("*", (_req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((error, _req, res, _next) => {
  console.error("Erreur serveur:", error);
  res.status(500).json({
    error: "Erreur interne du serveur",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur portfolio démarré sur le port ${PORT}`);
  console.log(`📊 Environnement: ${process.env.NODE_ENV || "development"}`);
  console.log(`🗄️  Base de données: MongoDB`);
});

module.exports = app;
