 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginHost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Password validation function
  const validatePassword = (password) => {
    if (password.length < 4) return "Password must be at least 4 characters long.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    return "";
  };
 const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Run validation before API call
    const validationError = validatePassword(form.password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    await axios
      .post(
        "http://localhost:5000/api/auth/organiser/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        localStorage.setItem("role", response.data.role);
        toast.success("Registration successful! Please verify your email before logging in.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/dashboard/host");
      })
      .catch((error) => {
        const errMsg = error.response.data.error || error.response.data.message;
        setError(errMsg);
        toast.error(errMsg, {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center">
          Login to EventConnect
        </h2>
<div>
          <label className="block text-sm font-medium text-purple-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
 Login
        </button>

     
        <button
          type="button"
          onClick={() => navigate("/forgot-organiser-password")}
          className="w-full mt-2  text-purple-700  rounded hover:bg-gray-300 transition"
        >
          Forgot Password?
        </button>
      </form>
    </motion.div>
  );
}

