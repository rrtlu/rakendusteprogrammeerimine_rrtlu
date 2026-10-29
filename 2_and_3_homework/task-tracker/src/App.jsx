import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { TasksPage } from './pages/TasksPage.jsx';
import { TaskDetailsPage } from './pages/TaskDetailsPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { getTasks } from './services/taskApi.js';
import { useTaskFilter } from './hooks/useTaskFilter.js';

export default function App() {
  // Shared state lives here, above every page that needs it.
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const { filter, setFilter } = useTaskFilter();

  useEffect(() => {
    let cancelled = false;

    getTasks()
      .then((data) => {
        if (cancelled) return; // an outdated request must not update the UI
        setTasks(data);
        setStatus('success');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleAddTask(title) {
    setTasks((previous) => {
      const nextId =
        previous.length === 0
          ? 1
          : Math.max(...previous.map((task) => task.id)) + 1;

      return [...previous, { id: nextId, title, completed: false }];
    });
  }

  function handleToggle(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDelete(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <HashRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} />} />
          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                filter={filter}
                onFilterChange={setFilter}
                onAddTask={handleAddTask}
                onToggle={handleToggle}
                onDelete={handleDelete}
                status={status}
              />
            }
          />
          <Route
            path="/tasks/:taskId"
            element={<TaskDetailsPage tasks={tasks} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
