import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } py-8 border-t`}
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <motion.div
          className="flex items-center space-x-3 mb-6 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
            <span className="text-white font-bold text-lg">✦</span>
          </div>
          <h1 className="text-xl font-semibold">BiceChat</h1>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 font-medium text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["Home", "Chat", "Features", "Pricing", "How It Works"].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className={`hover:text-blue-500 transition ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Sign-Up Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/sign-up"
            className={`${
              darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
            } text-white px-6 py-2 rounded-full text-sm font-medium shadow-md transition`}
          >
            Sign Up
          </Link>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="text-center mt-8 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          © {new Date().getFullYear()} BiceChat. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
