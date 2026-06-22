import {
  calculateProgress,
  isCorrectAnswer
} from "./shared/learning-core.js";

const fallbackModules = [
  {
    id: "algebra",
    title: "Лінійні та квадратні рівняння",
    level: "Базовий курс",
    summary: "Опрацювання типових алгоритмів: спрощення виразів, перенесення доданків, дискримінант і перевірка коренів.",
    outcomes: [
      "Студент розпізнає тип рівняння і добирає відповідний метод.",
      "Система показує послідовність кроків, а не лише фінальний результат.",
      "Практичні задачі оцінюють не тільки відповідь, а й логіку розв'язання."
    ]
  },
  {
    id: "functions",
    title: "Функції та графічне мислення",
    level: "Середній рівень",
    summary: "Вивчення області визначення, нулів функції, проміжків зростання і побудови простих графіків.",
    outcomes: [
      "Користувач вчиться пов'язувати формулу з поведінкою графіка.",
      "Алгоритм розв'язання містить пояснення кожного перетворення.",
      "Модуль формує візуальну інтуїцію щодо властивостей функцій."
    ]
  },
  {
    id: "geometry",
    title: "Планіметрія та прикладна геометрія",
    level: "Підвищений рівень",
    summary: "Розв'язання задач на площі, периметри, подібність трикутників і практичне застосування формул.",
    outcomes: [
      "Кожна задача починається з аналізу умови та побудови моделі.",
      "Підказки допомагають виділяти відомі й невідомі величини.",
      "Система пропонує шаблони міркувань для типових геометричних сюжетів."
    ]
  },
  {
    id: "exam",
    title: "Тренажер підготовки до контролю",
    level: "Адаптивний режим",
    summary: "Сценарії повторення тем, накопичення балів, рекомендації для слабких місць і збереження особистого прогресу.",
    outcomes: [
      "Застосунок формує індивідуальну траєкторію повторення.",
      "Аналітика показує, які теми потрібно опрацювати ще раз.",
      "Механіка мотивації підтримує регулярну самостійну роботу."
    ]
  }
];

const fallbackProblems = [
  {
    id: "eq-1",
    topic: "Лінійні рівняння",
    level: "Легкий",
    title: "Знайдіть x у рівнянні",
    prompt: "2x + 7 = 19",
    answer: "x = 6",
    variants: ["6", "x=6", "x = 6"],
    steps: [
      {
        title: "Проаналізуйте структуру рівняння",
        description: "У рівнянні є одна змінна і лінійна залежність, тому ізолюємо x.",
        tip: "Працюйте симетрично з обома частинами рівняння."
      },
      {
        title: "Перенесіть вільний член",
        description: "Відніміть 7 від лівої та правої частини: 2x = 12.",
        tip: "Так ми прибираємо зайвий доданок біля змінної."
      },
      {
        title: "Знайдіть значення змінної",
        description: "Поділіть обидві частини на 2 і отримаєте x = 6.",
        tip: "Завжди перевіряйте підстановкою у вихідне рівняння."
      }
    ]
  },
  {
    id: "eq-2",
    topic: "Квадратні рівняння",
    level: "Середній",
    title: "Розв'яжіть квадратне рівняння",
    prompt: "x² - 5x + 6 = 0",
    answer: "x1 = 2, x2 = 3",
    variants: ["2,3", "x1=2 x2=3", "x1 = 2, x2 = 3", "2 і 3"],
    steps: [
      {
        title: "Визначте коефіцієнти",
        description: "Для рівняння маємо a = 1, b = -5, c = 6.",
        tip: "Коректні коефіцієнти потрібні для обчислення дискримінанта."
      },
      {
        title: "Обчисліть дискримінант",
        description: "D = b² - 4ac = 25 - 24 = 1.",
        tip: "Додатний дискримінант означає два різні дійсні корені."
      },
      {
        title: "Знайдіть корені",
        description: "x1 = (5 - 1) / 2 = 2, x2 = (5 + 1) / 2 = 3.",
        tip: "Після обчислення варто коротко перевірити суму та добуток коренів."
      }
    ]
  },
  {
    id: "fn-1",
    topic: "Функції",
    level: "Середній",
    title: "Нулі функції",
    prompt: "3x - 9 = 0",
    answer: "x = 3",
    variants: ["3", "x=3", "x = 3"],
    steps: [
      {
        title: "Прирівняйте функцію до нуля",
        description: "Щоб знайти нуль функції, потрібно розв'язати рівняння 3x - 9 = 0.",
        tip: "Нуль функції означає значення x, при якому y дорівнює нулю."
      },
      {
        title: "Перенесіть вільний член",
        description: "Отримаємо 3x = 9 після додавання 9 до обох частин.",
        tip: "Зручніше спочатку позбутися константи."
      },
      {
        title: "Поділіть на коефіцієнт",
        description: "Ділимо обидві частини на 3 та маємо x = 3.",
        tip: "Це і є координата точки перетину графіка з віссю Ox."
      }
    ]
  },
  {
    id: "geo-1",
    topic: "Геометрія",
    level: "Легкий",
    title: "Площа прямокутника",
    prompt: "5 * 8",
    answer: "40",
    variants: ["40", "40 см2", "40 см^2"],
    steps: [
      {
        title: "Визначте відомі величини",
        description: "Відомі довжина та ширина прямокутника: 5 см і 8 см.",
        tip: "Це базова задача на застосування формули площі."
      },
      {
        title: "Застосуйте формулу",
        description: "Площа прямокутника S = a · b.",
        tip: "Перемножте дві сторони фігури."
      },
      {
        title: "Обчисліть результат",
        description: "S = 5 · 8 = 40 см².",
        tip: "Не забудьте зазначити одиниці вимірювання у письмовому розв'язанні."
      }
    ]
  }
];

const formulasByTopic = {
  "Лінійні рівняння": {
    section: "Алгебра: лінійні рівняння",
    description: "Ізолюємо змінну та виконуємо однакові операції з обома частинами рівняння.",
    formulas: ["ax + b = c", "ax = c - b", "x = (c - b) / a"]
  },
  "Квадратні рівняння": {
    section: "Алгебра: квадратні рівняння",
    description: "Обчислюємо дискримінант і за ним визначаємо кількість та значення коренів.",
    formulas: ["ax² + bx + c = 0", "D = b² - 4ac", "x₁,₂ = (-b ± √D) / 2a"]
  },
  "Функції": {
    section: "Алгебра: лінійна функція",
    description: "Щоб знайти нуль функції, потрібно прирівняти її значення до нуля.",
    formulas: ["y = kx + b", "0 = kx + b", "x = -b / k"]
  },
  "Геометрія": {
    section: "Планіметрія",
    description: "Для базових геометричних задач спершу визначаємо відомі величини і підбираємо формулу.",
    formulas: ["S = a · b", "P = 2(a + b)", "S△ = 1/2 · a · h"]
  }
};

const apiBase = "http://localhost:3000/api";
const localStorageKey = "mathmentor-flow-progress";

const state = {
  modules: fallbackModules,
  problems: fallbackProblems,
  activeModule: fallbackModules[0].id,
  activeProblemId: fallbackProblems[0].id,
  stepIndex: 0,
  completed: [],
  checked: 0,
  remoteMode: false
};

const moduleList = document.querySelector("#module-list");
const moduleDetail = document.querySelector("#module-detail");
const workspaceTitle = document.querySelector("#workspace-title");
const workspaceProblem = document.querySelector("#workspace-problem");
const workspaceTopic = document.querySelector("#workspace-topic");
const workspaceLevel = document.querySelector("#workspace-level");
const stepIndicator = document.querySelector("#step-indicator");
const stepTitle = document.querySelector("#step-title");
const stepDescription = document.querySelector("#step-description");
const stepTip = document.querySelector("#step-tip");
const formulaSectionTitle = document.querySelector("#formula-section-title");
const formulaSectionDescription = document.querySelector("#formula-section-description");
const formulaList = document.querySelector("#formula-list");
const problemSelect = document.querySelector("#problem-select");
const answerExample = document.querySelector("#answer-example");
const answerInput = document.querySelector("#answer-input");
const feedbackBox = document.querySelector("#feedback-box");
const progressValue = document.querySelector("#progress-value");
const progressFill = document.querySelector("#progress-fill");
const progressSummary = document.querySelector("#progress-summary");
const metricModules = document.querySelector("#metric-modules");
const metricProblems = document.querySelector("#metric-problems");
const metricProgress = document.querySelector("#metric-progress");
const prevStepButton = document.querySelector("#prev-step");
const nextStepButton = document.querySelector("#next-step");
const solverForm = document.querySelector("#solver-form");
const solverExpressionInput = document.querySelector("#solver-expression");
const solverHint = document.querySelector("#solver-hint");
const solverStatus = document.querySelector("#solver-status");
const solverExpressionView = document.querySelector("#solver-expression-view");
const solverBranchesList = document.querySelector("#solver-branches-list");

function readLocalProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(localStorageKey) || "{}");
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      checked: Number.isFinite(parsed.checked) ? parsed.checked : 0
    };
  } catch {
    return { completed: [], checked: 0 };
  }
}

function saveLocalProgress() {
  localStorage.setItem(localStorageKey, JSON.stringify({
    completed: state.completed,
    checked: state.checked
  }));
}

function getProblemById(problemId) {
  return state.problems.find((problem) => problem.id === problemId) || state.problems[0];
}

function getModuleById(moduleId) {
  return state.modules.find((module) => module.id === moduleId) || state.modules[0];
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function initializeData() {
  const localProgress = readLocalProgress();
  state.completed = localProgress.completed;
  state.checked = localProgress.checked;

  try {
    const [modules, problems, progress] = await Promise.all([
      requestJson("/modules"),
      requestJson("/problems"),
      requestJson("/progress")
    ]);

    state.modules = modules.items;
    state.problems = problems.items;
    state.completed = progress.completedProblemIds;
    state.checked = progress.checkedCount;
    state.remoteMode = true;
  } catch {
    state.remoteMode = false;
  }

  state.activeModule = state.modules[0]?.id || "";
  state.activeProblemId = state.problems[0]?.id || "";
}

function renderModules() {
  moduleList.innerHTML = state.modules.map((module) => `
    <button class="module-card ${module.id === state.activeModule ? "active" : ""}" data-module-id="${module.id}" type="button">
      <p class="section-tag">${module.level}</p>
      <h4>${module.title}</h4>
      <p>${module.summary}</p>
      <span class="module-card-meta">Навчальна ціль</span>
    </button>
  `).join("");

  const activeModule = getModuleById(state.activeModule);
  moduleDetail.innerHTML = `
    <p class="section-tag">Опис модуля</p>
    <h4>${activeModule.title}</h4>
    <p>${activeModule.summary}</p>
    <ul class="detail-list">
      ${activeModule.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
    </ul>
  `;
}

function renderProblemSelect() {
  problemSelect.innerHTML = state.problems.map((problem) => `
    <option value="${problem.id}" ${problem.id === state.activeProblemId ? "selected" : ""}>
      ${problem.topic}: ${problem.prompt}
    </option>
  `).join("");
}

function setFeedback(kind, text) {
  feedbackBox.className = `feedback-box ${kind}`;
  feedbackBox.textContent = text;
}

function setSolverStatus(kind, text) {
  solverStatus.className = `feedback-box ${kind}`;
  solverStatus.textContent = text;
}

function renderSolverBranches(branches) {
  if (!branches.length) {
    solverBranchesList.innerHTML = `<div class="solver-branch-card">Для цього виразу підмодуль не повернув окремих гілок.</div>`;
    return;
  }

  solverBranchesList.innerHTML = branches.map((branch) => `
    <article class="solver-branch-card">
      <h4>${branch.formula_name}</h4>
      <p>${branch.step_description}</p>
      <div class="solver-next">${branch.next_node?.expression_str || "Кінцевий стан"}</div>
    </article>
  `).join("");
}

async function analyzeExpression(expression) {
  setSolverStatus("neutral", "Виконується аналіз виразу через підмодуль calc...");

  try {
    const payload = await requestJson(`/solver?expression=${encodeURIComponent(expression)}`);
    const graph = payload.solution_graph || {};
    const branches = graph.available_branches || [];
    solverExpressionView.textContent = graph.expression_str || payload.input_expression || expression;
    renderSolverBranches(branches);
    setSolverStatus("success", `Аналіз виконано. Знайдено ${branches.length} доступних кроків.`);
  } catch {
    solverExpressionView.textContent = expression;
    renderSolverBranches([]);
    setSolverStatus("error", "Не вдалося отримати розбір із підмодуля calc. Перевірте backend та Python.");
  }
}

function renderWorkspace() {
  const problem = getProblemById(state.activeProblemId);
  const currentStep = problem.steps[state.stepIndex] || problem.steps[0];
  const formulaInfo = formulasByTopic[problem.topic] || {
    section: problem.topic,
    description: "Для цієї теми можна додати окремий набір формул і правил розв'язання.",
    formulas: ["Формули буде визначено для обраної теми."]
  };

  workspaceTitle.textContent = problem.title;
  workspaceProblem.textContent = problem.prompt;
  workspaceTopic.textContent = problem.topic;
  workspaceLevel.textContent = state.remoteMode ? `${problem.level} · API mode` : `${problem.level} · Demo mode`;
  stepIndicator.textContent = `Крок ${state.stepIndex + 1} із ${problem.steps.length}`;
  stepTitle.textContent = currentStep.title;
  stepDescription.textContent = currentStep.description;
  stepTip.textContent = currentStep.tip;
  formulaSectionTitle.textContent = formulaInfo.section;
  formulaSectionDescription.textContent = formulaInfo.description;
  formulaList.innerHTML = formulaInfo.formulas.map((formula) => `<div class="formula-item">${formula}</div>`).join("");
  answerExample.innerHTML = `<strong>Приклад відповіді:</strong> ${problem.answer}`;
  answerInput.placeholder = `Наприклад: ${problem.answer}`;
  solverExpressionInput.value = problem.prompt;
  solverHint.innerHTML = `<strong>Вираз задачі:</strong> ${problem.prompt}`;

  prevStepButton.disabled = state.stepIndex === 0;
  nextStepButton.textContent = state.stepIndex === problem.steps.length - 1 ? "До початку" : "Наступний крок";
}

function updateProgress() {
  const percent = calculateProgress(state.completed.length, state.problems.length);
  progressValue.textContent = `${percent}%`;
  metricProgress.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  metricModules.textContent = String(state.modules.length);
  metricProblems.textContent = String(state.problems.length);

  if (!state.completed.length) {
    progressSummary.textContent = state.remoteMode
      ? "Серверний профіль підключено, але ще немає завершених задач."
      : "Ще не розпочато жодної задачі.";
    return;
  }

  progressSummary.textContent = `Опрацьовано ${state.completed.length} з ${state.problems.length} задач. Перевірок виконано: ${state.checked}.`;
}

function syncLocalProgress() {
  if (!state.remoteMode) {
    saveLocalProgress();
  }
}

async function markCurrentProblemComplete() {
  if (state.completed.includes(state.activeProblemId)) {
    return;
  }

  if (state.remoteMode) {
    const result = await requestJson("/progress/complete", {
      method: "POST",
      body: JSON.stringify({ problemId: state.activeProblemId })
    });
    state.completed = result.completedProblemIds;
    state.checked = result.checkedCount;
  } else {
    state.completed.push(state.activeProblemId);
    syncLocalProgress();
  }

  updateProgress();
}

async function handleAnswerCheck(event) {
  event.preventDefault();
  const problem = getProblemById(state.activeProblemId);
  const userAnswer = answerInput.value;

  if (!userAnswer.trim()) {
    setFeedback("error", "Спочатку введіть відповідь, а потім запускайте перевірку.");
    return;
  }

  if (state.remoteMode) {
    const result = await requestJson("/progress/check", {
      method: "POST",
      body: JSON.stringify({
        problemId: state.activeProblemId,
        answer: userAnswer
      })
    });

    state.checked = result.progress.checkedCount;
    state.completed = result.progress.completedProblemIds;
    setFeedback(result.correct ? "success" : "error", result.message);
    updateProgress();
    return;
  }

  state.checked += 1;

  if (isCorrectAnswer(problem, userAnswer)) {
    setFeedback("success", "Відповідь правильна. Ви можете перейти до наступної задачі або зарахувати тему як опрацьовану.");
    if (!state.completed.includes(state.activeProblemId)) {
      state.completed.push(state.activeProblemId);
    }
  } else {
    setFeedback("error", "Поки що ні. Підказка: зверніть увагу на алгоритм розв'язання у блоці вище.");
  }

  syncLocalProgress();
  updateProgress();
}

function bindEvents() {
  moduleList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-module-id]");
    if (!button) {
      return;
    }

    state.activeModule = button.dataset.moduleId;
    renderModules();
  });

  problemSelect.addEventListener("change", (event) => {
    state.activeProblemId = event.target.value;
    state.stepIndex = 0;
    renderWorkspace();
    analyzeExpression(getProblemById(state.activeProblemId).prompt);
  });

  document.querySelector("#practice-form").addEventListener("submit", async (event) => {
    try {
      await handleAnswerCheck(event);
    } catch {
      setFeedback("error", "Не вдалося звернутися до сервера. Поверніться до демо-режиму або перевірте API.");
    }
  });

  document.querySelector("#mark-complete").addEventListener("click", async () => {
    try {
      await markCurrentProblemComplete();
      setFeedback("success", "Задачу позначено як опрацьовану. Прогрес оновлено.");
    } catch {
      setFeedback("error", "Не вдалося оновити серверний прогрес.");
    }
  });

  prevStepButton.addEventListener("click", () => {
    state.stepIndex = Math.max(0, state.stepIndex - 1);
    renderWorkspace();
  });

  nextStepButton.addEventListener("click", () => {
    const problem = getProblemById(state.activeProblemId);
    state.stepIndex = state.stepIndex >= problem.steps.length - 1 ? 0 : state.stepIndex + 1;
    renderWorkspace();
  });

  solverForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const expression = solverExpressionInput.value.trim();

    if (!expression) {
      setSolverStatus("error", "Спочатку введіть вираз для аналізу.");
      return;
    }

    await analyzeExpression(expression);
  });
}

async function bootstrap() {
  await initializeData();
  bindEvents();
  renderModules();
  renderProblemSelect();
  renderWorkspace();
  updateProgress();
  analyzeExpression(getProblemById(state.activeProblemId).prompt);

  if (state.remoteMode) {
    setFeedback("neutral", "Підключено API-сервер. Відповіді та прогрес синхронізуються через backend.");
  }
}

bootstrap();
