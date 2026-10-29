import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadTasks, saveTasks } from '../src/lib/taskStore.js';

let directory;
let file;

beforeEach(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'task-store-'));
  file = path.join(directory, 'tasks.json');
});

// Runs even when an assertion above it throws.
afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe('saveTasks / loadTasks', () => {
  it('round-trips tasks through a file', async () => {
    const tasks = [
      { id: 1, title: 'First', completed: false },
      { id: 2, title: 'Second', completed: true },
    ];

    await saveTasks(file, tasks);

    await expect(loadTasks(file)).resolves.toEqual(tasks);
  });

  it('returns an empty array for a missing file', async () => {
    await expect(
      loadTasks(path.join(directory, 'missing.json')),
    ).resolves.toEqual([]);
  });

  it('reports invalid JSON', async () => {
    await writeFile(file, '{ not json', 'utf8');

    await expect(loadTasks(file)).rejects.toThrow(/Invalid JSON/);
  });

  it('reports valid JSON that is not an array', async () => {
    await writeFile(file, '{"id":1}', 'utf8');

    await expect(loadTasks(file)).rejects.toThrow(/Expected a task array/);
  });
});
