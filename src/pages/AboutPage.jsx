import { motion } from "framer-motion";
import { FaHandshake, FaUsers, FaRocket, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen  px-6 py-12"  >
      {/* Header */}
      <motion.h1
        className="text-4xl font-bold text-purple-800 text-center mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        About EventConnect
      </motion.h1>

      {/* Mission Statement */}
      <motion.p
        className="text-lg text-purple-700 text-center max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
EventConnect is a celebration-first platform that bridges the gap between passionate local vendors and people planning unforgettable events. Whether you're organizing a wedding, birthday, or cultural gathering, we help you connect with trusted professionals who care.
      </motion.p>

      {/* Core Benefits */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Vendor Empowerment */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <FaRocket className="text-4xl text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Empowering Small Vendors</h2>
          <p className="text-sm text-purple-600">
            We give decorators, caterers, photographers, and entertainers a digital home to showcase their work, receive verified reviews, and grow their business beyond word-of-mouth. No tech skills needed — just passion and service.
          </p>
        </motion.div>

        {/* User Experience */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.03 }}
        >
 <FaUsers className="text-4xl text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Helping You Celebrate</h2>
          <p className="text-sm text-purple-600">
            Users can browse curated vendor profiles, save favorites, build custom event teams, and manage bookings — all in one place. We make planning joyful, transparent, and stress-free.
          </p>
        </motion.div>

        {/* Trust & Transparency */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <FaHandshake className="text-4xl text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Verified Connections</h2>
          <p className="text-sm text-purple-600">
            Every vendor is verified and reviewed by real clients. We prioritize trust, transparency, and cultural authenticity — so you can plan with confidence.
          </p>
        </motion.div>

        {/* Global Vision */}
        <motion.div
className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <FaGlobe className="text-4xl text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Growing Together</h2>
          <p className="text-sm text-purple-600">
            EventConnect is built for scale — supporting rural artisans, urban creatives, and global celebrations. We believe every story deserves a spotlight.
          </p>
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Ready to plan your perfect celebration?</h3>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition" onClick={()=>navigate('/browse')}>
          Browse Vendors
        </button>
      </motion.div>
    </div>
  );
}
