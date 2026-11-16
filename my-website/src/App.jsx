import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import HomePage from './components/HomePage';
import WorkPage from './components/WorkPage';
import CommunityPage from './components/CommunityPage';
import LibraryPage from './components/LibraryPage';
import WritingPage from './components/WritingPage';
import PostPage from './components/PostPage';
import ProjectsPage from './components/ProjectsPage';
import Tactile from './tactile/Tactile';
import { sound } from './tactile/sound';

function ComingSoon({ title }) {
  return (
    <main className="page-empty">
      <p className="kicker">Coming soon</p>
      <h1 className="page-title">{title}</h1>
      <Link to="/work" className="arrow-link">
        Back to the timeline
        <span className="arrow" aria-hidden="true" />
      </Link>
    </main>
  );
}

function Shell() {
  const { pathname } = useLocation();
  // 'key' when opened from the keyboard (appears instantly), 'click' otherwise.
  const [palette, setPalette] = useState(null);
  const firstPath = useRef(pathname);

  // Each page starts at the top (in-page #links are handled by the page itself).
  useLayoutEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    if (firstPath.current === pathname) return;
    firstPath.current = null;
    sound.navigate();
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPalette((open) => (open ? null : 'key'));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openPalette = useCallback(() => {
    sound.open();
    setPalette('click');
  }, []);
  const closePalette = useCallback(() => setPalette(null), []);

  return (
    <>
      <a href="#content" className="skip-link">Skip to content</a>
      <Tactile />
      <Nav onOpenPalette={openPalette} />
      <div id="content" className="page" key={pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<PostPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ComingSoon title="Case Study" />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </div>
      <Footer />
      <CommandPalette open={Boolean(palette)} instant={palette === 'key'} onClose={closePalette} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
