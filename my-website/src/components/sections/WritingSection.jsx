import { Link } from 'react-router-dom';
import Orb from '../Orb';
import { POSTS, postDate } from '../../writing';

const LATEST = POSTS.slice(0, 3);

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

        {LATEST.length ? (
          <>
            <div style={{ maxWidth: '760px' }}>
              {LATEST.map((post) => (
                <Link key={post.slug} to={`/writing/${post.slug}`} className="writing-item">
                  <span className="writing-item-title">{post.title}</span>
                  <span className="writing-item-meta">
                    <span className="badge">{post.minutes} min</span>
                    <time dateTime={post.date}>
                      {postDate(post.date, { month: 'short', year: 'numeric' })}
                    </time>
                  </span>
                </Link>
              ))}
            </div>

            <Link to="/writing" className="view-all">
              All writing
              <span className="arrow-icon" aria-hidden="true">→</span>
            </Link>
          </>
        ) : (
          <p className="coming-soon-line">Coming soon</p>
        )}
      </div>
    </section>
  );
}
