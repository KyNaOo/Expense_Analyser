import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-xl font-semibold text-gray-700">
        Loading your results...
      </p>
    </div>
  </div>
);

export default LoadingSpinner;
