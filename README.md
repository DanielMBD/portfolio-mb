# Portfolio Personnel - Mr MAKOSSO

Portfolio moderne et interactif développé avec React, TypeScript, et Node.js pour présenter les compétences et projets de Mr MAKOSSO, étudiant en Génie Logiciel.

## 🚀 Fonctionnalités

### Frontend
- ✨ Interface moderne avec React 18 + TypeScript
- 🎨 Design responsive avec Tailwind CSS et Shadcn/ui
- 🌓 Mode sombre/clair
- 📱 Optimisé mobile-first
- 🔐 Interface d'administration sécurisée
- 📧 Formulaire de contact avec EmailJS
- 🎯 Navigation fluide et animations

### Backend
- 🔐 API REST avec authentification JWT
- 🗄️ Base de données MySQL
- 📊 Gestion complète du portfolio (projets, compétences, infos)
- 📧 Système de contact avec stockage
- 🛡️ Sécurité renforcée (Helmet, CORS, Rate limiting)
- 📁 Upload d'images pour projets et profil

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd portfolio-makosso
```

### 2. Installation Frontend
```bash
npm install
```

### 3. Installation Backend
```bash
cd backend
npm install
```

### 4. Configuration de la base de données
```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE portfolio_makosso;
exit
```

### 5. Configuration Backend
```bash
# Le fichier .env existe déjà dans backend/
# Vérifier et modifier si nécessaire :
cd backend
nano .env
```

Variables importantes dans `.env` :
- `DB_PASSWORD` : Mot de passe MySQL
- `JWT_SECRET` : Clé secrète pour JWT
- `FRONTEND_URL` : URL du frontend (http://localhost:8080)
- `SMTP_*` : Configuration email (optionnel)

### 6. Initialiser la base de données
```bash
cd backend
npm run init-db
```

Cela créera :
- Les tables nécessaires
- Un utilisateur admin par défaut
- Des données de démonstration

### 7. Créer le dossier uploads
```bash
cd backend
mkdir uploads
```

## 🚀 Démarrage

### Mode Développement

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```
Le backend démarre sur `http://localhost:5000`

**Terminal 2 - Frontend :**
```bash
npm run dev
```
Le frontend démarre sur `http://localhost:8080`

### Mode Production

**Build Frontend :**
```bash
npm run build
```

**Démarrer Backend :**
```bash
cd backend
npm start
```

## 🔑 Accès Admin

Par défaut après initialisation :
- URL : `http://localhost:8080/admin/login`
- Email : `admin@makosso-portfolio.com`
- Mot de passe : `AdminSecure123!`

## 📁 Structure du Projet

```
portfolio-makosso/
├── backend/                 # API Node.js/Express
│   ├── config/             # Configuration DB
│   ├── middleware/         # Middleware auth
│   ├── models/             # Modèles de données
│   ├── routes/             # Routes API
│   ├── scripts/            # Scripts d'initialisation
│   ├── uploads/            # Images uploadées
│   ├── .env                # Variables d'environnement
│   └── server.js           # Point d'entrée
├── src/
│   ├── components/         # Composants React
│   │   ├── admin/         # Interface admin
│   │   ├── sections/      # Sections du portfolio
│   │   └── ui/            # Composants Shadcn/ui
│   ├── contexts/          # Contextes React
│   ├── hooks/             # Hooks personnalisés
│   ├── pages/             # Pages de l'application
│   ├── services/          # Services API
│   └── types/             # Types TypeScript
└── public/                # Assets statiques
```

## 🔌 API Endpoints

### Routes Publiques
- `GET /api/portfolio/info` - Informations personnelles
- `GET /api/portfolio/projects` - Liste des projets
- `GET /api/portfolio/skills` - Compétences
- `POST /api/contact` - Envoyer un message

### Routes Admin (JWT requis)
- `POST /api/auth/login` - Connexion
- `PUT /api/admin/personal-info` - Modifier infos
- `POST /api/admin/projects` - Créer projet
- `PUT /api/admin/projects/:id` - Modifier projet
- `DELETE /api/admin/projects/:id` - Supprimer projet
- `POST /api/admin/skills` - Ajouter compétence
- `GET /api/admin/contacts` - Messages reçus

## 🛡️ Sécurité

- Authentification JWT avec expiration
- Mots de passe hachés avec bcrypt
- Protection CORS
- Rate limiting
- Helmet pour headers sécurisés
- Validation des données

## 🧪 Scripts Disponibles

### Frontend
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualiser le build
- `npm run lint` - Linter le code

### Backend
- `npm run dev` - Serveur avec nodemon
- `npm start` - Serveur de production
- `npm run init-db` - Initialiser la DB

## 📦 Technologies Utilisées

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router
- React Query
- EmailJS
- Lucide Icons

### Backend
- Node.js
- Express
- MySQL2
- JWT
- Bcrypt
- Multer
- Helmet
- CORS

## 🚀 Déploiement

### Frontend (Netlify/Vercel)
1. Build : `npm run build`
2. Déployer le dossier `dist/`
3. Configurer les variables d'environnement

### Backend (Heroku/DigitalOcean)
1. Configurer MySQL hébergé
2. Définir les variables d'environnement
3. Déployer avec `npm start`

## 📝 Personnalisation

1. Modifier les informations dans l'interface admin
2. Ajouter vos projets et compétences
3. Personnaliser les couleurs dans `tailwind.config.ts`
4. Modifier les sections dans `src/components/sections/`

## 🐛 Dépannage

**Erreur de connexion DB :**
- Vérifier que MySQL est démarré
- Vérifier les credentials dans `.env`
- Vérifier que la DB existe

**Erreur CORS :**
- Vérifier `FRONTEND_URL` dans backend `.env`
- Vérifier le port du frontend (8080)

**Images non affichées :**
- Vérifier que le dossier `backend/uploads` existe
- Vérifier les permissions du dossier

## 📧 Contact

Pour toute question ou suggestion :
- Email : contact@makosso-portfolio.com
- GitHub : [Votre profil GitHub]

---

**Développé avec ❤️ par Mr MAKOSSO - Étudiant en Génie Logiciel**
# daniel-mb
