// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Essays from './components/Essays';
import Products from './components/Products';
import Interviews from './components/Interviews';

function App() {
  console.log('App is rendering');  // Add this log
  
  return (
    <Router>
      <div style={{ backgroundColor: 'white' }}>  {/* Add a visible background */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/Essays" element={<Essays />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Interviews" element={<Interviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;