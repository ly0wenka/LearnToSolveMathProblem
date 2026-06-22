import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const pythonCandidates = [
  "python",
  "C:\\Users\\L\\AppData\\Local\\Programs\\Python\\Python312\\python.exe"
];

function buildPythonProgram(expression) {
  return [
    "import json",
    "from calc.lib.calculator import Calculator",
    "from calc.app.utils import to_latex",
    `expr = ${JSON.stringify(expression)}`,
    "result = Calculator(expr).solve().to_dict()",
    "payload = {",
    "  'input_expression': expr,",
    "  'input_latex': to_latex(expr),",
    "  'solution_graph': result['solution_graph']",
    "}",
    "print(json.dumps(payload, ensure_ascii=False))"
  ].join("\n");
}

function runPython(pythonCommand, expression) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(
      pythonCommand,
      ["-X", "utf8", "-c", buildPythonProgram(expression)],
      {
        cwd: rootDir,
        env: {
          ...process.env,
          PYTHONUTF8: "1",
          PYTHONIOENCODING: "utf-8",
          CALC_DEBUG: "0"
        }
      }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString("utf8");
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });

    child.on("error", rejectPromise);

    child.on("close", (code) => {
      if (code !== 0) {
        rejectPromise(new Error(stderr.trim() || `Python exited with code ${code}`));
        return;
      }

      try {
        resolvePromise(JSON.parse(stdout.trim()));
      } catch (error) {
        rejectPromise(new Error(`Invalid solver JSON: ${stdout.trim()}`));
      }
    });
  });
}

export async function solveExpressionWithCalc(expression) {
  let lastError = null;

  for (const candidate of pythonCandidates) {
    try {
      return await runPython(candidate, expression);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Calc solver unavailable. ${lastError ? lastError.message : ""}`.trim());
}
