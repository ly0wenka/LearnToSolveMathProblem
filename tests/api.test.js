import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createAppServer } from "../backend/src/server.js";
import { FileProgressStore } from "../backend/src/store.js";

async function startTestServer() {
  const dir = await mkdtemp(join(tmpdir(), "mathmentor-api-"));
  const store = new FileProgressStore(join(dir, "progress.json"));
  const server = createAppServer(store);

  await new Promise((resolve) => server.listen(0, resolve));

  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  };
}

test("GET /api/modules returns learning modules", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/modules`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(payload.items));
    assert.ok(payload.items.length >= 4);
  } finally {
    await app.close();
  }
});

test("POST /api/progress/check marks a correct answer", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/progress/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: "eq-1",
        answer: "6"
      })
    });

    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.correct, true);
    assert.equal(payload.progress.checkedCount, 1);
    assert.deepEqual(payload.progress.completedProblemIds, ["eq-1"]);
  } finally {
    await app.close();
  }
});

test("POST /api/progress/complete stores manual completion", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/progress/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: "geo-1"
      })
    });

    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(payload.completedProblemIds, ["geo-1"]);
  } finally {
    await app.close();
  }
});
