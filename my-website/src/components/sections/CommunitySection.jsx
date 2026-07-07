import { Link } from 'react-router-dom';
import Orb from '../Orb';

const EVENTS = [
  {
    title: 'Google Guild HackNight #4 — Agentic Consumer Experiences',
    type: 'Organizer',
    date: 'Jun 2026',
    href: 'https://www.linkedin.com/posts/rokasgarlauskas_hacknight-ai-vmlmap-share-7467453319935094784-gkag/',
  },
  {
    title: 'Google Guild HackNight #3 — Project Orchestrator Agents',
    type: 'Organizer',
    date: 'Nov 2025',
    href: 'https://www.linkedin.com/posts/vml-map_what-happens-when-you-bring-project-managers-activity-7402262839056416768-jV4I/',
  },
  {
    title: 'WPP Converge — Scaling Agentic AI',
    type: 'Speaker',
    date: 'Sep 2025',
    href: 'https://www.linkedin.com/posts/wppconverge-vmlmap-agenticai-share-7371916365701652480-B8AH/',
  },
  {
    title: 'Google Guild HackNight #2 — Talk-to-Data Agents',
    type: 'Organizer',
    date: 'Apr 2025',
    href: 'https://www.linkedin.com/posts/vml-map_ai-innovation-hackathon-activity-7312771547276939264-LkEm/',
  },
];

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CommunitySection() {
  return (
    <section
      id="community"
      className="section"
      style={{ minHeight: '80vh', paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-32)' }}
      aria-label="Community"
    >
      <Orb
        innerColor="oklch(0.480 0.155 270)"
        outerColor="oklch(0.620 0.130 310)"
        animationIndex={0}
        duration={14}
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          right: '-180px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
        <h2 className="section-heading">Community</h2>

        <div style={{ maxWidth: '760px' }}>
          {EVENTS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="writing-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} — ${item.type}`}
            >
              <span className="writing-item-title">{item.title}</span>
              <span className="writing-item-meta">
                <span className="badge">{item.type}</span>
                <span>{item.date}</span>
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>

        <Link to="/community" className="view-all">
          View all community work
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
