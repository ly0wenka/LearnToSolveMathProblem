import { calculateProgress } from "./shared/learning-core.js";

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
    description: "Для базових геометричних задач спершу визначаємо відомі величини й підбираємо формулу.",
    formulas: ["S = a · b", "P = 2(a + b)", "S△ = 1/2 · a · h"]
  }
};

const apiBase = "http://localhost:3000/api";

const state = {
  modules: [],
  problems: [],
  activeModule: "",
  activeProblemId: "",
  stepIndex: 0,
  completed: [],
  checked: 0
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

function getProblemById(problemId) {
  return state.problems.find((problem) => problem.id === problemId) || null;
}

function getModuleById(moduleId) {
  return state.modules.find((module) => module.id === moduleId) || null;
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
  const [modules, problems, progress] = await Promise.all([
    requestJson("/modules"),
    requestJson("/problems"),
    requestJson("/progress")
  ]);

  state.modules = modules.items;
  state.problems = problems.items;
  state.completed = progress.completedProblemIds;
  state.checked = progress.checkedCount;

  if (!state.modules.length || !state.problems.length) {
    throw new Error("Learning data is empty");
  }

  state.activeModule = state.modules[0].id;
  state.activeProblemId = state.problems[0].id;
}

function renderModules() {
  if (!state.modules.length) {
    moduleList.innerHTML = "";
    moduleDetail.innerHTML = `
      <p class="section-tag">Опис модуля</p>
      <h4>Дані недоступні</h4>
      <p>Запустіть backend API, щоб завантажити навчальні модулі.</p>
    `;
    return;
  }

  moduleList.innerHTML = state.modules.map((module) => `
    <button class="module-card ${module.id === state.activeModule ? "active" : ""}" data-module-id="${module.id}" type="button">
      <p class="section-tag">${module.level}</p>
      <h4>${module.title}</h4>
      <p>${module.summary}</p>
      <span class="module-card-meta">Навчальна ціль</span>
    </button>
  `).join("");

  const activeModule = getModuleById(state.activeModule) || state.modules[0];
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
  if (!state.problems.length) {
    problemSelect.innerHTML = `<option value="">Немає доступних задач</option>`;
    problemSelect.disabled = true;
    return;
  }

  problemSelect.disabled = false;
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
    solverBranchesList.innerHTML = `<div class="solver-branch-card">Для цього виразу підмодуль не повернув окремих кроків.</div>`;
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

  if (!problem) {
    workspaceTitle.textContent = "Дані недоступні";
    workspaceProblem.textContent = "Не вдалося завантажити задачі з API.";
    workspaceTopic.textContent = "API";
    workspaceLevel.textContent = "Очікування";
    stepIndicator.textContent = "Крок 0 із 0";
    stepTitle.textContent = "Немає активної задачі";
    stepDescription.textContent = "Запустіть backend і перезавантажте сторінку.";
    stepTip.textContent = "Перевірте, що сервер відповідає на http://localhost:3000/api.";
    formulaSectionTitle.textContent = "Формули";
    formulaSectionDescription.textContent = "Після підключення API тут з'являться формули та пояснення.";
    formulaList.innerHTML = `<div class="formula-item">API недоступний</div>`;
    answerExample.innerHTML = `<strong>Приклад відповіді:</strong> —`;
    answerInput.placeholder = "Спочатку запустіть backend";
    solverExpressionInput.value = "";
    solverHint.innerHTML = `<strong>Вираз задачі:</strong> —`;
    prevStepButton.disabled = true;
    nextStepButton.disabled = true;
    return;
  }

  const currentStep = problem.steps[state.stepIndex] || problem.steps[0];
  const formulaInfo = formulasByTopic[problem.topic] || {
    section: problem.topic,
    description: "Для цієї теми можна додати окремий набір формул і правил розв'язання.",
    formulas: ["Формули буде визначено для обраної теми."]
  };

  workspaceTitle.textContent = problem.title;
  workspaceProblem.textContent = problem.prompt;
  workspaceTopic.textContent = problem.topic;
  workspaceLevel.textContent = problem.level;
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
  nextStepButton.disabled = false;
  nextStepButton.textContent = state.stepIndex === problem.steps.length - 1 ? "До початку" : "Наступний крок";
}

function updateProgress() {
  const percent = calculateProgress(state.completed.length, state.problems.length);
  progressValue.textContent = `${percent}%`;
  metricProgress.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  metricModules.textContent = String(state.modules.length);
  metricProblems.textContent = String(state.problems.length);

  if (!state.problems.length) {
    progressSummary.textContent = "Прогрес стане доступним після запуску backend API.";
    return;
  }

  if (!state.completed.length) {
    progressSummary.textContent = "Серверний профіль підключено, але ще немає завершених задач.";
    return;
  }

  progressSummary.textContent = `Опрацьовано ${state.completed.length} з ${state.problems.length} задач. Перевірок виконано: ${state.checked}.`;
}

async function markCurrentProblemComplete() {
  if (!state.activeProblemId || state.completed.includes(state.activeProblemId)) {
    return;
  }

  const result = await requestJson("/progress/complete", {
    method: "POST",
    body: JSON.stringify({ problemId: state.activeProblemId })
  });

  state.completed = result.completedProblemIds;
  state.checked = result.checkedCount;
  updateProgress();
}

async function handleAnswerCheck(event) {
  event.preventDefault();
  const userAnswer = answerInput.value;

  if (!userAnswer.trim()) {
    setFeedback("error", "Спочатку введіть відповідь, а потім запускайте перевірку.");
    return;
  }

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
    if (!event.target.value) {
      return;
    }

    state.activeProblemId = event.target.value;
    state.stepIndex = 0;
    renderWorkspace();
    analyzeExpression(getProblemById(state.activeProblemId)?.prompt || "");
  });

  document.querySelector("#practice-form").addEventListener("submit", async (event) => {
    try {
      await handleAnswerCheck(event);
    } catch {
      setFeedback("error", "Не вдалося звернутися до сервера. Перевірте, чи запущений backend API.");
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
    if (!problem) {
      return;
    }

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
  bindEvents();

  try {
    await initializeData();
    renderModules();
    renderProblemSelect();
    renderWorkspace();
    updateProgress();
    await analyzeExpression(getProblemById(state.activeProblemId)?.prompt || "");
    setFeedback("neutral", "Підключено API-сервер. Відповіді та прогрес синхронізуються через backend.");
  } catch {
    renderModules();
    renderProblemSelect();
    renderWorkspace();
    updateProgress();
    setFeedback("error", "Не вдалося завантажити навчальні дані. Запустіть backend і оновіть сторінку.");
    setSolverStatus("error", "Підмодуль аналізу недоступний, доки не запущено backend API.");
  }
}

bootstrap();
