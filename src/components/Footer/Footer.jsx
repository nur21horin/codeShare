import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [stats, setStats] = useState({
    users: 1200,
    posts: 5400,
  });

  // theme apply
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const social = [
    { icon: "🐙", label: "GitHub" },
    { icon: "💼", label: "LinkedIn" },
    { icon: "🌐", label: "Website" },
  ];

  return (
    <footer className="relative mt-12 text-base-content">

      {/* GLASS BACKGROUND */}
      <div className="backdrop-blur-xl bg-base-200/70 border border-base-300 rounded-none transition-all duration-300">

        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-primary">
              CP Platform
            </h2>

            <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
              A competitive programming community where developers share
              optimized solutions, learn algorithms, and grow together.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-5">
              {social.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl cursor-pointer"
                  title={item.label}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-primary" to="/">Home</Link></li>
              <li><Link className="hover:text-primary" to="/createpost">Create</Link></li>
              <li><Link className="hover:text-primary" to="/profile">Profile</Link></li>
              <li><Link className="hover:text-primary" to="/about">About</Link></li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">

            {/* THEME TOGGLE */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">Theme</span>

              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 rounded-full bg-base-300 hover:bg-base-100 transition"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </motion.button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-base-300/40">
                <p className="text-lg font-bold text-primary">
                  {stats.users}+
                </p>
                <p className="text-xs">Users</p>
              </div>

              <div className="p-3 rounded-xl bg-base-300/40">
                <p className="text-lg font-bold text-primary">
                  {stats.posts}+
                </p>
                <p className="text-xs">Posts</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-base-300 text-center py-4 text-sm text-base-content/60">
          © {new Date().getFullYear()} CP Platform — Built for competitive programmers ⚡
        </div>

      </div>
    </footer>
  );
};

export default Footer;