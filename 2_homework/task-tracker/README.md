# Task Tracker

React frontend for the shared Task Tracker project.

## Scripts

| Command | Purpose |
|---|---|
| `npm install` | install dependencies |
| `npm run dev` | start the development server |
| `npm run build` | production build into `dist` |
| `npm run preview` | preview the production build |
| `npm run format` | format with Prettier |
| `npm run format:check` | verify formatting |
| `npm test` | run the component tests |

## Structure

- `src/components/` — presentational components (`TaskCard`, `TaskForm`, `TaskList`, `PageSection`, `FilterControls`, `Header`)
- `src/pages/` — route targets (`HomePage`, `TasksPage`, `TaskDetailsPage`, `NotFoundPage`)
- `src/services/taskApi.js` — the single place that knows where task data comes from
- `src/hooks/useTaskFilter.js` — filter state persisted to `localStorage`
- `docs/13-debugging-and-tests.md` — debugging notes and the deliberate-break demonstration

## Notes

- Task state lives in `App` and is passed down; no component mutates the
  array or the objects it receives.
- `HashRouter` is used so the GitHub Pages build survives a refresh.
- The filter preference is the only thing in `localStorage`; task data will
  come from the backend later.
