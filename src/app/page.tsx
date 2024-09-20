"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "../components/animatedBackground";

const HomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/form");
  };

  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Welcome to my Expense Analyzer website
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Let's dive into your wallet!
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-yellow-200 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Get Started
        </button>
      </div>
    </AnimatedBackground>
  );
};

export default HomePage;
