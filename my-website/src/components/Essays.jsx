// src/components/Essays.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EssayLink = ({ title, author, date, slug }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
      <Link to={`/Essays/${slug}`} className="block">{title}</Link>
    </h2>
    <div className="text-gray-500 uppercase tracking-wider text-sm">
      {author} • {date}
    </div>
  </article>
);

const Essays = () => {
  const essays = [
    {
      title: "Algorithms of Mass Connection",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "February 21, 2025",
      slug: "algorithms-of-mass-connection"
    },
    // Add more essays here as needed
  ];

  return (
    <div className="min-h-screen bg-white px-8">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 
          className="text-6xl text-black font-normal mb-16" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Essays
        </h1>
        <div className="space-y-4">
          {essays.map((essay, index) => (
            <EssayLink
              key={index}
              {...essay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Essays;