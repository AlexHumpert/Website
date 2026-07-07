import { useEffect, useRef, useState } from 'react';

const ERAS = [
  {
    id: 'vmlmap',
    company: 'VML MAP',
    location: 'Copenhagen, Denmark',
    dates: 'Jan 2024 — Present',
    about:
      'Born from the merger of VMLY&R and Wunderman Thompson — same MAP team, unified under VML, working across customer experience, brand experience and commerce.',
    bg: 'oklch(0.960 0.022 30)',
    accent: 'oklch(0.560 0.170 30)',
    roles: [
      {
        title: 'Lead AI Solutions Consultant — Agentic Lab',
        meta: 'Jan 2026 — Present',
        summary:
          'Part of the Agentic Lab — the team building bespoke agentic AI for Fortune 500 clients — operating across the full deployment lifecycle, from executive discovery and presales through prototype, pilot and production. Alongside client work, running internal AI enablement across the organization.',
        bullets: [
          'Leading AI enablement for internal Claude across 150 pilot FTEs, deploying enterprise AI tooling with training programs for specialist consulting teams',
          'Built VML MAP’s agentic AI delivery methodology — playbooks, hackathons and training across a 400+ person marketing operations organization',
          'Developing and defending financial models, value trees and ROI business cases to secure investment approval for AI initiatives',
        ],
        projects: [
          {
            id: 'text-to-sql',
            pill: 'Talk-to-data · Global retail',
            tag: 'Global home furnishings retailer',
            status: 'In production',
            title: 'A translator between marketers and their data',
            description:
              'An AI text-to-SQL translator that lets CRM teams query campaign data in plain language. Designed the evaluation framework, benchmarked competing models, engineered few-shot prompts and iterated with end users — now deployed globally across all of the client’s CRM email campaigns, powering hundreds of millions of messages a month.',
            stats: [
              { value: '99.9%', label: 'accuracy on 80% of use-cases' },
              { value: '70%', label: 'less time writing queries' },
              { value: '100M+', label: 'messages powered monthly' },
            ],
          },
          {
            id: 'brand-governance',
            pill: 'Brand governance · Global automotive',
            tag: 'Global automotive manufacturer',
            status: 'Pilot',
            title: 'Brand governance at scale',
            description:
              'An AI brand governance agent that reviews marketing assets for compliance across 18 markets. Led the engagement from discovery through pilot — designing the evaluation harness and defining the compliance scoring logic.',
            stats: [
              { value: '28% → 80%', label: 'asset review coverage, 18 markets' },
              { value: '$5.5M → $0.7M', label: 'projected annual review cost' },
              { value: '+$30M', label: 'projected media effectiveness uplift' },
            ],
          },
          {
            id: 'north-star',
            pill: 'AI North Star · Global automotive',
            tag: 'Global automotive manufacturer · EMEA',
            status: '$300K engagement',
            title: 'An AI North Star for EMEA',
            description:
              'Pitched directly to the regional CMO to secure the engagement. Facilitated an AI North Star workshop with market directors from the five largest European markets to align on a three-year AI vision anchored in business KPIs, then led end-to-end discovery across 18 markets — surfacing 10+ AI use-cases and prioritizing down to three flagship opportunities. Scoped and closed a $300K engagement staffing 15 specialists.',
            stats: [
              { value: '18', label: 'markets in discovery' },
              { value: '10+', label: 'AI use-cases surfaced' },
              { value: '15', label: 'specialists staffed' },
            ],
          },
          {
            id: 'insights-agent',
            pill: 'Data insights agent · Global beverage',
            tag: 'Global beverage company',
            status: '$150K engagement',
            title: 'A data insights agent for global digital teams',
            description:
              'Defined the problem space, scoped the resource model, and presented the solution architecture to senior global digital capability stakeholders to secure engagement sign-off for an AI-powered data insights agent.',
            stats: [{ value: '$150K', label: 'engagement secured' }],
          },
          {
            id: 'enablement',
            pill: 'AI enablement · Internal',
            tag: 'VML MAP · Internal',
            status: 'Ongoing',
            title: 'AI enablement from within',
            description:
              'Built VML MAP’s agentic AI delivery methodology — authoring playbooks and delivering hackathons and training programs across a 400+ person marketing operations organization. Now leading Claude enablement across 150 pilot FTEs and designing training for specialist teams in business architecture, experience strategy and design, value engineering and business development.',
            stats: [
              { value: '400+', label: 'people reached through training' },
              { value: '150', label: 'pilot FTEs on Claude' },
            ],
          },
        ],
      },
      {
        title: 'AI Solution Consultant',
        meta: 'Sep 2024 — Dec 2025 · 1 yr 4 mos',
        summary:
          'Back in a client-facing strategic role — combining data strategy with AI engineering to deliver enterprise-scale solutions for Fortune 500 clients across global markets.',
        bullets: [
          'Advised Fortune 500 clients on emerging AI technologies within enterprise marketing ecosystems',
          'Led strategic discovery sessions with senior stakeholders to evaluate AI-driven transformation opportunities',
          'Spearheaded proof-of-concept development from ideation through integration with client marketing technology stacks',
          'Orchestrated cross-functional teams to deliver scalable, enterprise-grade AI solutions',
        ],
      },
      {
        title: 'Junior Cloud Engineer — Cloud & AI',
        meta: 'Jan 2024 — Sep 2024 · 9 mos',
        summary:
          'Spearheaded the integration of GenAI solutions within a Marketing Operations department of 400+ professionals, serving as the primary liaison between technical teams and business stakeholders.',
        bullets: [
          'Led discovery sessions with Marketing Operations stakeholders to identify automation opportunities',
          'Analyzed and mapped complex workflows to pinpoint AI integration potential',
          'Facilitated prioritization workshops with Global Directors to score and select high-impact automation solutions',
          'Collaborated with cloud engineers to develop and deploy AI-driven task automations',
        ],
      },
    ],
  },
  {
    id: 'wtmap',
    company: 'Wunderman Thompson MAP',
    location: 'Copenhagen, Denmark',
    dates: 'Oct 2022 — Jan 2024',
    about:
      'A Global Center of Excellence for CRM, loyalty, marketing automation and personalization within Wunderman Thompson and WPP.',
    bg: 'oklch(0.960 0.020 215)',
    accent: 'oklch(0.500 0.120 215)',
    roles: [
      {
        title: 'Junior Cloud Engineer — Cloud & AI',
        meta: 'Sep 2023 — Jan 2024 · 5 mos',
        summary:
          'Joined the Cloud & AI team, enabling brands to leverage emerging technologies for advanced marketing insight and activation.',
        bullets: [
          'Built a proof-of-concept YouTube Brand Lift Study predictor on GCP — dbt and BigQuery modeling, Python predictive models, Looker Studio dashboards',
          'Assisted in building data pipelines and deploying machine learning models',
          'Presented progress to key stakeholders throughout the project lifecycle, translating complex technical concepts',
        ],
      },
      {
        title: 'Junior Data Strategist — Data Transformation',
        meta: 'Oct 2022 — Sep 2023 · 1 yr',
        summary:
          'Spearheading data-driven transformation for B2B and B2C clients — CRM experiences, paid media integration and large-scale personalization. Client-facing from day one.',
        bullets: [
          'Crafted and pitched data strategies and roadmaps to senior stakeholders',
          'Defined the measurement framework steering a global technology corporation’s CRM transformation, adopted across local markets',
          'Built a loyalty program value assessment tool for a global energy corporation — financial models, market sizing and benchmarks',
          'Developed a bespoke D2C sales reporting tool for a North American beverage company’s UK product launch',
        ],
      },
    ],
  },
  {
    id: 'ilf',
    company: 'The International Legal Foundation',
    location: 'New York, United States',
    dates: 'Oct 2019 — Mar 2020',
    about:
      'An international NGO fighting to guarantee high-quality legal representation for everyone arrested or detained, with programs in Afghanistan, Myanmar, Nepal, Palestine and Tunisia.',
    bg: 'oklch(0.958 0.018 262)',
    accent: 'oklch(0.480 0.140 262)',
    roles: [
      {
        title: 'Data Analytics Intern',
        meta: 'Jan 2020 — Mar 2020 · 3 mos · Internship',
        bullets: [
          'Designed a data analytics pipeline in G-Suite with automated report generation, cutting report creation from weeks to minutes — later implemented across three country programs',
          'Created tailored Google Data Studio dashboards for end-user KPI and descriptive analytics needs',
          'Produced monthly country program reports capturing key insights for senior stakeholders',
        ],
      },
      {
        title: 'Legal Intern',
        meta: 'Oct 2019 — Jan 2020 · 4 mos · Internship',
        bullets: [
          'Developed a research-backed pitch deck contributing to a successful $150,000+ UNICEF grant for Tunisia’s juvenile justice program',
          'Prepared justice sector assessments for Sierra Leone and Indonesia — legal systems, socio-economic factors and human rights — to inform on-site scoping missions',
          'Assisted in developing best practices for legal aid delivery in underserved populations across multiple jurisdictions',
        ],
      },
    ],
  },
  {
    id: 'launch22',
    company: 'Launch22',
    location: 'London, United Kingdom',
    dates: 'Aug 2018 — Sep 2018',
    about:
      'A charity co-working space and incubator accelerating next-generation entrepreneurs — pairing low-cost office space with world-class mentoring.',
    bg: 'oklch(0.963 0.022 170)',
    accent: 'oklch(0.500 0.110 170)',
    roles: [
      {
        title: 'Marketing Intern',
        meta: 'Aug 2018 — Sep 2018 · 2 mos · Internship',
        bullets: [
          'Produced weekly Google Analytics reports and presented channel insights to the managing team',
          'Redesigned and deployed the website with SCRUM methodology using data-driven insights — increased conversions by 180%',
          'Collaborated with event coordinators on marketing campaigns promoting internal events of 50+ people',
          'Created briefing documents for incoming interns on fundamental digital marketing skills',
        ],
      },
    ],
  },
  {
    id: 'postbug',
    company: 'PostBug',
    location: 'London, United Kingdom',
    dates: 'Jun 2018',
    about:
      'An online-to-postage platform that lets groups of people write and post real paper mail to named leaders in government, society and business.',
    bg: 'oklch(0.965 0.025 85)',
    accent: 'oklch(0.580 0.130 80)',
    roles: [
      {
        title: 'Strategic Advisor',
        meta: 'Jun 2018 · 1 mo · Contract',
        bullets: [
          'Created a business plan, investor exit strategy, portfolio of compatible angel syndicate groups and a 3-year growth strategy',
          'Obtained essential information through interviews and analysis of relevant documentation',
          'Undertook operations analysis, financial forecasts, and market and competitive research',
        ],
      },
    ],
  },
];

export default function WorkPage() {
  const [activeId, setActiveId] = useState(ERAS[0].id);
  const [openRole, setOpenRole] = useState(null);
  const [activeCase, setActiveCase] = useState(null);
  const eraRefs = useRef({});

  const toggleCase = (roleTitle, caseId) => {
    if (openRole === roleTitle && activeCase === caseId) {
      setOpenRole(null);
      setActiveCase(null);
      return;
    }
    const wasClosed = openRole !== roleTitle;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.dataset.era);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    Object.values(eraRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeEra = ERAS.find((era) => era.id === activeId) ?? ERAS[0];

  const scrollToEra = (id) => {
    eraRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="timeline-page">
      <div
        className="timeline-bg"
        style={{ backgroundColor: activeEra.bg }}
        aria-hidden="true"
      />

      <nav className="timeline-nav" aria-label="Companies">
        {ERAS.map((era) => (
          <button
            key={era.id}
            type="button"
            className={era.id === activeId ? 'active' : ''}
            style={{ '--nav-accent': era.accent }}
            onClick={() => scrollToEra(era.id)}
            aria-label={era.company}
            title={era.company}
          />
        ))}
      </nav>

      <div className="container">
        <header className="timeline-intro">
          <p className="timeline-kicker">Present — 2018</p>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
            Work
          </h1>
          <p className="timeline-intro-text">
            From enterprise AI in Copenhagen back to a postal-mail startup in
            London — scroll back through the places, and the roles, that shaped
            the way I work.
          </p>
        </header>

        {ERAS.map((era) => (
          <section
            key={era.id}
            data-era={era.id}
            ref={(el) => (eraRefs.current[era.id] = el)}
            className="timeline-era"
            style={{ '--era-accent': era.accent }}
            aria-label={era.company}
          >
            <div className="timeline-era-grid">
              <div>
                <div className="timeline-company-sticky">
                  <p className="timeline-company-dates">{era.dates}</p>
                  <h2 className="timeline-company-name">{era.company}</h2>
                  <p className="timeline-company-meta">{era.location}</p>
                  <p className="timeline-company-about">{era.about}</p>
                </div>
              </div>

              <div className="timeline-roles">
                {era.roles.map((role) => (
                  <article key={role.title} className="timeline-role">
                    <h3 className="timeline-role-title">{role.title}</h3>
                    <p className="timeline-role-meta">{role.meta}</p>
                    {role.summary && (
                      <p className="timeline-role-summary">{role.summary}</p>
                    )}
                    <ul className="timeline-role-list">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>

                    {role.projects && (
                      <div className="timeline-case-block">
                        <p className="timeline-cases-label">Selected cases</p>
                        <div className="timeline-case-pills">
                          {role.projects.map((project) => (
                            <button
                              key={project.id}
                              type="button"
                              className={`case-pill${
                                openRole === role.title && activeCase === project.id
                                  ? ' active'
                                  : ''
                              }`}
                              onClick={() => toggleCase(role.title, project.id)}
                              aria-expanded={openRole === role.title && activeCase === project.id}
                            >
                              {project.pill}
                            </button>
                          ))}
                        </div>

                        <div
                          className={`timeline-cases${openRole === role.title ? ' open' : ''}`}
                        >
                          <div className="timeline-cases-inner">
                            {role.projects.map((project) => (
                              <article
                                key={project.id}
                                id={`case-${project.id}`}
                                className="timeline-case"
                              >
                                <div className="timeline-case-head">
                                  <span className="badge">{project.tag}</span>
                                  <span className="timeline-case-status">
                                    {project.status}
                                  </span>
                                </div>
                                <h4 className="timeline-case-title">{project.title}</h4>
                                <p className="timeline-case-desc">{project.description}</p>
                                {project.stats && (
                                  <div className="timeline-case-stats">
                                    {project.stats.map((stat) => (
                                      <div key={stat.label} className="timeline-case-stat">
                                        <div className="timeline-case-stat-value">
                                          {stat.value}
                                        </div>
                                        <div className="timeline-case-stat-label">
                                          {stat.label}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </article>
                            ))}
                            <button
                              type="button"
                              className="timeline-cases-close"
                              onClick={() => {
                                setOpenRole(null);
                                setActiveCase(null);
                              }}
                            >
                              Collapse cases ↑
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <footer className="timeline-end">
          <span className="timeline-end-dot" aria-hidden="true" />
          <p>Where it all began — a postal-mail startup in London, June 2018.</p>
        </footer>
      </div>
    </main>
  );
}
