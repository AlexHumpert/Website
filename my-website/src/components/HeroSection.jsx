import React from 'react';

const HeroSection = () => {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: 'white', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          lineHeight: '1.2',
          color: 'black'
        }}>
          A democracy,
          <br />
          if we can keep it
        </h1>
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          justifyContent: 'center' 
        }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            cursor: 'pointer'
          }}>
            Essays
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            cursor: 'pointer'
          }}>
            Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;