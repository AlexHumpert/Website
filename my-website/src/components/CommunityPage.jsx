import { useEffect, useRef, useState } from 'react';

const EVENTS = [
  {
    id: 'hacknight-4',
    date: 'June 2026',
    title: 'Google Guild HackNight #4 — Agentic Consumer Experiences',
    role: 'Organizer & facilitator',
    description:
      'A cross-capability HackNight with the Experience team. Experience designers and strategists built alongside engineers, analysts and data specialists to prototype new agentic front-end consumer experiences — a first for the series, uniting creative, strategy, technology and data around one challenge.',
    accent: 'oklch(0.560 0.170 30)',
    bg: 'oklch(0.960 0.022 30)',
    embedUrn: 'urn:li:share:7467453319935094784',
    postUrl:
      'https://www.linkedin.com/posts/rokasgarlauskas_hacknight-ai-vmlmap-share-7467453319935094784-gkag/',
  },
  {
    id: 'hacknight-3',
    date: 'November 2025',
    title: 'Google Guild HackNight #3 — Project Orchestrator Agents',
    role: 'Organizer & facilitator',
    description:
      'A hybrid, cross-functional HackNight bringing the business architecture team together with engineers and analysts from tech and data to build agents that understand projects, manage handoffs and spot risks. The first edition with a no-code track — project managers and process experts built working agents with WPP Open, Google AI Studio and n8n, while engineers built enterprise-grade architectures on Vertex AI, Agent Builder and the Agent Development Kit.',
    accent: 'oklch(0.500 0.120 215)',
    bg: 'oklch(0.960 0.020 215)',
    embedUrn: 'urn:li:activity:7402262839056416768',
    postUrl:
      'https://www.linkedin.com/posts/vml-map_what-happens-when-you-bring-project-managers-activity-7402262839056416768-jV4I/',
  },
  {
    id: 'wpp-converge',
    date: 'September 2025',
    title: 'WPP Converge — Scaling Agentic AI',
    role: 'Speaker',
    description:
      '95% of AI pilots end in failure — that needs to change. Presented at WPP Converge with Chandra Benjamin Mostov and David Sealey on how leaders transform their businesses at scale: aligning AI pilots with lasting transformation through the Agentic Ecosystem, a repeatable process for designing and launching agents, and how the Agentic Lab at VML MAP helps brands deliver humanized experiences.',
    accent: 'oklch(0.480 0.155 300)',
    bg: 'oklch(0.958 0.018 300)',
    embedUrn: 'urn:li:share:7371916365701652480',
    postUrl:
      'https://www.linkedin.com/posts/wppconverge-vmlmap-agenticai-share-7371916365701652480-B8AH/',
  },
  {
    id: 'hacknight-2',
    date: 'April 2025',
    title: 'Google Guild HackNight #2 — Talk-to-Data Agents',
    role: 'Organizer & participant',
    description:
      'Participants built AI detectives that analyze CRM performance data and surface opportunities for personalized experiences — turning raw data into actionable insight with Google Cloud, Gemini 2.0 Flash, LangGraph and CrewAI. The event also showed how accessible agent development has become, with tools like Gemini, Claude Code and ChatGPT lowering the barrier for every skill level.',
    accent: 'oklch(0.500 0.110 170)',
    bg: 'oklch(0.963 0.022 170)',
    embedUrn: 'urn:li:activity:7312771547276939264',
    postUrl:
      'https://www.linkedin.com/posts/vml-map_ai-innovation-hackathon-activity-7312771547276939264-LkEm/',
  },
  {
    id: 'hacknight-1',
    date: 'December 2024',
    title: 'Google Guild HackNight #1 — Build Cool Agents',
    role: 'Organizer & participant',
    description:
      'The one that started it all. No brief, no fixed challenge — just a room full of curious people from across VML MAP capabilities, a few hours, and one instruction: build cool agents. The energy and the projects that came out of a single evening set the template for everything that followed.',
    accent: 'oklch(0.580 0.130 80)',
    bg: 'oklch(0.965 0.025 85)',
    embedUrn: 'urn:li:ugcPost:7274453587982712833',
    postUrl:
      'https://www.linkedin.com/posts/rokasgarlauskas_innovation-ai-techcommunity-ugcPost-7274453587982712833-f0Jh/',
  },
];

export default function CommunityPage() {
  const [activeId, setActiveId] = useState(EVENTS[0].id);
  const eventRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.dataset.event);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    Object.values(eventRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeEvent = EVENTS.find((event) => event.id === activeId) ?? EVENTS[0];

  const scrollToEvent = (id) => {
    eventRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="timeline-page">
      <div
        className="timeline-bg"
        style={{ backgroundColor: activeEvent.bg }}
        aria-hidden="true"
      />

      <nav className="timeline-nav" aria-label="Events">
        {EVENTS.map((event) => (
          <button
            key={event.id}
            type="button"
            className={event.id === activeId ? 'active' : ''}
            style={{ '--nav-accent': event.accent }}
            onClick={() => scrollToEvent(event.id)}
            aria-label={event.title}
            title={event.title}
          />
        ))}
      </nav>

      <div className="container">
        <header className="timeline-intro">
          <p className="timeline-kicker">HackNights &amp; talks</p>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
            Community
          </h1>
          <p className="timeline-intro-text">
            A series of agentic AI HackNights I created, organized and built in
            at VML MAP — getting hands-on with technology alongside other
            enthusiasts, applying agents to marketing automation and
            personalization, and keeping the work we bring to clients at the
            cutting edge.
          </p>
        </header>

        {EVENTS.map((event) => (
          <section
            key={event.id}
            data-event={event.id}
            ref={(el) => (eventRefs.current[event.id] = el)}
            className="timeline-era"
            style={{ '--era-accent': event.accent }}
            aria-label={event.title}
          >
            <div className="timeline-era-grid">
              <div>
                <div className="timeline-company-sticky">
                  <p className="timeline-company-dates">{event.date}</p>
                  <h2 className="timeline-company-name">{event.title}</h2>
                  <p className="timeline-company-meta">
                    <span className="badge">{event.role}</span>
                  </p>
                  <p className="timeline-company-about community-event-about">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="community-post">
                <iframe
                  src={`https://www.linkedin.com/embed/feed/update/${event.embedUrn}`}
                  title={`LinkedIn post — ${event.title}`}
                  className="community-post-frame"
                  frameBorder="0"
                  allowFullScreen
                />
                <a
                  href={event.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="community-post-link"
                >
                  View on LinkedIn
                  <span className="arrow-icon" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>
        ))}

        <footer className="timeline-end">
          <span className="timeline-end-dot" aria-hidden="true" />
          <p>More HackNights are already in the works.</p>
        </footer>
      </div>
    </main>
  );
}
