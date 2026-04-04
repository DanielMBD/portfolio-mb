# 🌐 Système de Sous-domaines Personnalisés

## 🎯 Concept

Chaque utilisateur peut avoir son propre sous-domaine pour accéder à son portfolio de manière personnalisée.

## 📍 Types d'accès

### 1. Sous-domaine automatique

Généré automatiquement à partir du nom de l'utilisateur lors de l'inscription.

**Exemple :**

- Nom : "Daniel MAKOSSO"
- Sous-domaine : `daniel-makosso`
- URL : `https://daniel-makosso.ton-site.com`

### 2. Sous-domaine personnalisé

L'utilisateur peut choisir son propre sous-domaine depuis son dashboard.

**Exemple :**

- Sous-domaine choisi : `daniel`
- URL : `https://daniel.ton-site.com`

### 3. Domaine personnalisé (optionnel)

L'utilisateur peut connecter son propre domaine.

**Exemple :**

- Domaine : `danielmakosso.com`
- Configuration DNS : CNAME vers `ton-site.com`

### 4. Accès par slug (fallback)

Si pas de sous-domaine, accès via le slug dans l'URL.

**Exemple :**

- URL : `https://ton-site.com/daniel-makosso`

## 🔧 Configuration technique

### Backend

#### Modèle User

```javascript
{
  nom: "Daniel MAKOSSO",
  email: "daniel@example.com",
  slug: "daniel-makosso",           // Pour URL /daniel-makosso
  subdomain: "daniel-makosso",      // Pour daniel-makosso.ton-site.com
  customDomain: null,               // Pour domaine personnalisé
  isActive: true
}
```

#### Middleware de détection

Le middleware `subdomain.js` détecte automatiquement :

1. Si la requête vient d'un domaine personnalisé
2. Si la requête vient d'un sous-domaine
3. Charge l'utilisateur correspondant dans `req.portfolioUser`

#### Routes publiques

```
GET /api/public/info          - Infos personnelles
GET /api/public/projects      - Projets
GET /api/public/projects/:id  - Détail projet
GET /api/public/skills        - Compétences
GET /api/public/experience    - Expériences
GET /api/public/user          - Info utilisateur
```

### Frontend

#### Détection du contexte

```javascript
// Détecter si on est sur un sous-domaine
const isSubdomain = window.location.hostname !== "ton-site.com";

// Adapter les appels API
const API_URL = isSubdomain
  ? "/api/public" // Sous-domaine
  : "/api/portfolio"; // Site principal
```

## 🚀 Configuration DNS

### Pour les sous-domaines

Ajouter un enregistrement wildcard dans votre DNS :

```
Type: A
Name: *
Value: [IP de votre serveur]
TTL: 3600
```

Ou avec CNAME :

```
Type: CNAME
Name: *
Value: ton-site.com
TTL: 3600
```

### Pour les domaines personnalisés

L'utilisateur doit configurer :

```
Type: CNAME
Name: @  (ou www)
Value: ton-site.com
TTL: 3600
```

## 📝 Variables d'environnement

Ajouter dans `.env` :

```env
MAIN_DOMAIN=ton-site.com
ALLOW_CUSTOM_DOMAINS=true
RESERVED_SUBDOMAINS=www,api,admin,app,mail,ftp,blog
```

## 🎨 Interface utilisateur

### Dashboard Admin

Section "Mon sous-domaine" :

```
┌─────────────────────────────────────┐
│ Mon Sous-domaine                    │
├─────────────────────────────────────┤
│ Sous-domaine actuel:                │
│ daniel-makosso.ton-site.com         │
│                                     │
│ Personnaliser:                      │
│ [daniel        ].ton-site.com       │
│ [Vérifier disponibilité]            │
│                                     │
│ Domaine personnalisé (optionnel):   │
│ [danielmakosso.com]                 │
│ [Connecter mon domaine]             │
└─────────────────────────────────────┘
```

## 🔒 Sous-domaines réservés

Ces sous-domaines ne peuvent pas être utilisés :

- `www` - Site principal
- `api` - API
- `admin` - Administration
- `app` - Application
- `mail` - Email
- `ftp` - FTP
- `blog` - Blog
- `docs` - Documentation

## ✅ Validation

### Format du sous-domaine

- Longueur : 3-63 caractères
- Caractères autorisés : lettres (a-z), chiffres (0-9), tirets (-)
- Ne peut pas commencer ou finir par un tiret
- Doit être unique

### Exemples valides

- ✅ `daniel`
- ✅ `daniel-makosso`
- ✅ `daniel123`
- ✅ `d-makosso-2024`

### Exemples invalides

- ❌ `-daniel` (commence par tiret)
- ❌ `daniel-` (finit par tiret)
- ❌ `da` (trop court)
- ❌ `daniel@makosso` (caractère invalide)
- ❌ `www` (réservé)

## 🔄 Flux utilisateur

### 1. Inscription

```
1. Utilisateur s'inscrit avec nom "Daniel MAKOSSO"
2. Système génère automatiquement:
   - slug: "daniel-makosso"
   - subdomain: "daniel-makosso"
3. Portfolio accessible sur: daniel-makosso.ton-site.com
```

### 2. Personnalisation

```
1. Utilisateur va dans Dashboard > Paramètres
2. Change subdomain de "daniel-makosso" à "daniel"
3. Vérifie la disponibilité
4. Sauvegarde
5. Portfolio maintenant sur: daniel.ton-site.com
```

### 3. Domaine personnalisé

```
1. Utilisateur possède "danielmakosso.com"
2. Configure CNAME: danielmakosso.com → ton-site.com
3. Entre "danielmakosso.com" dans Dashboard
4. Système vérifie la configuration DNS
5. Active le domaine personnalisé
6. Portfolio accessible sur: danielmakosso.com
```

## 🧪 Tests

### Tester en local

```bash
# Modifier /etc/hosts (Linux/Mac) ou C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 daniel.localhost
127.0.0.1 jean.localhost

# Accéder à:
http://daniel.localhost:5000
http://jean.localhost:5000
```

### Tester en production

```bash
# Vérifier DNS
nslookup daniel.ton-site.com

# Tester l'accès
curl https://daniel.ton-site.com/api/public/info
```

## 📊 Avantages

1. **URLs personnalisées** : Chaque utilisateur a son URL unique
2. **Branding** : Possibilité d'utiliser son propre domaine
3. **SEO** : Meilleur référencement avec domaine dédié
4. **Professionnalisme** : Image plus professionnelle
5. **Isolation** : Données complètement séparées

## ⚠️ Limitations

1. **DNS** : Nécessite configuration DNS wildcard
2. **SSL** : Certificat wildcard nécessaire (\*.ton-site.com)
3. **Hébergement** : Doit supporter les sous-domaines
4. **Domaines personnalisés** : Nécessite vérification DNS

## 🔐 Sécurité

- Validation stricte des sous-domaines
- Protection contre les sous-domaines réservés
- Vérification de disponibilité
- Isolation des données par userId
- Rate limiting par sous-domaine

---

**Dernière mise à jour** : 3 avril 2026
**Statut** : ✅ Implémenté

## 📦 Fichiers Implémentés

### Backend

- `backend/models/User.js` - Modèle avec slug, subdomain, customDomain
- `backend/middleware/subdomain.js` - Détection de sous-domaines
- `backend/routes/public.js` - Routes publiques par sous-domaine
- `backend/routes/admin.js` - Routes admin avec filtrage userId + gestion sous-domaine
- `backend/routes/portfolio.js` - Routes portfolio avec filtrage userId
- `backend/routes/experience.js` - Routes expérience avec filtrage userId
- `backend/scripts/migrateUserData.js` - Script de migration

### Frontend

- `src/components/admin/SubdomainManager.tsx` - Interface de gestion
- `src/pages/admin/AdminDashboard.tsx` - Intégration du composant
- `src/components/admin/AdminLayout.tsx` - Lien dans le menu

### Documentation

- `MULTI_USER_GUIDE.md` - Guide utilisateur complet
- `DEPLOYMENT_MULTI_USER.md` - Guide de déploiement
- `SUBDOMAIN_SYSTEM.md` - Documentation technique (ce fichier)

### Configuration

- `.env`, `.env.local`, `.env.production` - Variables VITE_MAIN_DOMAIN
- `backend/package.json` - Commande `npm run migrate`

## 🚀 Prochaines Étapes

1. Exécuter la migration: `cd backend && npm run migrate`
2. Déployer le backend sur Vercel avec les nouvelles routes
3. Déployer le frontend avec les nouvelles variables d'environnement
4. Configurer le DNS wildcard pour les sous-domaines
5. Tester avec plusieurs utilisateurs
