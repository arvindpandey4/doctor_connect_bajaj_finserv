import React from "react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700">Loading doctors data...</p>
    </div>
  );
};

export default LoadingState; 