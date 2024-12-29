import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import PricingTable from "./components/PricingTable";
import Features from "@components/Features";
import HowItWorks from "@components/HowItWorks";
import ChatPage from "./pages/ChatPage"; // Import ChatPage

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-gray-50">
        {/* Sticky Navbar */}
        {/* <Navbar /> */}
        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Banner */}
                <HeroBanner />
                <HowItWorks />
                <PricingTable />
              </>
            }
          />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
