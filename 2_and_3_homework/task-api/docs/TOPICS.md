# Node.js topics

Every section follows the required draft format: explanation, runnable
example, how to run it, one common mistake, connection to Task Tracker.

## 1. What Node.js is, and running JavaScript outside the browser

**Explanation.** Node.js is a runtime: it takes the V8 engine out of Chrome
and gives it file system, process and network access instead of the DOM.
Browser JavaScript talks to a page; Node JavaScript talks to the machine.
`document` does not exist because there is no page. Running a file does not
start a server either — a server is something you write, not something the
runtime does on its own.

**Example.** `src/index.js` prints a greeting and the tasks, and prints
`typeof document` so the difference is visible.

**Run it.** `npm run demo` or `node src/index.js Mari`.

**Common mistake.** Reaching for `document` or `localStorage` in Node.
Fix: use `process.argv`, `node:fs` or `node:process` instead.

**Connection.** This is the process that will later serve the Task Tracker
API. Nothing about it involves a browser.

## 2. npm, package.json and project scripts

**Explanation.** `npm` installs packages and runs scripts. `dependencies`
ship with the app; `devDependencies` are tools used only while developing.
`package.json` declares them, `package-lock.json` pins the exact tree,
`node_modules` holds the unpacked code and stays out of Git. `npm ci`
installs exactly the lockfile; `npm install` may update it.

**Example.** `"start": "node src/server.js"` in `package.json`.

**Run it.** `npm ci`, then `npm start`.

**Common mistake.** Committing `node_modules`, or using `npm install` in CI
so versions drift. Fix: `.gitignore` plus `npm ci`.

**Connection.** Every teammate must be able to install and start the API
with the README alone.

## 3. Modules and reusable task functions

**Explanation.** `"type": "module"` switches the project to ES modules, so
`import`/`export` work and relative paths need the `.js` extension. Data,
logic and startup live in separate files. Functions return values instead of
printing them, which makes them reusable and testable.

**Example.** `src/lib/taskFunctions.js` exports `getAllTasks`,
`getTaskById`, `getCompletedTasks`. All are pure, handle empty arrays, and
`getTaskById` returns `undefined` for an unknown id.

**Run it.** `node --input-type=module -e "import('./src/lib/taskFunctions.js').then(m => console.log(m.getAllTasks([])))"`

**Common mistake.** Forgetting the `.js` extension in a relative import.
Fix: write `'../lib/taskFunctions.js'`, extension included.

**Connection.** Routes stay thin because the list logic already exists and
is tested separately.

## 4. HTTP, APIs and JSON

**Explanation.** A client sends a request; the server sends a response. A
request has a method, a URL (path plus query string), headers and sometimes
a body. Status codes say what happened: `200` ok, `201` created, `204` no
content, `400` bad request, `404` not found, `500` server error. JSON is
text; a JavaScript object is not JSON until `JSON.stringify` runs.

**Example.** `GET /api/tasks/2` with `Accept: application/json` answers
`200` and the body `{"id":2,"title":"Practise React state","completed":false}`.
Method `GET`, path `/api/tasks/2`, status `200`, body as above.

**Run it.** `curl -i http://localhost:3000/api/tasks/2`

**Common mistake.** Sending a JS object as a body without serialising it.
Fix: `JSON.stringify(object)` and `Content-Type: application/json`.

**Connection.** These are exactly the shapes the React frontend will send
and receive.

## 5. Express and your first API route

**Explanation.** Express adds routing, middleware and body parsing on top of
`node:http`. `req` and `res` are the request and response, `res.json()`
serialises and sets the content type, `app.listen()` binds a port on
localhost. The app is exported from `src/app.js` and started in
`src/server.js`, so tests can import it without opening a port.

**Example.** `GET /api/health` returns `{ "status": "ok" }`.

**Run it.** `npm start`, then `curl http://localhost:3000/api/health`.

**Common mistake.** Calling `listen()` in `app.js`, which leaves the port
taken during tests. Fix: keep `listen()` in `server.js` only.

**Connection.** `server.js` is the single entry point of the backend.

## 6. GET routes, route and query parameters

**Explanation.** `req.params` reads path segments, `req.query` reads the
query string. Both are strings, so an id has to be converted before
comparison. Query values are also strings — `"false"` is truthy, which is
why `if (req.query.completed)` is always true. A valid id that does not
exist is a `404`, not an empty response.

**Example.** `GET /api/tasks`, `/api/tasks/:id`, `?completed=true` and
`?completed=false`, with `400` for anything else.

**Run it.** `curl 'http://localhost:3000/api/tasks?completed=false'`

**Common mistake.** `if (req.query.completed)` and getting both filters.
Fix: compare with `'true'` and `'false'` explicitly.

**Connection.** This is the list the Task Tracker loads.

## 7. POST routes, request bodies and validation

**Explanation.** `POST` creates a resource. `express.json()` parses the body
only when `Content-Type: application/json` is set. The server validates
anyway, because the frontend can be bypassed with curl. The server assigns
the id — a client-supplied id would collide.

**Example.** `POST /api/tasks` with `{"title":"Learn Express"}` trims the
title, assigns the next id, sets `completed: false` and answers `201`.

**Run it.**
`curl -i -X POST http://localhost:3000/api/tasks -H 'Content-Type: application/json' -d '{"title":"Learn Express"}'`

**Common mistake.** Trusting `req.body.title` without a type check, so
`{"title":42}` crashes the route. Fix: `typeof title !== 'string'` → `400`.

**Connection.** The React form posts here, and the returned task carries the
id the UI must use.

## 8. PATCH and DELETE routes

**Explanation.** `PATCH` changes part of a resource; `DELETE` removes it.
Both look the task up first and answer `404` when it is missing. Only
supplied fields are validated and merged. `204` has no body, because
nothing remains to describe.

**Example.** `PATCH /api/tasks/2` with `{"completed":true}`; `DELETE
/api/tasks/2` answering `204`.

**Run it.**
`curl -i -X PATCH http://localhost:3000/api/tasks/2 -H 'Content-Type: application/json' -d '{"completed":true}'`
then `curl -i -X DELETE http://localhost:3000/api/tasks/2`

**Common mistake.** Returning `200` with a body from DELETE. Fix:
`res.status(204).end()`.

**Connection.** Toggle and delete in the UI call these two routes.

## 9. Middleware and consistent error handling

**Explanation.** Middleware is a function with `(req, res, next)` that runs
in registration order. `next()` passes control on; `next(error)` jumps to
the error handler. Logging runs first, routes next, then a 404 for unknown
routes, then the error handler last. Validation errors are `400` and show
their message; unexpected errors are `500` and show a generic message so no
stack trace leaks.

**Example.** `requestLogger`, `notFound`, `errorHandler`, and
`{ "error": "Task not found" }` as the single error shape.

**Run it.** `curl -i http://localhost:3000/api/tasks/99`

**Common mistake.** Registering the error handler before the routes, so it
never sees the error. Fix: it goes last, after `notFound`.

**Connection.** Every failure in the API answers in one predictable shape
that the frontend can display.

## 10. Connecting React to Node.js

**Explanation.** Frontend and backend are two processes on two origins, so
the browser needs CORS permission from the backend. The frontend reads the
base URL from `VITE_API_URL`. A deployed frontend cannot reach your
`localhost`, and because Vite inlines the value at build time, changing it
means rebuilding.

**Example.** `src/services/taskApi.js` in the React app:

```js
const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function createTask(title) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

**Run it.** Backend `npm start`; frontend `.env` with
`VITE_API_URL=http://localhost:3000/api`, then `npm run dev`.

**Common mistake.** Forgetting `Content-Type`, so `express.json()` leaves
`req.body` empty and every POST fails with `400`. Fix: set the header.

**Connection.** The UI now stores nothing locally; the server owns the ids.

## 11. Automated API tests and repeatable test data

**Explanation.** An integration test drives the real routes over HTTP and
asserts on status codes and bodies. Supertest does this against the exported
`app` without opening a port. Each test gets its own temporary file, so
order never matters.

**Example.** `test/api.test.js` covers list, filter, create, invalid input,
`404` and delete.

**Run it.** `npm test`

**Common mistake.** Sharing one data file across tests, so a delete in one
test breaks the next. Fix: `mkdtemp` per test in `beforeEach`.

**Connection.** The API can be changed confidently; the suite catches
regressions.

## 12. Saving tasks to a JSON file

**Explanation.** In-memory data dies with the process. `node:fs/promises`
reads and writes asynchronously, `JSON.parse` turns text into objects and
`JSON.stringify` the reverse. A missing file means "no tasks yet"; a broken
file means something else. Concurrent writes interleave, so writes are
serialised.

**Example.** `saveTasks` and `loadTasks` in `src/lib/taskStore.js`, called
through `withWriteLock`.

**Run it.** `npm start`, create a task, restart, `GET /api/tasks`.

**Common mistake.** Writing without a lock, so two simultaneous POSTs
overwrite each other. Fix: `withWriteLock`.

**Connection.** Tasks survive a restart until a real database arrives.

## 13. Environment variables and backend configuration

**Explanation.** An environment variable is a value the process reads at
startup via `process.env`; values are always strings. Configuration lives in
`src/config.js` so no route reads `process.env`. `.env` holds real values and
stays out of Git; `.env.example` documents the keys.

**Example.** `PORT` and `TASKS_FILE` with defaults, read once in `config.js`.

**Run it.** `PORT=4000 TASKS_FILE=./data/other.json npm start`

**Common mistake.** `const PORT = process.env.PORT` and getting the string
`"4000"`. Fix: `Number(process.env.PORT ?? 3000)`.

**Connection.** The same backend runs against a scratch file or a real one
without editing a route.

## 14. Handling missing and corrupted data files

**Explanation.** `async`/`await` plus `try/catch` is how a failure is
handled locally. A missing file has the code `ENOENT` and means "start
empty". Invalid JSON and non-array JSON mean "data exists but is broken" and
must be reported, not silently replaced — otherwise the next save destroys
the user's data.

**Example.** `loadTasks` in `src/lib/taskStore.js` distinguishes all three
cases and never writes.

**Run it.** `echo '{ not json' > /tmp/bad.json` then
`TASKS_FILE=/tmp/bad.json npm start` and call `GET /api/tasks`.

**Common mistake.** `catch { return [] }` around everything, so a corrupted
file looks empty and gets overwritten. Fix: return `[]` only for `ENOENT`.

**Connection.** A damaged task file is reported instead of lost.

## 15. Testing saving and loading with a temporary file

**Explanation.** Tests must not touch `data/tasks.json`. A temporary
directory from `mkdtemp` gives each test an isolated path, and `afterEach`
removes it with `force: true` so cleanup also runs after a failed assertion.

**Example.** `test/store.test.js` round-trips two tasks through a temp file.

**Run it.** `npm test`

**Common mistake.** Writing the temp file into the project root and leaving
it behind. Fix: `mkdtemp(path.join(tmpdir(), 'task-store-'))` and
`rm(directory, { recursive: true, force: true })`.

**Connection.** Persistence is verified without touching real task data.
