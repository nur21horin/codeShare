import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  const questions = [
    { id: 1, title: "How do I create a post?" },
    { id: 2, title: "How can I delete my post?" },
    { id: 3, title: "Why is my post not showing?" },
    { id: 4, title: "How to contact support?" },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-2xl mx-auto space-y-3">

        {questions.map((q) => (
          <Link key={q.id} to={`/faq/${q.id}`}>
            <div className="p-4 bg-base-100 rounded-xl shadow hover:bg-base-300 transition cursor-pointer">
              ❓ {q.title}
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Faq;