import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS, postDate } from '../writing';

const PAGE_SIZE = 6;

// Same month tints as the Library, so the two timelines read as one system.
const MONTH_TONES = [
  { accent: 'oklch(0.560 0.170 30)', bg: 'oklch(0.960 0.022 30)' },
  { accent: 'oklch(0.580 0.130 80)', bg: 'oklch(0.965 0.025 85)' },
  { accent: 'oklch(0.500 0.110 170)', bg: 'oklch(0.963 0.022 170)' },
  { accent: 'oklch(0.500 0.120 215)', bg: 'oklch(0.960 0.020 215)' },
  { accent: 'oklch(0.480 0.155 300)', bg: 'oklch(0.958 0.018 300)' },
];

function groupByMonth(posts) {
  const months = [];
  posts.forEach((post) => {
    const key = post.date.slice(0, 7);
    let month = months[months.length - 1];
    if (!month || month.key !== key) {
      month = { key, label: postDate(post.date, { month: 'long', year: 'numeric' }), posts: [] };
      months.push(month);
    }
    month.posts.push(post);
  });
  return months;
}

function WritingEntry({ post }) {
  return (
    <article className="library-entry writing-entry">
      <p className="library-entry-meta">
        <span className="badge">{post.note ? 'Note' : 'Essay'}</span>
        <time dateTime={post.date}>{postDate(post.date, { day: 'numeric', month: 'short' })}</time>
        <span aria-hidden="true">·</span>
        <span>{post.minutes} min read</span>
      </p>

      <div className="library-entry-body">
        <div>
          <h3 className="library-entry-title">
            <Link to={`/writing/${post.slug}`}>{post.title}</Link>
          </h3>
          {post.subtitle && <p className="library-entry-excerpt">{post.subtitle}</p>}
          <Link to={`/writing/${post.slug}`} className="community-post-link">
            Read
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>
        </div>
        {post.image && (
          <Link to={`/writing/${post.slug}`} tabIndex={-1} aria-hidden="true">
            <img className="library-entry-image" src={post.image} alt="" loading="lazy" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function WritingPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeMonth, setActiveMonth] = useState(null);
  const sentinelRef = useRef(null);
  const monthRefs = useRef({});

  const months = useMemo(
    () =>
      groupByMonth(POSTS.slice(0, visibleCount)).map((month, i) => ({
        ...month,
        tone: MONTH_TONES[i % MONTH_TONES.length],
      })),
    [visibleCount]
  );
  const hasMore = visibleCount < POSTS.length;

  useEffect(() => {
    document.title = 'Writing — Alexander Wolfgang Humpert';
  }, []);

  // Infinite scroll: reveal the next batch as the sentinel nears the viewport.
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE);
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveMonth(entry.target.dataset.month);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    Object.values(monthRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [months]);

  const activeTone =
    (months.find((month) => month.key === activeMonth) ?? months[0])?.tone ?? MONTH_TONES[0];

  return (
    <main className="timeline-page">
      <div
        className="timeline-bg"
        style={{ backgroundColor: activeTone.bg }}
        aria-hidden="true"
      />

      <div className="container">
        <header className="timeline-intro">
          <p className="timeline-kicker">Ideas, followed</p>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
            Writing
          </h1>
          <p className="timeline-intro-text">
            I get a lot of ideas. Some I chase down, and a few I pin to the page. This is
            where they land: anything from how AI is reshaping democracy to the small, sweet
            thrill of shipping code from my phone. Read along here, or subscribe to{' '}
            {POSTS.find((post) => !post.note)?.publication ?? 'my Substack'} to get the next
            one by email.
          </p>
        </header>

        {/* One continuous line runs through every month, top to bottom. */}
        <div className="timeline-continuous">
          {months.map((month) => (
            <section
              key={month.key}
              data-month={month.key}
              ref={(el) => (monthRefs.current[month.key] = el)}
              className="timeline-era library-month"
              style={{ '--era-accent': month.tone.accent }}
              aria-label={month.label}
            >
              <div className="timeline-era-grid">
                <div>
                  <div className="timeline-company-sticky">
                    <h2 className="timeline-company-name">{month.label}</h2>
                    <p className="timeline-company-meta">
                      {month.posts.length}{' '}
                      {month.posts.every((post) => post.note)
                        ? month.posts.length === 1 ? 'note' : 'notes'
                        : month.posts.length === 1 ? 'essay' : 'essays'}
                    </p>
                  </div>
                </div>

                <div className="timeline-roles">
                  {month.posts.map((post) => (
                    <WritingEntry key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {hasMore && <div ref={sentinelRef} className="library-sentinel" aria-hidden="true" />}

        <footer className="timeline-end">
          <span className="timeline-end-dot" aria-hidden="true" />
          <p>{POSTS.length ? 'You’ve reached the first essay.' : 'Nothing here yet.'}</p>
        </footer>
      </div>
    </main>
  );
}
