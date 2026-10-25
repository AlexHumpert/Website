import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { getTheme, setTheme } from '../theme';

// The Iskandar lens: two circles, gold where they meet.
function LensMark() {
  return (
    <svg className="nav-lens" viewBox="0 0 34 20" aria-hidden="true">
      <defs>
        <clipPath id="nav-lens-clip">
          <circle cx="11" cy="10" r="8.5" />
        </clipPath>
      </defs>
      <circle cx="23" cy="10" r="8.5" fill="#c9a24a" clipPath="url(#nav-lens-clip)" />
      <circle cx="11" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="23" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState(getTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  };

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} aria-label="Site navigation">
      <Link to="/" className="nav-name">
        <LensMark />
        Alexander Humpert
      </Link>
      <ul className="nav-links">
        <li><Link to="/writing">Writing</Link></li>
        <li><Link to="/work">Work</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/library">Library</Link></li>
      </ul>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
      </button>
    </nav>
  );
}
