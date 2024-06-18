import http from 'http';


const PORT = 3000;

let visitor_count = 0;

const server = http.createServer((request, response) => {
    // response.writeHead(HttpCodes.ok, {'Content-Type': 'text/html'})
    response.statusCode = 200;
    // response.statusMessage = "All good!" // change the default
    response.setHeader("content-Type", "text/html"); // set mime type

    visitor_count++;
    response.write("You are visitor number <b>" + visitor_count.toString() + "</b>")
    response.end()
});

server.listen(PORT,
    () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
);