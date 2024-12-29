import React from "react";
import { FaBrain, FaRobot, FaCogs } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Intelligent AI",
      description:
        "Leverage cutting-edge AI models to get accurate and insightful responses tailored to your needs.",
      icon: <FaBrain />,
    },
    {
      title: "Seamless Automation",
      description:
        "Automate repetitive tasks with smart AI integrations that save you time and effort.",
      icon: <FaRobot />,
    },
    {
      title: "Customizable Workflows",
      description:
        "Adapt AI to your workflow with flexible configurations and custom integrations.",
      icon: <FaCogs />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Discover the features that make our AI platform unique.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="flex justify-center items-center mb-6 text-blue-600 text-5xl">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
