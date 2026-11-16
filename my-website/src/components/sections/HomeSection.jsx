import { Link } from 'react-router-dom';
import Glow from '../Glow';

// Shared shell for the homepage sections: the heading and "see all" link sit in a
// sticky left column on wide screens, the content fills the right.
export default function HomeSection({ id, title, glow, link, children }) {
  return (
    <section id={id} className="home-section" aria-labelledby={`${id}-heading`}>
      <Glow {...glow} />

      <div className="container home-grid">
        <header className="home-head">
          <h2 id={`${id}-heading`} className="home-heading">{title}</h2>
          {link && (
            <Link to={link.to} className="arrow-link">
              {link.label}
              <span className="arrow" aria-hidden="true" />
            </Link>
          )}
        </header>

        <div className="home-body rows">{children}</div>
      </div>
    </section>
  );
}

// One line in a homepage list. Internal rows take `to`, external ones `href`.
export function Row({ to, href, title, description, meta, preview, large = false, label }) {
  const content = (
    <>
      <span className="row-main">
        <span className="row-title">{title}</span>
        {description && <span className="row-desc">{description}</span>}
      </span>
      <span className="row-meta">{meta}</span>
      <span className={`arrow row-arrow${href ? ' arrow-out' : ''}`} aria-hidden="true" />
    </>
  );
  const props = {
    className: `row${large ? ' row-large' : ''}`,
    'data-spot': true,
    'data-preview': preview || undefined,
    'aria-label': label,
  };

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>
  ) : (
    <Link to={to} {...props}>{content}</Link>
  );
}
