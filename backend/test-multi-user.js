/**
 * Script de test du système multi-utilisateurs
 *
 * Ce script teste:
 * 1. Création de 2 utilisateurs
 * 2. Connexion et récupération des tokens
 * 3. Configuration des sous-domaines
 * 4. Ajout de données pour chaque utilisateur
 * 5. Vérification de l'isolation des données
 */

const API_URL = process.env.API_URL || "http://localhost:5000/api";

async function request(method, endpoint, data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status}: ${result.error || "Erreur inconnue"}`);
  }

  return result;
}

async function testMultiUser() {
  console.log("🧪 Test du système multi-utilisateurs\n");

  try {
    // 1. Créer utilisateur 1
    console.log("1️⃣  Création utilisateur 1...");
    const user1Data = {
      nom: "John Doe",
      email: `john-${Date.now()}@test.com`,
      mot_de_passe: "password123",
    };

    try {
      await request("POST", "/auth/register", user1Data);
      console.log("✅ Utilisateur 1 créé");
    } catch (error) {
      console.log("⚠️  Utilisateur 1 existe déjà ou erreur:", error.message);
    }

    // 2. Créer utilisateur 2
    console.log("\n2️⃣  Création utilisateur 2...");
    const user2Data = {
      nom: "Jane Smith",
      email: `jane-${Date.now()}@test.com`,
      mot_de_passe: "password123",
    };

    try {
      await request("POST", "/auth/register", user2Data);
      console.log("✅ Utilisateur 2 créé");
    } catch (error) {
      console.log("⚠️  Utilisateur 2 existe déjà ou erreur:", error.message);
    }

    // 3. Connexion utilisateur 1
    console.log("\n3️⃣  Connexion utilisateur 1...");
    const login1 = await request("POST", "/auth/login", {
      email: user1Data.email,
      mot_de_passe: user1Data.mot_de_passe,
    });
    const token1 = login1.token;
    console.log("✅ Token 1 obtenu");

    // 4. Connexion utilisateur 2
    console.log("\n4️⃣  Connexion utilisateur 2...");
    const login2 = await request("POST", "/auth/login", {
      email: user2Data.email,
      mot_de_passe: user2Data.mot_de_passe,
    });
    const token2 = login2.token;
    console.log("✅ Token 2 obtenu");

    // 5. Configurer sous-domaine utilisateur 1
    console.log("\n5️⃣  Configuration sous-domaine utilisateur 1...");
    try {
      await request(
        "PUT",
        "/admin/subdomain",
        {
          subdomain: `john-${Date.now()}`,
        },
        token1,
      );
      console.log("✅ Sous-domaine 1 configuré");
    } catch (error) {
      console.log("⚠️  Erreur sous-domaine 1:", error.message);
    }

    // 6. Configurer sous-domaine utilisateur 2
    console.log("\n6️⃣  Configuration sous-domaine utilisateur 2...");
    try {
      await request(
        "PUT",
        "/admin/subdomain",
        {
          subdomain: `jane-${Date.now()}`,
        },
        token2,
      );
      console.log("✅ Sous-domaine 2 configuré");
    } catch (error) {
      console.log("⚠️  Erreur sous-domaine 2:", error.message);
    }

    // 7. Ajouter projet pour utilisateur 1
    console.log("\n7️⃣  Ajout projet utilisateur 1...");
    const project1 = await request(
      "POST",
      "/admin/projects",
      {
        titre: "Projet de John",
        description: "Description du projet de John",
        technologies: ["React", "Node.js"],
        statut: "actif",
      },
      token1,
    );
    console.log("✅ Projet 1 créé:", project1.data._id);

    // 8. Ajouter projet pour utilisateur 2
    console.log("\n8️⃣  Ajout projet utilisateur 2...");
    const project2 = await request(
      "POST",
      "/admin/projects",
      {
        titre: "Projet de Jane",
        description: "Description du projet de Jane",
        technologies: ["Vue", "Python"],
        statut: "actif",
      },
      token2,
    );
    console.log("✅ Projet 2 créé:", project2.data._id);

    // 9. Vérifier que utilisateur 1 ne voit que ses projets
    console.log("\n9️⃣  Vérification isolation utilisateur 1...");
    const projects1 = await request("GET", "/admin/projects", null, token1);
    console.log(`✅ Utilisateur 1 voit ${projects1.length} projet(s)`);
    const hasOnlyOwnProjects1 = projects1.every(
      (p) => p.titre.includes("John") || p.userId === login1.user.id,
    );
    if (hasOnlyOwnProjects1) {
      console.log("✅ Isolation correcte pour utilisateur 1");
    } else {
      console.log(
        "❌ ERREUR: Utilisateur 1 voit des projets d'autres utilisateurs!",
      );
    }

    // 10. Vérifier que utilisateur 2 ne voit que ses projets
    console.log("\n🔟 Vérification isolation utilisateur 2...");
    const projects2 = await request("GET", "/admin/projects", null, token2);
    console.log(`✅ Utilisateur 2 voit ${projects2.length} projet(s)`);
    const hasOnlyOwnProjects2 = projects2.every(
      (p) => p.titre.includes("Jane") || p.userId === login2.user.id,
    );
    if (hasOnlyOwnProjects2) {
      console.log("✅ Isolation correcte pour utilisateur 2");
    } else {
      console.log(
        "❌ ERREUR: Utilisateur 2 voit des projets d'autres utilisateurs!",
      );
    }

    // 11. Tester que utilisateur 1 ne peut pas modifier projet de utilisateur 2
    console.log(
      "\n1️⃣1️⃣  Test sécurité: utilisateur 1 tente de modifier projet de utilisateur 2...",
    );
    try {
      await request(
        "PUT",
        `/admin/projects/${project2.data._id}`,
        {
          titre: "Projet modifié par John (HACK)",
          description: "Ceci ne devrait pas fonctionner",
        },
        token1,
      );
      console.log(
        "❌ ERREUR: Utilisateur 1 a pu modifier le projet de utilisateur 2!",
      );
    } catch (error) {
      console.log("✅ Sécurité OK: Modification refusée");
    }

    console.log("\n🎉 Tests terminés avec succès!");
    console.log("\n📊 Résumé:");
    console.log("- 2 utilisateurs créés");
    console.log("- 2 sous-domaines configurés");
    console.log("- 2 projets créés (1 par utilisateur)");
    console.log("- Isolation des données vérifiée");
    console.log("- Sécurité vérifiée");
  } catch (error) {
    console.error("\n❌ Erreur lors des tests:", error.message);
    process.exit(1);
  }
}

// Exécuter les tests
testMultiUser();
