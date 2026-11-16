import { useEffect } from 'react';
import { TimelineGroup, TimelinePage } from './Timeline';
import { EVENTS } from '../data/community';
import { toneStyle } from '../lib/timeline';

export default function CommunityPage() {
  useEffect(() => {
    document.title = 'Community — Alexander Wolfgang Humpert';
  }, []);

  return (
    <TimelinePage
      kicker="HackNights &amp; talks"
      title="Community"
      jump={EVENTS.map((event) => ({ id: event.id, label: event.title }))}
      intro={
        <>
          A series of agentic AI HackNights I created, organized and built in
          at VML MAP — getting hands-on with technology alongside other
          enthusiasts, applying agents to marketing automation and
          personalization, and keeping the work we bring to clients at the
          cutting edge.
        </>
      }
      end="More HackNights are already in the works."
    >
      {EVENTS.map((event, i) => (
        <TimelineGroup
          key={event.id}
          id={event.id}
          tone={toneStyle(i)}
          label={event.title}
          aside={
            <>
              <p className="tl-dates">{event.date}</p>
              <h2 className="tl-label">{event.title}</h2>
              <p className="tl-count">
                <span className="badge">{event.role}</span>
              </p>
              <p className="tl-about">{event.description}</p>
            </>
          }
        >
          <div className="tl-entry embed">
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/${event.embedUrn}`}
              title={`LinkedIn post — ${event.title}`}
              className="embed-frame"
              loading="lazy"
              allowFullScreen
            />
            <a href={event.postUrl} target="_blank" rel="noopener noreferrer" className="arrow-link arrow-link-tone">
              View on LinkedIn
              <span className="arrow arrow-out" aria-hidden="true" />
            </a>
          </div>
        </TimelineGroup>
      ))}
    </TimelinePage>
  );
}
