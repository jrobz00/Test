import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Toggle profile menu
  const [showModal, setShowModal] = useState(false); // Toggle modal
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign out the user
      setIsLoggedIn(false); // Update state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleTalkToBiceClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      setShowModal(true); // Show modal
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="bg-[#F3F4F6] shadow-md py-4 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BiceChat</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 flex justify-center space-x-8 font-medium text-gray-900">
            <li className="transition duration-300">
              <Link
                to="/"
                className="no-underline text-black hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li className="transition duration-300">
              <Link
                to="/chat"
                className="no-underline text-black hover:text-blue-500"
                onClick={handleTalkToBiceClick} // Ensure user is logged in
              >
                Talk to Bice
              </Link>
            </li>
            <li className="transition duration-300">
              <Link
                to="/"
                className="no-underline text-black hover:text-blue-500"
              >
                Features
              </Link>
            </li>
            <li className="transition duration-300">
              <Link
                to="/pricing"
                className="no-underline text-black hover:text-blue-500"
              >
                Pricing
              </Link>
            </li>
            <li className="transition duration-300">
              <Link
                to="/"
                className="no-underline text-black hover:text-blue-500"
              >
                How It Works
              </Link>
            </li>
          </ul>

          {/* Profile Menu or Sign Up */}
          <div className="relative flex-shrink-0">
            {isLoggedIn ? (
              <div>
                <FaUserCircle
                  className="text-3xl text-gray-700 cursor-pointer hover:text-blue-500"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                    <ul className="text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/profile")}
                      >
                        Profile Settings
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-500 transition duration-300 no-underline"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to use the "Talk to Bice" feature.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
