import React from "react";
import { FaComments, FaLightbulb, FaClock } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion";

const HeroBanner = () => {
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
    <div className="bg-gradient-to-b from-blue-50 via-gray-50 to-white min-h-screen relative">
      {/* Animated Background Dashed Lines */}
      <div
        className="absolute inset-0 grid grid-cols-12 grid-rows-6 bg-white"
        aria-hidden="true"
      >
        {[...Array(36)].map((_, index) => (
          <motion.div
            key={index}
            className="border border-dashed border-gray-300 opacity-30"
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

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          {/* Title */}
          <motion.h1
            className="text-gray-900 text-5xl md:text-6xl font-extrabold leading-tight mb-6"
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
                className="bg-white text-gray-900 shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-110"
                whileHover={{ scale: 1.15 }}
              >
                <div className="flex justify-center items-center mb-4 text-blue-600 text-5xl">
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
