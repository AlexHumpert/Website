// Interviews.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InterviewLink = ({ title, subtitle, url }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <style>
      {`
        .interview-title:hover {
          color: #D3D3D3 !important;
          transition: color 0.2s ease;
        }
        .interview-subtitle {
          font-weight: normal !important;
          opacity: 0.9;
        }
        .interview-subtitle:hover {
          color: #D3D3D3 !important;
          transition: color 0.2s ease;
        }
      `}
    </style>
    <h2 className="text-5xl font-normal mb-4">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        style={{ 
          color: 'black',
          textDecoration: 'none',
        }}
      >
        <div className="interview-title font-bold">{title}</div>
        <div className="interview-subtitle text-xl mt-4">{subtitle}</div>
      </a>
    </h2>
  </article>
);

const Spacer = ({ size }) => (
  <div style={{ height: `${size}px` }}></div>
);

const Interviews = () => {
  const interviews = [
    {
      title: "Bernhard Humpert",
      subtitle: "My Dad, Growing up in Southern Germany during WW2 | Alexander Humpert Podcast #1",
      url: "https://www.youtube.com/watch?v=rD66e9RlAAI&ab_channel=AlexanderHumpert"
    }
    // Add more interviews here as needed
  ];

  return (
    <div className="min-h-screen bg-white px-8">
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '1000px' }}>
        <div style={{ maxWidth: '1000px' }}>
          <Link 
            to="/"
            className="inline-block mb-8 text-xl hover:text-blue-600 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <ArrowLeft size={24} color="black" strokeWidth={2} className="hover:opacity-80" />
          </Link>
          <div className="max-w-3xl mx-auto pt-16">
            <h1 
              className="text-6xl text-black font-normal mb-12" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Interviews
            </h1>
            <Spacer size={25} />
            <div className="space-y-4">
              {interviews.map((interview, index) => (
                <InterviewLink
                  key={index}
                  {...interview}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;