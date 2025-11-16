import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
  const navigate = useNavigate();

  const dashboardItems = [
    { label: "My Profile", icon: "👤", link: "/dashboard/host/profile" },
    { label: "Upload Event Photos", icon: "🖼️", link: "/host/photos" },
    { label: "Manage Services", icon: "🛠️", link: "/host/services" },
    { label: "Pricing & Packages", icon: "💰", link: "/host/pricing" },
    { label: "Customer Requests", icon: "📩", link: "/host/requests" },
    { label: "Reviews & Ratings", icon: "⭐", link: "/host/reviews" },
    { label: "Create Event", icon: "🎉", link: "/create-event" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 px-6 py-10 flex flex-col items-center"
      style={{
        backgroundImage: "url('/assets/main-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
 <motion.h1
        className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome, Host 🌟
      </motion.h1>

      <motion.p
        className="text-lg text-purple-700 mb-8 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Manage your services, showcase your work, and connect with thousands of customers planning their perfect celebration.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {dashboardItems.map(({ label, icon, link }) => (
          <motion.div
            key={label}
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(link)}
          >
 <div className="text-4xl mb-2">{icon}</div>
            <h2 className="text-xl font-semibold text-purple-700">{label}</h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
