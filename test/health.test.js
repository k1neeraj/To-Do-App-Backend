const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");
const app = require("../index");

test("GET /health reports the database readiness state", async () => {
  const server = createServer(app);

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = await response.json();

    assert.equal(response.status, 503);
    assert.deepEqual(body, {
      status: "not_ready",
      database: "disconnected",
    });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
