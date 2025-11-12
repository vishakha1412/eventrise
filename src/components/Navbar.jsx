  import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
   
   {name:"Register",path:"/register"},
    { name: "Browse", path: "/browse" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Browse", path: "/browse" },
  {name:"feedack",path:"/feedack"},
   {name:"pastevent",path:"/pastevent"},
   
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <nav className="bg-purple-800 text-white px-6 py-4 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EventConnect
        </Link>
 
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
        </ul>
      </div>
    </nav>
  );
}

