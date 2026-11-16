import { Link } from 'react-router-dom';
import Stars from '../Stars';
import LensMark from '../../tactile/LensMark';
import { toggleTheme, useTheme } from '../../theme';
import { POSTS } from '../../writing';
import { ROLES } from '../../data/roles';
import library from '../../data/library.json';

const LATEST_POST = POSTS[0];
const CURRENT_ROLE = ROLES[0];
const LATEST_LIBRARY = library
  .filter((item) => import.meta.env.DEV || !item.sample)
  .sort((a, b) => b.date.localeCompare(a.date))[0];
const LIBRARY_VERB = { video: 'Last watched', article: 'Last read', book: 'Last finished' };

const TITLE = 'Come see what I’m up to.';

export default function Hero() {
  const theme = useTheme();
  const now = [
    LATEST_POST && { label: LATEST_POST.note ? 'Latest note' : 'Latest essay', title: LATEST_POST.title, to: `/writing/${LATEST_POST.slug}` },
    { label: 'Currently', title: `Lead AI Solution Consultant, ${CURRENT_ROLE.title}`, to: '/work' },
    LATEST_LIBRARY && { label: LIBRARY_VERB[LATEST_LIBRARY.type] ?? 'In the library', title: LATEST_LIBRARY.title, to: '/library' },
  ].filter(Boolean);

  return (
    <section className="hero" aria-label="Introduction">
      {/* The sky: night falling to a lit horizon, with the ground below it. */}
      <div className="hero-sky">
        <Stars />
        <div className="grain" aria-hidden="true" />

        <div className="container hero-sky-inner">
          <div className="hero-copy">
            <p className="hero-kicker">Curious, mostly</p>
            <h1 className="hero-title" aria-label={TITLE}>
              {TITLE.split(' ').map((word, i) => (
                <span key={i} className="hero-word" style={{ '--i': i }} aria-hidden="true">
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="hero-lede">
              This is my little corner of the internet: ideas I couldn&rsquo;t stop chasing, things I&rsquo;m building, and whatever I&rsquo;ve been reading or watching lately. Pull up a chair.
            </p>
          </div>

          {/* The lens hangs in the sky like a moon. It watches the cursor,
              and pressing it turns night into day. */}
          <button
            type="button"
            className="hero-lens"
            data-sound="own"
            data-magnetic="0.12"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            aria-label={theme === 'day' ? 'Switch to the night sky' : 'Switch to the day sky'}
          >
            <LensMark reach={900} lean={1.1} squeeze={2.2} />
            <span className="hero-lens-hint" aria-hidden="true">
              {theme === 'day' ? 'Bring back the night' : 'Let the day in'}
            </span>
          </button>
        </div>
      </div>

      <div className="hero-ground">
        <div className="container">
          <ul className="hero-now" aria-label="Right now">
            {now.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hero-now-item" data-spot>
                  <span className="hero-now-label">{item.label}</span>
                  <span className="hero-now-title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
