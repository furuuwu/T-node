// Server-side rendering with EJS

const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where the views are stored
app.set('views', path.join(__dirname, '13-ejs-views'));

// Example route using EJS template
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});