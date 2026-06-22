import test from "node:test";
import assert from "node:assert/strict";
import { solveExpressionWithCalc } from "../backend/src/calc-service.js";

test("solveExpressionWithCalc returns a solution graph", async () => {
  const payload = await solveExpressionWithCalc("2x+7=19");

  assert.equal(payload.input_expression, "2x+7=19");
  assert.equal(typeof payload.solution_graph.expression_str, "string");
  assert.ok(Array.isArray(payload.solution_graph.available_branches));
});

test("solveExpressionWithCalc supports quadratic expressions", async () => {
  const payload = await solveExpressionWithCalc("x^2-5x+6=0");

  assert.match(payload.solution_graph.expression_str, /x/);
  assert.ok("ast" in payload.solution_graph);
});
