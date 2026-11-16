import { useEffect } from 'react';
import Hero from './sections/Hero';
import WritingSection from './sections/WritingSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';
import CommunitySection from './sections/CommunitySection';

const SUBSTACK = 'https://ahumpert.substack.com';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Alexander Wolfgang Humpert';
  }, []);

  return (
    <main>
      <Hero />
      <WritingSection />
      <WorkSection />
      <ProjectsSection />
      <CommunitySection />

      <section className="home-closing" aria-label="Subscribe">
        <div className="container home-closing-inner">
          <p className="home-closing-line">New essays go out on The Ansible first.</p>
          <a href={SUBSTACK} className="button" data-magnetic="0.2" target="_blank" rel="noopener noreferrer">
            Subscribe on Substack
            <span className="arrow arrow-out" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
