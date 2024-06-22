// Cookies with cookie-parser

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Example route to set a cookie
app.get('/setcookie', (req, res) => {
    let options = {
        maxAge: 1000 * 60 * 15, // expires after 15min
        httpOnly: true, // access restrictions
    };
    res.cookie('username', 'john', options);
    res.send('Cookie has been set');
});

// Example route to read a cookie
app.get('/getcookieSigned', (req, res) => {
    const username = req.cookies.username;
    res.send('Username: ' + username);
});

// Start the server on port 3000
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});