const http = require("node:http");

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Hello from a Node.js server");
});

server.listen(3001, () => {
    console.log("Node server running at http://localhost:3001");
});
