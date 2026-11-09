import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';

// Same month tints as the Library and Writing timelines.
const MONTH_TONES = [
  { accent: 'oklch(0.560 0.170 30)', bg: 'oklch(0.960 0.022 30)' },
  { accent: 'oklch(0.580 0.130 80)', bg: 'oklch(0.965 0.025 85)' },
  { accent: 'oklch(0.500 0.110 170)', bg: 'oklch(0.963 0.022 170)' },
  { accent: 'oklch(0.500 0.120 215)', bg: 'oklch(0.960 0.020 215)' },
  { accent: 'oklch(0.480 0.155 300)', bg: 'oklch(0.958 0.018 300)' },
];

const ITEMS = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date));

const monthLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

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

function ProjectEntry({ project }) {
  return (
    <article className="library-entry project-entry" id={project.slug}>
      <p className="library-entry-meta">
        <span className="badge">{project.tag}</span>
      </p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-shot"
        aria-label={`Open ${project.title} in a new tab`}
      >
        <img src={project.image} alt="" loading="lazy" />
        <span className="project-shot-cta" aria-hidden="true">
          Open the app <span className="arrow-icon">↗</span>
        </span>
      </a>

      <h3 className="library-entry-title">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h3>
      <p className="project-story">{project.story}</p>

      <dl className="project-facts">
        <div>
          <dt>Stack</dt>
          <dd>{project.stack}</dd>
        </div>
        <div>
          <dt>What I learned</dt>
          <dd>{project.learned}</dd>
        </div>
      </dl>

      <div className="project-links">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="community-post-link">
          Try it live
          <span className="arrow-icon" aria-hidden="true">↗</span>
        </a>
        {project.writeup && (
          <Link to={project.writeup} className="community-post-link">
            Read the write-up
            <span className="arrow-icon" aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [activeMonth, setActiveMonth] = useState(null);
  const monthRefs = useRef({});

  const months = useMemo(
    () =>
      groupByMonth(ITEMS).map((month, i) => ({
        ...month,
        tone: MONTH_TONES[i % MONTH_TONES.length],
      })),
    []
  );

  useEffect(() => {
    document.title = 'Projects — Alexander Wolfgang Humpert';
    // Homepage links point at /projects#<slug>; the router doesn't scroll to hashes itself.
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ block: 'start' });
  }, []);

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
          <p className="timeline-kicker">Tinkering</p>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
            Projects
          </h1>
          <p className="timeline-intro-text">
            Little apps I&rsquo;ve built on evenings, weekends and the odd hackathon, each one
            an idea I wanted to poke at. They&rsquo;re live, so click around. They run on real
            AI models, so please go easy on them.
          </p>
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
                    {month.items.length} {month.items.length === 1 ? 'project' : 'projects'}
                  </p>
                </div>
              </div>

              <div className="timeline-roles">
                {month.items.map((project) => (
                  <ProjectEntry key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <footer className="timeline-end">
          <span className="timeline-end-dot" aria-hidden="true" />
          <p>That&rsquo;s where the tinkering started.</p>
        </footer>
      </div>
    </main>
  );
}
