// Information about the express server

const express = require('express');
const app = express();

const PORT = 3001;
const server = app.listen(PORT, () => {
    const server_address = JSON.stringify(server.address(), null, 2);
    console.log("server adress: " + server_address);
    console.log("server max connections: " + server.maxConnections);
    console.log("server timeout: " + server.timeout);
    console.log("server request timeout: " + server.requestTimeout);
});