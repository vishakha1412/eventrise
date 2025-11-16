 import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

 


export const BrowsePage = () => {
  const navigate=useNavigate();
  const[events,setEvents]=useState([])
 

  useEffect(() => {
    const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
const token = getCookie("token");


    // ✅ Redirect if token is missing
    if (!token) {
      navigate("/register");
      return;
    }

    // ✅ Fetch events if token is present
    axios
      .get("http://localhost:5000/api/event/", { withCredentials: true })
      .then((response) => {
        console.log(response.data.events);
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        navigate("/register");
      });
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen px-6 py-10   text-white font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-semibold text-center mb-10 text-gray-900">
        Browse Events
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="bg-white/40 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
              <div className="p-5">
              <h2 className="text-xl font-bold text-yellow-300 mb-2">
                {event.name}
              </h2>
              <p className="text-sm text-gray-300">{event.description}</p>
            </div>
            <Link to={"/organiser/" + event.eventOrganiser}>
            Visit Shop</Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

