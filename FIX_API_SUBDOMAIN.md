# Fix - Erreur API Sous-domaine

## Problème

Erreur dans SubdomainManager : `TypeError: Re.get is not a function` et `TypeError: Re.put is not a function`

## Cause

Le fichier `src/services/api.ts` n'exportait pas de méthodes génériques `get`, `post`, `put`, `delete`. Il n'avait que des méthodes spécifiques pour chaque endpoint.

## Solution

### 1. Ajout des méthodes génériques dans api.ts

Ajouté 4 méthodes génériques dans la classe `ApiService` :

```typescript
async get<T = any>(endpoint: string): Promise<T>
async post<T = any>(endpoint: string, data: Record<string, any>): Promise<T>
async put<T = any>(endpoint: string, data: Record<string, any>): Promise<T>
async delete<T = any>(endpoint: string): Promise<T>
```

Ces méthodes permettent d'appeler n'importe quel endpoint de l'API de manière flexible.

### 2. Correction de SubdomainManager.tsx

- Corrigé l'accès aux données de la réponse : `response.subdomain` au lieu de `response.data.subdomain`
- Remplacé `error: any` par `error: unknown` avec vérification de type
- Ajouté `useCallback` pour `loadSubdomainInfo` pour éviter les warnings React
- Déplacé la fonction avant le `useEffect`

### 3. Correction des variables d'environnement

Mis à jour le domaine principal :

- `.env` : `VITE_MAIN_DOMAIN=daniel-mb.vercel.app`
- `.env.production` : `VITE_MAIN_DOMAIN=daniel-mb.vercel.app`

## Fichiers Modifiés

1. `src/services/api.ts` - Ajout des méthodes génériques
2. `src/components/admin/SubdomainManager.tsx` - Corrections TypeScript et React
3. `.env` - Mise à jour du domaine
4. `.env.production` - Mise à jour du domaine

## Test

Pour tester que tout fonctionne :

1. Connectez-vous à l'interface admin
2. Allez dans "Sous-domaine"
3. La page devrait se charger sans erreur
4. Entrez un sous-domaine et cliquez sur "Sauvegarder"
5. Le sous-domaine devrait être sauvegardé avec succès

## Résultat

✅ Les méthodes `api.get()` et `api.put()` fonctionnent maintenant correctement  
✅ SubdomainManager charge et sauvegarde les données sans erreur  
✅ Pas d'erreurs TypeScript  
✅ Pas de warnings React

---

**Date**: 4 avril 2026  
**Statut**: ✅ Corrigé
