import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;