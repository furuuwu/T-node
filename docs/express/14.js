// Server-side rendering with express-handlebars

const express = require('express');
const path = require('path');
const app = express();

// Required module
const exphbs = require('express-handlebars');

// Set Handlebars as the templating engine
app.engine('handlebars', exphbs.engine({
    layoutsDir: path.join(__dirname, '14-handlebars-views/'), // Specify the layouts directory
    defaultLayout: 'home', // Specify the default layout file ('main' is the file name without extension)
    extname: '.handlebars' // Specify the file extension of the templates
}));
app.set('view engine', 'handlebars');

// Set the directory where the views are stored
app.set('views', path.join(__dirname, '14-handlebars-views'));

// Example route using Handlebars template
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});