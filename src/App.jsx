import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import PricingTable from "./components/PricingTable";
import Features from "@components/Features";
import HowItWorks from "@components/HowItWorks";
import ChatPage from "./pages/ChatPage"; // Import ChatPage
import StatusPage from "./pages/StatusPage"; // Import StatusPage
import Footer from "@components/Footer"; // Import Footer Component
import LoginForm from "./components/LoginForm"; // Import LoginForm Component
import RegisterForm from "./components/RegisterForm"; // Import RegisterForm Component
import ProfileSettings from "./pages/ProfileSettings"; // Import ProfileSettings Page

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Router>
      <div
        className={`relative min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* Navbar */}
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />

        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Banner */}
                <HeroBanner darkMode={darkMode} setDarkMode={setDarkMode} />
                <HowItWorks />
                <PricingTable />
              </>
            }
          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/status" element={<StatusPage />} /> {/* Add StatusPage Route */}
          <Route path="/login" element={<LoginForm darkMode={darkMode} />} /> {/* Login Form Route */}
          <Route path="/register" element={<RegisterForm darkMode={darkMode} />} /> {/* Register Form Route */}
          <Route path="/profile" element={<ProfileSettings />} /> {/* Profile Settings Route */}
        </Routes>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
};

export default App;
