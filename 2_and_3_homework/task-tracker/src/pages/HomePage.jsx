import { Link } from 'react-router-dom';
import { PageSection } from '../components/PageSection.jsx';

export function HomePage({ tasks }) {
  const done = tasks.filter((task) => task.completed).length;

  return (
    <PageSection title="Task Tracker">
      <p>
        {tasks.length} tasks, {done} completed.
      </p>
      <Link to="/tasks">Go to tasks</Link>
    </PageSection>
  );
}
