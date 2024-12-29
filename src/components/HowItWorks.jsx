import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
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

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};

export default HowItWorks;
