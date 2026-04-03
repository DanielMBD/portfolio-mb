# Portfolio Backend - MongoDB

Backend API Node.js/Express/MongoDB pour le portfolio personnel de Mr MAKOSSO.

## 🗄️ Base de Données

**MongoDB Atlas** - Cloud Database

- Cluster : `cluster-dga-1`
- Base de données : `daniel-makosso`
- Tier : Gratuit (512MB)

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Configuration

Le fichier `.env` est déjà configuré avec MongoDB Atlas :

```env
MONGODB_URI=mongodb+srv://...@cluster-dga-1.xylzvke.mongodb.net/daniel-makosso
JWT_SECRET=votre_jwt_secret_tres_securise_ici
```

### Initialisation

```bash
npm run init-db
```

Cela créera :

- Utilisateur admin
- Informations personnelles
- 3 projets de démonstration
- 15 compétences
- 1 message de test

### Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📁 Structure

```
backend/
├── config/
│   └── database.js          # Connexion MongoDB
├── models/
│   ├── User.js              # Schéma utilisateur
│   ├── PersonalInfo.js      # Schéma infos personnelles
│   ├── Project.js           # Schéma projet
│   ├── Skill.js             # Schéma compétence
│   └── Contact.js           # Schéma message
├── routes/
│   ├── auth.js              # Routes authentification
│   ├── portfolio.js         # Routes publiques
│   ├── admin.js             # Routes admin
│   └── contact.js           # Routes contact
├── middleware/
│   └── auth.js              # Middleware JWT
├── scripts/
│   └── initDatabase.js      # Script d'initialisation
├── uploads/                 # Images uploadées
├── .env                     # Variables d'environnement
├── package.json
└── server.js                # Point d'entrée
```

## 🔌 API Routes

### Routes Publiques

#### Portfolio

- `GET /api/portfolio/info` - Informations personnelles
- `GET /api/portfolio/projects` - Liste des projets actifs
- `GET /api/portfolio/skills` - Compétences par catégorie

#### Contact

- `POST /api/contact` - Envoyer un message

### Routes Authentification

- `POST /api/auth/register` - Inscription admin
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/verify` - Vérifier le token
- `POST /api/auth/logout` - Déconnexion

### Routes Admin (JWT requis)

#### Informations

- `PUT /api/admin/personal-info` - Modifier les infos

#### Projets

- `GET /api/admin/projects` - Liste complète
- `POST /api/admin/projects` - Créer un projet
- `PUT /api/admin/projects/:id` - Modifier un projet
- `DELETE /api/admin/projects/:id` - Supprimer un projet

#### Compétences

- `GET /api/admin/skills` - Liste des compétences
- `POST /api/admin/skills` - Ajouter une compétence
- `PUT /api/admin/skills/:id` - Modifier une compétence
- `DELETE /api/admin/skills/:id` - Supprimer une compétence

#### Messages

- `GET /api/admin/contacts` - Liste des messages
- `PUT /api/admin/contacts/:id/read` - Marquer comme lu
- `DELETE /api/admin/contacts/:id` - Supprimer un message

#### Upload

- `POST /api/admin/upload` - Upload d'image

## 🗄️ Modèles MongoDB

### User

```javascript
{
  email: String (unique),
  password: String (haché),
  nom: String,
  role: String,
  last_login: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### PersonalInfo

```javascript
{
  nom_complet: String,
  profession: String,
  localisation: String,
  description_courte: String,
  photo_profil: String,
  email_contact: String,
  github_url: String,
  linkedin_url: String,
  facebook_url: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Project

```javascript
{
  titre: String,
  description: String,
  technologies: [String],
  image_url: String,
  github_url: String,
  demo_url: String,
  statut: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Skill

```javascript
{
  nom: String,
  niveau: Number (0-100),
  categorie: String,
  icone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact

```javascript
{
  nom: String,
  email: String,
  message: String,
  ip_address: String,
  is_read: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Sécurité

- ✅ Authentification JWT avec expiration
- ✅ Mots de passe hachés avec bcrypt (12 rounds)
- ✅ Protection CORS
- ✅ Rate limiting (100 req/15min)
- ✅ Validation des données (Express Validator)
- ✅ Headers sécurisés (Helmet)
- ✅ Upload sécurisé (validation type/taille)
- ✅ Connexion SSL/TLS avec MongoDB Atlas

## 📦 Dépendances

### Production

- `express` - Framework web
- `mongoose` - ODM MongoDB
- `jsonwebtoken` - Authentification JWT
- `bcryptjs` - Hachage de mots de passe
- `cors` - Protection CORS
- `dotenv` - Variables d'environnement
- `multer` - Upload de fichiers
- `express-validator` - Validation des données
- `helmet` - Sécurité headers
- `express-rate-limit` - Rate limiting
- `nodemailer` - Envoi d'emails

### Développement

- `nodemon` - Rechargement automatique

## 🧪 Scripts

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Initialiser la base de données
npm run init-db
```

## 🌐 Variables d'Environnement

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=votre_cle_secrete
JWT_EXPIRES_IN=24h

# Serveur
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# Admin par défaut
ADMIN_EMAIL=admin@makosso-portfolio.com
ADMIN_PASSWORD=AdminSecure123!

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@makosso-portfolio.com
```

## 🔧 Développement

### Ajouter un Nouveau Modèle

1. Créer le schéma dans `models/`
2. Ajouter les routes dans `routes/`
3. Mettre à jour le script d'initialisation

### Tester l'API

```bash
# Health check
curl http://localhost:5000/api/health

# Projets
curl http://localhost:5000/api/portfolio/projects

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@makosso-portfolio.com","password":"AdminSecure123!"}'
```

## 📊 Monitoring

### MongoDB Atlas

1. Aller sur [cloud.mongodb.com](https://cloud.mongodb.com)
2. Sélectionner votre cluster
3. Voir les métriques en temps réel

### Logs

Les logs sont affichés dans la console :

```
✅ Connexion MongoDB établie avec succès
🚀 Serveur portfolio démarré sur le port 5000
📊 Environnement: development
🗄️  Base de données: MongoDB
```

## 🚀 Déploiement

### Plateformes Compatibles

- Railway
- Render
- Heroku
- DigitalOcean
- AWS
- Vercel (serverless)

### Configuration Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=cle_secrete_production_forte
FRONTEND_URL=https://votre-domaine.com
```

## 🆘 Dépannage

### Erreur de Connexion MongoDB

- Vérifier l'URI dans `.env`
- Vérifier la connexion internet
- Vérifier l'IP whitelist dans MongoDB Atlas

### Port Déjà Utilisé

```bash
# Changer le port dans .env
PORT=5001
```

### Réinstaller les Dépendances

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express Documentation](https://expressjs.com/)

---

**Développé avec ❤️ pour Mr MAKOSSO**
