// Cookies with cookie-parser, signed version

const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Signed cookies
const cookieSecret = process.env.COOKIE_SECRET;
app.use(cookieParser(cookieSecret));

app.use((req, res, next) => {

    // Using optional chaining to safely access the cookie
    let cookie = req.cookies?.cookieName;

    const options = {
        maxAge: 1000 * 60 * 60, // expires after 1h
        httpOnly: true, // access restrictions
    };

    if (cookie === undefined) {
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, options);
        console.log('cookie was created!');
    } else {
        // cookie was already present
        console.log('cookie exists', cookie);
    }

    // Call next() to continue processing the request
    next();
})

app.get('/', (req, res) => {
    res.send('Hello');
});


// Start the server on port 3000
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});