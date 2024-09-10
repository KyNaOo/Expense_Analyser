'use client';

import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 animate-shine"
        style={{
          background: 'linear-gradient(45deg, #ffcccb, #ff9999, #90EE90, #98FB98)',
          backgroundSize: '400% 400%',
        }}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our App</h1>
        <p className="text-xl text-gray-700 mb-8">Discover amazing features and boost your productivity</p>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;