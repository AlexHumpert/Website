import React from 'react';

const Interviews = () => {
  return (
    <div className="min-h-screen bg-white px-8">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 
          className="text-6xl text-black font-normal mb-16" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Interviews
        </h1>
        <div className="space-y-4">
          <article className="py-12">
            <h2 className="text-5xl font-normal mb-4 hover:text-blue-600">
              <a 
                href="https://www.youtube.com/watch?v=rD66e9RlAAI&ab_channel=AlexanderHumpert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                Bernhard Humpert: My Dad, Growing up in Southern Germany during WW2 | Alexander Humpert Podcast #1
              </a>
            </h2>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Interviews;