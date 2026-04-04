# Guide du Système Multi-Utilisateurs

## Vue d'ensemble

Le système multi-utilisateurs permet à chaque utilisateur d'avoir son propre portfolio avec ses propres données (projets, compétences, expériences, informations personnelles). Chaque utilisateur peut également créer son propre sous-domaine personnalisé.

## Architecture

### Backend

Toutes les données sont maintenant liées à un `userId`:

- **PersonalInfo**: Informations personnelles de l'utilisateur
- **Project**: Projets de l'utilisateur
- **Skill**: Compétences de l'utilisateur
- **Experience**: Expériences professionnelles de l'utilisateur

### Routes API

#### Routes Admin (authentifiées)

Toutes les routes admin filtrent automatiquement par `userId` du token JWT:

- `GET /api/admin/personal-info` - Récupérer les infos personnelles de l'utilisateur
- `PUT /api/admin/personal-info` - Mettre à jour les infos personnelles
- `GET /api/admin/projects` - Récupérer les projets de l'utilisateur
- `POST /api/admin/projects` - Créer un projet
- `PUT /api/admin/projects/:id` - Mettre à jour un projet
- `DELETE /api/admin/projects/:id` - Supprimer un projet
- `GET /api/admin/skills` - Récupérer les compétences de l'utilisateur
- `POST /api/admin/skills` - Créer une compétence
- `PUT /api/admin/skills/:id` - Mettre à jour une compétence
- `DELETE /api/admin/skills/:id` - Supprimer une compétence
- `GET /api/admin/subdomain` - Récupérer les infos de sous-domaine
- `PUT /api/admin/subdomain` - Mettre à jour le sous-domaine

#### Routes Publiques

Les routes publiques acceptent un paramètre `userId` en query pour filtrer:

- `GET /api/portfolio/info?userId=xxx` - Infos personnelles d'un utilisateur
- `GET /api/portfolio/projects?userId=xxx` - Projets d'un utilisateur
- `GET /api/portfolio/skills?userId=xxx` - Compétences d'un utilisateur
- `GET /api/experience?userId=xxx` - Expériences d'un utilisateur

#### Routes Publiques par Sous-domaine

Les routes publiques peuvent également utiliser le middleware subdomain:

- `GET /api/public/:subdomain/info` - Infos via sous-domaine
- `GET /api/public/:subdomain/projects` - Projets via sous-domaine
- `GET /api/public/:subdomain/skills` - Compétences via sous-domaine
- `GET /api/public/:subdomain/experiences` - Expériences via sous-domaine

## Configuration du Sous-domaine

### Interface Admin

1. Connectez-vous à l'interface admin
2. Allez dans "Sous-domaine" dans le menu
3. Entrez votre sous-domaine souhaité (ex: `john-doe`)
4. Cliquez sur "Sauvegarder"

Votre portfolio sera accessible sur: `https://john-doe.danielmb.com`

### Règles de Validation

- Lettres minuscules uniquement
- Chiffres autorisés
- Tirets autorisés
- Entre 3 et 30 caractères
- Sous-domaines réservés interdits: `www`, `api`, `admin`, `app`, `mail`, `ftp`, `localhost`, `staging`, `dev`, `test`, `demo`, `blog`, `shop`, `store`

### Domaine Personnalisé (optionnel)

Vous pouvez également configurer un domaine personnalisé (ex: `portfolio.monsite.com`).

**Configuration DNS requise:**

- Créez un enregistrement CNAME pointant vers votre domaine principal
- Exemple: `portfolio.monsite.com` → `danielmb.com`

## Migration des Données Existantes

Si vous avez déjà des données en base avant l'implémentation du système multi-utilisateurs, exécutez le script de migration:

```bash
cd backend
npm run migrate
```

Ce script:

1. Trouve le premier utilisateur admin
2. Assigne toutes les données existantes à cet utilisateur
3. Si aucun admin n'existe, crée un utilisateur par défaut

## Variables d'Environnement

### Backend (.env)

```env
MONGODB_URI=mongodb://...
JWT_SECRET=votre_secret
MAIN_DOMAIN=danielmb.com
```

### Frontend (.env)

```env
VITE_API_URL=https://danielmb-api.vercel.app/api
VITE_MAIN_DOMAIN=danielmb.com
```

## Workflow Utilisateur

### 1. Inscription

- L'utilisateur s'inscrit via `/admin/register`
- Un compte est créé avec un `userId` unique
- Un `slug` est généré automatiquement

### 2. Configuration du Portfolio

- L'utilisateur se connecte à `/admin/login`
- Il configure ses informations personnelles
- Il ajoute ses projets, compétences, expériences

### 3. Configuration du Sous-domaine

- L'utilisateur va dans "Sous-domaine"
- Il choisit son sous-domaine personnalisé
- Le système vérifie la disponibilité

### 4. Accès Public

- Le portfolio est accessible via le sous-domaine
- Exemple: `https://john-doe.danielmb.com`
- Ou via domaine personnalisé si configuré

## Sécurité

- Toutes les routes admin nécessitent un token JWT valide
- Le `userId` est extrait du token, pas des paramètres de requête
- Chaque opération vérifie que la ressource appartient à l'utilisateur
- Les sous-domaines réservés sont protégés
- Validation stricte des formats de sous-domaines

## Tests

### Tester en Local

1. Créez plusieurs utilisateurs via `/admin/register`
2. Connectez-vous avec chaque utilisateur
3. Ajoutez des données différentes pour chaque utilisateur
4. Vérifiez que chaque utilisateur ne voit que ses propres données

### Tester les Sous-domaines

En production, les sous-domaines fonctionneront automatiquement. En local, vous pouvez:

1. Modifier votre fichier `hosts` pour simuler des sous-domaines
2. Ou utiliser des services comme `ngrok` avec support des sous-domaines

## Prochaines Étapes

- [ ] Implémenter la détection automatique du sous-domaine côté frontend
- [ ] Créer une page d'accueil listant tous les portfolios publics
- [ ] Ajouter des statistiques de visites par utilisateur
- [ ] Implémenter un système de thèmes personnalisables par utilisateur
- [ ] Ajouter la gestion des domaines personnalisés dans l'interface admin
