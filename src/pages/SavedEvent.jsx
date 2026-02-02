 import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SavedEventsPage() {
  const [savedEvents, setSavedEvents] = useState([]);

  const formatDate = (d) => {
    if (!d) return "TBA";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
  };

  const handleUnsave = async (eventId) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/event/save`, { eventId }, { withCredentials: true });
      toast.success(res.data.message);
      setSavedEvents(prev => prev.filter(ev => ev._id !== eventId));
    } catch (err) {
      toast.error("Error unsaving event");
    }
  };
const handleLike = async (eventId) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/event/like`, { eventId }, { withCredentials: true });
      toast.success(res.data.message);
      setSavedEvents(prev =>
        prev.map(ev =>
          ev._id === eventId
            ? { ...ev, likeCount: ev.likeCount + (res.data.message.includes("unliked") ? -1 : 1) }
            : ev
        )
      );
    } catch (err) {
      toast.error("Error liking event");
    }
  };

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/event/saved`, { withCredentials: true });
        setSavedEvents(res.data.savedEvents);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching saved events");
      }
    };
    fetchSavedEvents();
  }, []);
 return (
  <div>
   <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 py-4">My Saved Events</h2>
     <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">
     
      {savedEvents.length === 0 ? (
        <div className="col-span-full text-center py-10 ">
        <p className=" items-center text-gray-900">No saved events yet.</p>
        </div>
      ) : (
        savedEvents.map(event => {
          const title = event.name || "Untitled";
          const desc = event.description || "";
          const priceText = event.price && Number(event.price) > 0 ? `₹${event.price}` : "Free";
          const category = event.category || "General";
          const location = event.location || "Online";
          const date = formatDate(event.date) || "TBA";
          const capacity = event.capacity || "As per venue";
          const evTags = Array.isArray(event.tags) ? event.tags : [];

          return (
            <motion.article
              key={event._id}
              className="rounded-2xl overflow-hidden transform transition-all"
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="bg-[#1E1A2B] border border-[#321f4a] shadow-[0_14px_40px_rgba(95,44,255,0.18)] rounded-2xl overflow-hidden m-5">
                <div className="relative h-48 overflow-hidden">
                  <img
  src={event.image || ""}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%23221b33' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' fill='%23d9c7ff' font-size='20' dominant-baseline='middle' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0816]/80 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] shadow-lg">
                    {priceText}
                  </div>
                </div>

                <div className="p-5 text-[#efe9ff]">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-[#f7eaff]">{title}</h2>
                    <div className="px-2 py-1 text-sm rounded-md bg-[#2a2038] text-[#e7d8ff] border border-[#3a2a52]">
                      {category}
                    </div>
                  </div>
   <p className="text-sm text-[#d9d0f7] mt-2 line-clamp-2">{desc}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-[#cfc1f8] mt-4">
                    <div><span className="font-medium text-[#efe9ff]">Location:</span> {location}</div>
                    <div><span className="font-medium text-[#efe9ff]">Date:</span> {date}</div>
                    <div><span className="font-medium text-[#efe9ff]">Capacity:</span> {capacity}</div>
                    <div><span className="font-medium text-[#efe9ff]">Organizer:</span> {event.name || "—"}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {evTags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#2a2236] text-[#eaddff] border border-transparent">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/organiser/${event.eventOrganiser._id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white text-sm font-semibold shadow-md hover:opacity-95"
                    >
                      Visit Shop →
                    </Link>
                  </div>
                </div>
 <div className="p-4 text-white flex items-center justify-between">
                  <button
                    onClick={() => handleLike(event._id)}
                    className="px-3 py-1 rounded-md bg-[#2a2038] hover:bg-[#3a2a52] text-sm"
                  >
                    👍 Like ({event.likeCount || 0})
                  </button>
                  <button
                    onClick={() => handleUnsave(event._id)}
                    className="px-3 py-1 rounded-md bg-[#ff3cac] hover:bg-[#e02b8c] text-sm"
                  >
                    💾 Unsave
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })
      )}
    </div>
    </div>
  );
}

export default SavedEventsPage;



