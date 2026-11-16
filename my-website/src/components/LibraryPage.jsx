import { useEffect, useMemo, useRef, useState } from 'react';
import { TimelineGroup, TimelinePage } from './Timeline';
import library from '../data/library.json';
import { dayLabel, groupByMonth, toneStyle } from '../lib/timeline';

// Add entries with `npm run add -- <url> ["note"]`. Entries marked `sample` only show in dev.
const ITEMS = library
  .filter((item) => import.meta.env.DEV || !item.sample)
  .sort((a, b) => b.date.localeCompare(a.date));

const PAGE_SIZE = 6;

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'video', label: 'Watched' },
  { id: 'article', label: 'Read' },
  { id: 'book', label: 'Books' },
];

const BADGES = { video: 'Watched', article: 'Read', book: 'Finished' };

function VideoEmbed({ item }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  // Thumbnail facade — the YouTube player only loads once someone presses play.
  return (
    <button
      type="button"
      className="video video-facade"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${item.title}`}
    >
      <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

// Books without a cover image get a small typographic stand-in.
function BookCover({ item }) {
  if (item.image) {
    return <img className="book-cover" src={item.image} alt="" loading="lazy" />;
  }
  return (
    <div className="book-cover book-cover-type" aria-hidden="true">
      <span className="book-cover-title">{item.title}</span>
      <span className="book-cover-author">{item.source}</span>
    </div>
  );
}

function LibraryEntry({ item }) {
  const isVideo = item.type === 'video';
  const isBook = item.type === 'book';

  return (
    <article className={`tl-entry entry entry-${item.type}`}>
      <p className="entry-meta">
        <span className="badge">{BADGES[item.type]}</span>
        <span>{item.source}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={item.date}>{dayLabel(item.date)}</time>
      </p>

      {isVideo && <VideoEmbed item={item} />}

      <div className="entry-body">
        <div>
          <h3 className="entry-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h3>
          {item.excerpt && <p className="entry-excerpt">{item.excerpt}</p>}
          {item.note && <p className="entry-note">{item.note}</p>}
          {!isVideo && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="arrow-link arrow-link-tone">
              {isBook ? 'Find the book' : 'Read it'}
              <span className="arrow arrow-out" aria-hidden="true" />
            </a>
          )}
        </div>
        {isBook && <BookCover item={item} />}
        {item.type === 'article' && item.image && (
          <span className="entry-thumb">
            <img src={item.image} alt="" loading="lazy" />
          </span>
        )}
      </div>
    </article>
  );
}

export default function LibraryPage() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const filtered = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((item) => item.type === filter)),
    [filter]
  );
  const months = useMemo(() => groupByMonth(filtered.slice(0, visibleCount)), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    document.title = 'Library — Alexander Wolfgang Humpert';
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

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
      kicker="Watching &amp; reading"
      title="Library"
      watch={`${filter}-${visibleCount}`}
      intro={
        <>
          The talks, essays, interviews and books I&rsquo;ve been taking in lately —
          a running log of what&rsquo;s shaping how I think.
        </>
      }
      toolbar={
        <div className="pills page-toolbar" role="group" aria-label="Filter by type">
          {FILTERS.map((option) => {
            const count =
              option.id === 'all'
                ? ITEMS.length
                : ITEMS.filter((item) => item.type === option.id).length;
            return (
              <button
                key={option.id}
                type="button"
                className="pill"
                onClick={() => setFilter(option.id)}
                aria-pressed={filter === option.id}
              >
                {option.label} <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      }
      end={filtered.length ? 'You’ve reached the start of the log.' : 'Nothing here yet.'}
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
                {month.items.length} {month.items.length === 1 ? 'entry' : 'entries'}
              </p>
            </>
          }
        >
          {month.items.map((item) => (
            <LibraryEntry key={item.url} item={item} />
          ))}
        </TimelineGroup>
      ))}

      {hasMore && <div ref={sentinelRef} className="tl-sentinel" aria-hidden="true" />}
    </TimelinePage>
  );
}
