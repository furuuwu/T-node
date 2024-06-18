/*
Example of
responding to a incoming GET request on the root ('/')
*/

import express from 'express';

const app = express();

app.get('/', (req, res) => {

    console.log(`Received a ${req.method} request at the URL: ${req.url}`);

    console.log("Request headers: " + req.headers); // [object Object]
    // to be able to see this object, convert it to a string

    /*
    JSON.stringify(value, replacer, space): Converts a JavaScript object or value to a JSON string.
    - value: The value to convert to a JSON string.
    - replacer: A function that alters the behavior of the stringification process, or an array of String
    and Number objects that serve as a whitelist for selecting/filtering the properties of the value object
    to be included in the JSON string.
    - space: A String or Number that's used to insert white space into the output JSON string for 
    readability purposes. If this is a number, it indicates the number of space characters to use as white
    space; this number is capped at 10. 
    If this is a string, its maximum length is 10; the string is used as white space. 
    For readability, 2 is often used.
    
    Using JSON.stringify with the second parameter null and third parameter 2 (for indentation)
    makes the output more readable.
    */
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