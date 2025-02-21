import React from 'react';

const EssayLink = ({ title, author, date }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
      <a href="#" className="block">{title}</a>
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
      date: "XX XX XX"
    },

  ];

  return (
    <div className="min-h-screen bg-white px-8">
      <div className="max-w-3xl mx-auto pt-16">
      <h1 className="text-6xl text-black font-normal mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
          Essays</h1>
        <div className="space-y-4">
          {essays.map((essay, index) => (
            <EssayLink
              key={index}
              title={essay.title}
              author={essay.author}
              date={essay.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Essays;