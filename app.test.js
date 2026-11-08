const { test } = require("node:test");
const assert = require("node:assert");
const { createServer } = require("./app");

test("Homepage should return welcome message", async () => {
    const server = createServer();

    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    try {
        const response = await fetch(`http://localhost:${port}/`);
        const body = await response.text();

        assert.strictEqual(response.status, 200);
        assert.match(body, /Welcome to my Automated CI\/CD Pipeline/);
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});

test("Health endpoint should return OK", async () => {
    const server = createServer();

    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    try {
        const response = await fetch(`http://localhost:${port}/health`);
        const body = await response.json();

        assert.strictEqual(response.status, 200);
        assert.strictEqual(body.status, "OK");
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});