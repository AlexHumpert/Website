import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProductLink = ({ title, subtitle, url }) => (
  <article className="py-12 border-t border-gray-500 first:border-none">
    <style>
      {`
        .product-title:hover {
          color: #D3D3D3 !important;
          transition: color 0.2s ease;
        }
        .product-subtitle {
          font-weight: normal !important;
          opacity: 0.9;
        }
        .product-subtitle:hover {
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
        <div className="product-title font-bold">{title}</div>
        <div className="product-subtitle text-xl mt-4">{subtitle}</div>
      </a>
    </h2>
  </article>
);

const Spacer = ({ size }) => (
  <div style={{ height: `${size}px` }}></div>
);

const Products = () => {
  const products = [
    {
      title: "AI Personas",
      subtitle: "Pre-test marketing content against customer personas",
      url: "https://ai-persona-marketing-397812137944.europe-west1.run.app/"
    }
    // Add more products here as needed
  ];

  return (
    <div className="min-h-screen bg-white px-8">
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '800px' }}>
        <div style={{ maxWidth: '600px' }}>
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
              Products
            </h1>
            <Spacer size={25} />
            <div className="space-y-4">
              {products.map((product, index) => (
                <ProductLink
                  key={index}
                  {...product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;