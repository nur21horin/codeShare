export default function About() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="max-w-3xl w-full bg-base-100 shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-2">
          About CodeShare 🚀
        </h1>

        <p className="text-center text-gray-500 mb-6">
          A community for competitive programmers to share solutions, insights, and problem-solving techniques
        </p>

        {/* GRID CONTENT */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* WHAT IS PLATFORM */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">💡 What is CodeShare?</h2>
            <p className="text-sm text-gray-600 mt-1">
              CodeShare is a platform where competitive programmers
              share detailed solutions, approaches, and explanations
              of algorithmic problems from contests and practice platforms.
            </p>
          </div>

          {/* CORE PURPOSE */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">🎯 Purpose</h2>
            <p className="text-sm text-gray-600 mt-1">
              To help programmers learn faster by understanding different
              approaches like greedy, DP, graphs, math, and data structures
              through shared solutions.
            </p>
          </div>

          {/* FEATURES */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">⚡ Features</h2>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>✔ Share CP problem solutions</li>
              <li>✔ Explain optimal approaches</li>
              <li>✔ Search problems by tags</li>
              <li>✔ Like and comment discussions</li>
            </ul>
          </div>

          {/* WHAT USERS SHARE */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">📘 What Users Share</h2>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>✔ Codeforces / AtCoder / LeetCode solutions</li>
              <li>✔ Editorial-style explanations</li>
              <li>✔ Optimized approaches</li>
              <li>✔ Edge case analysis</li>
            </ul>
          </div>

          {/* TECH STACK */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">🛠 Tech Stack</h2>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>✔ React + Vite (Frontend)</li>
              <li>✔ Node + Express (Backend)</li>
              <li>✔ MongoDB (Database)</li>
              <li>✔ Tailwind CSS (UI)</li>
            </ul>
          </div>

          {/* GOAL */}
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold">🌍 Goal</h2>
            <p className="text-sm text-gray-600 mt-1">
              To build a strong competitive programming community where
              learners can grow through shared problem-solving knowledge.
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Built for competitive programmers, by competitive programmers ⚡
          </p>
        </div>

      </div>
    </div>
  );
}