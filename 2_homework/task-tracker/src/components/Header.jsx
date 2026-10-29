import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="site-header">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
      </nav>
    </header>
  );
}
