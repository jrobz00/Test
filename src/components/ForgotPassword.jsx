import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase"; // Ensure the path to firebase.js is correct

const ForgotPassword = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(app);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <motion.div
        className={`w-[90%] max-w-md p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Reset Your Password
        </h2>

        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                  : "bg-gray-100 border-gray-300 focus:border-blue-500"
              } focus:outline-none`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full px-4 py-2 text-lg font-semibold rounded-lg ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            } focus:outline-none`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Reset Link
          </motion.button>
        </form>

        {message && (
          <p className="text-green-500 text-sm mt-4">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        <div className="mt-6 text-center">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Remembered your password?{" "}
            <a
              href="/login"
              className={`font-medium ${
                darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
              }`}
            >
              Log In
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
