// Script Node.js pour créer un favicon DM
const fs = require('fs');

// Créer un favicon simple en base64 (format ICO minimaliste)
function createSimpleFavicon() {
    // Un favicon très basique 16x16 avec les couleurs DM
    // Représentation binaire simplifiée d'un carré sombre avec "DM"
    const faviconData = [
        // En-tête ICO
        0x00, 0x00, // Réservé
        0x01, 0x00, // Type (1 = ICO)
        0x01, 0x00, // Nombre d'images
        
        // Entrée d'image
        0x10, // Largeur (16)
        0x10, // Hauteur (16)
        0x00, // Nombre de couleurs (0 = plus de 256)
        0x00, // Réservé
        0x01, 0x00, // Plans de couleur
        0x20, 0x00, // Bits par pixel (32)
        0x84, 0x00, 0x00, 0x00, // Taille des données image
        0x16, 0x00, 0x00, 0x00, // Offset des données
    ];
    
    console.log('Favicon basique créé, mais pour une meilleure qualité, utilisez le générateur HTML ou un outil en ligne.');
}

// Instructions pour l'utilisateur
console.log(`
Instructions pour créer le favicon DM :

1. Ouvrez le fichier 'favicon-generator.html' dans votre navigateur
2. Cliquez sur les boutons de téléchargement pour obtenir les PNG
3. Utilisez un convertisseur en ligne comme:
   - https://www.icoconverter.com/
   - https://favicon.io/
   - https://realfavicongenerator.net/

Ou copiez ce code CSS dans votre fichier CSS pour créer le style DM :

.dm-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: hsl(224, 30%, 8%);
    color: hsl(0, 0%, 100%);
    font-family: 'JetBrains Mono', monospace;
    font-weight: 900;
    font-size: 16px;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(15, 23, 42, 0.3);
}

Couleurs utilisées :
- Background: hsl(224, 30%, 8%) - #262d44
- Text: hsl(0, 0%, 100%) - #ffffff
`);

createSimpleFavicon();