import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-center bg-purple-900 text-white">
      <p>&copy; {new Date().getFullYear()} EventConnect Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
