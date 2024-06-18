/*
Example of
POST query
without worrying about SQL injections
*/

import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
// "dotenv": "^16.0.0",
dotenv.config();

const db = mysql2.createConnection({
    user: process.env.USER_ID,
    host: process.env.HOST,
    password: process.env.USER_PASSWORD,
    database: process.env.DB
});

const app = express();
app.use(express.json());

const tUsers = `${process.env.DB}.users`;

app.get("/users", (req, res) => {
    db.query(`SELECT * FROM ${tUsers};`, (err, result) => {

        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.status(200);
            res.json(result);
        }
    })
});

app.post("/users", (req, res) => {
    // table schema
    const tCols = {
        name: 'name',
        age: 'age'
    }

    // data to post
    /*
    const name = req.body.name;
    const age= req.body.age;
    */
    const { name, age } = req.body;

    // "INSERT INTO users (name, age) VALUES ('Furu', 18)"
    db.query(`INSERT INTO ${tUsers} (${tCols.name}, ${tCols.age}) VALUES (${name}, ${age})`, (err, result) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.status(200);
            res.json(result);
        }
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});