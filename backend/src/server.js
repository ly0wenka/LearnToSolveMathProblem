import { createServer } from "node:http";
import { modules, problems } from "./content.js";
import { FileProgressStore } from "./store.js";

const port = Number(process.env.PORT || 3000);
const store = new FileProgressStore(new URL("../storage/progress.json", import.meta.url).pathname);

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(data));
}

function normalizeAnswer(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function findProblem(problemId) {
  return problems.find((problem) => problem.id === problemId);
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "mathmentor-flow-api" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/modules") {
    sendJson(response, 200, { items: modules });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/problems") {
    sendJson(response, 200, { items: problems });
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/api/problems/")) {
    const problemId = url.pathname.split("/").pop();
    const problem = findProblem(problemId);

    if (!problem) {
      sendJson(response, 404, { message: "Problem not found." });
      return;
    }

    sendJson(response, 200, problem);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/progress") {
    const progress = await store.read();
    sendJson(response, 200, progress);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/progress/check") {
    const body = await parseRequestBody(request);
    const problem = findProblem(body.problemId);

    if (!problem) {
      sendJson(response, 404, { message: "Problem not found." });
      return;
    }

    const acceptedAnswers = [problem.answer, ...problem.variants].map(normalizeAnswer);
    const correct = acceptedAnswers.includes(normalizeAnswer(body.answer));
    const progress = await store.markAttempt({
      problemId: body.problemId,
      answer: body.answer,
      correct
    });

    sendJson(response, 200, {
      correct,
      message: correct
        ? "Відповідь правильна. Прогрес успішно збережено на сервері."
        : "Відповідь поки що неправильна. Скористайтеся підказками та спробуйте ще раз.",
      progress
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/progress/complete") {
    const body = await parseRequestBody(request);
    const problem = findProblem(body.problemId);

    if (!problem) {
      sendJson(response, 404, { message: "Problem not found." });
      return;
    }

    const progress = await store.markComplete(body.problemId);
    sendJson(response, 200, progress);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/progress/reset") {
    const progress = await store.reset();
    sendJson(response, 200, progress);
    return;
  }

  sendJson(response, 404, { message: "Route not found." });
}

createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(response, 500, {
      message: "Internal server error.",
      details: error.message
    });
  });
}).listen(port, () => {
  console.log(`MathMentor Flow API running on http://localhost:${port}`);
});
