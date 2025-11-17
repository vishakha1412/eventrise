 import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'

export const OrganiserDashboard = () => {
  const [organiser, setOrganiser] = useState(null);
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Editable fields
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Get token from cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) return;

    // Decode ID from token
    const decoded = jwtDecode(token);
    const organiserId = decoded.id;

    // Fetch organiser by id
    axios
      .get(`http://localhost:5000/api/organiser/${organiserId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrganiser(res.data.eventOrganiser);
        setEvents(res.data.eventOrganiser.event);
         console.log(res.data)

        setForm({
          businessName: res.data.eventOrganiser.businessName,
          email: res.data.eventOrganiser.email,
          phone: res.data.eventOrganiser.phone,
          address: res.data.eventOrganiser.address,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  

  const updateProfile = () => {
    axios
      .put(
        `http://localhost:5000/api/organiser/update/${organiser._id}`,
        form,
        { withCredentials: true }
      )
      .then(() => {
        setOrganiser({ ...organiser, ...form });
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  if (!organiser) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen px-6 py-10 font-poppins text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow">
        Organiser Profile
      </h1>

      {/* Profile Card */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/80 shadow-xl backdrop-blur-sm p-8 rounded-2xl"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {organiser.businessName?.charAt(0)}
          </div>

          {!editMode ? (
            <>
              <h2 className="text-2xl font-semibold mt-4">{organiser.businessName}</h2>
              <p className="text-gray-700">{organiser.email}</p>
              <p className="text-gray-700">{organiser.phone}</p>
              <p className="text-gray-700">{organiser.address}</p>

              <button
                onClick={() => setEditMode(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* Edit Form */}
              <div className="grid grid-cols-1 gap-3 w-full mt-6">
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="input"
                  placeholder="Business Name"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="Email"
                />

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  placeholder="Phone"
                />

                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input"
                  placeholder="Address"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={updateProfile}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Events Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Your Events</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((ev) => (
            <motion.div
              key={ev._id}
              className="rounded-xl overflow-hidden bg-white/80 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={ev.image}
                alt={ev.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{ev.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{ev.description}</p>
                <p className="text-sm mt-1 text-gray-700">
                  Price: {ev.price ? `₹${ev.price}` : "Free"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
