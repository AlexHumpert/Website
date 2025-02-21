// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Essays from './components/Essays';
import Products from './components/Products';
import Interviews from './components/Interviews';
import AlgorithmsOfMassDivision from './components/essays/content/AlgorithmsOfMassDivision';
import AIPersonas from './components/products/content/AIPersonas';

function App() {
  console.log('App is rendering');
  
  return (
    <Router>
      <div style={{ backgroundColor: 'white' }}>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/Essays" element={<Essays />} />
          <Route path="/Essays/algorithms-of-mass-division" element={<AlgorithmsOfMassDivision />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Products/ai-personas" element={<AIPersonas />} />
          <Route path="/Interviews" element={<Interviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;