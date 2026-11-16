import HomeSection, { Row } from './HomeSection';

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

export default function CommunitySection() {
  return (
    <HomeSection
      id="community"
      title="Community"
      link={{ to: '/community', label: 'View all community work' }}
      glow={{ from: 'var(--sky-blue)', to: 'var(--sky-violet)', className: 'glow-right glow-low' }}
    >
      {EVENTS.map((item) => (
        <Row
          key={item.title}
          href={item.href}
          title={item.title}
          label={`${item.title} (${item.type}, opens LinkedIn)`}
          meta={
            <>
              <span className="badge">{item.type}</span>
              <span>{item.date}</span>
            </>
          }
        />
      ))}
    </HomeSection>
  );
}
