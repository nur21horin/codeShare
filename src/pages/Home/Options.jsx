import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const options = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Popular", value: "popular" },
  { label: "Trending", value: "trending" },
];

const SortDropdown = ({ sortBy, setSortBy, setPage }) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === sortBy);

  return (
    <div className="mb-6 relative w-full">

      {/* FLOATING LABEL */}
      <label className="absolute -top-2 left-3 text-xs text-muted bg-card px-1">
        Sort Posts
      </label>

      {/* SELECT BOX */}
      <div
        onClick={() => setOpen(!open)}
        className="
          flex justify-between items-center
          bg-card/60 backdrop-blur-xl
          border border-muted
          text-text
          rounded-xl px-4 py-3
          cursor-pointer
          shadow-md hover:shadow-2xl
          transition
          dark:shadow-purple-500/10
        "
      >
        <span>{selected?.label}</span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute mt-2 w-full
              bg-card/90 backdrop-blur-xl
              border border-muted
              rounded-xl shadow-xl
              overflow-hidden
              z-50
            "
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  setSortBy(opt.value);
                  setPage(1);
                  setOpen(false);
                }}
                className="
                  px-4 py-3
                  text-text
                  hover:bg-primary hover:text-white
                  cursor-pointer
                  transition
                "
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;