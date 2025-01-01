import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

const HeroBanner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(true);
  const [botMessage, setBotMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const typingTimeout = setTimeout(() => {
      setBotMessage(
        "How can I assist you? Let's explore some creative solutions together."
      );
      setIsBotTyping(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(typingTimeout);
    };
  }, []);

  const handleButtonClick = () => {
    navigate(isLoggedIn ? "/chat" : "/register");
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-100 to-gray-200 min-h-screen overflow-hidden">
      {/* Dynamic Particle Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 rounded-full animate-pulse"
              style={{
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute top-10 left-10 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-tr from-blue-300 to-teal-300 rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 md:w-96 md:h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl opacity-25 animate-spin-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center h-screen max-w-7xl mx-auto px-6">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-gray-800 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Revolutionize <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
              Your Conversations
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 text-base sm:text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Transform communication with AI-powered insights and assistance.
          </motion.p>

          <motion.button
            className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            onClick={handleButtonClick}
          >
            {isLoggedIn ? "Start Chatting" : "Get Started"}
          </motion.button>
        </div>

        {/* Interactive Chat Preview */}
        <motion.div
          className="flex-1 mt-12 md:mt-0 md:ml-12 max-w-xs sm:max-w-sm md:max-w-lg w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="bg-gradient-to-r from-gray-100 to-blue-100 px-4 sm:px-6 py-3 sm:py-4 shadow">
            <h3 className="text-base sm:text-lg font-bold text-gray-800">BiceChat</h3>
            <p className="text-xs sm:text-sm text-gray-500">Powered by OpenAI</p>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-start justify-end space-x-3">
              <div className="bg-blue-500 text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm shadow">
                Can you help me with my project?
              </div>
            </div>

            {isBotTyping && (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm shadow flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-gray-600 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: 0,
                    }}
                  ></motion.div>
                  <motion.div
                    className="w-2 h-2 bg-gray-600 rounded-full mx-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: 0.2,
                    }}
                  ></motion.div>
                  <motion.div
                    className="w-2 h-2 bg-gray-600 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: 0.4,
                    }}
                  ></motion.div>
                </div>
              </div>
            )}

            {!isBotTyping && (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm shadow">
                  {botMessage}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroBanner;
