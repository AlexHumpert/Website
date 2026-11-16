import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TimelineGroup, TimelinePage } from './Timeline';
import { POSTS, postDate } from '../writing';
import { groupByMonth, toneStyle } from '../lib/timeline';

const PAGE_SIZE = 6;

function WritingEntry({ post }) {
  return (
    <article className="tl-entry entry">
      <p className="entry-meta">
        <span className="badge">{post.note ? 'Note' : 'Essay'}</span>
        <time dateTime={post.date}>{postDate(post.date, { day: 'numeric', month: 'short' })}</time>
        <span aria-hidden="true">·</span>
        <span>{post.minutes} min read</span>
      </p>

      <div className="entry-body">
        <div>
          <h3 className="entry-title">
            <Link to={`/writing/${post.slug}`}>{post.title}</Link>
          </h3>
          {post.subtitle && <p className="entry-excerpt">{post.subtitle}</p>}
          <Link to={`/writing/${post.slug}`} className="arrow-link arrow-link-tone">
            Read
            <span className="arrow" aria-hidden="true" />
          </Link>
        </div>
        {post.image && (
          <Link to={`/writing/${post.slug}`} className="entry-thumb entry-thumb-wide" tabIndex={-1} aria-hidden="true" data-tilt="5">
            <img src={post.image} alt="" loading="lazy" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function WritingPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const months = useMemo(() => groupByMonth(POSTS.slice(0, visibleCount)), [visibleCount]);
  const hasMore = visibleCount < POSTS.length;

  useEffect(() => {
    document.title = 'Writing — Alexander Wolfgang Humpert';
  }, []);

  // Infinite scroll: reveal the next batch as the sentinel nears the viewport.
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE);
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <TimelinePage
      kicker="Ideas, followed"
      title="Writing"
      watch={visibleCount}
      intro={
        <>
          I get a lot of ideas. Some I chase down, and a few I pin to the page. This is
          where they land: anything from how AI is reshaping democracy to the small, sweet
          thrill of shipping code from my phone. Read along here, or subscribe to{' '}
          {POSTS.find((post) => !post.note)?.publication ?? 'my Substack'} to get the next
          one by email.
        </>
      }
      end={POSTS.length ? 'You’ve reached the first essay.' : 'Nothing here yet.'}
    >
      {months.map((month, i) => (
        <TimelineGroup
          key={month.key}
          id={month.key}
          tone={toneStyle(i)}
          label={month.label}
          aside={
            <>
              <h2 className="tl-label">{month.label}</h2>
              <p className="tl-count">
                {month.items.length}{' '}
                {month.items.every((post) => post.note)
                  ? month.items.length === 1 ? 'note' : 'notes'
                  : month.items.length === 1 ? 'essay' : 'essays'}
              </p>
            </>
          }
        >
          {month.items.map((post) => (
            <WritingEntry key={post.slug} post={post} />
          ))}
        </TimelineGroup>
      ))}

      {hasMore && <div ref={sentinelRef} className="tl-sentinel" aria-hidden="true" />}
    </TimelinePage>
  );
}
