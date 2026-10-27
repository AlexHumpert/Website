import { useEffect, useMemo, useRef, useState } from 'react';
import library from '../data/library.json';

// Add entries with `npm run add -- <url> ["note"]`. Entries marked `sample` only show in dev.
const ITEMS = library
  .filter((item) => import.meta.env.DEV || !item.sample)
  .sort((a, b) => b.date.localeCompare(a.date));

const PAGE_SIZE = 6;

// Each month takes the next tint, so the background drifts as you scroll back in time.
const MONTH_TONES = [
  { accent: 'oklch(0.560 0.170 30)', bg: 'oklch(0.960 0.022 30)' },
  { accent: 'oklch(0.580 0.130 80)', bg: 'oklch(0.965 0.025 85)' },
  { accent: 'oklch(0.500 0.110 170)', bg: 'oklch(0.963 0.022 170)' },
  { accent: 'oklch(0.500 0.120 215)', bg: 'oklch(0.960 0.020 215)' },
  { accent: 'oklch(0.480 0.155 300)', bg: 'oklch(0.958 0.018 300)' },
];

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'video', label: 'Watched' },
  { id: 'article', label: 'Read' },
  { id: 'book', label: 'Books' },
];

const BADGES = { video: 'Watched', article: 'Read', book: 'Finished' };

const monthLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

const dayLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

function groupByMonth(items) {
  const months = [];
  items.forEach((item) => {
    const key = item.date.slice(0, 7);
    let month = months[months.length - 1];
    if (!month || month.key !== key) {
      month = { key, label: monthLabel(item.date), items: [] };
      months.push(month);
    }
    month.items.push(item);
  });
  return months;
}

function VideoEmbed({ item }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="library-video">
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
      className="library-video library-video-facade"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${item.title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
      />
      <span className="library-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

// Books without a cover image get a small typographic stand-in.
function BookCover({ item }) {
  if (item.image) {
    return <img className="library-entry-cover" src={item.image} alt="" loading="lazy" />;
  }
  return (
    <div className="library-entry-cover library-entry-cover-type" aria-hidden="true">
      <span className="library-cover-title">{item.title}</span>
      <span className="library-cover-author">{item.source}</span>
    </div>
  );
}

function LibraryEntry({ item }) {
  const isVideo = item.type === 'video';
  const isBook = item.type === 'book';

  return (
    <article className={`library-entry library-entry-${item.type}`}>
      <p className="library-entry-meta">
        <span className="badge">{BADGES[item.type]}</span>
        <span>{item.source}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={item.date}>{dayLabel(item.date)}</time>
      </p>

      {isVideo && <VideoEmbed item={item} />}

      <div className="library-entry-body">
        <div>
          <h3 className="library-entry-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h3>
          {item.excerpt && <p className="library-entry-excerpt">{item.excerpt}</p>}
          {item.note && <p className="library-entry-note">{item.note}</p>}
          {!isVideo && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="community-post-link"
            >
              {isBook ? 'Find the book' : 'Read it'}
              <span className="arrow-icon" aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        {isBook && <BookCover item={item} />}
        {item.type === 'article' && item.image && (
          <img className="library-entry-image" src={item.image} alt="" loading="lazy" />
        )}
      </div>
    </article>
  );
}

export default function LibraryPage() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeMonth, setActiveMonth] = useState(null);
  const sentinelRef = useRef(null);
  const monthRefs = useRef({});

  const filtered = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((item) => item.type === filter)),
    [filter]
  );
  const months = useMemo(
    () =>
      groupByMonth(filtered.slice(0, visibleCount)).map((month, i) => ({
        ...month,
        tone: MONTH_TONES[i % MONTH_TONES.length],
      })),
    [filtered, visibleCount]
  );
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

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
          <p className="timeline-kicker">Watching &amp; reading</p>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
            Library
          </h1>
          <p className="timeline-intro-text">
            The talks, essays, interviews and books I&rsquo;ve been taking in lately —
            a running log of what&rsquo;s shaping how I think.
          </p>

          <div className="library-filters" role="group" aria-label="Filter by type">
            {FILTERS.map((option) => {
              const count =
                option.id === 'all'
                  ? ITEMS.length
                  : ITEMS.filter((item) => item.type === option.id).length;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`case-pill${filter === option.id ? ' active' : ''}`}
                  style={{ '--era-accent': 'var(--ink)' }}
                  onClick={() => setFilter(option.id)}
                  aria-pressed={filter === option.id}
                >
                  {option.label} <span className="library-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </header>

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
                    {month.items.length} {month.items.length === 1 ? 'entry' : 'entries'}
                  </p>
                </div>
              </div>

              <div className="timeline-roles">
                {month.items.map((item) => (
                  <LibraryEntry key={item.url} item={item} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {hasMore && <div ref={sentinelRef} className="library-sentinel" aria-hidden="true" />}

        <footer className="timeline-end">
          <span className="timeline-end-dot" aria-hidden="true" />
          <p>{filtered.length ? 'You’ve reached the start of the log.' : 'Nothing here yet.'}</p>
        </footer>
      </div>
    </main>
  );
}
