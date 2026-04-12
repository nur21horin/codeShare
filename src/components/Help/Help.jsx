import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="max-w-2xl w-full bg-base-100 shadow-xl rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-center mb-2">
          Help & Support
        </h1>

        <p className="text-center text-gray-500 mb-6">
          We’re here to help you anytime 🚀
        </p>

        {/* CLICKABLE FAQ CARD */}
        <Link to="/faq">
          <div className="bg-base-200 p-4 rounded-xl cursor-pointer hover:bg-base-300 transition">
            <h2 className="font-semibold">❓ Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Click here to explore common questions and answers.
            </p>
          </div>
        </Link>

        <div className="bg-base-200 p-4 rounded-xl mt-4">
          <h2 className="font-semibold">⚡ Quick Support</h2>
          <p className="text-sm text-gray-600 mt-1">
            Our team is ready to help you anytime.
          </p>
        </div>

        <div className="bg-base-200 p-4 rounded-xl mt-4">
          <h2 className="font-semibold">📧 Contact Support</h2>
          <p className="text-sm text-gray-600 mt-1">
            Send a message and we will respond within 24 hours.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/contact"
            className="btn btn-primary px-6 rounded-full hover:scale-105"
          >
            Go to Contact Page
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Help;