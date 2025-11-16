import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const cookieToken = getCookie("token"); // ✅ now accessible

  
  if (!cookieToken || role !== allowedRole) {
    return <Navigate to="/login" />;
  }

    return children;
}

