import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} aria-label="Site navigation">
      <Link to="/" className="nav-name">Alexander Humpert</Link>
      <ul className="nav-links">
        <li><Link to="/writing">Writing</Link></li>
        <li><Link to="/work">Work</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
    </nav>
  );
}
