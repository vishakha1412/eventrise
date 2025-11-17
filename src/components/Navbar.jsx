 import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Browse", path: "/browse" },
  { name: "About", path: "/about" },
  { name: "Browse", path: "/browse" },
  { name: "Feedback", path: "/feedback" },
  { name: "Past Events", path: "/pastevent" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
 // ✅ Cookie reader
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // ✅ Sync token and role on mount
  useEffect(() => {
     const localToken = localStorage.getItem("token");
setToken(localToken);
   
    const localRole = localStorage.getItem("role");
    
    setRole(localRole);
  },[])
  // ✅ Sync across tabs
 useEffect(() => {
  const cookieToken = getCookie("token");
  const localRole = localStorage.getItem("role");
  
  console.log("Role:", localRole);
  setToken(cookieToken);
  setRole(localRole);
});


  // ✅ Logout handler
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/organiser/logout", {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
        alert("Logout successful");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <nav className="bg-purple-800 text-white px-6 py-4 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EventConnect
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.slice(0, 3).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition duration-300 hover:text-purple-300 ${
                  isActive ? "underline text-purple-300" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={toggleSidebar}
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition duration-300"
          >
  More
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl focus:outline-none"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-purple-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg z-40`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-purple-700">
          <h2 className="text-xl font-semibold">More Links</h2>
          <button onClick={toggleSidebar} className="text-2xl">
            <FiX />
          </button>
        </div>
 <ul className="flex flex-col gap-4 px-6 py-6">
          {/* ✅ Role-based Dashboard */}
          {token && (
            <NavLink
              to={role === "organiser" ? "/dashboard/host" : "/dashboard/customer"}
              className="hover:underline font-semibold"
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </NavLink>
          )}

          {/* Remaining Nav Links */}
          {navLinks.slice(3).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `transition duration-300 hover:text-purple-300 ${
                  isActive ? "underline text-purple-300" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {/* ✅ Auth Buttons */}
          {token ? (
            <button
              onClick={handleLogout}
              className="hover:underline font-semibold text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/register"
              onClick={() => setSidebarOpen(false)}
              className="hover:underline font-semibold"
            >
              Register
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}


