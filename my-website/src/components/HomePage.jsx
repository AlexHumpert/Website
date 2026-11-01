import Hero from './sections/Hero';
import WritingSection from './sections/WritingSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';
import CommunitySection from './sections/CommunitySection';

const SUBSTACK = 'https://ahumpert.substack.com';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WritingSection />
      <WorkSection />
      <ProjectsSection />
      <CommunitySection />

      <footer className="home-closing">
        <div className="container home-closing-inner">
          <p className="home-closing-line">New essays go out on The Ansible first.</p>
          <a href={SUBSTACK} className="view-all" target="_blank" rel="noopener noreferrer">
            Subscribe on Substack
            <span className="arrow-icon" aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
