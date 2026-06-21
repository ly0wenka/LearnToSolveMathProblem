import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { FileProgressStore } from "../backend/src/store.js";

async function createStore() {
  const dir = await mkdtemp(join(tmpdir(), "mathmentor-store-"));
  return new FileProgressStore(join(dir, "progress.json"));
}

test("FileProgressStore records attempts and completed problems", async () => {
  const store = await createStore();

  const first = await store.markAttempt({
    problemId: "eq-1",
    answer: "x = 6",
    correct: true
  });

  assert.equal(first.checkedCount, 1);
  assert.deepEqual(first.completedProblemIds, ["eq-1"]);
  assert.equal(first.attempts.length, 1);

  const second = await store.markAttempt({
    problemId: "eq-1",
    answer: "x = 7",
    correct: false
  });

  assert.equal(second.checkedCount, 2);
  assert.deepEqual(second.completedProblemIds, ["eq-1"]);
  assert.equal(second.attempts.length, 2);
});

test("FileProgressStore reset clears persisted progress", async () => {
  const store = await createStore();
  await store.markComplete("geo-1");

  const reset = await store.reset();
  assert.equal(reset.checkedCount, 0);
  assert.deepEqual(reset.completedProblemIds, []);
  assert.deepEqual(reset.attempts, []);
});
