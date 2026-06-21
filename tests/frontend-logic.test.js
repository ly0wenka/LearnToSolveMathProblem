import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAcceptedAnswers,
  calculateProgress,
  isCorrectAnswer,
  normalizeAnswer
} from "../shared/learning-core.js";

test("normalizeAnswer trims and normalizes spacing", () => {
  assert.equal(normalizeAnswer("  X =   6 "), "x = 6");
});

test("buildAcceptedAnswers includes main answer and variants", () => {
  const values = buildAcceptedAnswers({
    answer: "x = 6",
    variants: ["6", "x=6"]
  });

  assert.deepEqual(values, ["x = 6", "6", "x=6"]);
});

test("isCorrectAnswer accepts variant formatting", () => {
  const problem = {
    answer: "x1 = 2, x2 = 3",
    variants: ["2,3", "2 і 3"]
  };

  assert.equal(isCorrectAnswer(problem, " 2,3 "), true);
  assert.equal(isCorrectAnswer(problem, "x = 5"), false);
});

test("calculateProgress rounds by total problem count", () => {
  assert.equal(calculateProgress(1, 4), 25);
  assert.equal(calculateProgress(3, 4), 75);
  assert.equal(calculateProgress(0, 0), 0);
});
