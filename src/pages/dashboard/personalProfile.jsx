 import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DeleteAccountButton from "../../components/DeleteAccountButton";
import { SERVER_URL } from "../../config";
 

export const OrganiserDashboard = () => {
  const [organiser, setOrganiser] = useState(null);
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const[loading,setLoading]=useState(false);
  const [carouselIndices, setCarouselIndices] = useState({});

const nextImage = (eventId, imagesLength) => {
  setCarouselIndices((prev) => ({
    ...prev,
    [eventId]: ((prev[eventId] || 0) + 1) % imagesLength,
  }));
};

const prevImage = (eventId, imagesLength) => {
  setCarouselIndices((prev) => ({
    ...prev,
    [eventId]: ((prev[eventId] || 0) - 1 + imagesLength) % imagesLength,
  }));
};


  const [form, setForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
  });

 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
 
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

const checkAuth = async () => {
  setLoading(true);
      try {
      const res = await axios.get(`${SERVER_URL}/api/auth/login/me`, {
        withCredentials: true, 
      });
    const data = res.data;
    setLoading(false);
       

      if (data.authenticated) {
        const organiserId = data.userId;
         
        axios
      .get(`${SERVER_URL}/api/organiser/${organiserId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrganiser(res.data.eventOrganiser);
        setEvents(res.data.eventOrganiser.event);

        setForm({
          businessName: res.data.eventOrganiser.businessName,
          email: res.data.eventOrganiser.email,
          phone: res.data.eventOrganiser.phone,
          address: res.data.eventOrganiser.address,
        });

      })
       .catch((err) => console.log(err));
         
        setLoading(false);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate("/login");
    }
  }
 

  useEffect(() => {
    checkAuth();
  },[])

  const updateProfile = () => {
    setLoading(true);
    axios
      .put(
        `${SERVER_URL}/api/auth/organiser/${organiser._id}`, 
        form,
        { withCredentials: true }
      )
      .then(() => {
        setOrganiser({ ...organiser, ...form });
        setEditMode(false);
        setLoading(false);
        showToast("Profile updated successfully!", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showToast("Failed to update profile.\n" + err.response.data.message, "error");
      });
  };
 
  const confirmDeleteEvent = (eventId) => {
    setSelectedEventId(eventId);
    setShowDeleteModal(true);
  };
const handleDeleteEvent = () => {
   setLoading(true);
    axios
      .delete(`${SERVER_URL}/api/event/${selectedEventId}`, {
        withCredentials: true,
      })
      .then(() => {
        setEvents(events.filter((ev) => ev._id !== selectedEventId));
        setShowDeleteModal(false);
        setSelectedEventId(null);
        setLoading(false);
        showToast("Event deleted successfully!", "success");
      })
      .catch((err) => {
        console.error(err);
        setShowDeleteModal(false);
        setLoading(false);
        showToast("Failed to delete event.", "error");
      });
  };

  
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  if (!organiser)
    return <div className="text-center mt-20 text-xl">Loading...</div>;
   if(loading){
    return <div className="text-center mt-20 text-xl">Loading...Please wait</div>;
   }
  return (
 <motion.div
      className="min-h-screen px-6 py-10 font-poppins text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    > 
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow">
        Organiser Profile
      </h1>

    
      <motion.div
        className="max-w-3xl mx-auto bg-white/80 shadow-xl backdrop-blur-sm p-8 rounded-2xl"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col items-center">
          
          <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {organiser.businessName?.charAt(0)}
          </div>

          {!editMode ? (
            <>
              <h2 className="text-2xl font-semibold mt-4">
                {organiser.businessName}
              </h2>
<p className="text-gray-700">{organiser.email}</p>
              <p className="text-gray-700">{organiser.phone}</p>
              <p className="text-gray-700">{organiser.address}</p>
              <div className='flex justify-between'>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Edit Profile
              </button>
               <DeleteAccountButton role={organiser.role}/></div>
            </>
          ) : (
            <>
            
              <div className="grid grid-cols-1 gap-3 w-full mt-6">
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                  className="input"
                  placeholder="Business Name"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
 className="input"
                  placeholder="Email"
                />

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="input"
                  placeholder="Phone"
                />

                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
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
     
   
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Your Events</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {events.map((ev) => {
    const images = Array.isArray(ev.images) && ev.images.length > 0
      ? ev.images
      : ev.image
      ? [ev.image]
      : [];

    const currentIndex = carouselIndices[ev._id] || 0;

    return (
      <motion.div
        key={ev._id}
        className="rounded-xl overflow-hidden bg-white/80 shadow-lg relative"
        whileHover={{ scale: 1.05 }}
      >
        {/* Image carousel */}
        {images.length > 0 ? (
          <div className="relative w-full h-40">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={ev.name}
 className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => prevImage(ev._id, images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
                >
                  ‹
                </button>
                <button
                  onClick={() => nextImage(ev._id, images.length)}
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
          <div className="w-full h-40 flex items-center justify-center bg-gray-300 text-gray-600">
            No image available
          </div>
        )}

        {/* Event Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg">{ev.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{ev.description}</p>
          <p className="text-sm mt-1 text-gray-700">
            Price: {ev.price ? `₹${ev.price}` : "Free"}
          </p>

          {ev.eventOrganiser === organiser._id && (
            <button
              onClick={() => confirmDeleteEvent(ev._id)}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
            >
              Delete Event
            </button>
  )}
        </div>
      </motion.div>
    );
  })}
</div>



      </div>

      
      {showDeleteModal && (
        <motion.div
className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-96 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
 </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteEvent}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

   
      {toast.show && (
        <motion.div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {toast.message}
 </motion.div>
      )}
    </motion.div>
  );
};


