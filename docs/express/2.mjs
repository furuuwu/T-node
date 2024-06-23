// responding to a GET on another route. eg. /hello-world
// route with a parameter. eg. /1
// route with a query string. eg. /?name=Ricardo

import express from 'express';

const app = express();

app.get('/hello-world', (req, res) => {

    console.log("Request path: " + req.path); // /hello-world
    res.send("Hello World!");
});

app.get('/:number', (req, res) => {

    // reading a request parameter
    console.log("Request parameters: " + req.params);
    console.log("Request parameters: " + JSON.stringify(req.params, null, 2));

    const number = req.params.number;
    res.send(number);
});

app.get('/', (req, res) => {

    // reading a request query
    console.log("Request query: " + req.query);
    console.log("Request parameters: " + JSON.stringify(req.query, null, 2));

    const name = req.query.name;
    res.send(name);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})