import React from "react";
import { FaComments, FaLightbulb, FaClock } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // Import Link for navigation

const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md rounded-full px-8 py-4 flex justify-between items-center w-[90%] max-w-6xl mx-auto sticky top-4 z-50"
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

      <ul className="hidden md:flex space-x-8 text-black font-medium">
        <motion.li
          className="hover:text-blue-500 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="no-underline text-black">Home</Link>  {/* Link to the homepage */}
        </motion.li>

        <motion.li
          className="hover:text-blue-500 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/chat" className="no-underline text-black">Chat</Link>  {/* Link to Chat page */}
        </motion.li>

        <motion.li
          className="hover:text-blue-500 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="no-underline text-black">Features</Link>  {/* All features link to the home page */}
        </motion.li>

        <motion.li
          className="hover:text-blue-500 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="no-underline text-black">Pricing</Link>  {/* All pricing link to the home page */}
        </motion.li>

        <motion.li
          className="hover:text-blue-500 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="no-underline text-black">How It Works</Link>  {/* All "How It Works" link to the home page */}
        </motion.li>
      </ul>

      <motion.button
        className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-blue-500 shadow-md transition duration-300"
        whileHover={{ scale: 1.1 }}
      >
        Sign Up
      </motion.button>
    </motion.nav>
  );
};

const HeroBanner = () => {
  const features = [
    {
      title: "Ask Anything",
      description:
        "Get instant answers to your questions with AI-powered conversational intelligence.",
      icon: <FaComments />,
    },
    {
      title: "Generate Ideas",
      description:
        "Brainstorm creative solutions, content, or ideas with AI at your fingertips.",
      icon: <FaLightbulb />,
    },
    {
      title: "Save Time",
      description:
        "Automate repetitive tasks and focus on what matters most using AI chat tools.",
      icon: <FaClock />,
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-blue-50 via-gray-50 to-white min-h-screen">
      {/* Background Dashed Lines */}
      <div
        className="absolute inset-0 bg-white grid grid-cols-12 grid-rows-6 opacity-30"
        aria-hidden="true"
      >
        {[...Array(36)].map((_, index) => (
          <motion.div
            key={index}
            className="border border-dashed border-gray-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: (index % 12) * 0.1 + Math.floor(index / 12) * 0.1,
            }}
            style={{
              gridColumn: (index % 12) + 1,
              gridRow: Math.floor(index / 12) + 1,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock the Power of <span className="text-blue-600">AI Conversations</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-700 text-lg md:text-xl mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explore intelligent, engaging AI-powered chats that revolutionize how you interact with
            technology.
          </motion.p>

          {/* Cards Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex justify-center items-center mb-4 text-blue-600 text-5xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
