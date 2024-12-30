import React, { useState, useEffect } from "react";
import { FaComments, FaLightbulb, FaClock } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [user, setUser] = useState(null); // Track logged-in user

  // Detect if the user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleChatClick = () => {
    if (user) {
      navigate("/chat"); // Redirect to chat if the user is logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  const handleSignUpClick = () => {
    if (user) {
      navigate("/chat"); // Redirect to a dashboard or home page if logged in
    } else {
      navigate("/register"); // Redirect to register if not logged in
    }
  };

  return (
    <motion.nav
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md rounded-full px-8 py-4 flex justify-between items-center w-[90%] max-w-6xl mx-auto sticky top-4 z-50`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span className="text-white font-bold text-sm">✦</span>
        </div>
        <span className="text-lg font-semibold">BiceChat</span>
      </div>

      <ul className="hidden md:flex space-x-8 font-medium">
        {[
          { name: "Home", path: "/" },
          { name: "Chat", path: "/chat", onClick: handleChatClick }, // Attach onClick for Chat
          { name: "Features", path: "/" },
          { name: "Pricing", path: "/" },
          { name: "How It Works", path: "/" },
        ].map((item, index) => (
          <motion.li
            key={index}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={item.onClick} // Attach onClick only for "Chat"
          >
            {!item.onClick ? (
              <Link
                to={item.path}
                className={`${darkMode ? "text-white" : "text-black"} no-underline`}
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={`${darkMode ? "text-white" : "text-black"} no-underline`}
              >
                {item.name}
              </span>
            )}
          </motion.li>
        ))}
      </ul>

      <div className="flex items-center space-x-4">
        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
        >
          {darkMode ? (
            <FaLightbulb className="text-yellow-400 text-2xl" />
          ) : (
            <FaLightbulb className="text-blue-600 text-2xl" />
          )}
        </motion.button>
        <motion.button
          onClick={handleSignUpClick} // Add onClick for "Sign Up"
          className={`${
            darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
          } text-white rounded-full px-6 py-2 text-sm font-medium shadow-md transition duration-300`}
          whileHover={{ scale: 1.1 }}
        >
          {user ? `Welcome, ${user.displayName || "User"}` : "Sign Up"}
        </motion.button>
      </div>
    </motion.nav>
  );
};

const HeroBanner = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const features = [
    {
      title: "Ask Anything",
      description: "Get instant answers to your questions with AI-powered conversational intelligence.",
      icon: <FaComments />,
    },
    {
      title: "Generate Ideas",
      description: "Brainstorm creative solutions, content, or ideas with AI at your fingertips.",
      icon: <FaLightbulb />,
    },
    {
      title: "Save Time",
      description: "Automate repetitive tasks and focus on what matters most using AI chat tools.",
      icon: <FaClock />,
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-blue-50 via-gray-50 to-white"
      } min-h-screen relative`}
    >
      {/* Animated Background Dashed Lines */}
      <div
        className={`absolute inset-0 grid grid-cols-12 grid-rows-6 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        aria-hidden="true"
      >
        {[...Array(36)].map((_, index) => (
          <motion.div
            key={index}
            className={`border border-dashed ${
              darkMode ? "border-gray-700 opacity-40" : "border-gray-300 opacity-30"
            }`}
            initial={{ y: index % 2 === 0 ? -20 : 20, rotate: 0 }}
            animate={{
              y: index % 2 === 0 ? 20 : -20,
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3 + (index % 12) * 0.1,
            }}
            style={{
              gridColumn: (index % 12) + 1,
              gridRow: Math.floor(index / 12) + 1,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          {/* Title */}
          <motion.h1
            className={`${
              darkMode ? "text-white" : "text-gray-900"
            } text-5xl md:text-6xl font-extrabold leading-tight mb-6`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock the Power of <span className="text-blue-600">AI Conversations</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-700"
            } text-lg md:text-xl mb-12 leading-relaxed`}
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
                className={`${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                } shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-110`}
                whileHover={{ scale: 1.15 }}
              >
                <div
                  className={`flex justify-center items-center mb-4 ${
                    darkMode ? "text-yellow-400" : "text-blue-600"
                  } text-5xl`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
