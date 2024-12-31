import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleTalkToBiceClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login"); // Redirect to login instead of showing a modal
    }
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
            <li>
              <Link to="/" className="no-underline text-black hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="no-underline text-black hover:text-blue-500"
                onClick={handleTalkToBiceClick}
              >
                Talk to Bice
              </Link>
            </li>
            <li>
              <Link to="/features" className="no-underline text-black hover:text-blue-500">
                Features
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="no-underline text-black hover:text-blue-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="no-underline text-black hover:text-blue-500">
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
                    <ul>
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
    </>
  );
};

export default Navbar;
