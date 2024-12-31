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
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen">
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          {/* Welcome Message */}
          <motion.div
            className="text-lg md:text-xl text-gray-700 italic mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            "Welcome to the future of conversations, powered by AI."
          </motion.div>

          {/* Title with Animation */}
          <motion.h1
            className="text-gray-900 text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Unlock the Power of{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ backgroundPosition: "0% center" }}
              animate={{ backgroundPosition: "200% center" }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
              style={{
                backgroundSize: "400%",
                display: "inline-block",
              }}
            >
              AI Conversations
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-600 text-lg md:text-xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore engaging AI-powered chats that revolutionize how you interact with technology.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 text-gray-900 shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-5xl text-blue-500 mb-4 flex justify-center items-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
