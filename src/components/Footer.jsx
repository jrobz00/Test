import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } py-10 border-t`}
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <motion.div
          className="flex flex-col items-center md:items-start space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-lg">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <h1 className="text-2xl font-bold">BiceChat</h1>
          </div>
          <p
            className={`text-center md:text-left ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Revolutionizing conversations with AI-powered tools. Let's connect and build something amazing together!
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="flex flex-col items-center md:items-start space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold">Quick Links</h2>
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "Pricing", path: "/pricing" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "Talk to Bice", path: "/chat" }, // Updated path for Talk to Bice
          ].map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-blue-500"
                  : "text-gray-700 hover:text-blue-600"
              } transition`}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="flex flex-col items-center md:items-start space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex space-x-6">
            {[
              { Icon: FaFacebook, href: "https://facebook.com" },
              { Icon: FaTwitter, href: "https://twitter.com" },
              { Icon: FaInstagram, href: "https://instagram.com" },
              { Icon: FaLinkedin, href: "https://linkedin.com" },
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${
                  darkMode
                    ? "text-gray-300 hover:text-blue-500"
                    : "text-gray-700 hover:text-blue-600"
                } transition`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="text-center mt-8 text-sm"
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
