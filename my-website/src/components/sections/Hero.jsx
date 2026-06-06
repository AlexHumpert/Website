import Orb from '../Orb';

export default function Hero() {
  return (
    <section
      className="section"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      aria-label="Introduction"
    >
      <Orb
        innerColor="oklch(0.600 0.200 22)"
        outerColor="oklch(0.720 0.175 50)"
        animationIndex={0}
        duration={11}
        style={{
          width: '680px',
          height: '680px',
          top: '-120px',
          right: '-180px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-content)', paddingTop: '8rem', paddingBottom: '8rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          color: 'var(--muted)',
          marginBottom: 'var(--space-6)',
          letterSpacing: '0.02em',
        }}>
          Writer, builder, operator
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-hero)',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          margin: '0 0 var(--space-8)',
          maxWidth: '14ch',
          textWrap: 'balance',
        }}>
          Thinking in public, building in the open.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          fontWeight: 300,
          color: 'var(--muted)',
          maxWidth: '42ch',
          lineHeight: 1.6,
          margin: 0,
          textWrap: 'pretty',
        }}>
          I write about technology, politics, and the systems that shape how we live. I build products and tools. This is where the work lives.
        </p>
      </div>
    </section>
  );
}
