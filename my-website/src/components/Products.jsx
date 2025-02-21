import React from 'react';

const ProductLink = ({ title, author, date }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
      <a href="#" className="block">{title}</a>
    </h2>
    <div className="text-gray-500 uppercase tracking-wider text-sm">
      {author} • {date}
    </div>
  </article>
);

const Products = () => {
  const products = [
    {
      title: "Coming Soon",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "XX XX XX"
    },

  ];

  return (
    <div className="min-h-screen bg-white px-8">
      <div className="max-w-3xl mx-auto pt-16">
      <h1 className="text-6xl text-black font-normal mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
          Products</h1>
        <div className="space-y-4">
          {products.map((product, index) => (
            <ProductLink
              key={index}
              title={product.title}
              author={product.author}
              date={product.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;