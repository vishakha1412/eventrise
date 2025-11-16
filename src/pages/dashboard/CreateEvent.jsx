 import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("file", formData.file);
    payload.append("name", formData.name);
    payload.append("description", formData.description);

    try {
      const res = await axios.post("http://localhost:5000/api/event/", payload, {
        withCredentials: true,
         
      });
      console.log("Event created:", res.data);
      navigate('/browse')
    } catch (err) {
      alert(err)
      console.error("Error creating event:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-10  font-poppins flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray p-8 rounded-xl shadow-lg backdrop-blur-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
     >
 <h2 className="text-3xl font-semibold text-yellow-300 mb-6 text-center">
          Create New Event
        </h2>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">Event Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-white/20 text-white p-2 rounded-md focus:outline-none"
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Royal Wedding"
            className="w-full bg-white/20 text-white p-2 rounded-md focus:outline-none"
            required
          />
        </div>

      {/* Description Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            className="w-full bg-white/20 text-white p-2 rounded-md h-32 resize-none focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Submit Event
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

