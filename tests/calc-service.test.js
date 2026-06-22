import test from "node:test";
import assert from "node:assert/strict";
import { solveExpressionWithCalc } from "../backend/src/calc-service.js";

test("solveExpressionWithCalc returns a solution graph", async () => {
  const payload = await solveExpressionWithCalc("2x+7=19");

  assert.equal(payload.input_expression, "2x+7=19");
  assert.equal(typeof payload.solution_graph.expression_str, "string");
  assert.ok(Array.isArray(payload.solution_graph.available_branches));
  assert.ok(
    payload.solution_graph.available_branches.every((branch) => !branch.formula_name.includes("Решить"))
  );
});

test("solveExpressionWithCalc supports quadratic expressions", async () => {
  const payload = await solveExpressionWithCalc("x^2-5x+6=0");

  assert.match(payload.solution_graph.expression_str, /x/);
  assert.ok("ast" in payload.solution_graph);
});

test("solveExpressionWithCalc humanizes trivial multiplication formatting", async () => {
  const payload = await solveExpressionWithCalc("2x+7=19");
  const branch = payload.solution_graph.available_branches[0];

  assert.match(branch.formula_name, /Спрощення запису добутку|Розв'язати відносно x/);
  assert.match(branch.step_description, /Спрощуємо запис добутку|2x/);
});

test("solveExpressionWithCalc classifies numeric addition correctly", async () => {
  const payload = await solveExpressionWithCalc("2x+7=19+767868");
  const additionBranch = payload.solution_graph.available_branches.find((branch) =>
    branch.step_description.includes("Обчислюємо суму")
  );

  assert.ok(additionBranch);
  assert.match(additionBranch.formula_name, /Обчислення суми/);
});
