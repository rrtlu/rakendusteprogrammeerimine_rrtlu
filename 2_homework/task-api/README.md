# Task API

Express backend for the Task Tracker. Tasks are stored in a JSON file.

## Requirements

Node.js 20 or newer.

## Install and run

```
npm ci
cp .env.example .env
npm start
```

`npm start` runs `node src/server.js`. `npm run dev` restarts on change.

## Configuration

Both settings have defaults, so the app runs without a `.env` file.

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |
| `TASKS_FILE` | `./data/tasks.json` | File that stores the tasks |
| `CORS_ORIGIN` | `http://localhost:5173` | Frontend origin allowed to call the API |

Copy `.env.example` to `.env` and change values there. `.env` stays out of Git.

## Endpoints

| Method | Path | Success | Notes |
|---|---|---|---|
| GET | `/api/health` | `200` | `{ "status": "ok" }` |
| GET | `/api/tasks` | `200` | optional `?completed=true|false` |
| GET | `/api/tasks/:id` | `200` | `404` when unknown |
| POST | `/api/tasks` | `201` | body `{ "title": "..." }` |
| PATCH | `/api/tasks/:id` | `200` | `title` and/or `completed` |
| DELETE | `/api/tasks/:id` | `204` | no body |

Errors are always `{ "error": "message" }`. `400` is a bad request, `404`
an unknown task or route, `500` an unexpected failure.

## Tests

```
npm test
```

Tests use Supertest against the exported app and a fresh temporary directory
per test, so they never touch `data/tasks.json`.

## Notes

- `src/app.js` exports `app`; only `src/server.js` calls `listen`.
- Data access goes through `src/lib/taskStore.js`.
- Writes are serialised with `withWriteLock` so concurrent requests cannot
  overwrite each other.
