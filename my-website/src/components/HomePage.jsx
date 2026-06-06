import Hero from './sections/Hero';
import WritingSection from './sections/WritingSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WritingSection />
      <WorkSection />
      <ProjectsSection />
    </main>
  );
}
