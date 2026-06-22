import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createAppServer } from "../backend/src/server.js";
import { FileProgressStore } from "../backend/src/store.js";

async function startTestServer() {
  const dir = await mkdtemp(join(tmpdir(), "mathmentor-solver-api-"));
  const store = new FileProgressStore(join(dir, "progress.json"));
  const server = createAppServer(store);

  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  };
}

test("GET /api/solver returns calc graph", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/solver?expression=${encodeURIComponent("2x+7=19")}`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.input_expression, "2x+7=19");
    assert.ok(Array.isArray(payload.solution_graph.available_branches));
    assert.ok(
      payload.solution_graph.available_branches.every((branch) => !branch.step_description.includes("Раскрытие"))
    );
  } finally {
    await app.close();
  }
});

test("GET /api/solver returns pedagogical Ukrainian step labels", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/solver?expression=${encodeURIComponent("2x+7=19+767868")}`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.ok(
      payload.solution_graph.available_branches.some((branch) =>
        branch.step_description.includes("Обчислюємо суму")
      )
    );
  } finally {
    await app.close();
  }
});

test("GET /api/solver validates missing expression", async () => {
  const app = await startTestServer();

  try {
    const response = await fetch(`${app.baseUrl}/api/solver`);
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.message, "Expression is required.");
  } finally {
    await app.close();
  }
});
