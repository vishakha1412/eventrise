import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function LoginHost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "host@example.com", // testing data
    password: "demo1234",       // testing data
  });
const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
//email, password 
 const handleSubmit = async(e) => {
    e.preventDefault();
    
  const response=await axios.post("http://localhost:5000/api/auth/organiser/login",{
   email:form.email,
   password:form.password
  },{withCredentials:true}


).then((response) => {
  localStorage.setItem("role", response.data.role);
  localStorage.setItem("userId", response.data.user._id);

 
  navigate("/dashboard/host");
  console.log(response.data);
   //navigate("/create-event");
  
  
     
  })

  };

  return (
    <motion.div
      className="min-h-screen   flex items-center justify-center px-4"
   
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center">Login to EventConnect</h2>

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
      </form>
    </motion.div>
  );
}

