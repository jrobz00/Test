import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

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

        {/* Social Media Links */}
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${
              darkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-700 hover:text-blue-600"
            } transition`}
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${
              darkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-700 hover:text-blue-600"
            } transition`}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${
              darkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-700 hover:text-blue-600"
            } transition`}
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${
              darkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-700 hover:text-blue-600"
            } transition`}
          >
            <FaLinkedin />
          </a>
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
