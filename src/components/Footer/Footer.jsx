import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

    
        <div>
          <h2 className="text-xl font-bold text-white">CP Platform</h2>
          <p className="mt-3 text-sm">
            A platform to share competitive programming solutions, discuss
            algorithms, and improve problem-solving skills.
          </p>
        </div>

     
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/createpost" className="hover:text-white">Create Post</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: nurm98371@gmail.com</p>

          <div className="flex space-x-4 mt-4">
            <span className="hover:text-white cursor-pointer">🌐</span>
            <span className="hover:text-white cursor-pointer">🐙</span>
            <span className="hover:text-white cursor-pointer">💼</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} CP Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;