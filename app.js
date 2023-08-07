const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();


app.use(express.static('public')); /*crée un middleware pour dire d utiliser les fichiers statics du dossier public en premier quand il y a un lien vers un fichier*/
app.use(express.urlencoded({ extended: false })); /*permet de look incoming request and extract incoming data*/

app.get('/', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});

app.get('/restaurants', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath);
});

app.get('/recommend', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath);
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body; /*pointe les prop du form*/
    const filePath = path.join(__dirname, 'data', 'restaurants.json'); /*pour les enregistrer vers fichier json*/
    const fileData = fs.readFileSync(filePath); /*lit les data pour les transfomer en objet js*/
    const storedRestaurants = JSON.parse(fileData); /*transforme en texte*/

    storedRestaurants.push(restaurant); /*push les data vers json*/
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));/*ecrit dans JSON*/

    res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath);
});

app.get('/about', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
});

app.listen(3000);