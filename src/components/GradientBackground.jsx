// GradientBackground.jsx
import React from 'react';
import Navbar from './Navbar';

const GradientBackground = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-white">Beautiful Gradient Background</h1>
        <Navbar/>
      </div>
    </div>
  );
};

export default GradientBackground;
