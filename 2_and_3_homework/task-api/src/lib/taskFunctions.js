// Pure functions: same input, same output, input never changed.
export function getAllTasks(tasks) {
  return [...tasks];
}

export function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed);
}

export function getIncompleteTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

export function nextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
}
