import React, { useState } from "react";
import { motion } from "framer-motion";

const EventCards = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(event.images) && event.images.length > 0
    ? event.images
    : [event.image]; // fallback if only single image string

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-xl border border-purple-500/40 bg-[#1e1b29] text-white hover:scale-105 transition relative"
      whileHover={{ scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative w-full h-56">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`event ${event.name} image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Arrows only if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
            >
                 ›
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 w-full flex justify-center gap-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentIndex ? "bg-yellow-400" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Event Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-purple-300">{event.name}</h3>
        <p className="text-sm text-gray-300 mt-1">{event.description}</p>
      </div>
    </motion.div>
  );
};

export default EventCards;


