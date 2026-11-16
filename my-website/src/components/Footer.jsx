import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LensMark from '../tactile/LensMark';
import { NAV_LINKS } from '../data/nav';

const SUBSTACK = 'https://ahumpert.substack.com';

const copenhagenTime = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Copenhagen', hour: '2-digit', minute: '2-digit' });

// The clock ticks once a minute, on the minute.
function useCopenhagenTime() {
  const [time, setTime] = useState(copenhagenTime);
  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      setTime(copenhagenTime());
      interval = setInterval(() => setTime(copenhagenTime()), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  return time;
}

export default function Footer() {
  const time = useCopenhagenTime();

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <Link to="/" className="site-footer-brand" aria-label="Alexander Wolfgang Humpert, home">
          <LensMark className="site-footer-lens" reach={360} />
          <span>Alexander Wolfgang Humpert</span>
        </Link>

        <ul className="site-footer-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a href={SUBSTACK} target="_blank" rel="noopener noreferrer">
              Substack <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <p className="site-footer-place">
          Copenhagen <time>{time}</time>
        </p>
      </div>
    </footer>
  );
}
