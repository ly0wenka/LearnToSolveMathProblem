import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const defaultProgress = {
  checkedCount: 0,
  completedProblemIds: [],
  attempts: []
};

export class FileProgressStore {
  constructor(filePath) {
    this.filePath = resolve(filePath);
  }

  async ensureFile() {
    await mkdir(dirname(this.filePath), { recursive: true });

    try {
      await readFile(this.filePath, "utf8");
    } catch (error) {
      await this.write(defaultProgress);
    }
  }

  async read() {
    await this.ensureFile();
    const raw = await readFile(this.filePath, "utf8");
    return JSON.parse(raw);
  }

  async write(data) {
    await writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  async markAttempt({ problemId, answer, correct }) {
    const current = await this.read();
    current.checkedCount += 1;
    current.attempts.push({
      problemId,
      answer,
      correct,
      checkedAt: new Date().toISOString()
    });

    if (correct && !current.completedProblemIds.includes(problemId)) {
      current.completedProblemIds.push(problemId);
    }

    await this.write(current);
    return current;
  }

  async markComplete(problemId) {
    const current = await this.read();
    if (!current.completedProblemIds.includes(problemId)) {
      current.completedProblemIds.push(problemId);
    }
    await this.write(current);
    return current;
  }

  async reset() {
    await this.write(defaultProgress);
    return this.read();
  }
}
