'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const HomePage = () => {
  const router = useRouter(); // Initialize useRouter

  const handleGetStarted = () => {
    router.push('/form'); // Navigate to /form
  };

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
        <h1 className="text-4xl font-bold text-black mb-4">Welcome to my Expense Analyzer website</h1>
        <p className="text-xl text-gray-700 mb-8">Let's dive into your wallet!</p>
        <button
          onClick={handleGetStarted} // Add the click handler here
          className="px-6 py-3 bg-yellow-200 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
