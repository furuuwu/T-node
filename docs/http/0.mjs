// The .mjs marks this file as using the ES6 module system
// See the CommonJs and ES folders for an example

import http from 'http';
/*
http module:
Used for creating HTTP/1.1 servers.
Simple to use and well-suited for most use cases where HTTP/2 features and encryption are not needed.

Protocol: HTTP/1.1
Security: No encryption
Connection Handling: Sequential requests, multiple connections
Header Compression: No
Server Push: No
Performance: Standard
*/

// create instance of the http server listening on a port
/*
you can choose any available port for your server to listen on

Common Ports:
Ports 0 to 1023 are well-known ports and are typically reserved for system services and well-known protocols (e.g., HTTP on port 80, HTTPS on port 443).
Ports 1024 to 49151 are registered ports that can be used by user processes or applications.
Ports 49152 to 65535 are dynamic or private ports, usually used for temporary purposes or private services.

Choosing a Port:
Make sure the port you choose is not already in use by another application on your machine.
For development purposes, ports like 3000, 4000, or 5000 are commonly used.
For production, choose a port that is appropriate for your deployment environment and not conflicting with other services.

Permissions:
On Unix-based systems, using ports below 1024 typically requires root or administrative privileges.
Using higher-numbered ports (e.g., 3000, 4000) avoids this issue and is common in development environments.
*/
const PORT = 3000;

const server = http.createServer(() => { console.log("Hello") });

// start listening
server.listen(PORT);
console.log(`server is listening on http://localhost:${PORT}`)