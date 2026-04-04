# Déploiement du Système Multi-Utilisateurs

## Étapes de Déploiement

### 1. Backend (Vercel)

Le backend est déjà déployé sur Vercel. Ajoutez les variables d'environnement suivantes:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=votre_secret_jwt
MAIN_DOMAIN=danielmb.com
MAX_FILE_SIZE=5242880
```

### 2. Migration des Données

Après le déploiement, exécutez la migration pour assigner les données existantes à un utilisateur:

```bash
cd backend
npm run migrate
```

### 3. Frontend (Netlify/Vercel)

Ajoutez les variables d'environnement:

```env
VITE_API_URL=https://danielmb-api.vercel.app/api
VITE_MAIN_DOMAIN=danielmb.com
```

Déployez le frontend:

```bash
npm run build
```

### 4. Configuration DNS pour Sous-domaines

Pour que les sous-domaines fonctionnent, configurez un enregistrement DNS wildcard:

**Chez votre registrar DNS:**

- Type: `A` ou `CNAME`
- Nom: `*` (wildcard)
- Valeur: Adresse IP de votre serveur ou domaine principal

Exemple:

```
*.danielmb.com → danielmb.com
```

Cela permettra à tous les sous-domaines (`john.danielmb.com`, `jane.danielmb.com`, etc.) de pointer vers votre application.

### 5. Configuration Netlify/Vercel pour Sous-domaines

#### Netlify

Dans `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

Netlify gère automatiquement les sous-domaines wildcard si configurés dans les DNS.

#### Vercel

Dans `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Vercel supporte également les sous-domaines wildcard automatiquement.

## Test du Système

### 1. Créer des Utilisateurs

```bash
# Utilisateur 1
curl -X POST https://danielmb-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "John Doe",
    "email": "john@example.com",
    "mot_de_passe": "password123"
  }'

# Utilisateur 2
curl -X POST https://danielmb-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jane Smith",
    "email": "jane@example.com",
    "mot_de_passe": "password123"
  }'
```

### 2. Se Connecter

```bash
curl -X POST https://danielmb-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "mot_de_passe": "password123"
  }'
```

Récupérez le token JWT de la réponse.

### 3. Configurer le Sous-domaine

```bash
curl -X PUT https://danielmb-api.vercel.app/api/admin/subdomain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "subdomain": "john-doe"
  }'
```

### 4. Ajouter des Données

```bash
# Ajouter un projet
curl -X POST https://danielmb-api.vercel.app/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "titre": "Mon Projet",
    "description": "Description du projet",
    "technologies": ["React", "Node.js"],
    "statut": "actif"
  }'
```

### 5. Accéder au Portfolio

Visitez: `https://john-doe.danielmb.com`

## Vérification

### Backend

```bash
# Vérifier que l'API fonctionne
curl https://danielmb-api.vercel.app/api/health

# Vérifier les données d'un utilisateur via sous-domaine
curl https://danielmb-api.vercel.app/api/public/john-doe/info
```

### Frontend

1. Ouvrez `https://danielmb.com/admin/login`
2. Connectez-vous avec un utilisateur
3. Vérifiez que vous ne voyez que vos propres données
4. Allez dans "Sous-domaine" et configurez votre sous-domaine
5. Visitez votre sous-domaine pour voir votre portfolio

## Troubleshooting

### Les sous-domaines ne fonctionnent pas

1. Vérifiez la configuration DNS (peut prendre 24-48h pour se propager)
2. Vérifiez que le wildcard `*` est bien configuré
3. Testez avec `nslookup john-doe.danielmb.com`

### Les données ne sont pas filtrées par utilisateur

1. Vérifiez que le token JWT est valide
2. Vérifiez que le middleware `authenticateToken` est appliqué
3. Vérifiez les logs backend pour voir le `userId` extrait

### Erreur "Sous-domaine déjà utilisé"

1. Choisissez un autre sous-domaine
2. Ou contactez l'administrateur pour libérer le sous-domaine

## Monitoring

### Logs Backend (Vercel)

```bash
vercel logs danielmb-api
```

### Logs Frontend (Netlify)

Consultez le dashboard Netlify pour voir les logs de déploiement et les erreurs.

## Maintenance

### Backup de la Base de Données

```bash
mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)
```

### Restauration

```bash
mongorestore --uri="mongodb+srv://..." backup-20240404/
```

## Support

Pour toute question ou problème:

1. Consultez les logs backend et frontend
2. Vérifiez la documentation dans `MULTI_USER_GUIDE.md`
3. Vérifiez la configuration DNS
4. Testez les endpoints API avec curl ou Postman
