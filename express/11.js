// Parse request bodies

const express = require('express');
const app = express();

app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded data

// Example endpoint to handle a POST request with JSON body
app.post('/submit', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.send('Data received successfully');
});

// Example endpoint to handle a POST request with URL-encoded body
app.post('/submit-form', (req, res) => {
    const data = req.body;
    console.log('Received URL-encoded data:', data);
    res.send('URL-encoded data received successfully');
});


const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});