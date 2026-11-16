import HomeSection, { Row } from './HomeSection';
import { ROLES } from '../../data/roles';

export default function WorkSection() {
  return (
    <HomeSection
      id="work"
      title="Work"
      link={{ to: '/work', label: 'View the full timeline' }}
      glow={{ from: 'var(--sky-blue)', to: 'var(--sky-deep)', className: 'glow-right' }}
    >
      {ROLES.map((item) => (
        <Row
          key={item.title}
          to="/work"
          large
          title={item.title}
          description={item.description}
          meta={<span>{item.year}</span>}
        />
      ))}
    </HomeSection>
  );
}
