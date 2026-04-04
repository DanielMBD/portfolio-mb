# 👥 Système Multi-Utilisateurs - Portfolio

## 🎯 Concept

Chaque utilisateur a son propre portfolio avec ses propres données (projets, compétences, expériences, infos personnelles). Les données sont isolées par utilisateur.

## 🔑 Fonctionnement

### 1. Inscription/Connexion

- L'utilisateur s'inscrit avec : nom, email, mot de passe
- Un **slug** unique est généré automatiquement à partir du nom
  - Exemple : "Daniel MAKOSSO" → slug: "daniel-makosso"

### 2. Accès au portfolio

- **URL publique** : `https://ton-site.com/:username`
  - Exemple : `https://ton-site.com/daniel-makosso`
- **Admin** : `https://ton-site.com/admin/dashboard`

### 3. Données liées à l'utilisateur

Tous les modèles ont un champ `userId` :

- PersonalInfo (1 par utilisateur)
- Projects (plusieurs par utilisateur)
- Skills (plusieurs par utilisateur)
- Experiences (plusieurs par utilisateur)

## 📊 Structure des données

### User

```javascript
{
  _id: ObjectId,
  nom: "Daniel MAKOSSO",
  email: "daniel@example.com",
  password: "hashed_password",
  slug: "daniel-makosso",  // URL publique
  isActive: true,
  role: "admin",
  createdAt: Date
}
```

### PersonalInfo

```javascript
{
  _id: ObjectId,
  userId: ObjectId,  // Lien vers User
  nom_complet: "Daniel MAKOSSO",
  profession: "Développeur Full Stack",
  localisation: "Libreville, Gabon",
  description_courte: "...",
  photo_profil: "/uploads/photo.jpg",
  email_contact: "contact@example.com",
  github_url: "https://github.com/...",
  linkedin_url: "https://linkedin.com/in/...",
  facebook_url: "https://facebook.com/..."
}
```

### Project

```javascript
{
  _id: ObjectId,
  userId: ObjectId,  // Lien vers User
  titre: "Mon Projet",
  description: "...",
  technologies: ["React", "Node.js"],
  image_url: "/uploads/project.jpg",
  github_url: "...",
  demo_url: "...",
  statut: "actif"
}
```

### Skill

```javascript
{
  _id: ObjectId,
  userId: ObjectId,  // Lien vers User
  nom: "React",
  niveau: 85,
  categorie: "Frontend",
  icone: "Code"
}
```

### Experience

```javascript
{
  _id: ObjectId,
  userId: ObjectId,  // Lien vers User
  company: "CompanyViene",
  position: "Développeur Full Stack",
  period: "2024 - Présent",
  current: true,
  website: "https://companyviene.com",
  description: "...",
  technologies: ["React", "Node.js"],
  statut: "actif",
  ordre: 1
}
```

## 🔐 Routes API

### Routes publiques (par slug)

```
GET /api/portfolio/:username/info       - Infos personnelles
GET /api/portfolio/:username/projects   - Projets
GET /api/portfolio/:username/skills     - Compétences
GET /api/portfolio/:username/experience - Expériences
```

### Routes admin (authentifiées)

```
# Authentification
POST /api/auth/register  - Inscription
POST /api/auth/login     - Connexion
GET  /api/auth/verify    - Vérifier token

# Gestion des données (userId automatique depuis le token)
GET    /api/admin/personal-info     - Mes infos
PUT    /api/admin/personal-info     - Modifier mes infos

GET    /api/admin/projects          - Mes projets
POST   /api/admin/projects          - Créer un projet
PUT    /api/admin/projects/:id      - Modifier un projet
DELETE /api/admin/projects/:id      - Supprimer un projet

GET    /api/admin/skills            - Mes compétences
POST   /api/admin/skills            - Créer une compétence
PUT    /api/admin/skills/:id        - Modifier une compétence
DELETE /api/admin/skills/:id        - Supprimer une compétence

GET    /api/admin/experience        - Mes expériences
POST   /api/admin/experience        - Créer une expérience
PUT    /api/admin/experience/:id    - Modifier une expérience
DELETE /api/admin/experience/:id    - Supprimer une expérience
```

## 🌐 Frontend

### Routes publiques

```
/:username              - Portfolio de l'utilisateur
/:username/projects     - Tous les projets
/:username/projects/:id - Détail d'un projet
```

### Routes admin

```
/admin/login           - Connexion
/admin/register        - Inscription
/admin/dashboard       - Dashboard (mes données)
```

## 💡 Exemples d'utilisation

### Utilisateur 1 : Daniel MAKOSSO

- **Slug** : `daniel-makosso`
- **URL** : `https://ton-site.com/daniel-makosso`
- **Données** : Ses projets, compétences, expériences

### Utilisateur 2 : Jean DUPONT

- **Slug** : `jean-dupont`
- **URL** : `https://ton-site.com/jean-dupont`
- **Données** : Ses projets, compétences, expériences

Chaque utilisateur voit uniquement ses propres données dans l'admin et peut gérer son portfolio indépendamment.

## 🔄 Migration des données existantes

Pour migrer les données existantes vers un utilisateur :

```javascript
// Script de migration
const userId = "ID_DE_L_UTILISATEUR";

// Mettre à jour tous les projets
await Project.updateMany({}, { $set: { userId } });

// Mettre à jour toutes les compétences
await Skill.updateMany({}, { $set: { userId } });

// Mettre à jour toutes les expériences
await Experience.updateMany({}, { $set: { userId } });

// Mettre à jour les infos personnelles
await PersonalInfo.updateMany({}, { $set: { userId } });
```

## 🚀 Avantages

1. **Isolation des données** : Chaque utilisateur a ses propres données
2. **URLs personnalisées** : Chaque utilisateur a son URL unique
3. **Gestion indépendante** : Chaque utilisateur gère son portfolio
4. **Scalabilité** : Peut supporter plusieurs utilisateurs
5. **Sécurité** : Les données sont protégées par userId

## 📝 Prochaines étapes

1. ✅ Modèles mis à jour avec `userId`
2. ⏳ Créer les routes publiques par slug
3. ⏳ Modifier les routes admin pour utiliser userId du token
4. ⏳ Créer un script de migration
5. ⏳ Mettre à jour le frontend pour supporter les slugs

---

**Dernière mise à jour** : 3 avril 2026
**Statut** : 🚧 En cours d'implémentation
