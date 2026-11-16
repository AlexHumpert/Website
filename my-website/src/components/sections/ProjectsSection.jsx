import HomeSection, { Row } from './HomeSection';
import { PROJECTS } from '../../data/projects';
import { shortMonthLabel } from '../../lib/timeline';

export default function ProjectsSection() {
  return (
    <HomeSection
      id="projects"
      title="Projects"
      link={{ to: '/projects', label: 'All projects' }}
      glow={{ from: 'var(--sky-violet)', to: 'var(--sky-ember)', className: 'glow-left' }}
    >
      {PROJECTS.slice(0, 3).map((project) => (
        <Row
          key={project.slug}
          to={`/projects#${project.slug}`}
          title={project.title}
          preview={project.image}
          meta={
            <>
              <span className="badge">{project.tag}</span>
              <time dateTime={project.date}>{shortMonthLabel(project.date)}</time>
            </>
          }
        />
      ))}
    </HomeSection>
  );
}
