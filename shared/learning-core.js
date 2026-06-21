export function normalizeAnswer(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

export function buildAcceptedAnswers(problem) {
  return [problem.answer, ...(problem.variants || [])].map(normalizeAnswer);
}

export function isCorrectAnswer(problem, userAnswer) {
  return buildAcceptedAnswers(problem).includes(normalizeAnswer(userAnswer));
}

export function calculateProgress(completedCount, totalCount) {
  const safeCompleted = Math.max(Number(completedCount) || 0, 0);
  const safeTotal = Math.max(Number(totalCount) || 0, 1);
  return Math.round((safeCompleted / safeTotal) * 100);
}
