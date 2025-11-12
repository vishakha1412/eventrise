 import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaHeart, FaCalendarAlt, FaUserCog } from "react-icons/fa";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      label: "Browse Services",
      icon: <FaSearch className="text-3xl text-purple-600" />,
      route: "browse",
      description: "Explore decorators, caterers, DJs, and more.",
    },
    {
      label: "Saved Vendors",
      icon: <FaHeart className="text-3xl text-purple-600" />,
      route: "favorites",
      description: "Your favorite vendors at a glance.",
    },
    {
      label: "My Bookings",
      icon: <FaCalendarAlt className="text-3xl text-purple-600" />,
      route: "bookings",
      description: "Track and manage your event bookings.",
    },
 {
      label: "Profile Settings",
      icon: <FaUserCog className="text-3xl text-purple-600" />,
      route: "profile",
      description: "Update your preferences and contact info.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 px-4 py-10"   style={{backgroundImage: "url('/assets/main-bg.jpg')" , backgroundSize: 'cover', backgroundPosition: 'center'}} >
      <motion.h1
        className="text-4xl font-bold text-purple-800 text-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to EventConnect 🎉
      </motion.h1>
 <motion.p
        className="text-lg text-purple-700 text-center mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Discover top-rated decorators, caterers, and event professionals near you.
        Plan your dream celebration with ease and confidence.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {cards.map(({ label, icon, route, description }) => (
          <motion.div
            key={label}
            onClick={() => navigate(route)}
            className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-4">{icon}</div>
            <h2 className="text-xl font-semibold text-purple-700">{label}</h2>
            <p className="text-sm text-purple-600 mt-2">{description}</p>
          </motion.div>
 ))}
      </motion.div>

      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  );
}

