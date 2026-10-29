import { useState } from 'react';

export function TaskForm({ onAddTask, inputRef }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();

    if (trimmed === '') {
      setError('Task title cannot be empty.');
      return;
    }

    onAddTask(trimmed);
    setTitle('');
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title">Task title</label>
      <input
        id="task-title"
        ref={inputRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {error !== '' && (
        <p role="alert" className="task-form__error">
          {error}
        </p>
      )}
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}
