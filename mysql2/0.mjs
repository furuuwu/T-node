/*
Example of
the simplest SELECT query
*/
// node 0.mjs

import express from 'express';

// import mysql from 'mysql';
// https://www.npmjs.com/package/mysql
// npm i mysql
// i'm not going to use this one

import mysql2 from 'mysql2';
// https://www.npmjs.com/package/mysql2
// npm i mysql2
// "mysql": "^3.0.0",

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Create a connection using environment variables
const db = mysql2.createConnection({
    user: process.env.USER_ID, // "root"
    host: process.env.HOST, // "localhost"
    password: process.env.USER_PASSWORD, // ""
    database: process.env.DB // "mydb"
});
// https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs
console.log('User:', process.env.USER_ID);
console.log('Host:', process.env.HOST);
console.log('Password:', process.env.USER_PASSWORD ? '******' : '(empty)');
console.log('Database:', process.env.DB);


// Connect to the database - you don't need to do this explicitly
/*
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});
*/

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is up and running');
});

const tUsers = `${process.env.DB}.users`;

// define the /users route
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

const tNotReal = `${process.env.DB}.doesnotexist`;
// table that does not exist
app.get("/tableDoesNotExist", (req, res) => {
    db.query(`SELECT * FROM ${tNotReal};`, (err, result) => {

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