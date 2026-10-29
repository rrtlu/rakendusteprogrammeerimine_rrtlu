import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

let directory;
let tasksFile;
let app;

beforeEach(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'task-api-'));
  tasksFile = path.join(directory, 'tasks.json');

  await writeFile(
    tasksFile,
    JSON.stringify([
      { id: 1, title: 'Learn JSX', completed: true },
      { id: 2, title: 'Practise React state', completed: false },
    ]),
    'utf8',
  );

  app = createApp({ tasksFile });
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe('GET /api/tasks', () => {
  it('returns every task', async () => {
    const response = await request(app).get('/api/tasks').expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('Learn JSX');
  });

  it('filters completed tasks', async () => {
    const response = await request(app)
      .get('/api/tasks?completed=true')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(1);
  });

  it('rejects an invalid filter value', async () => {
    await request(app).get('/api/tasks?completed=maybe').expect(400);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns one task', async () => {
    const response = await request(app).get('/api/tasks/2').expect(200);

    expect(response.body.title).toBe('Practise React state');
  });

  it('returns 404 for an unknown id', async () => {
    const response = await request(app).get('/api/tasks/99').expect(404);

    expect(response.body).toEqual({ error: 'Task not found' });
  });
});

describe('POST /api/tasks', () => {
  it('creates a task with a server-assigned id', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: '  Learn Express  ' })
      .expect(201);

    expect(response.body).toEqual({
      id: 3,
      title: 'Learn Express',
      completed: false,
    });
  });

  it('rejects an empty title', async () => {
    await request(app).post('/api/tasks').send({ title: '   ' }).expect(400);
  });

  it('rejects a non-string title', async () => {
    await request(app).post('/api/tasks').send({ title: 42 }).expect(400);
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('toggles completion', async () => {
    const response = await request(app)
      .patch('/api/tasks/2')
      .send({ completed: true })
      .expect(200);

    expect(response.body.completed).toBe(true);
  });

  it('rejects a wrong type', async () => {
    await request(app)
      .patch('/api/tasks/2')
      .send({ completed: 'yes' })
      .expect(400);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('removes the task and answers 204 without a body', async () => {
    const response = await request(app).delete('/api/tasks/1').expect(204);

    expect(response.text).toBe('');

    const remaining = await request(app).get('/api/tasks').expect(200);
    expect(remaining.body.map((task) => task.id)).toEqual([2]);
  });

  it('returns 404 for an unknown id', async () => {
    await request(app).delete('/api/tasks/99').expect(404);
  });
});

describe('unknown routes', () => {
  it('answer JSON 404', async () => {
    const response = await request(app).get('/api/nope').expect(404);

    expect(response.body.error).toContain('Unknown route');
  });
});
