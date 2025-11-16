 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
 axios
      .get("http://localhost:5000/api/auth/logout", {withCredentials:true}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 text-purple-800">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
};


