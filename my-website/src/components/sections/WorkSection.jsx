import { Link } from 'react-router-dom';
import Orb from '../Orb';

const ITEMS = [
  {
    title: 'VML MAP',
    description: 'Junior Cloud Engineer → AI Solution Consultant → Lead AI Solution Consultant, now running internal AI enablement',
    year: '2024 — Now',
  },
  {
    title: 'Wunderman Thompson MAP',
    description: 'Junior Data Strategist, then Junior Cloud Engineer on the Cloud & AI team',
    year: '2022 — 24',
  },
  {
    title: 'The International Legal Foundation',
    description: 'Legal and data analytics internships at a justice-focused NGO in New York',
    year: '2019 — 20',
  },
  {
    title: 'Launch22 & PostBug',
    description: 'Marketing and strategy internships in London, where it all started',
    year: '2018',
  },
];

export default function WorkSection() {
  return (
    <section
      id="work"
      className="section"
      style={{ minHeight: '80vh', paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-32)' }}
      aria-label="Work"
    >
      <Orb
        innerColor="oklch(0.540 0.185 15)"
        outerColor="oklch(0.680 0.165 35)"
        animationIndex={2}
        duration={9}
        style={{
          width: '620px',
          height: '620px',
          top: '-80px',
          right: '-200px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
        <h2 className="section-heading">Work</h2>

        <div style={{ maxWidth: '760px' }}>
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              to="/work"
              className="portfolio-item"
              aria-label={item.title}
            >
              <div>
                <div className="portfolio-item-title">{item.title}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'var(--space-2)', maxWidth: '48ch' }}>
                  {item.description}
                </div>
              </div>
              <span className="portfolio-item-year">{item.year}</span>
            </Link>
          ))}
        </div>

        <Link to="/work" className="view-all">
          View the full timeline
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
