 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {toast} from 'react-toastify';
import { CLIENT_URL } from "../../config";

export default function RegisterHost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
     
  });
  
const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
//name,businessName,phone,address,email,password
  const handleSubmit = async(e) => {

    e.preventDefault();
    try{
  const response=await axios.post(`${CLIENT_URL}/api/auth/organiser/register`,{
   name:form.name,
   email:form.email,
   password:form.password,
   businessName:form.businessName,
   phone:form.phone,
   address:form.address

  },{withCredentials:true}

)   
toast.success("Registration successful! Please verify your email before logging in.",{
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    })
  console.log(response.data);
    navigate("/dashboard/host");}
    catch(e){
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
      className="min-h-screen   px-4 py-10 flex justify-center"
        
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center">
          Host Registration
        </h2>

        {/* Basic Info */}
        {[
          { name: "name", label: "Your Name" },
          { name: "businessName", label: "Business Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "phone", label: "Phone Number" },
          { name: "address", label: "Address" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-purple-600">{label}</label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}

      

{/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Register as Host
        </button>
      </form>
    </motion.div>
  );
}
