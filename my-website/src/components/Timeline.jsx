import { useEffect, useRef, useState } from 'react';
import LensMark from '../tactile/LensMark';
import { clamp } from '../tactile/pointer';

// The shared shell for Writing, Projects, Library, Work and Community: an
// intro, then groups hung on one continuous spine. As you scroll, gold runs
// down the spine and each entry's ring lights when you reach it.
//
// `jump` (optional) is a list of {id, label} for the dots at the right edge
// that jump between groups; ids match the `id` given to each TimelineGroup.
export function TimelinePage({ kicker, title, intro, toolbar, jump, end, watch, children }) {
  const bodyRef = useRef(null);
  const fillRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(jump?.[0]?.id ?? null);

  useEffect(() => {
    const body = bodyRef.current;
    const fill = fillRef.current;
    if (!body) return undefined;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      const rect = body.getBoundingClientRect();
      const progress = clamp((line - rect.top) / rect.height, 0, 1);

      const entries = [...body.querySelectorAll('.tl-entry')];
      const lit = entries.map((entry) => entry.getBoundingClientRect().top < line);
      let current = null;
      body.querySelectorAll('[data-group]').forEach((group) => {
        if (group.getBoundingClientRect().top < line) current = group.dataset.group;
      });

      fill.style.transform = `scaleY(${progress})`;
      entries.forEach((entry, i) => entry.classList.toggle('is-lit', lit[i]));
      if (current) setActiveGroup(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [watch]);

  const jumpTo = (id) => {
    bodyRef.current
      ?.querySelector(`[data-group="${id}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="timeline-page">
      {jump && (
        <nav className="tl-jump" aria-label="Jump along the timeline">
          {jump.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeGroup ? 'is-active' : ''}
              onClick={() => jumpTo(item.id)}
              aria-label={item.label}
              aria-current={item.id === activeGroup ? 'true' : undefined}
            >
              <span className="tl-jump-label" aria-hidden="true">{item.label}</span>
              <span className="tl-jump-dot" aria-hidden="true" />
            </button>
          ))}
        </nav>
      )}

      <div className="container">
        <header className="page-intro">
          <p className="kicker">{kicker}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-lede">{intro}</p>
          {toolbar}
        </header>

        <div className="tl-body" ref={bodyRef}>
          <div className="tl-spine" aria-hidden="true">
            <div className="tl-spine-fill" ref={fillRef} />
          </div>
          {children}
        </div>

        <footer className="tl-end">
          <LensMark className="tl-end-lens" reach={320} />
          <p>{end}</p>
        </footer>
      </div>
    </main>
  );
}

// One stretch of the timeline: a sticky label on the left, entries on the right.
export function TimelineGroup({ id, tone, label, aside, children }) {
  return (
    <section className="tl-group" data-group={id} style={tone} aria-label={label}>
      <div className="tl-aside">
        <div className="tl-aside-sticky">{aside}</div>
      </div>
      <div className="tl-entries">{children}</div>
    </section>
  );
}
