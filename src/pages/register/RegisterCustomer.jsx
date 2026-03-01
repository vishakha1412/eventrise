import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import {toast} from 'react-toastify';
import { SERVER_URL } from "../../config";
import { Toaster } from "react-hot-toast";


export default function RegisterCustomer() {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      
  const response=await axios.post(`${SERVER_URL}/api/auth/user/register`,{
   fullName:form.name,
   email:form.email,
   password:form.password
  },{withCredentials:true}

)   
  setLoading(false);
  toast.success("Register successful! please verify your email from message from your email",{
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    })
  console.log(response.data);
    navigate("/dashboard/customer");
  }catch(e){
    setLoading(false);
    const error=e.response.data.error || e.response.data.message;
    console.log(error)
    toast.error(error,{
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    })
  }

  };
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
    if(loading){
    return <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8   p-8 rounded-lg shadow-md"
      >
        <h2 className="text-center text-8xl  animate-pulse font-extrabold text-gray-900">
         🥳...
        </h2>
      </motion.div>
    </div>
  }
return (
    <motion.div
      className="min-h-screen flex items-center justify-center  px-4"
       
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-700">Customer Registration</h2>
        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        ))}
<button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
}
