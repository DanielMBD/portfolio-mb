# Système d'utilisateur par défaut

## Vue d'ensemble

Le système affiche maintenant automatiquement les données de l'utilisateur par défaut (premier utilisateur créé) pour tous les visiteurs non connectés qui accèdent au site sans sous-domaine spécifique.

## Fonctionnement

### Backend

Toutes les routes publiques du portfolio utilisent maintenant l'utilisateur par défaut si aucun `userId` n'est fourni:

1. **Routes Portfolio** (`backend/routes/portfolio.js`)
   - `/api/portfolio/info` - Informations personnelles
   - `/api/portfolio/projects` - Liste des projets
   - `/api/portfolio/projects/:id` - Détail d'un projet
   - `/api/portfolio/skills` - Compétences

2. **Routes Experience** (`backend/routes/experience.js`)
   - `/api/experience` - Liste des expériences

### Logique de sélection de l'utilisateur

```javascript
// Si pas d'userId fourni, utiliser l'utilisateur par défaut
if (!userId) {
  const defaultUser = await User.findOne().sort({ createdAt: 1 });
  if (defaultUser) {
    userId = defaultUser._id;
  }
}
```

L'utilisateur par défaut est le premier utilisateur créé dans la base de données (trié par `createdAt` ascendant).

### Méthode statique ajoutée

Dans `backend/models/User.js`:

```javascript
userSchema.statics.getDefaultUser = function () {
  return this.findOne({ isActive: true }).sort({ createdAt: 1 });
};
```

## Frontend

### Nouveau hook

Ajout du hook `useProject` dans `src/hooks/usePortfolio.ts`:

```typescript
export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("ID du projet requis");
      try {
        return await apiService.getProjectById(id);
      } catch (error) {
        // Fallback vers les données statiques
        const project = staticProjects.find((p) => p._id === id);
        if (!project) throw new Error("Projet non trouvé");
        return project;
      }
    },
    enabled: !!id,
  });
};
```

### Nouvelle méthode API

Dans `src/services/api.ts`:

```typescript
async getProjectById(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`);
  if (!response.ok) {
    throw new Error("Projet non trouvé");
  }
  return await response.json();
}
```

### Page ProjectDetail mise à jour

La page `src/pages/ProjectDetail.tsx` utilise maintenant le hook `useProject` pour charger directement un projet par son ID au lieu de charger tous les projets.

## Comportement

### Visiteur non connecté (sans sous-domaine)

- Accède à `https://votresite.com`
- Voit les données du premier utilisateur créé (utilisateur par défaut)
- Peut naviguer dans tous les projets, compétences, expériences de cet utilisateur

### Visiteur avec sous-domaine

- Accède à `https://daniel.votresite.com`
- Voit les données de l'utilisateur "daniel"
- Le middleware `subdomain.js` détecte le sous-domaine et charge l'utilisateur correspondant

### Utilisateur connecté (admin)

- Accède à `https://votresite.com/admin`
- Voit et modifie uniquement ses propres données
- Les routes admin filtrent automatiquement par `req.user.id`

## Avantages

1. **Expérience utilisateur fluide**: Les visiteurs voient toujours du contenu, même sans sous-domaine
2. **Fallback intelligent**: Si l'API échoue, les données statiques sont utilisées
3. **Isolation des données**: Chaque utilisateur ne voit que ses propres données dans l'admin
4. **Flexibilité**: Supporte à la fois l'accès par défaut et par sous-domaine

## Routes mises à jour

### Backend

- ✅ `backend/routes/portfolio.js` - Toutes les routes
- ✅ `backend/routes/experience.js` - Route publique
- ✅ `backend/models/User.js` - Méthode `getDefaultUser()`

### Frontend

- ✅ `src/services/api.ts` - Méthode `getProjectById()`
- ✅ `src/hooks/usePortfolio.ts` - Hook `useProject()`
- ✅ `src/pages/ProjectDetail.tsx` - Utilisation du nouveau hook

## Prochaines étapes

Pour une expérience complète du système multi-utilisateur:

1. Configurer le DNS pour les sous-domaines wildcard (\*.votresite.com)
2. Tester l'accès via sous-domaine en local avec `/etc/hosts`
3. Déployer sur un environnement supportant les sous-domaines wildcard
4. Permettre aux utilisateurs de personnaliser leur sous-domaine via l'admin
