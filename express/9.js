// Routing with express.Router

const express = require('express');
const app = express();

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Book page...');
});

router.get('/about', (re, res) => {
    res.send('About the book');
});

app.use('/book', router);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/help', (req, res) => {
    res.send('Need help!');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})