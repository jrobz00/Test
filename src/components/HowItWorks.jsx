import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const [isBotTyping, setIsBotTyping] = useState(true);
  const [botMessage, setBotMessage] = useState("");

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description:
        "Create an account to access the platform and unlock the power of AI conversations.",
    },
    {
      step: "2",
      title: "Start Chatting",
      description:
        "Ask questions, generate ideas, or automate tasks with our intuitive AI interface.",
    },
    {
      step: "3",
      title: "Get Results",
      description:
        "Receive accurate, insightful, and actionable responses tailored to your needs.",
    },
  ];

  useEffect(() => {
    // Simulate bot typing delay
    const typingTimeout = setTimeout(() => {
      setBotMessage("Sure! What specifically do you need help with? I can provide examples or explanations.");
      setIsBotTyping(false);
    }, 3000); // 3-second delay for typing simulation

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get started in just three easy steps.
          </motion.p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-blue-600 text-white text-xl font-bold rounded-full mb-6">
                {step.step}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface Section */}
        <motion.div
          className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Chat Header */}
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800">BiceChat</h3>
            <p className="text-sm text-gray-500">Powered by OpenAI.</p>
          </div>

          {/* Chat Messages */}
          <div className="p-6 space-y-4">
            {/* User Message */}
            <div className="flex items-start space-x-3 justify-end">
              <div className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm shadow">
                Hi, I need help with coding!
              </div>
            </div>

            {/* Bot Typing Effect */}
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

            {/* Bot Message */}
            {!isBotTyping && (
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm shadow">
                  {botMessage}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center px-6 py-4 bg-gray-100 border-t">
            <input
              type="text"
              placeholder="Start with a detailed description"
              className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <button className="ml-3 bg-blue-500 text-white rounded-full p-2 shadow" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
