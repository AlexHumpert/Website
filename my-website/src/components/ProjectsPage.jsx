import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Lightbulb, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { TimelineGroup, TimelinePage } from './Timeline';
import { PROJECTS } from '../data/projects';
import { dayLabel, groupByMonth, toneStyle } from '../lib/timeline';
import { sound } from '../tactile/sound';

const ITEMS = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date));

// Git-log style list of what changed, oldest first. An update with a `story`
// opens into a short write-up with its screenshots.
function VersionLog({ versions }) {
  return (
    <ol className="version-log">
      {versions.map((version) => (
        <li key={version.hash ?? version.title} className="version">
          <p className="version-meta">
            {version.hash && <code>{version.hash}</code>}
            <time dateTime={version.date}>{dayLabel(version.date)}</time>
          </p>
          <p className="version-title">{version.title}</p>
          <p className="version-note">{version.note}</p>
          {version.story && (
            <details className="version-story">
              <summary data-sound="own" onClick={(event) => (event.currentTarget.parentElement.open ? sound.close() : sound.open())}>
                Read the story
              </summary>
              {version.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {version.images && (
                <div className="version-shots">
                  {version.images.map((image) => (
                    <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer">
                      <img src={image.src} alt={image.alt} loading="lazy" />
                    </a>
                  ))}
                </div>
              )}
            </details>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProjectEntry({ project }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelId = useId();
  const versions = project.versions ?? [];
  const hasVersions = versions.length > 0;

  const toggle = (next) => {
    if (next) sound.open();
    else sound.close();
    setOpen(next);
  };

  return (
    <article
      className="tl-entry entry project"
      id={project.slug}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          toggle(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <p className="entry-meta">
        <span className="badge">{project.tag}</span>
        {hasVersions && (
          <button
            ref={toggleRef}
            type="button"
            className="version-toggle"
            data-sound="own"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? 'Hide' : 'Show'} changelog, ${versions.length} updates`}
            onClick={() => toggle(!open)}
          >
            {open ? <PanelRightClose size={15} aria-hidden="true" /> : <PanelRightOpen size={15} aria-hidden="true" />}
            <span className="version-count">{versions.length}</span>
            <span className="version-toggle-text">updates</span>
          </button>
        )}
      </p>

      {/* The screenshot and the changelog share one frame: opening the log slides it
          in from the right and the screenshot gives up the space. */}
      <div className={`project-media${open ? ' is-open' : ''}`} data-tilt={open ? undefined : '2.5'}>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-shot"
          aria-label={`Open ${project.title} in a new tab`}
        >
          <img src={project.image} alt="" loading="lazy" />
          <span className="project-shot-cta" aria-hidden="true">
            Open the app <span className="arrow arrow-out" />
          </span>
        </a>

        {hasVersions && (
          <aside id={panelId} className="version-panel" aria-label={`${project.title} changelog`} inert={!open}>
            <div className="version-panel-inner">
              <p className="version-panel-head">How it got here</p>
              <VersionLog versions={versions} />
            </div>
          </aside>
        )}
      </div>

      <h3 className="entry-title">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h3>
      <p className="project-story">{project.story}</p>

      <dl className="project-facts">
        <div>
          <dt>
            <Layers className="project-fact-icon" size={14} aria-hidden="true" />
            Stack
          </dt>
          <dd>{project.stack}</dd>
        </div>
        <div>
          <dt>
            <Lightbulb className="project-fact-icon" size={14} aria-hidden="true" />
            What I learned
          </dt>
          <dd>{project.learned}</dd>
        </div>
      </dl>

      <div className="project-links">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="arrow-link arrow-link-tone">
          Try it live
          <span className="arrow arrow-out" aria-hidden="true" />
        </a>
        {project.writeup && (
          <Link to={project.writeup} className="arrow-link arrow-link-tone">
            Read the write-up
            <span className="arrow" aria-hidden="true" />
          </Link>
        )}
      </div>
      {project.access && <p className="project-access">{project.access}</p>}
    </article>
  );
}

export default function ProjectsPage() {
  const { hash } = useLocation();
  const months = useMemo(() => groupByMonth(ITEMS), []);

  useEffect(() => {
    document.title = 'Projects — Alexander Wolfgang Humpert';
  }, []);

  // Homepage links point at /projects#<slug>; the router doesn't scroll to hashes itself.
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <TimelinePage
      kicker="Tinkering"
      title="Projects"
      intro={
        <>
          Little apps I&rsquo;ve built on evenings, weekends and the odd hackathon, each one
          an idea I wanted to poke at. They&rsquo;re live, so click around. They run on real
          AI models, so please go easy on them.
        </>
      }
      end="That’s where the tinkering started."
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
                {month.items.length} {month.items.length === 1 ? 'project' : 'projects'}
              </p>
            </>
          }
        >
          {month.items.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </TimelineGroup>
      ))}
    </TimelinePage>
  );
}
