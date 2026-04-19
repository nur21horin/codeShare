import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../../Theme/ThemeToggle";

// icons
import { FaHome, FaPlus, FaInfoCircle, FaQuestionCircle, FaPhone, FaUser, FaCodeBranch, FaCode } from "react-icons/fa";
import { SiCodesandbox } from "react-icons/si";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // active style function
  const activeClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-text hover:text-primary transition";

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-dotted shadow-amber-400  shadow-sm">

      <div className="flex justify-between items-center px-4 py-3">

        {/* LOGO */}
        <NavLink to="/" className="text-xl flex items-center gap-1.5 font-bold text-primary">
        < FaCode className="text-2xl" />
          CodeShare
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-sm">

          <NavLink to="/" className={activeClass}>
            <FaHome className="inline mr-1" /> Home
          </NavLink>

          <NavLink to="/createpost" className={activeClass}>
            <FaPlus className="inline mr-1" /> Add
          </NavLink>

          <NavLink to="/about" className={activeClass}>
            <FaInfoCircle className="inline mr-1" /> About
          </NavLink>

          <NavLink to="/help" className={activeClass}>
            <FaQuestionCircle className="inline mr-1" /> Help
          </NavLink>

          <NavLink to="/contact" className={activeClass}>
            <FaPhone className="inline mr-1" /> Contact
          </NavLink>

          {user ? (
            <NavLink to="/profile" className={activeClass}>
              <FaUser className="inline mr-1" /> Profile
            </NavLink>
          ) : (
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>
          )}

          <ThemeToggle />

          {/* USER BADGE */}
          <div className="ml-2 px-3 py-1 rounded-full bg-secondary text-white text-xs">
            {user ? user.displayName : "Guest"}
          </div>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl text-text"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm bg-card border-t border-muted">

          <NavLink onClick={() => setOpen(false)} to="/" className={activeClass}>
            <FaHome className="inline mr-1" /> Home
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/createpost" className={activeClass}>
            <FaPlus className="inline mr-1" /> Create
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/about" className={activeClass}>
            <FaInfoCircle className="inline mr-1" /> About
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/help" className={activeClass}>
            <FaQuestionCircle className="inline mr-1" /> Help
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/contact" className={activeClass}>
            <FaPhone className="inline mr-1" /> Contact
          </NavLink>

          {user ? (
            <NavLink onClick={() => setOpen(false)} to="/profile" className={activeClass}>
              <FaUser className="inline mr-1" /> Profile
            </NavLink>
          ) : (
            <NavLink onClick={() => setOpen(false)} to="/login" className={activeClass}>
              Login
            </NavLink>
          )}

          <div className="pt-2 flex justify-between items-center">
            <ThemeToggle />

            <span className="text-xs text-muted">
              {user ? user.email : "Not logged in"}
            </span>
          </div>

        </div>
      )}

    </div>
  );
};

export default Navbar;