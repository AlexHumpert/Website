// src/components/Essays.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
      title: "Algorithms of Mass Division",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "February 21, 2025",
      slug: "algorithms-of-mass-division"
    },
    // Add more essays here as needed
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
        </div>      
      </div>
  );
};

export default Essays;