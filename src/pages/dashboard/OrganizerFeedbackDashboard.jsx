import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OrganizerFeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("organizerToken"); // Replace with your auth logic

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFeedbacks(data);
        } else {
          setError(data.message || "Failed to fetch feedback");
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };
 fetchFeedbacks();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen  p-6"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6"
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Organizer Feedback Dashboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading feedback...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-600">No feedback submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
  <tr className="bg-purple-100 text-purple-800">
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Feedback</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-purple-50"
                  >
                    <td className="px-4 py-2">{fb.role}</td>
                    <td className="px-4 py-2">{fb.name}</td>
                    <td className="px-4 py-2">{fb.feedback}</td>
                    <td className="px-4 py-2">
                      {new Date(fb.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
);
};

export default OrganizerFeedbackDashboard;

