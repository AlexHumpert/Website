import { useEffect, useState } from 'react';
import { TimelineGroup, TimelinePage } from './Timeline';
import { ERAS } from '../data/work';
import { toneStyle } from '../lib/timeline';
import { sound } from '../tactile/sound';

export default function WorkPage() {
  const [openRole, setOpenRole] = useState(null);
  const [activeCase, setActiveCase] = useState(null);

  useEffect(() => {
    document.title = 'Work — Alexander Wolfgang Humpert';
  }, []);

  const closeCases = () => {
    sound.close();
    setOpenRole(null);
    setActiveCase(null);
  };

  const toggleCase = (roleTitle, caseId) => {
    if (openRole === roleTitle && activeCase === caseId) {
      closeCases();
      return;
    }
    const wasClosed = openRole !== roleTitle;
    sound.open();
    setOpenRole(roleTitle);
    setActiveCase(caseId);
    setTimeout(
      () => {
        document
          .getElementById(`case-${caseId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
      wasClosed ? 450 : 50
    );
  };

  return (
    <TimelinePage
      kicker="Present — 2018"
      title="Work"
      watch={`${openRole}-${activeCase}`}
      jump={ERAS.map((era) => ({ id: era.id, label: era.company }))}
      intro={
        <>
          From enterprise AI in Copenhagen back to a postal-mail startup in
          London — scroll back through the places, and the roles, that shaped
          the way I work.
        </>
      }
      end="Where it all began — a postal-mail startup in London, June 2018."
    >
      {ERAS.map((era, i) => (
        <TimelineGroup
          key={era.id}
          id={era.id}
          tone={toneStyle(i)}
          label={era.company}
          aside={
            <>
              <p className="tl-dates">{era.dates}</p>
              <h2 className="tl-label">{era.company}</h2>
              <p className="tl-count">{era.location}</p>
              <p className="tl-about">{era.about}</p>
            </>
          }
        >
          {era.roles.map((role) => (
            <article key={role.title} className="tl-entry role">
              <h3 className="entry-title">{role.title}</h3>
              <p className="role-meta">{role.meta}</p>
              {role.summary && <p className="role-summary">{role.summary}</p>}
              <ul className="role-list">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {role.projects && (
                <div className="cases">
                  <p className="cases-label">Selected cases</p>
                  <div className="pills">
                    {role.projects.map((project) => {
                      const isActive = openRole === role.title && activeCase === project.id;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          className="pill pill-tone"
                          data-sound="own"
                          onClick={() => toggleCase(role.title, project.id)}
                          aria-pressed={isActive}
                          aria-expanded={isActive}
                        >
                          {project.pill}
                        </button>
                      );
                    })}
                  </div>

                  <div className={`cases-drawer${openRole === role.title ? ' is-open' : ''}`} inert={openRole !== role.title}>
                    <div className="cases-drawer-inner">
                      {role.projects.map((project) => (
                        <article
                          key={project.id}
                          id={`case-${project.id}`}
                          className={`case${activeCase === project.id ? ' is-active' : ''}`}
                          data-spot
                        >
                          <div className="case-head">
                            <span className="badge">{project.tag}</span>
                            <span className="case-status">{project.status}</span>
                          </div>
                          <h4 className="case-title">{project.title}</h4>
                          <p className="case-desc">{project.description}</p>
                          {project.stats && (
                            <div className="case-stats">
                              {project.stats.map((stat) => (
                                <div key={stat.label} className="case-stat">
                                  <div className="case-stat-value">{stat.value}</div>
                                  <div className="case-stat-label">{stat.label}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </article>
                      ))}
                      <button type="button" className="cases-close" data-sound="own" onClick={closeCases}>
                        Collapse cases <span aria-hidden="true">↑</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </TimelineGroup>
      ))}
    </TimelinePage>
  );
}
