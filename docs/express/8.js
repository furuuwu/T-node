// Response methods

const express = require('express');
const app = express();

app.get('/html', (req, res) => {
    res.send('Hello world'); // sends a response of various types
});

const path = require('path'); // path module to create an absolute path to the file
console.log(__dirname);
console.log(__filename);

app.get('/file1', (req, res) => {
    const filePath = path.join(__dirname, '8.js');
    res.sendFile(filePath); // sends a file
});

app.get('/file2', (req, res) => {
    res.sendFile('8.js', { root: __dirname }); // sends a file
});

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '8.js');
    res.download(filePath, (err) => {
        if (err) {
            console.error('File download error:', err);
            res.status(500).send('Error downloading file');
        }
    });
});

app.get('/json', (req, res) => {
    const obj = {
        name: 'Ricard',
        age: 31
    };
    const json_str = JSON.stringify(obj);

    res.json(json_str); // sends a json string
});

app.get('/google', (req, res) => {
    res.redirect('www.google.com'); // redirects
});

app.get('/stop', (req, res) => {
    res.write("<p>smt smt</p>");
    res.write("<p>more stuff</p>");
    res.end('Done...'); // stops the response process
});

app.get('/404', (req, res) => {
    res.sendStatus(404); // sends status as teh response body
    // equivalent to res.status(404).send('Not Found')
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})