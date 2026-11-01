import { Link } from 'react-router-dom';
import Orb from '../Orb';

// Shared shell for the homepage sections: the heading and "see all" link sit in a
// sticky left column on wide screens, the content fills the right.
export default function HomeSection({ id, title, orb, link, compact = false, children }) {
  return (
    <section id={id} className={`section home-section${compact ? ' home-section-compact' : ''}`} aria-labelledby={`${id}-heading`}>
      <Orb {...orb} />

      <div className="container home-section-grid">
        <header className="home-section-head">
          <h2 id={`${id}-heading`} className="section-heading home-section-heading">{title}</h2>
          {link && (
            <Link to={link.to} className="view-all">
              {link.label}
              <span className="arrow-icon" aria-hidden="true">→</span>
            </Link>
          )}
        </header>

        <div className="home-section-body">{children}</div>
      </div>
    </section>
  );
}
