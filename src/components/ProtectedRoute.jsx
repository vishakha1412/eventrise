/*import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const cookieToken = getCookie("token");  
  console.log("ProtectedRoute - role:", role, "allowedRole:", allowedRole, "cookieToken:", cookieToken);

  
  if (!cookieToken || role !== allowedRole) {
    return <Navigate to="/login" />;
  }

    return children;
}*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";
 

export default function ProtectedRoute({ children, allowedRole }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

 useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/auth/login/me`, {
          withCredentials: true,
        });

        if (res.data?.authenticated && res.data?.role === allowedRole) {
          setAuthorized(true);
        } else {
          console.warn("Not authorized or role mismatch");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("User not logged in");
          navigate("/login", { replace: true });
        } else {
          console.error("Auth check failed:", err);
        }
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
 };

    checkAuth();
  }, [allowedRole, navigate]);

  if (loading) return null;

  return authorized ? children : null;
}






