import Hero from './sections/Hero';
import WritingSection from './sections/WritingSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';
import CommunitySection from './sections/CommunitySection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WritingSection />
      <WorkSection />
      <ProjectsSection />
      <CommunitySection />
    </main>
  );
}
