import { Link } from 'react-router-dom';

export function TaskCard({ task, onToggle, onDelete }) {
  const { id, title, completed } = task;

  return (
    <article className={`task-card${completed ? ' task-card--done' : ''}`}>
      <h3 className="task-card__title">{title}</h3>
      <p>{completed ? 'Completed' : 'Not completed'}</p>

      <button type="button" className="button" onClick={() => onToggle(id)}>
        {completed ? 'Mark as not completed' : 'Mark as completed'}
      </button>

      <button type="button" className="button" onClick={() => onDelete(id)}>
        Delete
      </button>

      <Link to={`/tasks/${id}`}>Details</Link>
    </article>
  );
}
