import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-blue-600 text-white px-4 py-3 shadow-md">

      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1 className="font-bold text-lg">CP Platform</h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-sm">

          <Link to="/">Home</Link>
          <Link to="/createpost">Create</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-blue-700 px-3 py-1 rounded-full"
            >
              {user ? "Account ▼" : "Guest ▼"}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 z-50">

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/logout"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}

              </div>
            )}
          </div>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-2 text-sm bg-blue-700 p-3 rounded">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/createpost">Create</Link>
          <Link onClick={() => setOpen(false)} to="/about">About</Link>
          <Link onClick={() => setOpen(false)} to="/help">Help</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>

          <div className="border-t border-blue-500 pt-2">

            {user ? (
              <div className="flex flex-col gap-2">
                <Link onClick={() => setOpen(false)} to="/profile">
                  Profile
                </Link>
                <Link onClick={() => setOpen(false)} to="/logout">
                  Logout
                </Link>
              </div>
            ) : (
              <Link onClick={() => setOpen(false)} to="/login">
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Navbar;