import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0
    }}>
      <div>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 'bold',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          A democracy,
          <br />
          if we can keep it
        </h1>
        <div style={{
          display: 'flex',
          gap: '100px',  // Added spacing between links
          justifyContent: 'center'
        }}>
          <Link 
            to="/essays" 
            style={{
              color: 'black',
              fontSize: '40px',  // Increased font size
              textDecoration: 'none',
              fontFamily: 'Georgia, serif'
            }}
          >
            Essays
          </Link>
          <Link 
            to="/products" 
            style={{
              color: 'black',
              fontSize: '40px',  // Increased font size
              textDecoration: 'none',
              fontFamily: 'Georgia, serif'
            }}
          >
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;