# 📖 Guide de publication sur GitHub Pages

Ce guide vous explique comment publier votre site d'énigmes sur GitHub pour le rendre accessible en ligne.

## 📋 Prérequis

1. **Installer Git** (si pas déjà fait) :
   - Téléchargez depuis : https://git-scm.com/download/win
   - Installez-le avec les options par défaut

2. **Créer un compte GitHub** (si vous n'en avez pas) :
   - Allez sur : https://github.com
   - Créez un compte gratuit

## 🚀 Étapes de publication

### Étape 1 : Initialiser le dépôt Git local

Ouvrez PowerShell ou l'invite de commande dans le dossier de votre projet et exécutez :

```bash
cd C:\Users\kidna\Code
git init
git add .
git commit -m "Première version du site d'énigmes"
```

### Étape 2 : Créer un dépôt sur GitHub

1. Allez sur https://github.com et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Donnez un nom à votre dépôt (ex: `enigmes-anniversaire`)
4. **Ne cochez pas** "Initialize this repository with a README"
5. Cliquez sur **"Create repository"**

### Étape 3 : Lier votre dépôt local à GitHub

Après la création du dépôt, GitHub vous affichera des commandes. Utilisez celles qui commencent par "push an existing repository..." :

```bash
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/VOTRE_NOM_DEPOT.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE_NOM_UTILISATEUR` et `VOTRE_NOM_DEPOT` par vos informations.

### Étape 4 : Activer GitHub Pages

1. Sur la page de votre dépôt GitHub, cliquez sur **"Settings"** (en haut)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous **"Source"**, sélectionnez **"Deploy from a branch"**
4. Choisissez la branche **"main"** et le dossier **"/ (root)"**
5. Cliquez sur **"Save"**

### Étape 5 : Accéder à votre site

Après quelques minutes, votre site sera accessible à l'adresse :
```
https://VOTRE_NOM_UTILISATEUR.github.io/VOTRE_NOM_DEPOT/
```

## 🔄 Mettre à jour le site

À chaque fois que vous modifiez votre code :

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

Les changements seront automatiquement publiés sur GitHub Pages (quelques minutes de délai).

## 💡 Alternative : Interface GitHub Desktop

Si vous préférez une interface graphique plutôt que la ligne de commande :

1. Téléchargez **GitHub Desktop** : https://desktop.github.com
2. Installez-le et connectez-vous avec votre compte GitHub
3. Utilisez l'interface pour :
   - Initialiser le dépôt
   - Publier sur GitHub
   - Mettre à jour le site

## ✅ Vérification

Votre site devrait maintenant être accessible publiquement sur Internet !

Si vous rencontrez des problèmes, vérifiez que :
- Tous vos fichiers sont bien présents (index.html, style.css, script.js)
- La branche "main" est bien sélectionnée dans les paramètres Pages
- Vous avez attendu quelques minutes après l'activation de Pages

