const User = require("../models/User");

/**
 * Middleware pour détecter et gérer les sous-domaines
 * Détecte si la requête vient d'un sous-domaine et charge l'utilisateur correspondant
 */
const subdomainMiddleware = async (req, res, next) => {
  try {
    const host = req.get("host") || "";
    const mainDomain = process.env.MAIN_DOMAIN || "localhost:5000";

    // Extraire le sous-domaine
    let subdomain = null;
    let customDomain = null;

    // Vérifier si c'est un domaine personnalisé
    if (host !== mainDomain && !host.includes(mainDomain)) {
      customDomain = host.split(":")[0]; // Enlever le port si présent
      const user = await User.findByCustomDomain(customDomain);
      if (user) {
        req.portfolioUser = user;
        req.isSubdomain = true;
        return next();
      }
    }

    // Vérifier si c'est un sous-domaine
    if (host.includes(".") && host !== mainDomain) {
      const parts = host.split(".");

      // Si on a au moins 3 parties (subdomain.domain.tld)
      if (parts.length >= 3) {
        subdomain = parts[0];

        // Ignorer les sous-domaines réservés
        const reservedSubdomains = [
          "www",
          "api",
          "admin",
          "app",
          "mail",
          "ftp",
        ];
        if (!reservedSubdomains.includes(subdomain)) {
          const user = await User.findBySubdomain(subdomain);
          if (user) {
            req.portfolioUser = user;
            req.isSubdomain = true;
            return next();
          }
        }
      }
    }

    // Pas de sous-domaine détecté
    req.isSubdomain = false;
    next();
  } catch (error) {
    console.error("Erreur middleware sous-domaine:", error);
    next();
  }
};

module.exports = subdomainMiddleware;
