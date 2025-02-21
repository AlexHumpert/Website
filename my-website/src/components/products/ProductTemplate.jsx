// src/components/essays/ProductTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductTemplate = ({ title, author, date, children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '800px' }}>
        <div style={{ maxWidth: '600px' }}>
          <Link to="/Products" className="text-purple-700 hover:underline mb-8 block text-lg">
            ← Back to Products
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

export default ProductTemplate;