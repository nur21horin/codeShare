import React from "react";
import { Link } from "react-router-dom";

// icons
import { FaQuestionCircle, FaBolt, FaEnvelope, FaArrowRight, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const lines = [
  <span className="flex items-center justify-center gap-2">
  <FaHeadset className="text-primary" />
  We’re here to help you 24/7
</span>,
  "Explore FAQs for quick answers",
  "Get instant support from our team",
  "Contact us for any issue within 24h",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Help = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">

      <div className="max-w-2xl w-full bg-card shadow-green-500/20 shadow-xl rounded-2xl p-6 space-y-5">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary flex justify-center items-center gap-2">
          <FaQuestionCircle />
          Help & Support
        </h1>

        <motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="text-center text-muted space-y-1"
>
  {lines.map((text, i) => (
    <motion.p key={i} variants={item}>
      {text}
    </motion.p>
  ))}
</motion.div>

        {/* FAQ */}
        <Link to="/faq">
          <div className="p-4 rounded-xl bg-bg hover:bg-card transition cursor-pointer">

            <h2 className="font-semibold text-text flex items-center gap-2">
              <FaQuestionCircle className="text-primary" />
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-muted mt-1">
              Explore common questions, solutions, and platform guides.
            </p>

          </div>
        </Link>

        {/* QUICK SUPPORT */}
        <div className="p-4 rounded-xl bg-bg hover:bg-card transition">

          <h2 className="font-semibold text-text flex items-center gap-2">
            <FaBolt className="text-yellow-400" />
            Quick Support
          </h2>

          <p className="text-sm text-muted mt-1">
            Our team is ready to help you with technical or account issues.
          </p>

        </div>

        {/* CONTACT */}
        <div className="p-4 rounded-xl bg-bg hover:bg-card transition">

          <h2 className="font-semibold text-text flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            Contact Support
          </h2>

          <p className="text-sm text-muted mt-1">
            Send a message and we will respond within 24 hours.
          </p>

        </div>

        {/* BUTTON */}
        <div className="text-center pt-2">

          <Link
            to="/contact"
            className="
              inline-flex items-center gap-2
              px-6 py-2 rounded-full
              bg-primary text-white
              hover:opacity-90 transition
              shadow-lg shadow-green-500/20
            "
          >
            Go to Contact Page
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Help;