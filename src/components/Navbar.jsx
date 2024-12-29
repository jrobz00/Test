import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md rounded-full px-8 py-4 flex justify-between items-center w-[90%] max-w-7xl mx-auto sticky top-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span className="text-white font-bold text-sm">✦</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">AI Chat</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-black font-medium">
        {["Home", "Chat", "Features", "Pricing", "How It Works"].map((item, index) => (
          <motion.li
            key={index}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <Link to={`/${item.toLowerCase()}`} className="no-underline text-black">
              {item}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Sign Up Button */}
      <motion.button
        className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-blue-500 shadow-md transition duration-300"
        whileHover={{ scale: 1.1 }}
      >
        Sign Up
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
