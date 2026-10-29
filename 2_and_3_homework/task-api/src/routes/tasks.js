import { Router } from 'express';
import {
  getCompletedTasks,
  getIncompleteTasks,
  getTaskById,
  nextId,
} from '../lib/taskFunctions.js';
import { loadTasks, saveTasks, withWriteLock } from '../lib/taskStore.js';

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(raw) {
  const id = Number(raw);

  if (!Number.isInteger(id)) {
    throw httpError(400, 'Task id must be an integer');
  }

  return id;
}

export function createTaskRouter(tasksFile) {
  const router = Router();

  // GET /api/tasks?completed=true|false
  router.get('/', async (req, res, next) => {
    try {
      const tasks = await loadTasks(tasksFile);
      const { completed } = req.query;

      if (completed === undefined) return res.json(tasks);

      // Query values are strings: "false" is truthy, so compare text.
      if (completed === 'true') return res.json(getCompletedTasks(tasks));
      if (completed === 'false') return res.json(getIncompleteTasks(tasks));

      throw httpError(400, 'Query "completed" must be "true" or "false"');
    } catch (error) {
      next(error);
    }
  });

  // GET /api/tasks/:id
  router.get('/:id', async (req, res, next) => {
    try {
      const id = parseId(req.params.id);
      const tasks = await loadTasks(tasksFile);
      const task = getTaskById(tasks, id);

      if (!task) throw httpError(404, 'Task not found');

      res.json(task);
    } catch (error) {
      next(error);
    }
  });

  // POST /api/tasks
  router.post('/', async (req, res, next) => {
    try {
      const { title } = req.body ?? {};

      if (typeof title !== 'string') {
        throw httpError(400, 'Title is required and must be a string');
      }

      const trimmed = title.trim();

      if (trimmed === '') {
        throw httpError(400, 'Title cannot be empty');
      }

      const created = await withWriteLock(async () => {
        const tasks = await loadTasks(tasksFile);
        const task = { id: nextId(tasks), title: trimmed, completed: false };

        await saveTasks(tasksFile, [...tasks, task]);

        return task;
      });

      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  // PATCH /api/tasks/:id
  router.patch('/:id', async (req, res, next) => {
    try {
      const id = parseId(req.params.id);
      const body = req.body ?? {};
      const updates = {};

      if ('title' in body) {
        if (typeof body.title !== 'string') {
          throw httpError(400, 'Title must be a string');
        }

        const trimmed = body.title.trim();

        if (trimmed === '') {
          throw httpError(400, 'Title cannot be empty');
        }

        updates.title = trimmed;
      }

      if ('completed' in body) {
        if (typeof body.completed !== 'boolean') {
          throw httpError(400, 'Completed must be a boolean');
        }

        updates.completed = body.completed;
      }

      if (Object.keys(updates).length === 0) {
        throw httpError(400, 'Provide a title and/or completed');
      }

      const updated = await withWriteLock(async () => {
        const tasks = await loadTasks(tasksFile);
        const task = getTaskById(tasks, id);

        if (!task) throw httpError(404, 'Task not found');

        const next = { ...task, ...updates };
        await saveTasks(
          tasksFile,
          tasks.map((item) => (item.id === id ? next : item)),
        );

        return next;
      });

      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  // DELETE /api/tasks/:id
  router.delete('/:id', async (req, res, next) => {
    try {
      const id = parseId(req.params.id);

      await withWriteLock(async () => {
        const tasks = await loadTasks(tasksFile);
        const remaining = tasks.filter((task) => task.id !== id);

        if (remaining.length === tasks.length) {
          throw httpError(404, 'Task not found');
        }

        await saveTasks(tasksFile, remaining);
      });

      // 204 means "done, nothing to say": no body at all.
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return router;
}
