// src/components/Products.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductLink = ({ title, author, date, slug }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
      <Link to={`/Products/${slug}`} className="block">{title}</Link>
    </h2>
    <div className="text-gray-500 uppercase tracking-wider text-sm">
      {author} • {date}
    </div>
  </article>
);

const Products = () => {
  const products = [
    {
      title: "Algorithms of Mass Division",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "February 21, 2025",
      slug: "ai-personas"
    },
    // Add more products here as needed
  ];

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
          {products.map((product, index) => (
            <ProductLink
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;