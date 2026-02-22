import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {toast} from 'react-toastify';
import { SERVER_URL } from "../../config";
import { Toaster } from "react-hot-toast";
 

export default function LoginCustomer() {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);
  const [resendLoading, setResendLoading] = useState(false);

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
    setLoading(true);
    try{
  const response=await axios.post( `${SERVER_URL}/api/auth/user/login`,{
   email:form.email,
   password:form.password,
   
  },{withCredentials:true}
   
)
 localStorage.setItem("role", response.data.role);
 setLoading(false);
  toast.success("Login successful!",{
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    })
    localStorage.setItem("token",response.data.token);

 
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
        className="max-w-md w-full space-y-8 bg-purple-50/80 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Loading...
        </h2>
      </motion.div>
    </div>
  }
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
        <button
          type="button"
          onClick={() => navigate('/resend-verification-email') }
          
           className="w-full mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
>
            Resend Verification Email 
</button>

      </form>
    </motion.div>
  );
}

