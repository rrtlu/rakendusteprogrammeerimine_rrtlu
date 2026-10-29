import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Writes are serialised so two concurrent requests cannot interleave.
let writeQueue = Promise.resolve();

export function withWriteLock(operation) {
  const run = writeQueue.then(operation, operation);
  writeQueue = run.catch(() => {});
  return run;
}

export async function loadTasks(filePath) {
  let text;

  try {
    text = await readFile(filePath, 'utf8');
  } catch (error) {
    // Only a missing file means "no tasks yet".
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON in ${filePath}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`Expected a task array in ${filePath}`);
  }

  return parsed;
}

export async function saveTasks(filePath, tasks) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(tasks, null, 2)}\n`, 'utf8');
}
