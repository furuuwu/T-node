import http from 'http';
import http2 from 'http2';

// Define HTTP status codes
const HttpCodes = {
    ok: http2.constants.HTTP_STATUS_OK, // 200
    notFound: http2.constants.HTTP_STATUS_NOT_FOUND // 404
    // etc
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
    // https://www.iana.org/assignments/http-status-codes/http-status-codes.txt
};

// Define constants for HTTP header names
const HttpHeaders = {
    contentType: http2.constants.HTTP2_HEADER_CONTENT_TYPE // 'content-type'
};

// Define constants for common content types
const ContentTypes = {
    plain: 'text/plain',
    html: 'text/html'
};

const PORT = 3000;

const server = http.createServer((request, response) => {
    // response.writeHead(HttpCodes.ok, {'Content-Type': 'text/html'})
    response.writeHead(HttpCodes.ok, { [HttpHeaders.contentType]: ContentTypes.html })
    response.write('<html><body>Hello "World"!</body></html>')
    response.end()
});

server.listen(PORT,
    () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
);