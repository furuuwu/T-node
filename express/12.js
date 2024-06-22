// Serving static files

const express = require('express');
const app = express();
const path = require('path');


// Serve static files from the "12-static" directory
// http://localhost:3001/byebye.html
app.use(express.static(path.join(__dirname, '12-static')));

// Serve static files from the "12-static-route" directory at the "/12-static-route" path
app.use('/12-static-route', express.static(path.join(__dirname, '12-static-route')));
// http://localhost:3001/12-static-route/cat.jpg

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});