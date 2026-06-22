import { calculateProgress } from "./shared/learning-core.js";

const formulasByTopic = {
  "Лінійні рівняння": {
    section: "Алгебра: лінійні рівняння",
    description: "Ізолюємо змінну та виконуємо однакові операції з обома частинами рівняння.",
    formulas: ["ax + b = c", "ax = c - b", "x = (c - b) / a"]
  },
  "Квадратні рівняння": {
    section: "Алгебра: квадратні рівняння",
    description: "Обчислюємо дискримінант і визначаємо корені рівняння.",
    formulas: ["ax² + bx + c = 0", "D = b² - 4ac", "x₁,₂ = (-b ± √D) / 2a"]
  },
  "Функції": {
    section: "Алгебра: функції",
    description: "Працюємо з нулями функції, значенням у точці та областю визначення.",
    formulas: ["y = kx + b", "f(x) = 0", "D(y)"]
  },
  "Планіметрія": {
    section: "Геометрія: планіметрія",
    description: "Застосовуємо формули площ і периметрів до базових фігур.",
    formulas: ["S = a · b", "P = 4a", "S△ = 1/2 · a · h"]
  },
  "Дроби": {
    section: "Арифметика: дроби",
    description: "Скорочення, спільний знаменник і базові арифметичні дії.",
    formulas: ["a/b + c/b = (a + c)/b", "a/b · c/d = ac/bd", "НСД(a, b)"]
  },
  "Пропорції": {
    section: "Алгебра: пропорції",
    description: "Застосовуємо основну властивість пропорції для пошуку невідомого.",
    formulas: ["a/b = c/d", "ad = bc", "x = bc/a"]
  },
  "Відсотки": {
    section: "Арифметика: відсотки",
    description: "Переводимо відсотки у дроби та знаходимо частину від числа.",
    formulas: ["p% = p/100", "part = whole · p/100", "new = whole ± change"]
  },
  "Системи рівнянь": {
    section: "Алгебра: системи рівнянь",
    description: "Використовуємо підстановку або додавання для двох рівнянь.",
    formulas: ["x + y = a", "ax + by = c", "метод підстановки"]
  },
  "Нерівності": {
    section: "Алгебра: нерівності",
    description: "Працюємо з інтервалами та правилом зміни знака.",
    formulas: ["ax + b > c", "x ∈ (a; b)", "при діленні на -1 знак змінюється"]
  },
  "Послідовності": {
    section: "Алгебра: послідовності",
    description: "Застосовуємо формули арифметичної та геометричної прогресій.",
    formulas: ["aₙ = a₁ + (n - 1)d", "bₙ = b₁ · qⁿ⁻¹", "Sₙ"]
  },
  "Степені та корені": {
    section: "Алгебра: степені й корені",
    description: "Спростимо вирази за правилами степенів та квадратних коренів.",
    formulas: ["aᵐ · aⁿ = aᵐ⁺ⁿ", "√a² = |a|", "a⁰ = 1"]
  },
  "Логарифми": {
    section: "Алгебра: логарифми",
    description: "Переходимо між логарифмічним і степеневим записом.",
    formulas: ["logₐ b = c", "aᶜ = b", "logₐ 1 = 0"]
  },
  "Тригонометрія": {
    section: "Тригонометрія",
    description: "Користуємося стандартними значеннями тригонометричних функцій.",
    formulas: ["sin 30° = 1/2", "cos 60° = 1/2", "tg 45° = 1"]
  },
  "Стереометрія": {
    section: "Геометрія: стереометрія",
    description: "Обчислюємо об'єми й площі поверхонь просторових тіл.",
    formulas: ["V = a³", "V = abc", "S = 6a²"]
  },
  "Комбінаторика": {
    section: "Комбінаторика",
    description: "Рахуємо кількість варіантів через правило добутку.",
    formulas: ["n · m", "n!", "C(n, k)"]
  },
  "Ймовірність": {
    section: "Теорія ймовірностей",
    description: "Знаходимо ймовірність як відношення сприятливих випадків до всіх.",
    formulas: ["P = m/n", "0 ≤ P ≤ 1", "класична схема"]
  },
  "Похідна": {
    section: "Математичний аналіз: похідна",
    description: "Використовуємо правило степеня та обчислюємо значення похідної.",
    formulas: ["(xⁿ)' = nxⁿ⁻¹", "f'(x)", "f'(a)"]
  },
  "Інтеграли": {
    section: "Математичний аналіз: інтеграли",
    description: "Шукаємо первісну і прості визначені інтеграли.",
    formulas: ["∫ xⁿ dx", "F(b) - F(a)", "+ C"]
  },
  "Вектори": {
    section: "Аналітична геометрія: вектори",
    description: "Знаходимо координати, довжину й скалярний добуток.",
    formulas: ["|a| = √(x² + y²)", "AB = (x₂ - x₁; y₂ - y₁)", "a · b"]
  },
  "Підсумкова практика": {
    section: "Повторення і самоперевірка",
    description: "Комбінуємо навички з різних тем у коротких тренувальних задачах.",
    formulas: ["покрокова перевірка", "підстановка", "контроль результату"]
  }
};

const apiBase = "http://localhost:3000/api";

const state = {
  modules: [],
  problems: [],
  progress: { checkedCount: 0, completedProblemIds: [], attempts: [] },
  activeModule: "",
  activeProblemId: "",
  stepIndex: 0
};

const elements = {
  metricModules: document.querySelector("#metric-modules"),
  metricProblems: document.querySelector("#metric-problems"),
  metricProgress: document.querySelector("#metric-progress"),
  heroTopicCount: document.querySelector("#hero-topic-count"),
  heroPracticeCount: document.querySelector("#hero-practice-count"),
  heroTopicLinks: document.querySelector("#hero-topic-links"),
  moduleList: document.querySelector("#module-list"),
  moduleDetail: document.querySelector("#module-detail"),
  topicsGrid: document.querySelector("#topics-grid"),
  workspaceTitle: document.querySelector("#workspace-title"),
  workspaceProblem: document.querySelector("#workspace-problem"),
  workspaceTopic: document.querySelector("#workspace-topic"),
  workspaceLevel: document.querySelector("#workspace-level"),
  stepIndicator: document.querySelector("#step-indicator"),
  stepTitle: document.querySelector("#step-title"),
  stepDescription: document.querySelector("#step-description"),
  stepTip: document.querySelector("#step-tip"),
  formulaSectionTitle: document.querySelector("#formula-section-title"),
  formulaSectionDescription: document.querySelector("#formula-section-description"),
  formulaList: document.querySelector("#formula-list"),
  problemSelect: document.querySelector("#problem-select"),
  answerExample: document.querySelector("#answer-example"),
  answerInput: document.querySelector("#answer-input"),
  feedbackBox: document.querySelector("#feedback-box"),
  progressValue: document.querySelector("#progress-value"),
  progressFill: document.querySelector("#progress-fill"),
  progressSummary: document.querySelector("#progress-summary"),
  prevStepButton: document.querySelector("#prev-step"),
  nextStepButton: document.querySelector("#next-step"),
  solverForm: document.querySelector("#solver-form"),
  solverExpressionInput: document.querySelector("#solver-expression"),
  solverHint: document.querySelector("#solver-hint"),
  solverStatus: document.querySelector("#solver-status"),
  solverExpressionView: document.querySelector("#solver-expression-view"),
  solverBranchesList: document.querySelector("#solver-branches-list"),
  progressStats: document.querySelector("#progress-stats"),
  completedList: document.querySelector("#completed-list"),
  attemptsList: document.querySelector("#attempts-list")
};

function getProblemById(problemId) {
  return state.problems.find((problem) => problem.id === problemId) || null;
}

function getModuleById(moduleId) {
  return state.modules.find((module) => module.id === moduleId) || null;
}

function getProblemsByModule(moduleId) {
  return state.problems.filter((problem) => problem.moduleId === moduleId);
}

function syncActiveProblemForModule(moduleId) {
  const moduleProblems = getProblemsByModule(moduleId);
  state.activeProblemId = moduleProblems[0]?.id || state.problems[0]?.id || "";
  state.stepIndex = 0;
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
  state.progress = progress;

  if (!state.modules.length || !state.problems.length) {
    throw new Error("Learning data is empty");
  }

  state.activeModule = state.problems[0]?.moduleId || state.modules[0].id;
  syncActiveProblemForModule(state.activeModule);
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function setHtml(element, value) {
  if (element) {
    element.innerHTML = value;
  }
}

function renderHeroStats() {
  const percent = calculateProgress(state.progress.completedProblemIds.length, state.problems.length);
  setText(elements.metricModules, String(state.modules.length));
  setText(elements.metricProblems, String(state.problems.length));
  setText(elements.metricProgress, `${percent}%`);
  setText(elements.heroTopicCount, String(state.modules.length));
  setText(elements.heroPracticeCount, String(state.problems.length));

  if (elements.heroTopicLinks) {
    elements.heroTopicLinks.innerHTML = state.modules.slice(0, 8).map((module) => `
      <a class="mini-chip" href="topics.html#${module.id}">${module.title}</a>
    `).join("");
  }
}

function renderModules() {
  if (!elements.moduleList || !elements.moduleDetail) {
    return;
  }

  elements.moduleList.innerHTML = state.modules.map((module) => `
    <button class="module-card ${module.id === state.activeModule ? "active" : ""}" data-module-id="${module.id}" type="button">
      <p class="section-tag">${module.level}</p>
      <h4>${module.title}</h4>
      <p>${module.summary}</p>
      <span class="module-card-meta">${getProblemsByModule(module.id).length} задач</span>
    </button>
  `).join("");

  const activeModule = getModuleById(state.activeModule) || state.modules[0];
  const moduleProblems = getProblemsByModule(activeModule.id);
  elements.moduleDetail.innerHTML = `
    <p class="section-tag">Опис модуля</p>
    <h4>${activeModule.title}</h4>
    <p>${activeModule.summary}</p>
    <ul class="detail-list">
      ${activeModule.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
    </ul>
    <div class="detail-footer">
      <span class="module-card-meta">Задач у темі: ${moduleProblems.length}</span>
      <a class="primary-button" href="practice.html">Перейти до практики</a>
    </div>
  `;
}

function renderTopicsGrid() {
  if (!elements.topicsGrid) {
    return;
  }

  elements.topicsGrid.innerHTML = state.modules.map((module) => `
    <article class="topic-tile" id="${module.id}">
      <p class="section-tag">${module.level}</p>
      <h4>${module.title}</h4>
      <p>${module.summary}</p>
      <div class="topic-tile-meta">
        <span>${getProblemsByModule(module.id).length} задач</span>
        <a class="ghost-button" href="practice.html">Відкрити</a>
      </div>
    </article>
  `).join("");
}

function renderProblemSelect() {
  if (!elements.problemSelect) {
    return;
  }

  if (!state.problems.length) {
    elements.problemSelect.innerHTML = `<option value="">Немає доступних задач</option>`;
    elements.problemSelect.disabled = true;
    return;
  }

  if (!state.problems.some((problem) => problem.id === state.activeProblemId)) {
    state.activeProblemId = state.problems[0].id;
  }

  elements.problemSelect.disabled = false;
  elements.problemSelect.innerHTML = state.problems.map((problem) => `
    <option value="${problem.id}" ${problem.id === state.activeProblemId ? "selected" : ""}>
      ${problem.topic}: ${problem.prompt}
    </option>
  `).join("");
}

function renderWorkspace() {
  if (!elements.workspaceTitle) {
    return;
  }

  const problem = getProblemById(state.activeProblemId);

  if (!problem) {
    setText(elements.workspaceTitle, "Дані недоступні");
    setText(elements.workspaceProblem, "Не вдалося завантажити задачі з API.");
    setText(elements.workspaceTopic, "API");
    setText(elements.workspaceLevel, "Очікування");
    setText(elements.stepIndicator, "Крок 0 із 0");
    setText(elements.stepTitle, "Немає активної задачі");
    setText(elements.stepDescription, "Запустіть backend і перезавантажте сторінку.");
    setText(elements.stepTip, "Перевірте API на http://localhost:3000/api.");
    setText(elements.formulaSectionTitle, "Формули");
    setText(elements.formulaSectionDescription, "Після підключення API тут з'являться формули.");
    setHtml(elements.formulaList, `<div class="formula-item">API недоступний</div>`);
    setHtml(elements.answerExample, `<strong>Приклад відповіді:</strong> —`);
    if (elements.answerInput) {
      elements.answerInput.placeholder = "Спочатку запустіть backend";
    }
    if (elements.solverExpressionInput) {
      elements.solverExpressionInput.value = "";
    }
    setHtml(elements.solverHint, `<strong>Вираз задачі:</strong> —`);
    if (elements.prevStepButton) elements.prevStepButton.disabled = true;
    if (elements.nextStepButton) elements.nextStepButton.disabled = true;
    return;
  }

  const currentStep = problem.steps[state.stepIndex] || problem.steps[0];
  const formulaInfo = formulasByTopic[problem.topic] || {
    section: problem.topic,
    description: "Для цієї теми можна додати окремий набір формул і правил розв'язання.",
    formulas: ["Формули буде визначено для обраної теми."]
  };

  setText(elements.workspaceTitle, problem.title);
  setText(elements.workspaceProblem, problem.prompt);
  setText(elements.workspaceTopic, problem.topic);
  setText(elements.workspaceLevel, problem.level);
  setText(elements.stepIndicator, `Крок ${state.stepIndex + 1} із ${problem.steps.length}`);
  setText(elements.stepTitle, currentStep.title);
  setText(elements.stepDescription, currentStep.description);
  setText(elements.stepTip, currentStep.tip);
  setText(elements.formulaSectionTitle, formulaInfo.section);
  setText(elements.formulaSectionDescription, formulaInfo.description);
  setHtml(elements.formulaList, formulaInfo.formulas.map((formula) => `<div class="formula-item">${formula}</div>`).join(""));
  setHtml(elements.answerExample, `<strong>Приклад відповіді:</strong> ${problem.answer}`);

  if (elements.answerInput) {
    elements.answerInput.placeholder = `Наприклад: ${problem.answer}`;
  }

  if (elements.solverExpressionInput) {
    elements.solverExpressionInput.value = problem.prompt;
  }

  setHtml(elements.solverHint, `<strong>Вираз задачі:</strong> ${problem.prompt}`);

  if (elements.prevStepButton) {
    elements.prevStepButton.disabled = state.stepIndex === 0;
  }
  if (elements.nextStepButton) {
    elements.nextStepButton.disabled = false;
    elements.nextStepButton.textContent = state.stepIndex === problem.steps.length - 1 ? "До початку" : "Наступний крок";
  }
}

function setFeedback(kind, text) {
  if (!elements.feedbackBox) {
    return;
  }

  elements.feedbackBox.className = `feedback-box ${kind}`;
  elements.feedbackBox.textContent = text;
}

function setSolverStatus(kind, text) {
  if (!elements.solverStatus) {
    return;
  }

  elements.solverStatus.className = `feedback-box ${kind}`;
  elements.solverStatus.textContent = text;
}

function renderSolverBranches(branches) {
  if (!elements.solverBranchesList) {
    return;
  }

  if (!branches.length) {
    elements.solverBranchesList.innerHTML = `<div class="solver-branch-card">Для цього виразу підмодуль не повернув окремих кроків.</div>`;
    return;
  }

  elements.solverBranchesList.innerHTML = branches.map((branch) => `
    <article class="solver-branch-card">
      <h4>${branch.formula_name}</h4>
      <p>${branch.step_description}</p>
      <div class="solver-next">${branch.next_node?.expression_str || "Кінцевий стан"}</div>
    </article>
  `).join("");
}

async function analyzeExpression(expression) {
  if (!elements.solverExpressionView && !elements.solverStatus) {
    return;
  }

  setSolverStatus("neutral", "Виконується аналіз виразу через підмодуль calc...");

  try {
    const payload = await requestJson(`/solver?expression=${encodeURIComponent(expression)}`);
    const graph = payload.solution_graph || {};
    const branches = graph.available_branches || [];
    setText(elements.solverExpressionView, graph.expression_str || payload.input_expression || expression);
    renderSolverBranches(branches);
    setSolverStatus("success", `Аналіз виконано. Знайдено ${branches.length} доступних кроків.`);
  } catch {
    setText(elements.solverExpressionView, expression);
    renderSolverBranches([]);
    setSolverStatus("error", "Не вдалося отримати розбір із підмодуля calc. Перевірте backend та Python.");
  }
}

function updateProgress() {
  const completed = state.progress.completedProblemIds.length;
  const percent = calculateProgress(completed, state.problems.length);

  setText(elements.progressValue, `${percent}%`);
  setText(elements.metricProgress, `${percent}%`);
  setText(elements.metricModules, String(state.modules.length));
  setText(elements.metricProblems, String(state.problems.length));

  if (elements.progressFill) {
    elements.progressFill.style.width = `${percent}%`;
  }

  if (elements.progressSummary) {
    if (!state.problems.length) {
      elements.progressSummary.textContent = "Прогрес стане доступним після запуску backend API.";
    } else if (!completed) {
      elements.progressSummary.textContent = "Ще немає завершених задач. Почніть із будь-якої теми.";
    } else {
      elements.progressSummary.textContent = `Опрацьовано ${completed} з ${state.problems.length} задач. Перевірок виконано: ${state.progress.checkedCount}.`;
    }
  }

  if (elements.progressStats) {
    elements.progressStats.innerHTML = `
      <article class="stat-card"><strong>${state.modules.length}</strong><span>тем</span></article>
      <article class="stat-card"><strong>${state.problems.length}</strong><span>задач</span></article>
      <article class="stat-card"><strong>${completed}</strong><span>завершено</span></article>
      <article class="stat-card"><strong>${state.progress.checkedCount}</strong><span>перевірок</span></article>
    `;
  }

  if (elements.completedList) {
    const completedProblems = state.progress.completedProblemIds
      .map((problemId) => getProblemById(problemId))
      .filter(Boolean);

    elements.completedList.innerHTML = completedProblems.length
      ? completedProblems.map((problem) => `<li>${problem.topic}: ${problem.title}</li>`).join("")
      : `<li>Ще немає завершених задач.</li>`;
  }

  if (elements.attemptsList) {
    const attempts = [...(state.progress.attempts || [])].slice(-10).reverse();
    elements.attemptsList.innerHTML = attempts.length
      ? attempts.map((attempt) => {
          const problem = getProblemById(attempt.problemId);
          return `
            <li>
              <strong>${problem?.title || attempt.problemId}</strong>
              <span>${attempt.correct ? "Правильно" : "Потрібна ще спроба"}</span>
            </li>
          `;
        }).join("")
      : `<li>Спроб ще не було.</li>`;
  }
}

async function markCurrentProblemComplete() {
  if (!state.activeProblemId || state.progress.completedProblemIds.includes(state.activeProblemId)) {
    return;
  }

  const result = await requestJson("/progress/complete", {
    method: "POST",
    body: JSON.stringify({ problemId: state.activeProblemId })
  });

  state.progress = {
    ...state.progress,
    ...result,
    attempts: state.progress.attempts
  };
  updateProgress();
}

async function handleAnswerCheck(event) {
  event.preventDefault();
  const userAnswer = elements.answerInput?.value || "";

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

  state.progress = result.progress;
  setFeedback(result.correct ? "success" : "error", result.message);
  updateProgress();
}

function bindEvents() {
  if (elements.moduleList) {
    elements.moduleList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-module-id]");
      if (!button) {
        return;
      }

      state.activeModule = button.dataset.moduleId;
      syncActiveProblemForModule(state.activeModule);
      renderModules();
      renderWorkspace();
    });
  }

  if (elements.problemSelect) {
    elements.problemSelect.addEventListener("change", (event) => {
      if (!event.target.value) {
        return;
      }

      state.activeProblemId = event.target.value;
      state.activeModule = getProblemById(state.activeProblemId)?.moduleId || state.activeModule;
      state.stepIndex = 0;
      renderWorkspace();
      analyzeExpression(getProblemById(state.activeProblemId)?.prompt || "");
    });
  }

  const practiceForm = document.querySelector("#practice-form");
  if (practiceForm) {
    practiceForm.addEventListener("submit", async (event) => {
      try {
        await handleAnswerCheck(event);
      } catch {
        setFeedback("error", "Не вдалося звернутися до сервера. Перевірте, чи запущений backend API.");
      }
    });
  }

  const markCompleteButton = document.querySelector("#mark-complete");
  if (markCompleteButton) {
    markCompleteButton.addEventListener("click", async () => {
      try {
        await markCurrentProblemComplete();
        setFeedback("success", "Задачу позначено як опрацьовану. Прогрес оновлено.");
      } catch {
        setFeedback("error", "Не вдалося оновити серверний прогрес.");
      }
    });
  }

  if (elements.prevStepButton) {
    elements.prevStepButton.addEventListener("click", () => {
      state.stepIndex = Math.max(0, state.stepIndex - 1);
      renderWorkspace();
    });
  }

  if (elements.nextStepButton) {
    elements.nextStepButton.addEventListener("click", () => {
      const problem = getProblemById(state.activeProblemId);
      if (!problem) {
        return;
      }

      state.stepIndex = state.stepIndex >= problem.steps.length - 1 ? 0 : state.stepIndex + 1;
      renderWorkspace();
    });
  }

  if (elements.solverForm) {
    elements.solverForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const expression = elements.solverExpressionInput?.value.trim() || "";

      if (!expression) {
        setSolverStatus("error", "Спочатку введіть вираз для аналізу.");
        return;
      }

      await analyzeExpression(expression);
    });
  }
}

function renderAll() {
  renderHeroStats();
  renderModules();
  renderTopicsGrid();
  renderProblemSelect();
  renderWorkspace();
  updateProgress();
}

async function bootstrap() {
  bindEvents();

  try {
    await initializeData();
    renderAll();
    if (elements.feedbackBox) {
      setFeedback("neutral", "Підключено API-сервер. Відповіді та прогрес синхронізуються через backend.");
    }
    if (elements.solverExpressionInput) {
      await analyzeExpression(getProblemById(state.activeProblemId)?.prompt || elements.solverExpressionInput.value || "");
    }
  } catch {
    renderAll();
    if (elements.feedbackBox) {
      setFeedback("error", "Не вдалося завантажити навчальні дані. Запустіть backend і оновіть сторінку.");
    }
    if (elements.solverStatus) {
      setSolverStatus("error", "Підмодуль аналізу недоступний, доки не запущено backend API.");
    }
  }
}

bootstrap();
