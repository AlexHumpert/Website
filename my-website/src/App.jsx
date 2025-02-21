// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Essays from './components/Essays';
import Products from './components/Products';
import Interviews from './components/Interviews';
import AlgorithmsOfMassConnection from './components/essays/content/AlgorithmsOfMassConnection';

function App() {
  console.log('App is rendering');
  
  return (
    <Router>
      <div style={{ backgroundColor: 'white' }}>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/Essays" element={<Essays />} />
          <Route path="/Essays/algorithms-of-mass-connection" element={<AlgorithmsOfMassConnection />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Interviews" element={<Interviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;