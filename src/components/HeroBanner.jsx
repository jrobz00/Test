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
    <div className="bg-gradient-to-b from-blue-900 via-gray-900 to-black min-h-screen relative overflow-hidden">
      {/* Parallax Animated Background Lines */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6" aria-hidden="true">
        {[...Array(36)].map((_, index) => (
          <motion.div
            key={index}
            className="border border-dashed border-gray-600 opacity-20"
            initial={{ y: index % 2 === 0 ? -50 : 50, rotate: 0 }}
            animate={{
              y: index % 2 === 0 ? 50 : -50,
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4 + (index % 12) * 0.2,
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
        <div className="container mx-auto px-6 md:px-12 text-center relative">
          {/* Welcome Message */}
          <motion.div
            className="text-lg md:text-xl text-gray-300 italic mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            "Welcome to the future of conversations, powered by the brilliance of AI."
          </motion.div>

          {/* Title with Animation */}
          <motion.h1
            className="text-white text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Unlock the Power of{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              animate={{ backgroundPosition: "200% center" }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
              style={{
                backgroundSize: "400%",
              }}
            >
              AI Conversations
            </motion.span>
          </motion.h1>

          {/* Subtitle with Staggered Fade */}
          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Explore intelligent, engaging AI-powered chats that revolutionize how you interact with
            technology.
          </motion.p>

          {/* Feature Cards with Hover Animations */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-transform transform hover:scale-110"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 2, -2, 0],
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex justify-center items-center mb-4 text-blue-500 text-5xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    filter: ["drop-shadow(0 0 10px rgba(0,0,255,0.5))", "none"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Floating Gradient Decorations with Pulsations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-30"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
