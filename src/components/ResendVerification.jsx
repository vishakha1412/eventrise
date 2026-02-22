import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // ✅ use "user" not "customer"
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        role,
      });
      toast.success(res.data.message, { position: "top-center" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h3 className="text-xl font-bold text-purple-700 text-center">
        Resend Verification Email
      </h3>

      <div>
        <label className="block text-sm font-medium text-purple-600">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-600">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="user">Customer</option>
          <option value="eventorganiser">Organiser</option>
        </select>
      </div>
 <button
        onClick={handleResend}
        disabled={!email || loading}
        className={`w-full py-2 rounded text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Resending..." : "Resend Email"}
      </button>
    </motion.div>
  );
}


