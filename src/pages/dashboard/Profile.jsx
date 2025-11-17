import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const BusinessProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/organiser/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.eventOrganiser);
        setEvents(response.data.eventOrganiser.event);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <motion.div
      className="min-h-screen px-6 py-10 font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Profile Header */}
      <motion.div
        className="flex flex-col items-center mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-bold text-purple-600 border-2 border-purple-300">
          LOGO
        </div>

        {/* Basic Info */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <span className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md">
            {profile?.businessName}
          </span>
          <span className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md">
            {profile?.address}
          </span>
          <span className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md">
            {profile?.phone}
          </span>
          <span className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md">
            {profile?.email}
          </span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="bg-[#1e1b29] text-white p-4 rounded-xl shadow-lg border border-purple-500/40 hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-purple-300">Total Events</h2>
          <p className="text-3xl font-bold mt-1">{profile?.totalEvents}</p>
        </div>

        <div className="bg-[#1e1b29] text-white p-4 rounded-xl shadow-lg border border-purple-500/40 hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-purple-300">Customers Served</h2>
          <p className="text-3xl font-bold mt-1">{profile?.customersServed}</p>
        </div>
      </motion.div>

      {/* Contact Bar */}
      <motion.div
        className="flex justify-center mb-12 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <a
          href={`tel:${profile?.phone}`}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
        >
          Call
        </a>

        <a
          href={`https://wa.me/${profile?.phone}`}
          target="_blank"
          className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
        >
          WhatsApp
        </a>

        <a
          href={`mailto:${profile?.email}`}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
        >
          Email
        </a>

        <button
          onClick={() => navigator.share && navigator.share({ title: profile?.businessName })}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
        >
          Share
        </button>
      </motion.div>

      {/* Events Section */}
      <h2 className="text-3xl font-semibold text-purple-700 dark:text-purple-400 mb-6 text-center">
        Events by {profile?.businessName}
      </h2>

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
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            className="rounded-xl overflow-hidden shadow-xl border border-purple-500/40 bg-[#1e1b29] text-white hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={event.image}
              alt={`event ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-purple-300">{event.name}</h3>
              <p className="text-sm text-gray-300 mt-1">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
