// Importer le module Express
const express = require('express');

// Importer le module path (fourni par Node.js) pour gérer les chemins de fichiers
const path = require('path');

// Créer une application Express
const app = express();

// Configuration du moteur de template EJS
app.set('views', path.join(__dirname, 'views')); // Spécifier le dossier des fichiers de modèle EJS
app.set('view engine', 'ejs'); // Définir EJS comme moteur de template par défaut

// Middleware pour les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier l'heure de la requête
const checkWorkingHours = (req, res, next) => {
    const date = new Date(); // Obtenir la date actuelle
    const dayOfWeek = date.getDay(); // Obtenir le jour de la semaine (0: dimanche, 1: lundi, ..., 6: samedi)
    const hour = date.getHours(); // Obtenir l'heure actuelle

    // Vérifier si c'est un jour ouvrable (lundi à vendredi) entre 9h et 17h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continuer vers la prochaine étape de la requête
    } else {
        res.send("L'application est disponible uniquement pendant les heures de travail."); // Répondre avec un message d'erreur si en dehors des heures de travail
    }
};

// Routes
app.get('/', checkWorkingHours, (req, res) => {
    res.render('index', { title: 'Accueil' }); // Rendre la vue index.ejs avec le titre 'Accueil'
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services', { title: 'Nos services' }); // Rendre la vue services.ejs avec le titre 'Nos services'
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact', { title: 'Nous contacter' }); // Rendre la vue contact.ejs avec le titre 'Nous contacter'
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000; // Définir le port sur lequel le serveur écoutera les requêtes
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`); // Afficher un message dans la console une fois que le serveur est démarré
});
