import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import PricingTable from "./components/PricingTable";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ChatPage from "./pages/ChatPage";
import StatusPage from "./pages/StatusPage";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfileSettings from "./pages/ProfileSettings";
import ForgotPassword from "./components/ForgotPassword"; // Import the ForgotPassword component
import NotFoundPage from "./pages/NotFoundPage"; // Import your custom 404 page

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Router>
      <div
        className={`relative min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroBanner darkMode={darkMode} setDarkMode={setDarkMode} />
                <HowItWorks />
                <PricingTable />
              </>
            }
          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<PricingTable />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<LoginForm darkMode={darkMode} />} />
          <Route path="/register" element={<RegisterForm darkMode={darkMode} />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/forgot-password" element={<ForgotPassword darkMode={darkMode} />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Fallback for undefined routes */}
        </Routes>

        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
};

export default App;
