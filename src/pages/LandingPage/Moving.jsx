 import React, { useState, useEffect } from 'react';

const past = [
  '/events/img1.jpg',
  '/events/img2.jpg',
  '/events/img3.jpg',
  '/events/img4.jpg',
  '/events/img5.jpg',
]; // Replace with your actual image paths

const Moving = () => {
  const [px, setPx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPx((prev) => (prev + 1) % past.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

return (
    <section className="w-full py-12  bg-white/20 backdrop-blur-sm rounded-xl mx-auto my-12 max-w-7xl"> 
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-2">
          Event Highlights
        </h2>
        <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto">
          A glimpse into the vibrant moments that empower local entrepreneurs and celebrate community spirit.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 px-4 sm:px-6 lg:px-12">
        {past.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`event-${i}`}
            className={`w-32 sm:w-40 lg:w-48 h-48 object-cover rounded-xl shadow-md transition-transform duration-500 ${
              px === i ? 'scale-105 border-4 border-purple-500' : 'opacity-70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Moving;





 