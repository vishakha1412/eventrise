 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterHost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    services: "",
    pricing: "",
    description: "",
    photos: [],
  });
  
const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "photos") {
        value.forEach((file, index) => {
          formData.append(`photos[${index}]`, file);
        });
      } else {
        formData.append(key, value);
      }
    });
    navigate("/dashboard/host");

/* try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-api.com/api/hosts/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Optional: handle response data
        const data = await response.json();
        console.log("Host registered:", data);
        navigate("/dashboard/host");
      } else {
        console.error("Registration failed");
        
        
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }*/
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

        {/* Business Details */}
        {[
          { name: "services", label: "Services Offered" },
          { name: "pricing", label: "Pricing Details" },
          { name: "description", label: "Business Description" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-purple-600">{label}</label>
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
{/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-purple-600">
            Upload Event Photos (multiple)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full px-4 py-2 border rounded"
          />
          {form.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {form.photos.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Event ${index + 1}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
              ))}
            </div>
          )}
        </div>

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
