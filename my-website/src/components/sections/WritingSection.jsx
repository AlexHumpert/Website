import { Link } from 'react-router-dom';
import HomeSection, { Row } from './HomeSection';
import { POSTS, postDate } from '../../writing';

const [FEATURED, ...REST] = POSTS.slice(0, 3);

export default function WritingSection() {
  return (
    <HomeSection
      id="writing"
      title="Writing"
      link={FEATURED && { to: '/writing', label: 'All writing' }}
      glow={{ from: 'var(--sky-amber)', to: 'var(--sky-ember)', className: 'glow-left glow-low' }}
    >
      {FEATURED ? (
        <>
          <Link to={`/writing/${FEATURED.slug}`} className="feature" data-spot>
            <span className="feature-text">
              <span className="feature-meta">
                {FEATURED.note ? 'Latest note' : 'Latest essay'} · {postDate(FEATURED.date, { month: 'long', year: 'numeric' })} · {FEATURED.minutes} min read
              </span>
              <span className="feature-title">{FEATURED.title}</span>
              {FEATURED.subtitle && <span className="feature-subtitle">{FEATURED.subtitle}</span>}
              <span className="feature-cta">
                Read it
                <span className="arrow" aria-hidden="true" />
              </span>
            </span>
            {FEATURED.image && (
              <span className="feature-media" data-tilt="4" aria-hidden="true">
                <img src={FEATURED.image} alt="" loading="lazy" />
              </span>
            )}
          </Link>

          {REST.map((post) => (
            <Row
              key={post.slug}
              to={`/writing/${post.slug}`}
              title={post.title}
              preview={post.image}
              meta={
                <>
                  <span className="badge">{post.minutes} min</span>
                  <time dateTime={post.date}>{postDate(post.date, { month: 'short', year: 'numeric' })}</time>
                </>
              }
            />
          ))}
        </>
      ) : (
        <p className="rows-empty">Coming soon</p>
      )}
    </HomeSection>
  );
}
