// Responding to a POST with a JSON body
// by manually parsing the JSON

import express from 'express';

const app = express();

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
    // read the data sent by the client
    // here i want to manually parse the incoming request body
    let body = '';

    // Listen to data event to accumulate chunks of data
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });

    // Listen to end event to parse the accumulated data
    req.on('end', () => {
        const newUser = JSON.parse(body);
        console.log(newUser);

        // add it to the list
        userList.push(newUser);

        // (optional) return new list
        res.json(userList);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})