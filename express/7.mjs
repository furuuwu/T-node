/*
Example of
responding to a DELETE with a JSON body.
*/

import express from 'express';

const app = express();
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

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const ind = userList.findIndex(user => user.id == id);
    userList.splice(ind, 1);
    // or just use filter or smt like that
    // userList = userList.filter(user => user.id != id)
    res.json(userList);
});

app.delete("/users", (req, res) => {
    // delete all

    userList = [];

    // (optional) return updated list
    res.json(userList);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});