import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { TaskCard } from './TaskCard.jsx';

const task = { id: 2, title: 'Practise React state', completed: false };

// TaskCard renders a <Link>, so it needs a router in the tree.
function renderCard(overrides = {}) {
  const onToggle = overrides.onToggle ?? vi.fn();
  const onDelete = overrides.onDelete ?? vi.fn();

  render(
    <MemoryRouter>
      <TaskCard
        task={overrides.task ?? task}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </MemoryRouter>,
  );

  return { onToggle, onDelete };
}

describe('TaskCard', () => {
  it('shows the supplied task title', () => {
    renderCard();

    expect(
      screen.getByRole('heading', { name: 'Practise React state' }),
    ).toBeInTheDocument();
  });

  it('calls onToggle with the task id when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    const { onToggle } = renderCard();

    await user.click(screen.getByRole('button', { name: /mark as completed/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(2);
  });
});
