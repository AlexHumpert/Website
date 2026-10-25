import Orb from '../Orb';

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

        <p className="coming-soon-line">Coming soon</p>
      </div>
    </section>
  );
}
