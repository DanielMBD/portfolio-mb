# 💼 Nouvelle section - Expérience Professionnelle

## ✅ Ce qui a été ajouté

### 1. Nouveau composant : Experience.tsx

- Section dédiée à l'expérience professionnelle
- Design moderne avec timeline
- Cards interactives avec hover effects
- Badges "En cours" pour les postes actuels
- Liens vers les sites web des entreprises

### 2. Entreprises ajoutées

#### CompanyViene

- **Poste** : Développeur Full Stack
- **Période** : 2024 - Présent
- **Site** : https://companyviene.com
- **Description** : Développement d'applications web modernes et solutions digitales pour les clients
- **Technologies** : React, Node.js, TypeScript, MongoDB

#### DevGroup Africa

- **Poste** : Développeur Web
- **Période** : 2023 - Présent
- **Site** : https://devgroup.ga
- **Description** : Participation au développement de projets web innovants et accompagnement technique
- **Technologies** : JavaScript, PHP, MySQL, TailwindCSS

### 3. Navigation mise à jour

- Ajout du lien "Expérience" dans le Header
- Navigation smooth scroll vers la section
- Disponible sur desktop et mobile

## 📂 Fichiers créés/modifiés

### Créés :

1. `src/components/sections/Experience.tsx` - Composant de la section expérience
2. `EXPERIENCE_SECTION.md` - Ce fichier

### Modifiés :

1. `src/pages/Index.tsx` - Ajout de la section Experience
2. `src/components/layout/Header.tsx` - Ajout du lien navigation

## 🎨 Design

### Caractéristiques :

- Background : `bg-muted/30` (fond légèrement teinté)
- Cards : Effet glass avec backdrop-blur
- Hover : Bordure primary et transition douce
- Icône : Briefcase avec fond primary/10
- Badge "En cours" : Avec point animé (pulse)
- Technologies : Badges avec fond muted

### Layout :

- Timeline verticale
- Cards avec icône à gauche
- Contenu structuré : Titre, poste, période, description, technologies, lien
- Responsive : Stack sur mobile, côte à côte sur desktop

## 📍 Position dans la page

Ordre des sections :

1. Hero
2. **Experience** ← Nouvelle section
3. Projects
4. Skills
5. Contact

## 🔗 Navigation

### Depuis le Header :

```tsx
<a href="#experience">Expérience</a>
```

### Scroll programmatique :

```tsx
document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
```

## ✏️ Personnalisation

Pour modifier les expériences, éditer le tableau `experiences` dans `Experience.tsx` :

```tsx
const experiences = [
  {
    id: 1,
    company: "Nom de l'entreprise",
    position: "Poste occupé",
    period: "Année début - Année fin",
    website: "https://site-web.com",
    description: "Description du poste et responsabilités",
    technologies: ["Tech1", "Tech2", "Tech3"],
    current: true, // ou false si terminé
  },
];
```

## 🎯 Fonctionnalités

- ✅ Affichage des entreprises actuelles et passées
- ✅ Badge "En cours" pour les postes actuels
- ✅ Liens cliquables vers les sites web
- ✅ Liste des technologies utilisées
- ✅ Animations au scroll (fade-in)
- ✅ Hover effects sur les cards
- ✅ Responsive design

## 📱 Responsive

- **Mobile** : Cards en pleine largeur, icône au-dessus
- **Tablet** : Cards avec icône à gauche
- **Desktop** : Layout optimisé avec max-width

## 🚀 Prochaines améliorations possibles

- [ ] Ajouter des logos d'entreprises
- [ ] Ajouter des réalisations par entreprise
- [ ] Filtrer par période ou technologie
- [ ] Ajouter des témoignages/recommandations
- [ ] Timeline visuelle avec ligne connectant les expériences
- [ ] Certificats ou badges de compétences

---

**Dernière mise à jour** : 3 avril 2026
**Statut** : ✅ Fonctionnel
