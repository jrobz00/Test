import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      navigate("/login");
    }
  };

  return (
    <nav className="bg-[#F3F4F6] shadow-md py-4 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
            <span className="text-white font-bold text-lg">✦</span>
          </div>
          <span className="text-xl font-bold text-gray-900">BiceChat</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="text-2xl text-gray-700 md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-900">
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
        <div className="relative hidden md:block">
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white text-gray-900 space-y-4 py-6 shadow-lg">
          <li>
            <Link
              to="/"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className="text-lg font-medium hover:text-blue-500"
              onClick={(e) => {
                handleTalkToBiceClick(e);
                setIsMobileMenuOpen(false);
              }}
            >
              Talk to Bice
            </Link>
          </li>
          <li>
            <Link
              to="/features"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/how-it-works"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
          </li>
          {isLoggedIn ? (
            <li
              className="text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
            >
              Logout
            </li>
          ) : (
            <li>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
