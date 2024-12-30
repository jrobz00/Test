import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PricingTable = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if a user is logged in
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  const plans = [
    {
      name: "Starter Plan",
      price: "Free",
      features: [
        "Basic AI Conversations",
        "Up to 5,000 messages/month",
        "Standard Response Time",
        "Community Support",
      ],
      button: isLoggedIn ? "Start Chatting" : "Get Started Free",
      onClick: () => (isLoggedIn ? navigate("/chat") : navigate("/register")), // Redirect based on login status
      popular: false,
    },
    {
      name: "Pro Plan",
      price: "£10.00/month",
      features: [
        "Advanced AI Conversations",
        "Unlimited messages",
        "Priority Response Time",
        "24/7 Chat Support",
        "Custom AI Integrations",
      ],
      button: "Coming Soon",
      popular: true,
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
          Choose Your Plan
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Flexible plans to fit your AI needs.
        </motion.p>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-lg shadow-lg p-6 ${
                plan.popular
                  ? "border-4 border-blue-600 bg-blue-50"
                  : "border border-gray-200 bg-white"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 right-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Most Popular
                </motion.div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-700 text-left mb-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-4 h-4 bg-blue-600 text-white flex items-center justify-center rounded-full mr-3 text-sm">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                onClick={plan.onClick} // Attach the onClick handler
                className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={plan.button === "Coming Soon"} // Disable if Coming Soon
              >
                {plan.button}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
