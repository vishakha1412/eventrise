 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_URL } from "../../config";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
 axios
      .get(`${CLIENT_URL}/api/auth/logout`, {withCredentials:true}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        
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


