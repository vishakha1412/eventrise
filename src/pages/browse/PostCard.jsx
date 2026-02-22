 import React, { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";


const PostCard = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images =
    Array.isArray(event.images) && event.images.length > 0
      ? event.images
      : event.image
      ? [event.image]
      : [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
const title = event.name || "Untitled";
  const desc = event.description || "";
  const priceText =
    event.price && Number(event.price) > 0 ? `₹${event.price}` : "variable";
  const category = event.category || "General";
  const location = event.location || "Online";
  const date = event.date ? new Date(event.date).toLocaleDateString() : "TBA";
  const capacity = event.capacity || "As per venue";
  const organiser=event.eventOrganiserName || "not given";


  return (
    <motion.article
      key={event._id}
      className="rounded-2xl overflow-hidden bg-[#1E1A2B] border border-[#321f4a] shadow-lg flex flex-col"
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* Image Carousel */}
      {images.length > 0 ? (
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
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
 ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-300 text-gray-600">
          No image available
        </div>
      )}

      {/* Event Details */}
      <div className="p-5 text-[#efe9ff] flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold leading-tight text-[#f7eaff]">
            {title}
          </h2>
          <div className="px-2 py-1 text-xs sm:text-sm rounded-md bg-[#2a2038] text-[#e7d8ff] border border-[#3a2a52]">
            {category}
          </div>
        </div>

        <p className="text-sm text-[#d9d0f7] mt-2 line-clamp-2">{desc}</p>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-[#cfc1f8] mt-4">
          <div>
            <span className="font-medium text-[#efe9ff]">Location:</span>{" "}
            {location}
          </div>
 <div>
            <span className="font-medium text-[#efe9ff]">Date:</span> {date}
          </div>
          <div>
            <span className="font-medium text-[#efe9ff]">Capacity:</span>{" "}
            {capacity}
          </div>
            <div>
            <span className="font-medium text-[#efe9ff]">Price:</span>{" "}
            {priceText}
          </div>
          <div>
            <span className="font-medium text-[#efe9ff]">Organizer:</span>{" "}
            {organiser}
          </div>
        </div>
       <div className="mt-4 flex items-center justify-between">

       <Link
        to={`/organiser/${event.eventOrganiser}`}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white text-sm font-semibold shadow-md hover:opacity-95"
      >
        Visit Shop →
      </Link>
       <div className="p-4 text-white flex  flex-col  justify-between">
                  
                  <EventCard event={event} className="w-full px-1" />
                </div>
                </div>

        
      </div>
    </motion.article>
  );
};

export default PostCard;

