import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const pythonCandidates = [
  "python",
  "C:\\Users\\L\\AppData\\Local\\Programs\\Python\\Python312\\python.exe"
];

const translationPairs = [
  ["[Решить относительно x]", "[Розв'язати відносно x]"],
  ["[Решить относительно y]", "[Розв'язати відносно y]"],
  ["Раскрытие скобок", "Розкриття дужок"],
  ["Преобразование", "Перетворення"],
  ["Решить относительно", "Розв'язати відносно"],
  ["Расчет дискриминанта", "Обчислення дискримінанта"],
  ["Дискриминант", "Дискримінант"],
  ["Разложение на множители", "Розкладання на множники"],
  ["Замена переменной", "Заміна змінної"],
  ["Вычисление", "Обчислення"],
  ["Снятие логарифма", "Позбавлення логарифма"],
  ["десятичного логарифма", "десяткового логарифма"],
  ["Сумма логарифмов", "Сума логарифмів"],
  ["Возведение иррационального уравнения в квадрат", "Піднесення ірраціонального рівняння до квадрата"],
  ["Уединение одного из радикалов", "Відокремлення одного з радикалів"],
  ["Используем основное тригонометрическое тождество", "Використовуємо основну тригонометричну тотожність"],
  ["Дробь равна нулю, если её числитель равен нулю", "Дріб дорівнює нулю, якщо його чисельник дорівнює нулю"],
  ["Сокращение дроби на общий множитель", "Скорочення дробу на спільний множник"],
  ["Перенос слагаемого через знак равенства", "Перенесення доданка через знак рівності"],
  ["Пусть", "Нехай"],
  ["Получаем уравнение", "Отримуємо рівняння"],
  ["По определению логарифма переходим к равносильному уравнению", "За означенням логарифма переходимо до рівносильного рівняння"],
  ["По определению десятичного логарифма переходим к уравнению", "За означенням десяткового логарифма переходимо до рівняння"],
  ["Применяем свойство логарифма", "Застосовуємо властивість логарифма"],
  ["Избавляемся от радикала, возводя обе части уравнения в квадрат", "Позбавляємося радикала, підносячи обидві частини рівняння до квадрата"],
  ["Уединяем один из радикалов", "Відокремлюємо один із радикалів"],
  ["переносим", "переносимо"],
  ["в правую часть", "у праву частину"]
];

function translateText(value) {
  if (typeof value !== "string") {
    return value;
  }

  let translated = value;
  for (const [source, target] of translationPairs) {
    translated = translated.split(source).join(target);
  }
  return translated;
}

function isNumberToken(value) {
  return /^-?\d+(?:\.\d+)?$/.test(value);
}

function humanizeStep(formulaName, stepDescription) {
  const translatedFormula = translateText(formulaName);
  const translatedDescription = translateText(stepDescription);

  const compact = stepDescription.replace(/\s+/g, "");

  if (/^\d+\*[a-zA-Zа-яА-Я]+->\d+[a-zA-Zа-яА-Я]+$/.test(compact)) {
    return {
      formulaName: translatedFormula.replace("Розкриття дужок", "Спрощення запису добутку"),
      stepDescription: translatedDescription.replace("Розкриття дужок:", "Спрощуємо запис добутку:")
    };
  }

  const arithmeticMatch = compact.match(/^(.+?)([+\-*/])(.+?)=(.+)$/);
  if (arithmeticMatch) {
    const [, left, operator, right, result] = arithmeticMatch;
    if (isNumberToken(left) && isNumberToken(right) && isNumberToken(result)) {
      const labels = {
        "+": "Обчислення суми",
        "-": "Обчислення різниці",
        "*": "Обчислення добутку",
        "/": "Обчислення частки"
      };

      const verbLabels = {
        "+": "Обчислюємо суму",
        "-": "Обчислюємо різницю",
        "*": "Обчислюємо добуток",
        "/": "Обчислюємо частку"
      };

      const prettyExpr = `${left} ${operator} ${right} = ${result}`;
      return {
        formulaName: translatedFormula.replace("Перетворення", labels[operator] || "Обчислення"),
        stepDescription: `${verbLabels[operator] || "Обчислюємо"}: ${prettyExpr}`
      };
    }
  }

  return {
    formulaName: translatedFormula,
    stepDescription: translatedDescription
  };
}

function translateGraph(node) {
  if (!node || typeof node !== "object") {
    return node;
  }

  return {
    ...node,
    expression_str: translateText(node.expression_str),
    available_branches: Array.isArray(node.available_branches)
      ? node.available_branches.map((branch) => {
          const normalized = humanizeStep(branch.formula_name, branch.step_description);
          return {
            ...branch,
            formula_name: normalized.formulaName,
            step_description: normalized.stepDescription,
            next_node: translateGraph(branch.next_node)
          };
        })
      : []
  };
}

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
        const parsed = JSON.parse(stdout.trim());
        resolvePromise({
          ...parsed,
          solution_graph: translateGraph(parsed.solution_graph)
        });
      } catch {
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
