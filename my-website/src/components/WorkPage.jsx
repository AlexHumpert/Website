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
        title: 'Lead AI Solution Consultant',
        meta: 'Jan 2026 — Present',
        summary:
          'Now running internal AI enablement — building the capability, tooling and ways of working that bring AI into everyday practice across the organization.',
        bullets: [
          'Leading internal AI enablement across the organization',
          'Driving adoption of AI tooling and new ways of working across teams and disciplines',
          'Continuing to advise senior stakeholders on enterprise AI strategy',
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
  const eraRefs = useRef({});

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
