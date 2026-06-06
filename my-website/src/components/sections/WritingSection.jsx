import { Link } from 'react-router-dom';
import Orb from '../Orb';

const ITEMS = [
  {
    title: 'Toward a Post-Platform Social Internet',
    platform: 'Substack',
    date: 'May 2025',
    href: '#',
  },
  {
    title: 'The Distortion Machine: How Information Travels from Reality to Public Consciousness',
    platform: 'Substack',
    date: 'Apr 2025',
    href: '#',
  },
  {
    title: 'DemocraTech: Rebuilding the Bridge Between Citizens and Policy',
    platform: 'Substack',
    date: 'Apr 2025',
    href: '#',
  },
  {
    title: 'A Call to Defend Democracy',
    platform: 'Substack',
    date: 'Mar 2025',
    href: '#',
  },
];

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function WritingSection() {
  return (
    <section
      id="writing"
      className="section"
      style={{ minHeight: '80vh', paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-32)' }}
      aria-label="Writing"
    >
      <Orb
        innerColor="oklch(0.760 0.170 55)"
        outerColor="oklch(0.840 0.135 80)"
        animationIndex={1}
        duration={13}
        style={{
          width: '560px',
          height: '560px',
          bottom: '-100px',
          left: '-160px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
        <h2 className="section-heading">Writing</h2>

        <div style={{ maxWidth: '760px' }}>
          {ITEMS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="writing-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} — ${item.platform}`}
            >
              <span className="writing-item-title">{item.title}</span>
              <span className="writing-item-meta">
                <span className="badge">{item.platform}</span>
                <span>{item.date}</span>
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>

        <Link to="/writing" className="view-all">
          View all writing
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
