// Layout shell. children keeps the markup in one place and lets
// callers supply whatever goes inside.
export function PageSection({ title, children }) {
  return (
    <section className="page-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
