import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Essays from './components/Essays';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/products" element={<div>Products page coming soon...</div>} />
      </Routes>
    </Router>
  );
};

export default App;