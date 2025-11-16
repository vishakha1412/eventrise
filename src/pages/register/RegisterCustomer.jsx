import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'

export default function RegisterCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
  const response=await axios.post("http://localhost:5000/api/auth/user/register",{
   fullName:form.name,
   email:form.email,
   password:form.password
  },{withCredentials:true}

)   
 
  console.log(response.data);
    navigate("/dashboard/customer");
  }catch(e){
    console.log(e)
    alert(e)
  }

  };
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
