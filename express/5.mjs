/*
Example of
responding to a POST with a JSON body
by using a middleware to parse the JSON
*/

/*
Adding app.use(express.json()); will allow your server 
to parse JSON payloads sent in the body of POST requests, 
making req.body properly populated.
*/

import express from 'express';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let userList = [
    {
        name: "Ric",
        age: 31,
        isDumb: true
    },
    {
        name: "Ricarda",
        age: 32,
        isReal: false,
        isDumb: true
    },
    {
        name: "Maria",
        age: -90,
    }
];

app.get("/users", (req, res) => {
    res.json(userList);
});

app.post("/users", (req, res) => {
    // eg. body
    /*
    {
    "name": "João",
    "age": 2,
    "isReal": true
    }
    */
    console.log(`Received a ${req.method} request at the URL: ${req.url}`);
    console.log("Request headers: " + JSON.stringify(req.headers, null, 2));
    console.log("Request body: " + JSON.stringify(req.body, null, 2));

    // read the data sent by the client
    const newUser = req.body;
    console.log(newUser);

    // add it to the list
    userList.push(newUser);

    // (optional) return new list
    res.json(userList);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});