// src/components/Essays.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EssayLink = ({ title, author, date, slug }) => (
  <article className="py-12 border-t border-gray-200 first:border-none">
    <h2 className="text-5xl font-normal mb-4">
      <style>
        {`
          .essay-link:hover {
            color: #D3D3D3 !important;
            transition: color 0.2s ease;
          }
        `}
      </style>
      <Link 
        to={`/Essays/${slug}`} 
        className="block essay-link"
        style={{ 
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        {title}
      </Link>
    </h2>
    <div className="text-gray-500 uppercase tracking-wider text-sm">
      {author} • {date}
    </div>
  </article>
);


const Spacer = ({ size }) => (
  <div style={{ height: `${size}px` }}></div>
);


const Essays = () => {
  const essays = [
    {
      title: "Toward a Post-Platform Social Internet: A Position Paper for Protocol-Based Digital Public Life",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "May 2, 2025",
      slug: "post-platform-social-internet"
    },
    {
      title: "The Distortion Machine: Mapping Information's Journey from Reality to Public Conciousness",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "April 21, 2025",
      slug: "distortion-machine"
    },
    {
      title: "DemocraTech: Rebuilding the Bridge Between Citizens & Policy",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "April 20, 2025",
      slug: "democraTech:-rebuilding-the-bridge-between-citizens-&-policy"
    },
    {
      title: "A Call to Defend Democracy",
      author: "ALEXANDER WOLFGANG HUMPERT",
      date: "March 02, 2025",
      slug: "a-call-to-defend-democracy"
    },
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
      <div style={{ paddingLeft: '64px', paddingTop: '32px', maxWidth: '900px' }}>
        <div style={{ maxWidth: '900px' }}>
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
                Essays
              </h1>
              <Spacer size={25} /> {/* Adjust size prop to control spacing */}
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