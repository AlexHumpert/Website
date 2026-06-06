import { Link } from 'react-router-dom';
import Orb from '../Orb';

const ITEMS = [
  {
    title: 'Placeholder Project One',
    description: 'A short description of what this project does and why it exists',
    year: '2025',
    slug: 'project-one',
  },
  {
    title: 'Placeholder Project Two',
    description: 'Another project with a brief explanation of the problem it solves',
    year: '2024',
    slug: 'project-two',
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section"
      style={{ minHeight: '80vh', paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-32)' }}
      aria-label="Projects"
    >
      <Orb
        innerColor="oklch(0.540 0.135 320)"
        outerColor="oklch(0.670 0.160 30)"
        animationIndex={3}
        duration={12}
        style={{
          width: '580px',
          height: '580px',
          bottom: '-120px',
          left: '-140px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
        <h2 className="section-heading">Projects</h2>

        <div style={{ maxWidth: '760px' }}>
          {ITEMS.map((item) => (
            <Link
              key={item.slug}
              to={`/projects/${item.slug}`}
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

        <Link to="/projects" className="view-all">
          View all projects
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
