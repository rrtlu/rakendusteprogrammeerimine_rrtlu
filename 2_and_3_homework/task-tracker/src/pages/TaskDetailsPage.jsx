import { Link, useParams } from 'react-router-dom';
import { PageSection } from '../components/PageSection.jsx';

export function TaskDetailsPage({ tasks }) {
  const { taskId } = useParams();
  // URL parameters are always strings.
  const task = tasks.find((item) => item.id === Number(taskId));

  if (!task) {
    return (
      <PageSection title="Task not found">
        <p>No task with id {taskId}.</p>
        <Link to="/tasks">Back to tasks</Link>
      </PageSection>
    );
  }

  return (
    <PageSection title={task.title}>
      <p>{task.completed ? 'Completed' : 'Not completed'}</p>
      <Link to="/tasks">Back to tasks</Link>
    </PageSection>
  );
}
