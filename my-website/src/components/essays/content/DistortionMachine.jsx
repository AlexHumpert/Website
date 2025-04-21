// src/components/essays/content/DistortionMachine.jsx
import React from 'react';
import EssayTemplate from '../EssayTemplate';
import essayImage from '../../../assets/signal_journey.png';

// Updated image configuration for a larger image
const imageConfig = {
  width: '1000px',    // Increased maximum width
  spacing: {
    top: '48px',
    bottom: '48px'
  }
};

const DistortionMachine = () => {
  return (
    <EssayTemplate
      title="The Distortion Machine: Mapping Information's Journey from Reality to Public Conciousness"
      author="ALEXANDER WOLFGANG HUMPERT"
      date="April 21, 2025"
    >
       <p>
        Feels like an engineering problem to me.
      </p>
      <p>
        Optimistic we can solve this.
      </p>
      <p>
        On a journey to execute.
      </p>
      <p>
        Thinking it requires competing for users via front-end and competing for engineers via mission, values and community.
      </p>
      {/* Full-width container that breaks out of parent constraints */}
      <div
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-30vw',
          marginRight: '-50vw',
          marginTop: imageConfig.spacing.top,
          marginBottom: imageConfig.spacing.bottom,
          textAlign: 'center'  // Center the image
        }}
      >
        <img
          src={essayImage}
          alt="Distortion Machine Illustration"
          style={{
            width: 'auto',
            maxWidth: imageConfig.width,
            height: 'auto',
            margin: '0 auto',  // Center the image horizontally
            display: 'block'   // Remove default inline spacing
          }}
        />
      </div>
      
    </EssayTemplate>
  );
};

export default DistortionMachine;