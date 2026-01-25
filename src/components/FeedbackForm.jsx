 import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExpandableText from "./ExpandableText";
import { SERVER_URL } from "../config";

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    role: "user",
    name: "",
    feedback: "",
  });
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedbacks when component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/feedback/all`);
        const data = await res.json();
        if (res.ok) {
          setFeedbacks(data);
        } else {
          setMessage(data.message || "Failed to fetch feedback");
        }
      } catch (error) {
        setMessage("Error fetching feedback",error);
      } finally {
        setLoading(false);
 }
    };
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
        const result = await res.json();
        
      setMessage(result.message);

      // Reset form
      setFormData({ role: "user", name: "", feedback: "" });

      // Refresh feedback list after submission
      const updatedRes = await fetch("http://localhost:5000/api/feedback/all");
        const updatedData = await updatedRes.json();
         
      if (updatedRes.ok) setFeedbacks(updatedData);
    } catch (error) {
      setMessage("Error submitting feedback. Try again!",error);
    }
  };
 return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center min-h-screen   p-6"
    >
      {/* Feedback Form */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mb-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center text-purple-700 mb-6"
        >
          Event Connect Feedback
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">I am a:</label>
            <select
              name="role"
 value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Your Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Your Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
  <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 rounded-lg shadow-lg"
          >
            Submit Feedback
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-green-600 font-semibold"
          >
            {message}
          </motion.p>
        )}
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="shadow-2xl rounded-xl p-6 w-full  "
      >
        <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
          All Feedback
        </h3>

        {loading ? (
  <p className="text-center text-gray-500">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-600">No feedback submitted yet.</p>
        ) : (
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
      {feedbacks.map((fb, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white border border-purple-200 rounded-xl shadow-lg hover:shadow-xl p-3 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-700 font-bold">{fb.role}</span>
            <span className="text-xs text-gray-500">
              {new Date(fb.createdAt).toLocaleDateString()}
            </span>
          </div>

          <ExpandableText text={fb.feedback} className="max-w-full" />

          <div className="text-sm text-purple-600 font-medium mt-3">
            — {fb.name}
          </div>
        </motion.div>
      ))}
    </div>




        )}
      </motion.div>
    </motion.div>
  );
};
