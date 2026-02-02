import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {toast} from 'react-toastify';
import { SERVER_URL } from "../../config";
 

export default function LoginCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
 
const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
//email, password 
 const handleSubmit = async(e) => {
    e.preventDefault();
    try{
  const response=await axios.post( `${SERVER_URL}/api/auth/user/login`,{
   email:form.email,
   password:form.password,
   
  },{withCredentials:true}

)
 localStorage.setItem("role", response.data.role);
  toast.success("Registration successful! Please verify your email before logging in.",{
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    })
    localStorage.setItem("token",response.data.token);

 
    navigate("/dashboard/customer");
  }catch(e){
      const error=e.response.data.error || e.response.data.message;
    console.log(error)
     toast.error(error,{
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        })
     
  }

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
         <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="w-full mt-2  text-purple-700  rounded hover:bg-gray-300 transition"
        >
          Forgot Password?
        </button>
      </form>
    </motion.div>
  );
}

