# 📝 Commandes Utiles - Système Multi-Utilisateurs

## Backend

### Développement

```bash
# Démarrer le serveur en mode développement
cd backend
npm run dev

# Démarrer le serveur en mode production
npm start
```

### Base de Données

```bash
# Initialiser la base de données
npm run init-db

# Insérer les données statiques (projets et compétences de démo)
npm run seed

# Migrer les données existantes vers le système multi-utilisateurs
npm run migrate
```

### Tests

```bash
# Tester le système multi-utilisateurs
npm run test-multi-user

# Vérifier le déploiement
npm run check-deploy
```

---

## Frontend

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

### Linting

```bash
# Vérifier le code
npm run lint
```

---

## Tests API avec curl

### Authentification

```bash
# Inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "John Doe",
    "email": "john@example.com",
    "mot_de_passe": "password123"
  }'

# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "mot_de_passe": "password123"
  }'
```

### Sous-domaine

```bash
# Récupérer les infos de sous-domaine
curl -X GET http://localhost:5000/api/admin/subdomain \
  -H "Authorization: Bearer VOTRE_TOKEN"

# Configurer le sous-domaine
curl -X PUT http://localhost:5000/api/admin/subdomain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "subdomain": "john-doe"
  }'
```

### Projets

```bash
# Récupérer les projets de l'utilisateur connecté
curl -X GET http://localhost:5000/api/admin/projects \
  -H "Authorization: Bearer VOTRE_TOKEN"

# Créer un projet
curl -X POST http://localhost:5000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "titre": "Mon Projet",
    "description": "Description du projet",
    "technologies": ["React", "Node.js"],
    "statut": "actif"
  }'

# Modifier un projet
curl -X PUT http://localhost:5000/api/admin/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "titre": "Projet Modifié",
    "description": "Nouvelle description"
  }'

# Supprimer un projet
curl -X DELETE http://localhost:5000/api/admin/projects/PROJECT_ID \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Compétences

```bash
# Récupérer les compétences de l'utilisateur connecté
curl -X GET http://localhost:5000/api/admin/skills \
  -H "Authorization: Bearer VOTRE_TOKEN"

# Créer une compétence
curl -X POST http://localhost:5000/api/admin/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "nom": "React",
    "niveau": 90,
    "categorie": "Frontend"
  }'

# Modifier une compétence
curl -X PUT http://localhost:5000/api/admin/skills/SKILL_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "nom": "React",
    "niveau": 95
  }'

# Supprimer une compétence
curl -X DELETE http://localhost:5000/api/admin/skills/SKILL_ID \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Routes Publiques

```bash
# Récupérer les infos d'un utilisateur par userId
curl -X GET "http://localhost:5000/api/portfolio/info?userId=USER_ID"

# Récupérer les projets d'un utilisateur par userId
curl -X GET "http://localhost:5000/api/portfolio/projects?userId=USER_ID"

# Récupérer les compétences d'un utilisateur par userId
curl -X GET "http://localhost:5000/api/portfolio/skills?userId=USER_ID"

# Récupérer les expériences d'un utilisateur par userId
curl -X GET "http://localhost:5000/api/experience?userId=USER_ID"
```

### Routes Publiques par Sous-domaine

```bash
# Récupérer les infos via sous-domaine
curl -X GET http://localhost:5000/api/public/john-doe/info

# Récupérer les projets via sous-domaine
curl -X GET http://localhost:5000/api/public/john-doe/projects

# Récupérer les compétences via sous-domaine
curl -X GET http://localhost:5000/api/public/john-doe/skills

# Récupérer les expériences via sous-domaine
curl -X GET http://localhost:5000/api/public/john-doe/experiences
```

---

## Git

### Workflow Standard

```bash
# Vérifier le statut
git status

# Ajouter tous les fichiers modifiés
git add .

# Commit avec message
git commit -m "feat: implémentation système multi-utilisateurs"

# Push vers le dépôt
git push origin main
```

### Branches

```bash
# Créer une nouvelle branche
git checkout -b feature/multi-user

# Changer de branche
git checkout main

# Fusionner une branche
git merge feature/multi-user

# Supprimer une branche
git branch -d feature/multi-user
```

---

## Déploiement

### Vercel (Backend)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd backend
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs
```

### Netlify (Frontend)

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod

# Voir les logs
netlify logs
```

---

## MongoDB

### Connexion

```bash
# Se connecter à MongoDB
mongosh "mongodb+srv://..."

# Lister les bases de données
show dbs

# Utiliser une base de données
use portfolio

# Lister les collections
show collections
```

### Requêtes Utiles

```bash
# Compter les utilisateurs
db.users.countDocuments()

# Trouver tous les utilisateurs
db.users.find()

# Trouver un utilisateur par email
db.users.findOne({ email: "john@example.com" })

# Compter les projets par utilisateur
db.projects.aggregate([
  { $group: { _id: "$userId", count: { $sum: 1 } } }
])

# Trouver les projets sans userId (à migrer)
db.projects.find({ userId: { $exists: false } })

# Supprimer les données de test
db.users.deleteMany({ email: { $regex: "@test.com" } })
```

### Backup et Restauration

```bash
# Backup de la base de données
mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)

# Restaurer la base de données
mongorestore --uri="mongodb+srv://..." backup-20240404/

# Backup d'une collection spécifique
mongodump --uri="mongodb+srv://..." --collection=users --out=backup-users

# Restaurer une collection spécifique
mongorestore --uri="mongodb+srv://..." --collection=users backup-users/portfolio/users.bson
```

---

## DNS

### Vérifier la Configuration

```bash
# Vérifier un domaine
nslookup danielmb.com

# Vérifier un sous-domaine
nslookup john.danielmb.com

# Vérifier les enregistrements DNS
dig danielmb.com

# Vérifier les enregistrements wildcard
dig *.danielmb.com
```

---

## Monitoring

### Logs Backend

```bash
# Logs Vercel
vercel logs danielmb-api

# Logs en temps réel
vercel logs danielmb-api --follow
```

### Logs Frontend

```bash
# Logs Netlify
netlify logs

# Logs de build
netlify logs --build
```

### Monitoring MongoDB

```bash
# Statistiques de la base
db.stats()

# Statistiques d'une collection
db.projects.stats()

# Index utilisés
db.projects.getIndexes()

# Performances des requêtes
db.projects.find({ userId: "..." }).explain("executionStats")
```

---

## Utilitaires

### Générer un Secret JWT

```bash
# Générer un secret aléatoire
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Tester la Connexion MongoDB

```bash
# Tester la connexion
mongosh "mongodb+srv://..." --eval "db.adminCommand('ping')"
```

### Vérifier les Variables d'Environnement

```bash
# Backend
cd backend
cat .env

# Frontend
cat .env
```

---

## Troubleshooting

### Backend ne démarre pas

```bash
# Vérifier les dépendances
cd backend
npm install

# Vérifier les variables d'environnement
cat .env

# Vérifier la connexion MongoDB
mongosh "mongodb+srv://..."
```

### Frontend ne démarre pas

```bash
# Vérifier les dépendances
npm install

# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install

# Vérifier les variables d'environnement
cat .env
```

### Erreurs de CORS

```bash
# Vérifier la configuration CORS dans backend/server.js
# Vérifier que VITE_API_URL pointe vers le bon backend
```

### Sous-domaines ne fonctionnent pas

```bash
# Vérifier la configuration DNS
nslookup john.danielmb.com

# Vérifier le middleware subdomain dans backend/server.js
# Vérifier que MAIN_DOMAIN est configuré dans .env
```

---

## Scripts Personnalisés

### Créer un Utilisateur Admin

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const user = await User.create({
    nom: 'Admin',
    email: 'admin@example.com',
    mot_de_passe: 'admin123',
    role: 'admin',
    slug: 'admin',
    subdomain: 'admin'
  });
  console.log('Admin créé:', user.email);
  process.exit(0);
});
"
```

### Lister Tous les Utilisateurs

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const users = await User.find().select('nom email subdomain');
  console.table(users.map(u => ({
    nom: u.nom,
    email: u.email,
    subdomain: u.subdomain
  })));
  process.exit(0);
});
"
```

---

**Dernière mise à jour**: 4 avril 2026
