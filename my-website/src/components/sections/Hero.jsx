import { Link } from 'react-router-dom';
import Orb from '../Orb';
import { POSTS } from '../../writing';
import { ROLES } from '../../data/roles';
import library from '../../data/library.json';

const LATEST_POST = POSTS[0];
const CURRENT_ROLE = ROLES[0];
const LATEST_LIBRARY = library
  .filter((item) => import.meta.env.DEV || !item.sample)
  .sort((a, b) => b.date.localeCompare(a.date))[0];
const LIBRARY_VERB = { video: 'Last watched', article: 'Last read', book: 'Last finished' };

export default function Hero() {
  const now = [
    LATEST_POST && { label: LATEST_POST.note ? 'Latest note' : 'Latest essay', title: LATEST_POST.title, to: `/writing/${LATEST_POST.slug}` },
    { label: 'Currently', title: `Lead AI Solution Consultant, ${CURRENT_ROLE.title}`, to: '/work' },
    LATEST_LIBRARY && { label: LIBRARY_VERB[LATEST_LIBRARY.type] ?? 'In the library', title: LATEST_LIBRARY.title, to: '/library' },
  ].filter(Boolean);

  return (
    <section className="section hero" aria-label="Introduction">
      <Orb
        innerColor="oklch(0.600 0.200 22)"
        outerColor="oklch(0.720 0.175 50)"
        animationIndex={0}
        duration={11}
        style={{ width: '680px', height: '680px', top: '-120px', right: '-180px' }}
      />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">Writer, builder, operator</p>
          <h1 className="hero-title">Thinking in public, building in the open.</h1>
          <p className="hero-lede">
            I write about technology, politics, and the systems that shape how we live. I build products and tools. This is where the work lives.
          </p>
        </div>

        <ul className="hero-now" aria-label="Right now">
          {now.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="hero-now-item">
                <span className="hero-now-label">{item.label}</span>
                <span className="hero-now-title">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
