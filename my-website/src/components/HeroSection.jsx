// HeroSection.jsx
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
      padding: 0,
      backgroundColor: '#ffffff'
    }}>
      <div>
        <style>
          {`
            .nav-link:hover {
              color: #D3D3D3  !important;
              transition: color 0.2s ease;
            }
          `}
        </style>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 'bold',
          marginBottom: '24px',
          lineHeight: '1.2',
          fontFamily: "'Playfair Display', serif"
        }}>
          A democracy,
          <br />
          if we can keep it
        </h1>
        <div style={{
          display: 'flex',
          gap: '100px',
          justifyContent: 'center'
        }}>
          <Link 
            to="/essays" 
            className="nav-link"
            style={{
              color: 'black',
              fontSize: '40px',
              textDecoration: 'none',
              fontFamily: "'Playfair Display', serif" 
            }}
          >
            Essays
          </Link>
          <Link 
            to="/products" 
            className="nav-link"
            style={{
              color: 'black',
              fontSize: '40px',
              textDecoration: 'none',
              fontFamily: "'Playfair Display', serif" 
            }}
          >
            Products
          </Link>
          <Link 
            to="/interviews" 
            className="nav-link"
            style={{
              color: 'black',
              fontSize: '40px',
              textDecoration: 'none',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Interviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;