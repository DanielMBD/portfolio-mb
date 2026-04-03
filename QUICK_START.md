# 🚀 Quick Start - Déploiement Portfolio

## Backend ✅ DÉJÀ DÉPLOYÉ

URL: `https://danielmb-api.vercel.app`

## Frontend - 3 étapes simples

### Étape 1: Configurer les variables sur Vercel

1. Va sur https://vercel.com/dashboard
2. Sélectionne ton projet frontend (ou importe-le depuis GitHub)
3. Va dans **Settings** → **Environment Variables**
4. Ajoute cette variable:
   ```
   VITE_API_URL = https://danielmb-api.vercel.app/api
   ```

### Étape 2: Déployer

#### Via GitHub (Recommandé):

```bash
git add .
git commit -m "Ready for production"
git push origin main
```

Vercel déploiera automatiquement!

#### Via CLI:

```bash
npm install -g vercel
vercel --prod
```

### Étape 3: Tester

Visite ton site et vérifie que:

- ✅ Les projets s'affichent
- ✅ Les compétences s'affichent
- ✅ Le formulaire de contact fonctionne
- ✅ Le design bleu foncé est appliqué

## Fallback automatique

Si l'API ne répond pas, le site affichera automatiquement les données statiques (projets, compétences, etc.). Pas de panique!

## Besoin d'aide?

- 📖 Guide complet: `VERCEL_CONFIG.md`
- 🔧 Problèmes: `backend/TROUBLESHOOTING.md`
- 📊 Résumé: `DEPLOYMENT_SUMMARY.md`

## Test rapide de l'API

```bash
node test-api.js
```

C'est tout! 🎉
