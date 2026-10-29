import { useRef } from 'react';
import { PageSection } from '../components/PageSection.jsx';
import { TaskForm } from '../components/TaskForm.jsx';
import { TaskList } from '../components/TaskList.jsx';
import { FilterControls } from '../components/FilterControls.jsx';

export function TasksPage({
  tasks,
  filter,
  onFilterChange,
  onAddTask,
  onToggle,
  onDelete,
  status,
}) {
  const titleInputRef = useRef(null);

  // The filtered list is derived, never stored separately.
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <>
      <PageSection title="Add a task">
        <TaskForm onAddTask={onAddTask} inputRef={titleInputRef} />
        <button
          type="button"
          className="button"
          onClick={() => titleInputRef.current?.focus()}
        >
          Add a task
        </button>
      </PageSection>

      <PageSection title="My tasks">
        <FilterControls value={filter} onChange={onFilterChange} />
        {status === 'loading' && <p>Loading tasks…</p>}
        {status === 'error' && <p role="alert">Tasks could not be loaded.</p>}
        {status === 'success' && (
          <TaskList
            tasks={visibleTasks}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        )}
      </PageSection>
    </>
  );
}
