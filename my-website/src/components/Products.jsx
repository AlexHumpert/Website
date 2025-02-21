import React from 'react';

const Products = () => {
  return (
    <div className="min-h-screen bg-white px-8">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 
          className="text-6xl text-black font-normal mb-16" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Products
        </h1>
        <div className="space-y-4">
          <article className="py-12">
            <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
              <a 
                href="https://ai-persona-marketing-397812137944.europe-west1.run.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                AI Personas
              </a>
            </h2>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Products;