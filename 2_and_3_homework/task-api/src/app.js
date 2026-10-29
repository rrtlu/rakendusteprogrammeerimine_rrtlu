import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN, TASKS_FILE } from './config.js';
import { createTaskRouter } from './routes/tasks.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

// Factory so tests can inject their own data file.
export function createApp({
  tasksFile = TASKS_FILE,
  corsOrigin = CORS_ORIGIN,
} = {}) {
  const app = express();

  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());
  app.use(requestLogger);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/tasks', createTaskRouter(tasksFile));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

// The app is exported; nothing here starts listening.
export const app = createApp();
