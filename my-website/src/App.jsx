import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import WorkPage from './components/WorkPage';
import CommunityPage from './components/CommunityPage';

// Placeholder pages — to be built out
function ComingSoon({ title }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: '1rem' }}>
          Coming soon
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 400, color: 'var(--ink)', margin: 0 }}>
          {title}
        </h1>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/writing" element={<ComingSoon title="Writing" />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ComingSoon title="Case Study" />} />
        <Route path="/projects" element={<ComingSoon title="Projects" />} />
        <Route path="/projects/:slug" element={<ComingSoon title="Project" />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
