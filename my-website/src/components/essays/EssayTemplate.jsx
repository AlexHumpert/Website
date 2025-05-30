// src/components/essays/EssayTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EssayTemplate = ({ title, author, date, children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '800px' }}>
        <div style={{ maxWidth: '600px' }}>
          <Link to="/Essays" className="text-purple-700 hover:underline mb-8 block text-lg">
            <ArrowLeft size={24} color="black" strokeWidth={2} className="hover:opacity-80" />
          </Link>
          
          <h1 className="text-5xl font-normal mb-1">
            {title}
          </h1>
          
          <div className="text-lg mb-12">
            {author} • {date}
          </div>

          <div className="space-y-4 leading-relaxed" style={{ fontSize: '24px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayTemplate;