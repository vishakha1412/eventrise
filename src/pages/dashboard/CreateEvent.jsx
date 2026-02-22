 import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    files: [], // ✅ multiple files
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(files),  
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    
    formData.files.forEach((file) => {
      payload.append("images", file);  
    });

    payload.append("name", formData.name);
    payload.append("description", formData.description);

    try {
      setLoading(true);
      const res = await axios.post(`${SERVER_URL}/api/event/`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event created:", res.data);
      setLoading(false);
      navigate("/browse");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.error || "Error creating event");
      console.error("Error creating event:", err);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 animate-pulse">
            Creating your event...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-6 py-10 font-poppins flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
<motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-purple-800/30 p-8 rounded-xl shadow-lg backdrop-blur-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-semibold text-white mb-6 text-center">
          Create New Event
        </h2>

        {/* Multiple Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Event Images
          </label>
          <input
            type="file"
            name="files"
            accept="image/*"
            multiple // ✅ allow multiple selection
            onChange={handleChange}
            className="w-full bg-white/20 text-white p-2 rounded-md focus:outline-none"
          />
 {formData.files.length > 0 && (
            <p className="text-xs text-yellow-300 mt-1">
              {formData.files.length} image(s) selected
            </p>
          )}
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Event Name
          </label>
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
          <label className="block mb-2 text-sm font-medium text-white">
            Description
          </label>
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
