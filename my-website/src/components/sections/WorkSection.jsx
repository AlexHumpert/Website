import { Link } from 'react-router-dom';
import HomeSection from './HomeSection';
import { ROLES } from '../../data/roles';

export default function WorkSection() {
  return (
    <HomeSection
      id="work"
      title="Work"
      link={{ to: '/work', label: 'View the full timeline' }}
      orb={{
        innerColor: 'oklch(0.540 0.185 15)',
        outerColor: 'oklch(0.680 0.165 35)',
        animationIndex: 2,
        duration: 9,
        style: { width: '620px', height: '620px', top: '-80px', right: '-200px' },
      }}
    >
      {ROLES.map((item) => (
        <Link key={item.title} to="/work" className="portfolio-item">
          <div>
            <div className="portfolio-item-title">{item.title}</div>
            <p className="home-work-desc">{item.description}</p>
          </div>
          <span className="portfolio-item-year">{item.year}</span>
        </Link>
      ))}
    </HomeSection>
  );
}
