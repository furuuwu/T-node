import http from 'http';

const PORT = 3000;

const server = http.createServer((request, response) => {
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("Hello World!");
    response.end();
});

server.listen(PORT,
    () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
);