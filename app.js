const http = require("http");

function createServer() {
    return http.createServer((req, res) => {

        if (req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to my Automated CI/CD Pipeline!</h1>");
        }

        else if (req.url === "/health") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "OK" }));
        }

        else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Page not found");
        }

    });
}

module.exports = { createServer };