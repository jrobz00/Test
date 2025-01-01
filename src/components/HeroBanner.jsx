import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

const HeroBanner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isBotTyping, setIsBotTyping] = useState(true);
  const [botMessage, setBotMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    const typingTimeout = setTimeout(() => {
      setBotMessage(
        "Sure! What specifically do you need help with? I can provide examples or explanations."
      );
      setIsBotTyping(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(typingTimeout);
    };
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/chat");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Siri-Style Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 rounded-full blur-3xl opacity-30 animate-siri-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-teal-400 via-purple-500 to-pink-400 rounded-full blur-2xl opacity-40 animate-siri-pulse delay-2000"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 rounded-full blur-xl opacity-50 animate-siri-pulse delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center h-screen max-w-7xl mx-auto px-6">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-gray-900 text-4xl md:text-6xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Best AI Chatbot <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
              Revolutionizing Conversations
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Experience the future of AI-powered communication.
          </motion.p>

          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md hover:bg-blue-600 focus:outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            onClick={handleButtonClick}
          >
            {isLoggedIn ? "Start Chatting" : "Get Started"}
          </motion.button>
        </div>

        {/* Chat Interface Section */}
        <motion.div
          className="flex-1 mt-12 md:mt-0 md:ml-12 max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Chat Header */}
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800">BiceChat</h3>
            <p className="text-sm text-gray-500">Powered by OpenAI</p>
          </div>

          {/* Chat Messages */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-end space-x-3">
              <div className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm shadow">
                Hi, I need help with coding!
              </div>
            </div>

            {isBotTyping && (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm shadow flex items-center space-x-2">
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
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm shadow">
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
