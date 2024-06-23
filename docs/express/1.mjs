// Responding to a incoming GET request on the root ('/')

import express from 'express';

const app = express();

app.get('/', (req, res) => {

    console.log(`Received a ${req.method} request at the URL: ${req.url}`);

    console.log("Request headers: " + req.headers); // [object Object]
    // to be able to see this object, convert it to a string

    console.log("Request headers: " + JSON.stringify(req.headers, null, 2));

    console.log("Request body: " + req.body); // undefined in the case of a GET
    console.log("Request body: " + JSON.stringify(req.body, null, 2));

    console.log("Request path: " + req.path);
    console.log("Request hostname: " + req.hostname);
    console.log("Request ip: " + req.ip);

    console.log("Request query: " + JSON.stringify(req.query, null, 2));

    // respond with a Hello World!
    res.send("Hello World!");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})