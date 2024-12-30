import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Ensure the path to firebase.js is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LoginForm = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/chat"); // Redirect to the chat page after successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error logging in: " + error.message);
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
          Welcome Back to BiceChat!
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
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

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                  : "bg-gray-100 border-gray-300 focus:border-blue-500"
              } focus:outline-none`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
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
            Login
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Don't have an account?{" "}
            <a
              href="/register"
              className={`font-medium ${
                darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
              }`}
            >
              Sign Up
            </a>
          </p>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className={`font-medium ${
                darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
              }`}
            >
              Reset it
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
