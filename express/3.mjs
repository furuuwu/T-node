/*
Example of
responding to a GET by sending JSON
*/

import express from 'express';

const app = express();

let userList = [
    {
        id: 1,
        name: "Ric",
        age: 31,
        isDumb: true
    },
    {
        id: 2,
        name: "Ricarda",
        age: 32,
        isReal: false,
        isDumb: true
    },
    {
        id: 3,
        name: "Maria",
        age: -90,
        isReal: true
    }
];

app.get("/users", (req, res) => {
    // eg. /users
    // eg. /users/ (same thing)
    // eg. /users/?isReal=true

    // read the query string
    console.log("Request parameters: " + JSON.stringify(req.query, null, 2));
    const isReal_str = req.query.isReal;
    // remmember that a query string is text
    const isReal = Boolean(isReal_str);

    // filter the users
    const filteredList = userList.filter(user => {
        return user.isReal == isReal;
    })

    // send the filtered list
    res.json(filteredList);
});

app.get("/users/:id", (req, res) => {
    // eg. /users/1

    // read the parameter
    console.log("Request parameters: " + JSON.stringify(req.params, null, 2));
    const id_str = req.params.id;
    // cast the id to the correct type
    const id = Number(id_str)

    // select the user
    // const user = userList[id] // not what you want
    // const user = userList.filter(user => user.id == id); // is one option
    const user = userList.find(user => user.id == id);
    /*
    The find() method of Array instances returns the first element in the provided array
    that satisfies the provided testing function. If no values satisfy the testing function, 
    undefined is returned.
    */

    if (user == undefined) {
        // sent the status code 404 - Not Found
        res.status(404);
        res.json('I don\'t have that');
    } else {
        // send the user
        // sent the status code 200 - OK, which is the default one
        res.json(user);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});