import 'dotenv/config';

// Configuration lives here and nowhere else. Routes never read process.env.
export const PORT = Number(process.env.PORT ?? 3000);
export const TASKS_FILE = process.env.TASKS_FILE ?? './data/tasks.json';
export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';
