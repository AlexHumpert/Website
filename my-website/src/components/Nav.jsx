import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Search, Sun, Volume2, VolumeX, X } from 'lucide-react';
import LensMark from '../tactile/LensMark';
import { setSoundEnabled, sound } from '../tactile/sound';
import { useSoundEnabled } from '../tactile/useSound';
import { toggleTheme, useTheme } from '../theme';
import { NAV_LINKS } from '../data/nav';

const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

function SoundToggle() {
  const on = useSoundEnabled();
  return (
    <button
      type="button"
      className="icon-button"
      data-magnetic="0.35"
      data-sound="own"
      onClick={() => setSoundEnabled(!on)}
      aria-pressed={on}
      aria-label={on ? 'Mute interface sounds' : 'Turn on interface sounds'}
      title={on ? 'Sound on' : 'Sound off'}
    >
      {on ? <Volume2 size={16} strokeWidth={1.6} /> : <VolumeX size={16} strokeWidth={1.6} />}
    </button>
  );
}

function ThemeToggle() {
  const theme = useTheme();
  return (
    <button
      type="button"
      className="icon-button"
      data-magnetic="0.35"
      data-sound="own"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={theme === 'day' ? 'Switch to the night sky' : 'Switch to the day sky'}
      title={theme === 'day' ? 'Night' : 'Day'}
    >
      {theme === 'day' ? <Moon size={16} strokeWidth={1.6} /> : <Sun size={16} strokeWidth={1.6} />}
    </button>
  );
}

export default function Nav({ onOpenPalette }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef(null);
  const glideRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The sheet closes itself whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.classList.add('is-locked');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // A soft pill glides between links under the cursor. When it first appears
  // it lands in place instead of sliding in from wherever it was last.
  const glideTo = (event) => {
    const glide = glideRef.current;
    const link = event.currentTarget;
    const fresh = !glide.classList.contains('is-on');
    if (fresh) glide.style.transitionProperty = 'opacity';
    glide.style.width = `${link.offsetWidth}px`;
    glide.style.transform = `translateX(${link.offsetLeft}px)`;
    if (fresh) {
      glide.getBoundingClientRect(); // commit the jump before re-enabling the slide
      glide.style.transitionProperty = '';
    }
    glide.classList.add('is-on');
  };

  const toggleMenu = () => {
    if (menuOpen) sound.close();
    else sound.open();
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={`site-nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="site-nav-inner">
          <Link to="/" className="nav-brand" aria-label="Alexander Wolfgang Humpert, home">
            <LensMark className="nav-lens" reach={420} />
            <span className="nav-brand-name">Alexander Wolfgang Humpert</span>
          </Link>

          <nav className="nav-primary" aria-label="Site navigation">
            <ul
              ref={listRef}
              className="nav-links"
              onPointerLeave={() => glideRef.current.classList.remove('is-on')}
            >
              <li className="nav-glide" ref={glideRef} aria-hidden="true" />
              {NAV_LINKS.map((link, i) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="nav-link"
                    data-tick={i}
                    aria-current={pathname.startsWith(link.to) ? 'page' : undefined}
                    onPointerEnter={glideTo}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-tools">
            <button
              type="button"
              className="nav-search"
              data-sound="own"
              onClick={onOpenPalette}
              aria-label="Search and jump to anything"
            >
              <Search size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>Jump to</span>
              <kbd>{IS_MAC ? '⌘' : 'Ctrl '}K</kbd>
            </button>
            <SoundToggle />
            <ThemeToggle />
            <button
              type="button"
              className="icon-button nav-menu-button"
              data-sound="own"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {/* Phones: the links live in a full-height sheet. */}
      <div id="site-menu" className={`site-menu${menuOpen ? ' is-open' : ''}`} inert={!menuOpen}>
        <nav aria-label="Site navigation, menu">
          <ul className="site-menu-links">
            {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link, i) => (
              <li key={link.to} style={{ '--i': i }}>
                <Link
                  to={link.to}
                  aria-current={
                    (link.to === '/' ? pathname === '/' : pathname.startsWith(link.to)) ? 'page' : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-menu-foot">
        <div className="site-menu-tools">
          <SoundToggle />
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="site-menu-search"
          data-sound="own"
          onClick={() => {
            setMenuOpen(false);
            onOpenPalette();
          }}
        >
          <Search size={15} strokeWidth={1.8} aria-hidden="true" />
          Search the site
        </button>
        </div>
      </div>
    </>
  );
}
