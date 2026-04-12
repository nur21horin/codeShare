import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const CreatePostBox = ({ search, setSearch, setPage, loading }) => {
  const { user } = useAuth();
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setShowClear(search.length > 0);
  }, [search]);

  return (
    <div className="sticky top-0 z-50 bg-base-100 p-4 shadow-md rounded-xl mb-4 space-y-4">

      {/* SEARCH */}
      <div className="relative w-full">

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input input-bordered w-full pl-10 pr-10"
        />

        {loading && (
          <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
        )}

        {showClear && !loading && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* USER + CREATE POST */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">

        <div className="flex items-center gap-3">
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random&color=fff"
            }
            className="w-10 h-10 rounded-full object-cover"
            alt="user"
          />

          <span className="text-sm font-medium">
            {user?.displayName || "Anonymous"}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/createpost"
            className="bg-primary text-white px-4 py-2 rounded-full text-sm sm:text-base block text-center"
          >
            What's on your mind?
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default CreatePostBox;