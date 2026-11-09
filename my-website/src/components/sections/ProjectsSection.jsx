import { Link } from 'react-router-dom';
import HomeSection from './HomeSection';
import { PROJECTS } from '../../data/projects';

export default function ProjectsSection() {
  return (
    <HomeSection
      id="projects"
      title="Projects"
      compact
      link={{ to: '/projects', label: 'All projects' }}
      orb={{
        innerColor: 'oklch(0.540 0.135 320)',
        outerColor: 'oklch(0.670 0.160 30)',
        animationIndex: 3,
        duration: 12,
        style: { width: '460px', height: '460px', bottom: '-200px', left: '-180px' },
      }}
    >
      {PROJECTS.slice(0, 3).map((project) => (
        <Link key={project.slug} to={`/projects#${project.slug}`} className="writing-item">
          <span className="writing-item-title">{project.title}</span>
          <span className="writing-item-meta">
            <span className="badge">{project.tag}</span>
            <time dateTime={project.date}>
              {new Date(`${project.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </time>
          </span>
        </Link>
      ))}
    </HomeSection>
  );
}
