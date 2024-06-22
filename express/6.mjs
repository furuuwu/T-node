// Responding to PUT (with a JSON body)

import express from 'express';

const app = express();
app.use(express.json());

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
    }
];

app.get("/users", (req, res) => {
    res.json(userList);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = userList[id];
    res.json(user);
});

app.post("/users", (req, res) => {
    const newUser = req.body;
    userList.push(newUser);
    res.json(userList);
});

app.put("/users/:id", (req, res) => {

    console.log(`Received a ${req.method} request at the URL: ${req.url}`);
    console.log("Request headers: " + JSON.stringify(req.headers, null, 2));
    console.log("Request body: " + JSON.stringify(req.body, null, 2));

    // read the data
    const newIsDumb = Boolean(req.body["this-person-is-dumb"]);
    const newName = req.body.newName;

    // update user
    const id = req.params.id;
    const filteredList = userList.filter(user => user.id == id);
    const user = filteredList[0] // if the id really is unique
    user.isDumb = newIsDumb;
    user.name = newName;
    console.log(user);

    // (optional) return updated user
    res.json(user);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});