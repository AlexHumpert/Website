import { Link } from 'react-router-dom';
import Orb from '../Orb';

const ITEMS = [
  {
    title: 'Market Intelligence Platform',
    description: 'Redesigning how an analyst team accesses and acts on competitive data',
    year: '2024',
    slug: 'market-intelligence',
  },
  {
    title: 'Operational Workflow Automation',
    description: 'Reducing manual process overhead across a 200-person operations function',
    year: '2023',
    slug: 'workflow-automation',
  },
  {
    title: 'Consumer Research Infrastructure',
    description: 'Building the data layer that connects qualitative insight to product decisions',
    year: '2022',
    slug: 'research-infrastructure',
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
              key={item.slug}
              to={`/work/${item.slug}`}
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
          View all work
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
