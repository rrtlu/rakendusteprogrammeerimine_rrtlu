import { Link } from 'react-router-dom';
import { PageSection } from '../components/PageSection.jsx';

export function NotFoundPage() {
  return (
    <PageSection title="Page not found">
      <p>The address you opened does not exist.</p>
      <Link to="/">Go home</Link>
    </PageSection>
  );
}
