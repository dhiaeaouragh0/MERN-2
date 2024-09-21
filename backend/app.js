const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');


const errorMiddleware = require('./middlewares/errors')


// Augmenter la limite pour les requêtes JSON et URL-encoded
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Configuration de la taille maximale pour les fichiers téléchargés
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite fixée à 50MB
}));

//import all routes
const products = require('./rootes/product')
const auth = require('./rootes/auth')
const order = require('./rootes/order')

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app