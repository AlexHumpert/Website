import Orb from '../Orb';

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

        <p className="coming-soon-line">Coming soon</p>
      </div>
    </section>
  );
}
