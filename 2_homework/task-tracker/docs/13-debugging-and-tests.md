# React debugging and component tests

## 1. Browser console errors and React warnings

The console is the first place to look, and it is not noise.

- A red error stops execution and gives a stack trace. The top frames are
  usually inside `react-dom`; the first frame in your own files is the
  interesting one.
- React warnings are yellow: missing `key`, `onChange` without `value`,
  state updated during render, `NaN` in a style value, unknown DOM props.
  They do not stop the app, which is exactly why they get ignored until the
  component misbehaves.
- `StrictMode` double-invokes renders and effects in development. Seeing an
  effect run twice is not a bug; it is StrictMode checking that the effect
  is safe to run twice.
- `console.log` in a component shows the props of that render, not the
  current ones. `console.table(tasks)` is easier to scan for a list.

Read the first line, not the last. The last line is usually
"Consider adding an error boundary".

## 2. Inspecting props and state with React Developer Tools

The DevTools panel shows the component tree, and selecting a component
shows its current props and hooks.

- Props tab: what the parent passed. If a value is wrong here, the bug is
  in the parent, not in the child.
- Hooks tab: `useState` shows `[value, setter]` with the current value.
  Editing it there re-renders immediately, which is the fastest way to check
  whether a component renders correctly for a given state.
- The highlight overlay shows which component owns the selected node, so a
  wrongly nested element is visible at once.
- The profiler records a render and shows which components re-rendered and
  why, which is how an unnecessary re-render is found.

## 3. What a component test checks

A component test renders one component with controlled props and asserts on
what a user could observe: visible text, roles, and the callbacks that fire.

It does not check the database, the router configuration, or CSS. Those have
their own tests. A component test answers one question: given these props,
does the component behave as promised?

## 4. Testing behaviour, not styling or internal variable names

- `getByRole('button', { name: /mark as completed/i })` keeps passing when
  the class name, the wrapper element or the internal variable names change.
- `container.querySelector('.task-card__btn-2')` breaks on any markup change.
- Testing behaviour also documents the contract: the card must call
  `onToggle` with its id. That is the requirement, not how it looks.
- Prefer `screen` queries over `container`, and prefer roles and labels over
  test ids.

## The tests

`src/components/TaskCard.test.jsx` contains two tests:

1. the supplied title appears;
2. clicking the toggle button calls `onToggle` with the task id.

Both go through `renderCard()`, which wraps the component in `MemoryRouter`
because the card renders a `<Link>`.

Run them with `npm test`.

## Completion requirement: break it on purpose

### Break 1 — the title

In `TaskCard.jsx`, replace `{title}` with a hard-coded string:

```jsx
<h3 className="task-card__title">Task</h3>
```

Result:

```
FAIL  src/components/TaskCard.test.jsx > TaskCard > shows the supplied task title
TestingLibraryElementError: Unable to find an accessible element with the role "heading" and name "Practise React state"
```

The test fails because the title is no longer the supplied one, even though
the component still renders. Restore `{title}`.

### Break 2 — the callback argument

Remove the id from the toggle call:

```jsx
<button type="button" className="button" onClick={() => onToggle()}>
```

Result:

```
FAIL  src/components/TaskCard.test.jsx > TaskCard > calls onToggle with the task id
AssertionError: expected "spy" to be called with arguments: [ 2 ]
Number of calls: 1
```

The click still happens and the callback still fires, so a test that only
checked `toHaveBeenCalled()` would still pass. Checking the argument is what
catches it. Restore `onToggle(id)`.

### Break 3 — wiring

Point the click at the wrong handler:

```jsx
<button type="button" className="button" onClick={() => onDelete(id)}>
```

Result: `expected "spy" to be called with arguments: [ 2 ]` on `onToggle`,
because `onToggle` was never called.
