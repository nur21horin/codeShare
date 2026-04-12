import React from "react";
import { useParams, Link } from "react-router-dom";

const faqData = {
  1: {
    question: "How do I create a post?",
    answer:
      "Go to home page, click 'What's on your mind?', fill the form and publish your post.",
  },
  2: {
    question: "How can I delete my post?",
    answer:
      "Open your post and click delete button. Only owner can delete it.",
  },
  3: {
    question: "Why is my post not showing?",
    answer:
      "Refresh the page or check internet connection. If still not visible, try login again.",
  },
  4: {
    question: "How to contact support?",
    answer:
      "Go to contact page and send a message. We reply within 24 hours.",
  },
};

const FaqDetails = () => {
  const { id } = useParams();
  const faq = faqData[id];

  if (!faq) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Question not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">

      <div className="max-w-xl w-full bg-base-100 shadow-xl rounded-2xl p-6">

        <h1 className="text-xl font-bold mb-4">
          ❓ {faq.question}
        </h1>

        <p className="text-gray-600 mb-6">
          {faq.answer}
        </p>

        <Link to="/faq" className="btn btn-primary w-full">
          Back to FAQ
        </Link>

      </div>

    </div>
  );
};

export default FaqDetails;