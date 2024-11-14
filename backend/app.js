const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Configurazione EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Home page che mostra il form o il saluto in base alla presenza del cookie
app.get('/', (req, res) => {
    const name = req.cookies.name; // Legge il cookie "name"
    if (name) {
        // Se il cookie esiste, mostra la pagina di saluto
        res.render('greet', { message: 'Bentornato', name: name });
    } else {
        // Se non esiste, mostra il form
        res.render('form');
    }
});

// Route per gestire il form di login
app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.cookie('name', name, { maxAge: 24 * 60 * 60 * 1000 }); // Imposta il cookie "name"
    res.render('greet', { message: 'Benvenuto', name: name });
});

// Route per il logout
app.post('/logout', (req, res) => {
    Object.keys(req.cookies).forEach(cookie => res.clearCookie(cookie));

    res.redirect('/');       // Reindirizza alla home page
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});