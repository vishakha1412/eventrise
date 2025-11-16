import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const images = [
  "/images/meal1.jpg",
  "/images/meal2.jpg",
  "/images/meal3.jpg",
  "/images/meal4.jpg",
  "/images/meal5.jpg",
  "/images/meal6.jpg",
];

export const BusinessProfile = () => {
    const {id}=useParams();
    const[profile,setProfile]=useState(null);
    const[events,setEvents]=useState([])
    ///api/EventOrganiser/:id
      useEffect(() => {
        axios.get(`http://localhost:5000/api/organiser/${id}`, { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setProfile(response.data.eventOrganiser)
                setEvents(response.data.
eventOrganiser.event)
                console.log(response.data.eventOrganiser.event)

            }).catch(e => {
                console.log(e)
            })
    }, [ id ])
  return (
    <motion.div
      className="min-h-screen px-6 py-10   font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
      <motion.div
        className="flex flex-col items-center mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center text-2xl font-bold text-yellow-300 shadow-md">
          LOGO
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300">
            {profile?.businessName}
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300">
            {profile?.address}
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300">
            {profile?.phone}
          </button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
       <div className="bg-white/60 p-4 rounded-xl shadow-md hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-yellow-300">Total event</h2>
          <p className="text-3xl font-bold text-white mt-2">{profile?.totalEvents}</p>
        </div>
        <div className="bg-white/70 p-4 rounded-xl shadow-md hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-yellow-300">Customers Served</h2>
          <p className="text-3xl font-bold text-white mt-2">{profile?.customersServed}</p>
        </div>
      </motion.div>

      {/* Image Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
       {events.map((event,index) => (
          <motion.div
            key={event._id}
            className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={event.image}
              alt={`image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <p>{event.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
