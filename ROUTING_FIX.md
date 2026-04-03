# 🔧 Fix - Erreur 404 sur les routes en production

## Problème

Lorsque tu accèdes directement à une route comme `/projects` ou `/projects/:id` en production, tu obtiens une erreur 404.

## Cause

Les applications React (SPA - Single Page Application) utilisent le routing côté client. Quand tu accèdes à `/projects`, le serveur cherche un fichier `projects.html` qui n'existe pas. Il faut rediriger toutes les routes vers `index.html` pour que React Router puisse gérer la navigation.

## Solution

J'ai créé les fichiers de configuration nécessaires pour différents hébergeurs :

### 1. Vercel (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Netlify (`netlify.toml`)

Déjà configuré avec :

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Autres hébergeurs (`public/_redirects`)

Fichier générique pour Netlify et autres :

```
/*    /index.html   200
```

## Déploiement

### Sur Vercel

1. Le fichier `vercel.json` sera automatiquement détecté
2. Redéployer le projet
3. Les routes fonctionneront correctement

### Sur Netlify

1. Le fichier `netlify.toml` est déjà configuré
2. Redéployer le projet
3. Les routes fonctionneront correctement

### Sur d'autres hébergeurs

#### Apache (.htaccess)

Créer un fichier `.htaccess` dans le dossier `public/` :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

Configuration dans le fichier nginx :

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Test

Après le déploiement, teste ces URLs :

- ✅ `https://ton-site.com/`
- ✅ `https://ton-site.com/projects`
- ✅ `https://ton-site.com/projects/123`
- ✅ `https://ton-site.com/admin/login`

Toutes devraient fonctionner sans erreur 404.

## Fichiers créés

1. `vercel.json` - Configuration Vercel
2. `public/_redirects` - Configuration générique
3. `ROUTING_FIX.md` - Ce guide

## Notes importantes

- ⚠️ Ces fichiers doivent être commités dans Git
- ⚠️ Après ajout, redéployer le projet
- ⚠️ Le fichier `vercel.json` à la racine est pour le frontend
- ⚠️ Le fichier `backend/vercel.json` est pour le backend

## Vérification

```bash
# Commit les changements
git add vercel.json public/_redirects ROUTING_FIX.md
git commit -m "Fix: Add routing configuration for production"
git push origin main
```

Vercel redéploiera automatiquement et les routes fonctionneront ! 🎉

---

**Dernière mise à jour** : 3 avril 2026
**Statut** : ✅ Résolu
