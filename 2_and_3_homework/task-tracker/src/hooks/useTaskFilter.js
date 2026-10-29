import { useEffect, useState } from 'react';

const STORAGE_KEY = 'task-tracker.filter';
const ALLOWED = ['all', 'completed', 'incomplete'];

export function useTaskFilter() {
  // Lazy initialiser: localStorage is read once, on mount.
  const [filter, setFilter] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return ALLOWED.includes(saved) ? saved : 'all';
  });

  // Persist every change. Only the preference is stored, never task data.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, filter);
  }, [filter]);

  return { filter, setFilter };
}
