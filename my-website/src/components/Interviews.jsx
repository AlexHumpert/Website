import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Interviews = () => {
  return (
    <div className="min-h-screen bg-white px-8">
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '1000px' }}>
        <div style={{ maxWidth: '1000px' }}>
          <div className="max-w-3xl mx-auto pt-16">
            <Link 
              to="/"
              className="inline-flex items-center mb-8 hover:text-blue-600 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <ArrowLeft size={24} color="black" strokeWidth={2} className="hover:opacity-80" />
            </Link>
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
                    <div>Bernhard Humpert</div>
                    <div className="text-xl mt-4"> 
                      My Dad, Growing up in Southern Germany during WW2 | Alexander Humpert Podcast #1
                    </div>
                  </a>
                </h2>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;