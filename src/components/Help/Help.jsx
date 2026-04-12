import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 transition-colors duration-300">

      <div className="max-w-2xl w-full bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary">
          Help & Support
        </h1>

        <p className="text-center text-base-content/70 mb-6 mt-2">
          We’re here to help you anytime 🚀
        </p>

        {/* FAQ */}
        <Link to="/faq">
          <div className="bg-base-200 hover:bg-base-300 transition cursor-pointer p-4 rounded-xl border border-base-300">
            <h2 className="font-semibold text-base-content">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Explore common questions, solutions, and platform guides.
            </p>
          </div>
        </Link>

        {/* QUICK SUPPORT */}
        <div className="bg-base-200 hover:bg-base-300 transition p-4 rounded-xl mt-4 border border-base-300">
          <h2 className="font-semibold text-base-content">
            ⚡ Quick Support
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Our team is ready to help you with technical or account issues.
          </p>
        </div>

        {/* CONTACT */}
        <div className="bg-base-200 hover:bg-base-300 transition p-4 rounded-xl mt-4 border border-base-300">
          <h2 className="font-semibold text-base-content">
            📧 Contact Support
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Send a message and we will respond within 24 hours.
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-6 text-center">
          <Link
            to="/contact"
            className="btn btn-primary rounded-full px-6 hover:scale-105 transition-transform"
          >
            Go to Contact Page
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Help;