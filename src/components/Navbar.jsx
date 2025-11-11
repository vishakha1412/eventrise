 import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name:'Browse Vendors', path: '/browse' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 w-full z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-purple-900 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">EventConnect</div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                whileHover={{ scale: 1.1 }}
                className="relative font-medium transition duration-300 hover:text-yellow-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-300 scale-x-0 hover:scale-x-100 origin-left transition-transform" />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
            {isOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
{/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-gradient-to-br from-indigo-700 to-purple-800 px-6 py-4 space-y-4"
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="block text-lg font-medium text-white hover:text-yellow-300 transition"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
