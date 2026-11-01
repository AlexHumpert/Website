import HomeSection from './HomeSection';

export default function ProjectsSection() {
  return (
    <HomeSection
      id="projects"
      title="Projects"
      compact
      orb={{
        innerColor: 'oklch(0.540 0.135 320)',
        outerColor: 'oklch(0.670 0.160 30)',
        animationIndex: 3,
        duration: 12,
        style: { width: '460px', height: '460px', bottom: '-200px', left: '-180px' },
      }}
    >
      <p className="coming-soon-line">Side projects are on the way. The first write-up lands here soon.</p>
    </HomeSection>
  );
}
