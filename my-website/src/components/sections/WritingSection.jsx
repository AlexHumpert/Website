import { Link } from 'react-router-dom';
import HomeSection from './HomeSection';
import { POSTS, postDate } from '../../writing';

const [FEATURED, ...REST] = POSTS.slice(0, 3);

export default function WritingSection() {
  return (
    <HomeSection
      id="writing"
      title="Writing"
      link={FEATURED && { to: '/writing', label: 'All writing' }}
      orb={{
        innerColor: 'oklch(0.760 0.170 55)',
        outerColor: 'oklch(0.840 0.135 80)',
        animationIndex: 1,
        duration: 13,
        style: { width: '560px', height: '560px', bottom: '-100px', left: '-160px' },
      }}
    >
      {FEATURED ? (
        <>
          <Link to={`/writing/${FEATURED.slug}`} className="home-feature">
            <span className="home-feature-meta">
              {FEATURED.note ? 'Latest note' : 'Latest essay'} · {postDate(FEATURED.date, { month: 'long', year: 'numeric' })} · {FEATURED.minutes} min read
            </span>
            <span className="home-feature-title">{FEATURED.title}</span>
            {FEATURED.subtitle && <span className="home-feature-subtitle">{FEATURED.subtitle}</span>}
          </Link>

          {REST.map((post) => (
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
        </>
      ) : (
        <p className="coming-soon-line">Coming soon</p>
      )}
    </HomeSection>
  );
}
